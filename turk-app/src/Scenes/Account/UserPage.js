import React, { Component} from 'react';
import { Button } from 'react-bootstrap';
import {getAccountByApiToken} from '../../Utils/User.js';
import '../../Styles/App.css';
import AlertMessage from './AlertMessage'

class UserPage extends Component {
  constructor(props){
      super(props);
      this.state = {
        firstName : "",
        lastName : "",
        email: "",
        userId:  this.props.match.params.id,
        profileImage : "",
        resume : "",
        interests: "",
        sampleWork: "",
        projects: [],
        rating: 0,
        ratingCount: 0,
        badRatingGiven: 0,
        badRatingRecieved: 0,
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
             firstName : account.firstName ,
             lastName : account.lastName ,
             email: account.email ,
             userId: account.userId ,
             profileImage : account.profileImage ,
             resume : account.resume ,
             interests: account.interests ,
             sampleWork: account.sampleWork ,
             projects: account.projects ,
             rating: account.rating ,
             ratingCount: account.ratingCount ,
             badRatingGiven: account.badRatingGiven ,
             badRatingRecieved: account.badRatingRecieved ,
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

      <h1> first name :{this.state.firstName } </h1>
      <h1> last name : {this.state.lastName } </h1>
      <h1> email  : {this.state.email} </h1>
      <h1> userdID : {this.state.userId}</h1>
      <h1> profile image : {this.state.profileImage }</h1>
      <h1> resume  : {this.state.resume }</h1>
      <h1> interest : {this.state.interests}</h1>
      <h1> sample work : {this.state.sampleWork}</h1>
      <h1> project : {this.state.projects}</h1>
      <h1> rating : {this.state.rating}</h1>
      <h1> rating count : {this.state.ratingCount}</h1>
      <h1> bad rating given: {this.state.badRatingGiven}</h1>
      <h1> badRatingRecieved : {this.state.badRatingRecieved}</h1>

      </div>
    );
  }
}

export default UserPage;
