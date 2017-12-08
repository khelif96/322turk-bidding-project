import React, { Component } from 'react';
import {getDemandbyID,placeBid,submitProduct} from '../Utils/Demand.js';
import {getAccountByID,getAccountByApiToken,rateUser} from '../Utils/User.js';
import {Button,Grid,Form, FormGroup, FormControl, ControlLabel,Modal,Radio,ToggleButtonGroup,ToggleButton,ButtonToolbar} from 'react-bootstrap';
import {FormContainer,DatePicker} from '../Styles/form.style'
import Bidder from "./Bidder"

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
        winningBidID : "",
        userType : "",
        tags : [],

        //client only:
        totalBids : [],
        showBiddersError : false,

        //bidder only
        developerBalance : "",
        bidValue : 0,
        bidDeadLine : "",
        showBidError : false,
        bidMessage : "",
        lowestBidderID : "",


        // chosen developer only
        rating : 3,
        product: "",
        showProductError : false,
        productMessage : "",
        ratingReason : "",


      }

      this.handleChange = this.handleChange.bind(this);

      this.placeBid = placeBid.bind(this);
      this.submitProduct = submitProduct.bind(this);
      this.getDemandbyID = getDemandbyID.bind(this);
      this.rateUser = rateUser.bind(this);

      this.submitBid = this.submitBid.bind(this);
      this.SubmitCurrentProduct = this.SubmitCurrentProduct.bind(this);
      this.SubmitRating = this.SubmitRating.bind(this);

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
     return this.state.bidValue > 0 &&  this.state.bidDeadLine.length > 0
   }

  validateProduct() {
    return this.state.product.length > 0
  }


  openBidMessage = (message) => {
    this.setState({
      showBidError : true ,
      bidMessage : message
    })
  }

  closeBidError = () => {
    this.setState({ showBidError : false })
  }


  openProductMessage = (message) => {
    this.setState({
      showProductError : true ,
      productMessage : message,
    })
  }

  closeProductError = () => {
    this.setState({ showProductError : false })
  }



  submitBid = (event) => {
      if(this.state.userType !== "Developer") this.openBidMessage( "Only developers can submit bids" )
      else {
        this.placeBid(this.state.demandID, this.state.bidValue, this.state.bidDeadLine,localStorage.getItem('api_token'))
      }
      //this.openBidMessage()
      event.preventDefault();
  }

  SubmitCurrentProduct = (event) => {
      if(this.state.userType !== "Developer") this.openProductMessage("Only developers can submit products" )
      else {
        this.submitProduct(this.state.demandID, this.state.product , localStorage.getItem('api_token'))
      }
      //this.openProductMessage()
      event.preventDefault();
  }

  SubmitRating = (event) => {
      alert(this.state.rating)
      this.rateUser(localStorage.getItem('api_token'),this.state.demandID,this.state.rating, this.state.ratingReason)
        .then( response => {} )
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

         if(API_token != null){
           getAccountByApiToken(API_token)
             .then( (account) => {
               this.setState({
                 currentViewerId : account._id,
                 userType: account.userType , // 3 types Client, Developer, Super_User
                })
             })
             .catch( (error) => {
               alert("got an error with API token in demand")
               localStorage.removeItem('api_token');
             });
           }
          this.setState({
            ownerId : response.ownerId,
            content : response.content,
            title : response.title ,
            __v : response.__v,
            devChosen : response.devChosen,
            isActive :  response.isActive,
            totalBids :  response.totalBids.length > 0 ? response.totalBids.map( JSONObject => (
                   <Bidder devId = {JSONObject.devId} bidAmount = {JSONObject.bidAmount} deadline = {JSONObject.deadline} demandID = {this.state.demandID} lowestBidderID = {response.totalBids[0].devId}/>
              )) : "there are currently no bidders, be the first ! ",
            winningBid :  response.winningBid != null  ? <Bidder devId = { response.winningBid.devId} bidAmount = { response.winningBid.bidAmount} deadline = { response.winningBid.deadline}/> : null,
            winningBidID : response.winningBid != null  ? response.winningBid.devId : null,
            createdDate : convertedCreated.month + "/" + convertedCreated.day + "/" + convertedCreated.year  ,
            tags : response.tags,
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
            { this.state.totalBids }
          </DemandBodyP>

          <DemandBodyHeaders>
            Demand ID:
          </DemandBodyHeaders>
          <DemandBodyP>
            {this.state.demandID}
          </DemandBodyP>

          <DemandBodyHeaders>
            Tags :
          </DemandBodyHeaders>
          <DemandBodyP>
            {this.state.tags}
          </DemandBodyP>

          { this.state.devChosen &&
              ( <div>
                <DemandBodyHeaders>
                  Chosen Developer :
                </DemandBodyHeaders>

                <DemandBodyP>
                  {this.state.winningBid}
                </DemandBodyP>
                </div>
              )
          }



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


                <FormGroup controlId="bidDeadLine">
                   <FormControl
                       componentClass = "input"
                       type="date"
                       value ={this.state.bidDeadLine}
                       onChange = {this.handleChange}
                    />
                </FormGroup>
                    <Button block type="submit" disabled={!this.validateBid()} >
                       bid
                    </Button>

                <Modal show={this.state.showBidError} onHide={this.closeBidError}>
                  <Modal.Header closeButton>
                    <Modal.Title>Bidding Message</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p> {this.state.bidMessage} </p>
                  </Modal.Body>
                </Modal>
              </form>


        </FormContainer>

        <FormContainer>
            <form onSubmit = {this.SubmitCurrentProduct}>
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
                  { this.state.isActive && this.state.winningBidID === this.state.currentViewerId &&
                    <div>
                    <ButtonToolbar>
                       <ToggleButtonGroup type="radio" name="options"  onChange = { (event) => {this.setState({ rating : event}) } }>
                         <ToggleButton value={1}> 1 </ToggleButton>
                         <ToggleButton value={2}> 2 </ToggleButton>
                         <ToggleButton value={3}> 3 </ToggleButton>
                         <ToggleButton value={4}> 4 </ToggleButton>
                         <ToggleButton value={5}> 5 </ToggleButton>
                       </ToggleButtonGroup>
                    </ButtonToolbar>

                    <FormGroup controlId="ratingReason" bsSize = "large">
                      <ControlLabel>Create your message for your rating </ControlLabel>
                      <FormControl
                            componentClass="textarea"
                            value={this.state.ratingReason}
                            onChange={this.handleChange}
                          />

                      <Button onClick = { event => {this.SubmitRating()}} >Submit Rating</Button>
                    </FormGroup>
                    </div>
                   }

                </Modal.Body>
              </Modal>
            </form>

        </FormContainer>


              <BackButton onClick = { (event) => this.props.history.goBack()}>
                Back
              </BackButton>
        </DemandBody>
      </ContainerBG>

    );
  }
}



export default Demand;
