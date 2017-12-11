import React, { Component} from 'react';
import { Button, FormControl, FormGroup, Row,Col,Nav,NavItem,Tab} from 'react-bootstrap';
import {FormContainer} from '../../Styles/form.style'
import {Link} from 'react-router-dom';
import {getAccountByApiToken} from '../../Utils/User.js';
import {protestWarning,addFunds} from '../../Utils/auth.js';
import {getDemandbyID} from '../../Utils/Demand.js';
import { FeedContainer } from '../../Styles/feed.style';
import { AttributeHeader,Attribute} from '../../Styles/myAccount.style';


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
        convertedDate: "",
        userName : "",

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
        newFunds: 15
      }

      this.handleChange = this.handleChange.bind(this);

      this.protestWarning = protestWarning.bind(this);
      // this.addFunds = addFunds.bind(this);
      this.getAccountByApiToken = getAccountByApiToken.bind(this);
      this.getAccountInfo();
      this.getDemandbyID = getDemandbyID.bind(this);

      this.sendProtestWarning = this.sendProtestWarning.bind(this);
      this.createDemands = this.createDemands.bind(this);
      this.createMessages = this.createMessages.bind(this);

  }

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }

  convertDate = (date) => ({
      year : date.substr(0,4),
      month : date.substr(5,2) ,
      day : date.substr(8,2) ,
      hour : date.substr(11,2) ,
      minutes : date.substr(14,2) ,
      seconds : date.substr(17,2)
  })

  logout = () => {
      this.props.isTheUserSignedIn(false,"noUser");
      localStorage.removeItem('api_token');
      localStorage.removeItem('userType');
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
        .then( response => {})
  }
  getAccountInfo(){
     const API_token = this.state.api_token;
     //call our axios promise, then retrieve the token from axios
     getAccountByApiToken(API_token)
         .then( (account) => {
           const convertedCreated = this.convertDate(account.createdDate);
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
             newFunds : 0,
             convertedDate :  convertedCreated.month + "/" + convertedCreated.day + "/" + convertedCreated.year  ,
             userName : account.userName
            })
         })
         .catch( (error) => {
           localStorage.removeItem('api_token');
           this.setState({ api_token : ""});
         });
 }
 //      <h4> Alerts : {this.state.accountAlerts}</AttributeHeader>

 validateForm() {
    return this.state.newFunds > 0;
  }

  AddFunds = event => {
    // alert("State funds" + this.state.newFunds)
    addFunds(localStorage.getItem('api_token'),this.state.newFunds)
        .then( message => {
          // alert("test" + arrayOfUsers);
          // this.setState({allUsers:arrayOfUsers})
          // alert(arrayOfUsers.length)
          alert("Funds transfer requested Successfully");
        })
        .catch( (error) => {  alert("Error Adding Funds " + error);
        });

      event.preventDefault();
  }


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
               Funds
             </NavItem>
             <NavItem eventKey="sixth">
               Log Out
             </NavItem>
           </Nav>
         </Col>
         <Col sm={8}>


           <Tab.Content animation>
             <Tab.Pane eventKey="first">
                 <h4> <b>First name </b>:{this.state.firstName } </h4>
                 <h4> <b>Last name </b>: {this.state.lastName } </h4>
                 <h4> <b>User name </b>: {this.state.userName } </h4>
                 <h4> <b>Member Since </b>: {this.state.convertedDate } </h4>
                 <h4> <b>Email  </b>: {this.state.email} </h4>
                 <h4> <b>userID </b>: <Link to = {`/user/userId=${this.state.userId}`}>{this.state.userId}</Link></h4>
                 <h4> <b>Interests </b>: {this.state.interests}</h4>
                 <h4> <b>Resume </b>: {this.state.resume}</h4>
                 <h4> <b>SampleWork </b>: <a href ={`${this.state.sampleWork}`}>{this.state.sampleWork} </a> </h4>
                 <h4> <b>Funds </b>: $ {this.state.funds }</h4>
                 <h4> <b>Account Status </b>:{this.state.blacklist ? "Blacklisted"  : "OK"}</h4>

                 {this.state.warningCount>0 && alert("You have one warning !")}

                  <Button onClick = { event => this.props.history.push(`/UpdateAccount`) }> Update Account </Button>
                 {this.state.warningCount>0 && <Button onClick = {event => {this.sendProtestWarning()}}> Protest Warning ! </Button>}
             </Tab.Pane>
             <Tab.Pane eventKey="second">
                <FeedContainer>{this.state.showProjects.map( object => object)} </FeedContainer>
             </Tab.Pane>

             <Tab.Pane eventKey="third">
                <FeedContainer> {this.state.accountAlerts} </FeedContainer>
             </Tab.Pane>

             <Tab.Pane eventKey="fourth">
             <h4> <b>Rating</b>: {this.state.rating}</h4>
             <h4> <b>Rating count </b>: {this.state.ratingCount}</h4>
             </Tab.Pane>

             <Tab.Pane eventKey="fifth">
             <h4> <b>Current Account Balance</b> : $ {this.state.funds}</h4>
             <h4> <b>Add Funds</b> </h4>:


             <form onSubmit={this.handleSubmit}>
               <FormGroup controlId="newFunds" bsSize = "large">
               <FormControl
                     autoFocus
                     type="newFunds"
                     value={this.state.newFunds}
                     onChange={this.handleChange}
                   />
                   <Button
                     block
                     bsSize="large"
                     disabled={!this.validateForm()}
                     onClick={this.AddFunds}
                     type="submit"
                   >
                   Add Funds
                 </Button>
                  </FormGroup>
                </form>

             </Tab.Pane>
             <Tab.Pane eventKey="sixth" onEnter = {(evt) => this.logout()}/>

           </Tab.Content>
         </Col>
       </Row>
     </Tab.Container>

      </div>
    );
  }
}

export default MyAccount;
