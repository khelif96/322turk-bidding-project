import React, { Component} from 'react';

import {getAccountByApiToken} from '../Utils/User.js';
import '../Styles/App.css';

class MyAccount extends Component {


  constructor(props){
      super(props);
      this.state = {
        api_token : localStorage.getItem('api_token'),
        name: {
          first : "",
          last : "",
        },


      }

      this.getAccountByApiToken = getAccountByApiToken.bind(this);
      this.getAccountInfo = this.getAccountInfo.bind(this);
      this.getAccountInfo();

  }

  getAccountInfo(){
     const Api_token = this.state.api_token;
     //call our axios promise, then retrieve the token from axios
     getAccountByApiToken(Api_token)
         .then( account => console.log("account " + JSON.stringify(account)) )
         .catch( (error) => { localStorage.setItem('api_token',"");
           this.setState({ api_token : ""});
           alert("Error from : myAccount page" + error);
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
