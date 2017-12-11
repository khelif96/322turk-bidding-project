import React, { Component } from 'react';
import '../../Styles/App.css';
import {Link} from 'react-router-dom';
import {PanelGroup ,Panel,Button,FormControl,FormGroup, Modal} from 'react-bootstrap';

import {getAccountByID} from '../../Utils/User.js';
import Bidder from "../Bidder"
import {getDemandbyID} from '../../Utils/Demand.js';
import {approveTransactionFunds,approveTransactionPayment} from '../../Utils/superUser/userModRequest'



class TransactionPanel extends Component {

  constructor(props){
      super(props);
      // alert(JSON.stringify(this.props))
      this.state = {
        Amount: this.props.user.amount,
        createdDate: this.props.user.createdDate,
        origin_id: this.props.user.origin_id,
        destination_id: this.props.user.destination_id,
        transactionType: this.props.user.transactionType,
        transactionId: this.props.user._id,
        denyMessage : "",
        message: this.props.user.message,
        rating: this.props.user.rating,
        newRating: this.props.user.rating

      }

      this.handleChange = this.handleChange.bind(this);
      // this.approveTransactionFunds = this.approveTransactionFunds.bind(this);



  }
  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }
  validateForm() {
     return (this.state.denyMessage.length > 0 );
   }
   OpenPopUp = (message) => {
     this.setState({ showError : true, errorMessage : message })
   }

   closePopUp = () => {
     this.setState({ showError : false })
   }

  convertDate = (date) => ({
      year : date.substr(0,4),
      month : date.substr(5,2) ,
      day : date.substr(8,2) ,
      hour : date.substr(11,2) ,
      minutes : date.substr(14,2) ,
      seconds : date.substr(17,2)
  })




    /*getDemandbyID(this.state.demandID)
        .then( (response) =>{
          this.setState({
              winningBid : response.winningBid.deadline
          })
        })
        .catch( (error) => {alert("Error from : demand panel page" + error);} )*/


       approveTransactionFunds = () => {
        //  alert("Running this")
        approveTransactionFunds(this.state.transactionId, localStorage.getItem('api_token'))
          .then((message) =>alert(message.message))
          .catch( (error) => alert(error))
      }
      approveTransactionPayment = () => {
        // alert("Running this")
       approveTransactionPayment(this.state.transactionId, localStorage.getItem('api_token'), this.state.denyMessage, this.state.Amount,this.state.newRating)
         .then((message) =>alert(message.message))
         .catch( (error) => alert(error))
     }
      //
      // DenyUser = () => {
      //   if(this.state.denyMessage !== "" || this.state.denyMessage !== undefined){
      //     denyUser(localStorage.getItem('api_token'),this.state.userId,this.state.denyMessage)
      //       .then((message) => alert(message))
      //       .catch((error) => alert(error))
      //   }else{
      //     alert("You must give a reason for rejection");
      //   }
      // }

  render() {
    const convertedCreated = this.convertDate(this.state.createdDate);
    const createdDate = convertedCreated.month + "/" + convertedCreated.day + "/" + convertedCreated.year


    // modal = (props) => {
    //   return(
    //   <Modal show={this.state.showError} onHide={this.closePopUp}>
    //             <Modal.Header closeButton>
    //               <Modal.Title>Login Error</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //               <p> {this.state.errorMessage}  </p>
    //             </Modal.Body>
    //   </Modal>
    // )
    // }

    if(this.state.transactionType == "Payments"){
        return (
      <tr>
        <td>{createdDate}</td>
        <td><Link to = {`/demands/${this.state.origin_id}`}>{this.state.origin_id}</Link></td>
        <td><Link to = {`/user/userId=${this.state.destination_id}`}>{this.state.destination_id}</Link></td>
        <td>{this.state.Amount}</td>
        <td>{this.state.transactionType}</td>
        <td><Button bsStyle="success" onClick={this.approveTransactionPayment} disabled={!this.validateForm()}>Approve</Button></td>
        <td><FormGroup controlId="newRating" bsSize = "large">
          <FormControl
            type="newRating"
            value={this.state.newRating}
            placeholder="Enter Rating"
            onChange={this.handleChange}
          />
          </FormGroup>
          <Button bsStyle="danger" onClick={this.DenyUser} disabled={!this.validateForm()}
>Decline</Button></td>
        <td>
        <FormGroup controlId="denyMessage" bsSize = "large">
          <FormControl
            type="denyMessage"
            value={this.state.denyMessage}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          </FormGroup></td>
          <td><b>Messages</b> : {this.state.message}<br/>
              <b>Rating</b> : {this.state.rating}</td>


      </tr>
    );
  }else if(this.state.transactionType == "AddFunds"){
    return (
  <tr>
    <td>{createdDate}</td>
    <td><Link to = {`/user/userId=${this.state.origin_id}`}>{this.state.origin_id}</Link></td>
    <td><Link to = {`/user/userId=${this.state.destination_id}`}>{this.state.destination_id}</Link></td>
    <td>{this.state.Amount}</td>
    <td>{this.state.transactionType}</td>
    <td><Button bsStyle="success" onClick={this.approveTransactionFunds}>Approve</Button></td>
    <td><Button bsStyle="danger" onClick={this.DenyUser} disabled={!this.validateForm()}
>Decline</Button></td>
    <td>
    <FormGroup controlId="denyMessage" bsSize = "large">
      <FormControl
        type="denyMessage"
        value={this.state.denyMessage}
        placeholder="Enter text"
        onChange={this.handleChange}
      />
      </FormGroup></td>


  </tr>
);
  }else{
    {
      return (
    <tr>
      <td>{createdDate}</td>
      <td><Link to = {`/user/userId=${this.state.origin_id}`}>{this.state.origin_id}</Link></td>
      <td><Link to = {`/user/userId=${this.state.destination_id}`}>{this.state.destination_id}</Link></td>
      <td>{this.state.Amount}</td>
      <td>{this.state.transactionType}</td>
      <td><Button bsStyle="success" onClick={this.approveTransactionFunds}>Approve</Button></td>
      <td><Button bsStyle="danger" onClick={this.DenyUser} disabled={!this.validateForm()}
  >Decline</Button></td>
      <td>
      <FormGroup controlId="denyMessage" bsSize = "large">
        <FormControl
          type="denyMessage"
          value={this.state.denyMessage}
          placeholder="Enter text"
          onChange={this.handleChange}
        />
        </FormGroup></td>
        <td><b>Messages</b> : {this.state.message}<br/>
            <b>Rating</b> : {this.state.rating}</td>



    </tr>
  );
}
  }
  }
}

export default TransactionPanel;
