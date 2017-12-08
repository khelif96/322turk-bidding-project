import React, { Component} from 'react';
import { Button } from 'react-bootstrap';
import {getAccountByApiToken} from '../../Utils/User.js';
import {getDemandbyID} from '../../Utils/Demand.js';
import { FeedContainer } from '../../Styles/feed.style';
import { Page,PageContainer} from '../../Styles/myAccount.style';


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
        showAlerts : [],


        rating: "",
        ratingCount: "",
        ratingGiven: "",
        ratingGivenCount: "",
        ratingRecieved: "",
        ratingRecievedCount: "",

        warningCount : 0,
        blacklist : false,
        userType: "", // 3 types Client, Developer, Super_User
        funds : 0,
        tags : "",
      }

      this.getAccountByApiToken = getAccountByApiToken.bind(this);
      this.getAccountInfo();
      this.getDemandbyID = getDemandbyID.bind(this);

      this.createDemands = this.createDemands.bind(this);
      this.createMessages = this.createMessages.bind(this);



  }

  logout = () => {
      this.props.isTheUserSignedIn(false,"noUser");
      localStorage.removeItem('api_token');
      localStorage.setItem('userType',"");
      this.props.history.push('/')
  }

  createDemands(demand){
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

  createMessages(message){
      if(message != null){
        return <AlertMessage message = {message} />
      }

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
             projects: account.projects.map( demandID => {this.createDemands(demandID)}),
             accountApproved: account.accountApproved ,
             rating: account.rating ,
             ratingCount: account.ratingCount ,
             ratingGiven: account.ratingGiven,
             ratingGivenCount: account.ratingGivenCount,
             ratingRecieved: account.ratingRecieved,
             ratingRecievedCount: account.ratingRecievedCount,
             warningCount : account.warningCount ,
             blacklist : account.blacklist ,
             userType: account.userType , // 3 types Client, Developer, Super_User
             funds : account.funds,
             tags : account.tags,
             accountAlerts : account.accountAlerts.map( messages => <AlertMessage message = {messages} />  ),

            })
         })
         .catch( (error) => {
           localStorage.removeItem('api_token');
           this.setState({ api_token : ""});
         });
 }
 //      <h4> Alerts : {this.state.accountAlerts}</h4>

  render() {
    return(
      <div>

    <PageContainer defaultActiveKey={2} id="uncontrolled-tab-example">
       <Page eventKey={1} title="User Info">
           <h4> first name :{this.state.firstName } </h4>
           <h4> last name : {this.state.lastName } </h4>
           <h4> created date : {this.state.createdDate } </h4>
           <h4> email  : {this.state.email} </h4>
           <h4> userdID : {this.state.userId}</h4>
           <h4> resume  : {this.state.resume }</h4>
           <h4> interest : {this.state.interests}</h4>
           <h4> sample work : {this.state.sampleWork}</h4>
           <h4> funds : {this.state.funds }</h4>
           <h4> blacklist :{this.state.blacklist ? "blacklisted"  : "not black listed"}</h4>
           <h4> funds : {this.state.funds }</h4>

       </Page>
       <Page eventKey={2} title="Projects">
          <FeedContainer>{this.state.showProjects.map( object => object)} </FeedContainer>
       </Page>
       <Page eventKey={3} title="Messages" >
         <FeedContainer> {this.state.accountAlerts} </FeedContainer>
       </Page>

       <Page eventKey={4} title="Ratings" >
         <h4> rating : {this.state.rating}</h4>
         <h4> rating count : {this.state.ratingCount}</h4>
       </Page>

       <Page eventKey={5} title="Log Out" onEnter = {(evt) => this.logout()}/>


    </PageContainer>
      </div>
    );
  }
}

export default MyAccount;
