import React, { Component} from 'react';
import { Button } from 'react-bootstrap';
import {getAccountByApiToken} from '../../Utils/User.js';
import {getDemandbyID} from '../../Utils/Demand.js';
import { FeedContainer } from '../../Styles/feed.style';

import '../../Styles/App.css';
import AlertMessage from './AlertMessage'
import DemandPanel from '../Feed/DemandPanel';


class MyAccount extends Component {
  constructor(props){
      super(props);
      this.state = {
        api_token : localStorage.getItem('api_token'),
        firstName : "",
        lastName : "",
        createdDate : "",
        email: "",
        userId: "",
        password_hash: "",
        profileImage : "",
        resume : "",
        interests: "",
        sampleWork: "",
        projects: [],
        showProjects : [],
        accountApproved: false,
        accountAlerts : [],
        rating: 0,
        ratingCount: 0,
        badRatingGiven: 0,
        badRatingRecieved: 0,
        warningCount : 0,
        blacklist : false,
        userType: "", // 3 types Client, Developer, Super_User
        funds : 0
      }

      this.getAccountByApiToken = getAccountByApiToken.bind(this);
      this.getAccountInfo();
      this.getDemandbyID = getDemandbyID.bind(this);

      this.createPanel = this.createPanel.bind(this);


  }

  logout = () => {
      this.props.isTheUserSignedIn(false,"noUser");
      localStorage.removeItem('api_token');
      localStorage.setItem('userType',"");
      this.props.history.push('/')
  }

  createPanel(demand){
    this.getDemandbyID(demand)
      .then( (response) => {
        if(response != null){
          let tempArray = this.state.showProjects
          tempArray.push(<DemandPanel demand = {response} /> )
          this.setState({
            showProjects : tempArray
          })
        }
      })
  }

  getAccountInfo(){
     const API_token = this.state.api_token;
     //call our axios promise, then retrieve the token from axios
     getAccountByApiToken(API_token)
         .then( (account) => {
           this.setState({
             api_token : localStorage.getItem('api_token'),
             firstName : account.name.first ,
             lastName : account.name.last ,
             createdDate : account.createdDate ,
             email: account.email ,
             userId: account._id ,
             password_hash: account.password_hash ,
             profileImage : account.profileImage ,
             resume : account.resume ,
             interests: account.interests ,
             sampleWork: account.sampleWork ,
             projects: account.projects.map( demandID => {this.createPanel(demandID)}),
             accountApproved: account.accountApproved ,
             rating: account.rating ,
             ratingCount: account.ratingCount ,
             badRatingGiven: account.badRatingGiven ,
             badRatingRecieved: account.badRatingRecieved ,
             warningCount : account.warningCount ,
             blacklist : account.blacklist ,
             userType: account.userType , // 3 types Client, Developer, Super_User
             funds : account.funds,
             accountAlerts : account.accountAlerts.map( JSONObject => (
                    <AlertMessage message = {JSONObject.message}/>
               )),

            })
         })
         .catch( (error) => {
           alert("got an error with API token")
           localStorage.removeItem('api_token');
           this.setState({ api_token : ""});
         });
 }
  render() {
    return(
      <div>
        THIS IS THE MY ACCOUNT PAGE



      <h1> api: {this.state.api_token } </h1>
      <h1> first name :{this.state.firstName } </h1>
      <h1> last name : {this.state.lastName } </h1>
      <h1> created date : {this.state.createdDate } </h1>
      <h1> email  : {this.state.email} </h1>
      <h1> userdID : {this.state.userId}</h1>
      <h1> password hash : {this.state.password_hash}</h1>
      <h1> profile image : {this.state.profileImage }</h1>
      <h1> resume  : {this.state.resume }</h1>
      <h1> interest : {this.state.interests}</h1>
      <h1> sample work : {this.state.sampleWork}</h1>
      <h1> project : <FeedContainer>{this.state.showProjects.map( object => object)} </FeedContainer></h1>
      <h1> account approved : {this.state.accountApproved ? "approved" : "not approved"}</h1>
      <h1> account alerts : {this.state.accountAlerts }</h1>
      <h1> rating : {this.state.rating}</h1>
      <h1> rating count : {this.state.ratingCount}</h1>
      <h1> bad rating given: {this.state.badRatingGiven}</h1>
      <h1> badRatingRecieved : {this.state.badRatingRecieved}</h1>
      <h1> warning count : {this.state.warningCount }</h1>
      <h1> blacklist :{this.state.blacklist ? "blacklisted"  : "not black listed"}</h1>
      <h1> usertype : {this.state.userType}</h1>
      <h1> funds : {this.state.funds }</h1>

      <Button onClick = { (evt) => this.logout()}> Log out </Button>
      </div>
    );
  }
}

export default MyAccount;
