import React, { Component} from 'react';

import {getAccountByApiToken} from '../../Utils/User.js';
import '../../Styles/App.css';
import AlertMessage from './AlertMessage'

class MyAccount extends Component {
  constructor(props){
      super(props);
      this.state = {
        api_token : localStorage.getItem('api_token'),
        _id: "",
        userType : "",
        email : "",
        __v : "",
        accountAlerts : "",
        accountApproved : false,
        projects : [],
        createdDate : "",
      }

      this.getAccountByApiToken = getAccountByApiToken.bind(this);
      this.getAccountInfo = this.getAccountInfo.bind(this);
      this.getAccountInfo();
  }

  getAccountInfo(){
     const API_token = this.state.api_token;
     //call our axios promise, then retrieve the token from axios
     getAccountByApiToken(API_token)
         .then( (account) => {
           console.log(account);
           console.log(account.accountAlerts);
           this.setState({
               _id: account._id,
               userType : account.userType,
               email : account.email,
               __v : account.__v,
               accountApproved : account.accountApproved,
               createdDate : account.createdDate,
               projects : account.projects,
               accountAlerts : account.accountAlerts.map( JSONObject => (
                    <AlertMessage message = {JSONObject.message}/>
               ))
            })
         })
         .catch( (error) => { localStorage.setItem('api_token',"");
           this.setState({ api_token : ""});
           alert("Error from : myAccount page" + error);
         });
 }
  render() {
    return(
      <div>
      <h1> {this.state.api_token}</h1>
      <h1> {this.state._id}</h1>
      <h1> {this.state.userType}</h1>
      <h1> {this.state.email}</h1>
      <h1> {this.state.__v}</h1>
      <h1> {this.state.accountApproved}</h1>
      <h1> {this.state.projects}</h1>
      <h1> {this.state.createdDate}</h1>
      <h1> {this.state.accountAlerts[0]}</h1>
      </div>
    );
  }
}

export default MyAccount;
