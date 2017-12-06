import React, { Component } from 'react';
import {getDemandbyID} from '../Utils/Demand.js';
import {getAccountByID} from '../Utils/User.js';
import {Button,Grid, Row,Col,Form, FormGroup, FormControl, ControlLabel,Modal} from 'react-bootstrap';
import {FormContainer} from '../Styles/form.style'

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

  constructor(props){
      super(props);
      this.state = {
        demandID : this.props.match.params.id,
        ownerId : "",
        content : "",
        title : "",
        bidderIds : [],
        __v : 0,
        devChosen : false,
        isActive : false,
        totalBids : [],
        createdDate : "",
        ownerName : "",
        showBidOption : true,
        bidValue : 0,
        showBidError : false,
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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

  bidOnDemand = () => {

  }

  validateBid() {
     return this.state.bidValue > 0
   }

  OpenPopUp = () => {
    this.setState({ showBidError : true })
  }

  closePopUp = () => {
    this.setState({ showBidError : false })
  }

  handleSubmit = (event) => {
        alert(this.state.bidValue)
        this.OpenPopUp();
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
        this.setState({
          ownerId : response.ownerId,
          content : response.content,
          title : response.title ,
          bidderIds : response.bidderIds,
          __v : response.__v,
          devChosen : response.devChosen,
          isActive :  response.isActive,
          totalBids :  response.totalBids,
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
            Description
          </DemandBodyHeaders>
          <DemandBodyP>
            {this.state.content}
          </DemandBodyP>

          <DemandBodyHeaders>
            Bidders:
          </DemandBodyHeaders>
          <DemandBodyP>
            {this.state.bidderIds}
          </DemandBodyP>

          <DemandBodyHeaders>
            Demand ID:
          </DemandBodyHeaders>
          <DemandBodyP>
            {this.state.demandID}
          </DemandBodyP>

        <FormContainer>
              <form onSubmit = {this.handleSubmit}>
                <FormGroup controlId="bidValue">
                   <FormControl
                       autoFocus
                       type="bidValue"
                       placeholder="Bid Amount"
                       value ={this.state.bidValue}
                       onChange = {this.handleChange}
                    />
                </FormGroup>
                    <Button block type="submit" disabled={!this.validateBid()} >
                       bid
                    </Button>

                <Modal show={this.state.showBidError} onHide={this.closePopUp}>
                  <Modal.Header closeButton>
                    <Modal.Title>Login Error</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p> You dont have enough money to bid that amount on this project, please enter another price </p>
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
