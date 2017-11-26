import React, { Component} from 'react';

import {getAccountByApiToken} from '../Utils/getProfile.js';
import '../Styles/App.css';

class MyAccount extends Component {


  constructor(props){
      super(props);
      this.state = {
        api_token : localStorage.getItem('api_token'),
        name: {
          first: "",
          last: ""
        },
        email: ""
      }

      // this.handleChange = this.handleChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);a
      this.getAccountByApiToken = getAccountByApiToken.bind(this);
      this.getAccountInfo = this.getAccountInfo.bind(this);
      this.getAccountInfo();

      // getAccountInfo();
  }

  getAccountInfo(){
     const Api_token = this.state.api_token;
     //call our axios promise, then retrieve the token from axios
     getAccountByApiToken(Api_token)
         .then( account => {
           this.setState({
             name : {
               first :account.name.first,
               last : account.name.last,
             },
             email: account.email
           });
         })
         .catch( (error) => { localStorage.setItem('api_token',"");
           this.setState({ api_token : ""});
           alert("Error " + error);
         });

     // event.preventDefault();
 }
  render() {
    return(
      <div>
      <h1> {this.state.api_token}</h1>
      <b> {this.state.name.first}</b>
      </div>
    );
  }
}

export default MyAccount;
