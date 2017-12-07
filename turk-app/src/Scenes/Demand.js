import React, { Component } from 'react';
import {getDemandbyID} from '../Utils/Demand.js';
import {getAccountByID,getAccountByApiToken} from '../Utils/User.js';
import {Button,Grid, Row,Col,Form, FormGroup, FormControl, ControlLabel,Modal} from 'react-bootstrap';
import {FormContainer} from '../Styles/form.style'
import Bidder from './Bidder'


import {
  ContainerBG ,
  DemandHeaderBG,
  DemandBody,
  DemandTitle,
  DemandUserDate,
  DemandBodyHeaders,
  DemandBodyP,
  BidButton,
  BackButton
 }from '../Styles/Demand.style';
 import {Link} from 'react-router-dom';

class Demand extends Component {
/*
  devChosen : false = anyone can bid at anytime
  devChosen : true = people can still view, nobody can bid

  isActive : false = nobody can view it
*/

  constructor(props){
      super(props);
      this.state = {
        currentViewerId : "",
        demandID : this.props.match.params.id,
        ownerId : "",
        content : "",
        title : "",
        __v : 0,
        devChosen : false,
        isActive : false,
        createdDate : "",
        ownerName : "",
        winningBid : "",
        userType : "",

        //client only:
        totalBids : [],
        showBiddersError : false,

        //bidder only
        developerBalance : "",
        bidValue : 0,
        showBidError : false,
        bidMessage : "",

        // chosen developer only
        product: "",
        showProductError : false,
        productMessage : "",
      }

      this.handleChange = this.handleChange.bind(this);

      this.submitBid = this.submitBid.bind(this);
      this.SubmitProduct = this.SubmitProduct.bind(this);

      this.getDemandbyID = getDemandbyID.bind(this);
      this.displayContent = this.displayContent.bind(this);
      this.getAccountByID = getAccountByID.bind(this);
      this.displayContent();
  }
//2017-11-10T19:57:56.710Z
  convertDate = (date) => ({
      year : date.substr(0,4),
      month : date.substr(5,2) ,
      day : date.substr(8,2) ,
      hour : date.substr(11,2) ,
      minutes : date.substr(14,2) ,
      seconds : date.substr(17,2)
  })

  validateBid() {
     return this.state.bidValue > 0
   }

  validateProduct() {
    return this.state.product.length > 0
  }


  openBidMessage = () => {
    this.setState({ showBidError : true })
  }

  closeBidError = () => {
    this.setState({ showBidError : false })
  }



  openProductMessage = () => {
    this.setState({ showProductError : true })
  }

  closeProductError = () => {
    this.setState({ showProductError : false })
  }



  submitBid = (event) => {
      if(this.state.userType !== "Developer") this.setState({ bidMessage : "Only developers can submit bids" })

      else if(this.state.developerBalance - this.state.bidValue < 0) this.setState({ bidMessage : "Your current balance is too low, please pick another price" })
      else this.setState({ bidMessage : "Your bid has been submitted" })

      this.openBidMessage();
      event.preventDefault();
  }

  SubmitProduct = (event) => {
      if(this.state.userType !== "Developer") this.setState({ productMessage : "Only developers can submit products" })
      else if(this.state.winningBid.devId  !== this.state.currentViewerId ) this.setState({ productMessage : "You are not the winning bidder, you can't submit a product to this demand " })
      else this.setState({ productMessage : "Product Submitted" })

      this.openProductMessage()
      event.preventDefault();
  }

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }


  displayContent(){
      const DemandID = this.state.demandID;
      this.getDemandbyID(DemandID)
      .then( (response) => {
        const convertedCreated = this.convertDate(response.createdDate);
        getAccountByID(response.ownerId)
            .then( (clientName) => { this.setState({
                ownerName : clientName.name.first + " " + clientName.name.last
              })
            })
            .catch( (error) => {
              alert("Error from : demand page" + error);
        });


       const API_token = localStorage.getItem('api_token')
       //call our axios promise, then retrieve the token from axios
       getAccountByApiToken(API_token)
           .then( (account) => {
             this.setState({
               currentViewerId : account._id,
               userType: account.userType , // 3 types Client, Developer, Super_User
               developerBalance : account.funds
              })
           })
           .catch( (error) => {
             alert("got an error with API token in demand")
             localStorage.removeItem('api_token');
           });
        this.setState({
          ownerId : response.ownerId,
          content : response.content,
          title : response.title ,
          __v : response.__v,
          devChosen : response.devChosen,
          isActive :  response.isActive,
          totalBids :  response.totalBids.map( JSONObject => (
                 <Bidder ID = {JSONObject.devId}/>
            )),
          winningBid : response.winningBid,
          createdDate : convertedCreated.month + "/" + convertedCreated.day + "/" + convertedCreated.year  ,
        })


      })


  }
  render(){
    return (

      <ContainerBG>
        <DemandHeaderBG>
          <DemandTitle>
            {this.state.title}
          </DemandTitle>

          <Link to =  {`/user/userId=${this.state.ownerId}`}>
            <DemandUserDate>
                By : {this.state.ownerName}
            </DemandUserDate>
          </Link>

          <DemandUserDate>
              Posted : {this.state.createdDate}
          </DemandUserDate>
        </DemandHeaderBG>

        <DemandBody>
        <DemandBodyHeaders>
          Is Active
        </DemandBodyHeaders>
        <DemandBodyP>
          { this.state.isActive ? "is active" : "is not active"}
        </DemandBodyP>

          <DemandBodyHeaders>
            Description
          </DemandBodyHeaders>
          <DemandBodyP>
            {this.state.content}
          </DemandBodyP>

          <DemandBodyHeaders>
            Bidders:
          </DemandBodyHeaders>
          <DemandBodyP>
            {this.state.totalBids}
          </DemandBodyP>

          <DemandBodyHeaders>
            Demand ID:
          </DemandBodyHeaders>
          <DemandBodyP>
            {this.state.demandID}
          </DemandBodyP>

          <DemandBodyHeaders>
            Current Winning Bidder
          </DemandBodyHeaders>
          <DemandBodyP>
            {this.state.winningBid.devId + " with a bid amount of " + this.state.winningBid.bidAmount}
          </DemandBodyP>


      <FormContainer>
              <form onSubmit = {this.submitBid}>
                <FormGroup controlId="bidValue">
                   <FormControl
                       type="bidValue"
                       placeholder="Bid Amount"
                       value ={this.state.bidValue}
                       onChange = {this.handleChange}
                    />
                </FormGroup>
                    <Button block type="submit" disabled={!this.validateBid()} >
                       bid
                    </Button>

                <Modal show={this.state.showBidError} onHide={this.closeBidError}>
                  <Modal.Header closeButton>
                    <Modal.Title>Bidding Error</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p> {this.state.bidMessage} </p>
                  </Modal.Body>
                </Modal>
              </form>
        </FormContainer>

        <FormContainer>
            <form onSubmit = {this.SubmitProduct}>
              <FormGroup controlId="product">
                 <FormControl
                     type="product"
                     placeholder="Product"
                     value ={this.state.product}
                     onChange = {this.handleChange}
                  />
              </FormGroup>
                  <Button block type="submit" disabled={!this.validateProduct()} >
                     Submit Product
                  </Button>

              <Modal show={this.state.showProductError} onHide={this.closeProductError}>
                <Modal.Header closeButton>
                  <Modal.Title>Submit Product Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p> {this.state.productMessage}</p>
                </Modal.Body>
              </Modal>
            </form>
        </FormContainer>


            <Link to = '/'>
              <BackButton>
                Back
              </BackButton>
            </Link>
        </DemandBody>
      </ContainerBG>

    );
  }
}



export default Demand;
