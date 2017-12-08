import React, { Component } from 'react';
import '../../Styles/App.css';
import {Link} from 'react-router-dom';
import {PanelGroup ,Panel,Button,FormControl,FormGroup, Modal} from 'react-bootstrap';

import {getAccountByID} from '../../Utils/User.js';
import Bidder from "../Bidder"
import {getDemandbyID} from '../../Utils/Demand.js';
import {verifyUser,denyUser} from '../../Utils/superUser/userModRequest'



class UserPanel extends Component {

  constructor(props){
      super(props);
      // alert("TEST " + JSON.stringify(this.props));
      this.state = {
        email: this.props.user.email,
        name: this.props.user.name.first + " " + this.props.user.name.last,
        accountType : this.props.user.userType,
        signUpDate: this.props.user.createdDate,
        userId: this.props.user._id,
        userName: this.props.user.userName,
        denyMessage : ""

      }

      this.handleChange = this.handleChange.bind(this);




  }
  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }
  validateForm() {
     return this.state.denyMessage.length > 0 ;
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


       VerifyUser = () => {
        //  alert("Running this")
        verifyUser(this.state.userId, localStorage.getItem('api_token'))
          .then((message) =>this.forceUpdate())
          .catch( (error) => alert(error))
      }

      DenyUser = () => {
        if(this.state.denyMessage !== "" || this.state.denyMessage !== undefined){
          denyUser(localStorage.getItem('api_token'),this.state.userId,this.state.denyMessage)
            .then((message) => alert(message))
            .catch((error) => alert(error))
        }else{
          alert("You must give a reason for rejection");
        }
      }

  render() {
    const convertedCreated = this.convertDate(this.state.signUpDate);
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
    return (
      <tr>
        <td>{this.state.userName}</td>
        <td>{this.state.email}</td>
        <td>{this.state.name}</td>
        <td>{this.state.accountType}</td>
        <td>{createdDate}</td>

        <td><Button bsStyle="success" onClick={this.VerifyUser}>Approve</Button></td>
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
  }
}

export default UserPanel;
