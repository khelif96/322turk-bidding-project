import React, { Component} from 'react';
import { Button, Row,Col,Nav,NavItem,Tab} from 'react-bootstrap';
import {getAccountByApiToken} from '../../Utils/User.js';
import {protestWarning} from '../../Utils/auth.js';
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
      this.protestWarning = protestWarning.bind(this);
      this.getAccountByApiToken = getAccountByApiToken.bind(this);
      this.getAccountInfo();
      this.getDemandbyID = getDemandbyID.bind(this);

      this.sendProtestWarning = this.sendProtestWarning.bind(this);
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

  sendProtestWarning = (event) => {
      this.protestWarning(this.state.api_token)
        .then( response => alert(JSON.stringify(response)))
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
             accountAlerts : account.accountAlerts.map( messages => {
               alert(JSON.stringify(messages))

             } ),

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

    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
       <Row className="clearfix">
         <Col sm={4}>
           <Nav bsStyle="pills" stacked>
             <NavItem eventKey="first">
               User Info
             </NavItem>
             <NavItem eventKey="second">
               Projects
             </NavItem>
             <NavItem eventKey="third">
               Messages
             </NavItem>
             <NavItem eventKey="fourth">
               Ratings
             </NavItem>
             <NavItem eventKey="fifth">
               Log Out
             </NavItem>
           </Nav>
         </Col>
         <Col sm={8}>


           <Tab.Content animation>
             <Tab.Pane eventKey="first">
                 <h4> first name :{this.state.firstName } </h4>
                 <h4> last name : {this.state.lastName } </h4>
                 <h4> created date : {this.state.createdDate } </h4>
                 <h4> email  : {this.state.email} </h4>
                 <h4> userdID : {this.state.userId}</h4>
                 <h4> interest : {this.state.interests}</h4>
                 <h4> funds : {this.state.funds }</h4>
                 <h4> blacklist :{this.state.blacklist ? "blacklisted"  : "not black listed"}</h4>
                 {this.state.warningCount>0 && alert("You have one warning !")}

                 {this.state.warningCount>0 && <Button onClick = {event => {this.sendProtestWarning()}}> Protest Warning ! </Button>}
             </Tab.Pane>
             <Tab.Pane eventKey="second">
                <FeedContainer>{this.state.showProjects.map( object => object)} </FeedContainer>
             </Tab.Pane>

             <Tab.Pane eventKey="third">
                <FeedContainer> {this.state.accountAlerts} </FeedContainer>
             </Tab.Pane>

             <Tab.Pane eventKey="fourth">
             <h4> rating : {this.state.rating}</h4>
             <h4> rating count : {this.state.ratingCount}</h4>
             </Tab.Pane>

             <Tab.Pane eventKey="fifth" onEnter = {(evt) => this.logout()}/>
           </Tab.Content>
         </Col>
       </Row>
     </Tab.Container>

      </div>
    );
  }
}

export default MyAccount;
