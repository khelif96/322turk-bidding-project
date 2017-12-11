import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import { Button, Row,Col,Nav,NavItem,Tab} from 'react-bootstrap';

import {getAccountByApiToken,getAccountByID} from '../../Utils/User.js';
import {getDemandbyID} from '../../Utils/Demand.js';
import { FeedContainer } from '../../Styles/feed.style';
import '../../Styles/App.css';
import AlertMessage from './AlertMessage'
import DemandPanel from '../Feed/DemandPanel';
import { AttributeHeader,Attribute,CustomNavItem,CustomNav} from '../../Styles/myAccount.style';


class UserPage extends Component {
  constructor(props){
      super(props);
      this.state = {
        firstName : "",
        lastName : "",
        email: "",
        userId:  this.props.match.params.userId,
        profileImage : "",
        resume : "",
        interests: "",
        sampleWork: "",
        projects: [],
        showProjects : [],
        rating: "",
        ratingCount: "",
        ratingGiven: "",
        ratingGivenCount: "",
        ratingRecieved: "",
        ratingRecievedCount: "",
        badRatingGiven: 0,
        badRatingRecieved: 0,
        tags : [],
        funds : 0,
        createdDate : "",
        convertedDate : "",
      }

      this.getAccountByID = getAccountByID.bind(this);
      this.getDemandbyID = getDemandbyID.bind(this);

      this.getAccountInfo = this.getAccountInfo.bind(this);
      this.createPanel = this.createPanel.bind(this);
      this.getAccountInfo();
  }
  convertDate = (date) => ({
      year : date.substr(0,4),
      month : date.substr(5,2) ,
      day : date.substr(8,2) ,
      hour : date.substr(11,2) ,
      minutes : date.substr(14,2) ,
      seconds : date.substr(17,2)
  })

  createPanel(demand){
    let demandPanel = ""
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
      //return  (<DemandPanel demand = {demand} />);
  }

  getAccountInfo(){
     const UserID = this.state.userId;
     //call our axios promise, then retrieve the token from axios
     getAccountByID(UserID)
         .then( (account) => {
           const convertedCreated = this.convertDate(account.createdDate);
           this.setState({
             firstName : account.name.first ,
             lastName : account.name.last ,
             email: account.email ,
             userId: account._id ,
             profileImage : account.profileImage ,
             resume : account.resume ,
             interests: account.interests ,
             sampleWork: account.sampleWork ,
             projects: account.projects.map( demandID => { this.createPanel(demandID )} ),
             rating: account.rating ,
             ratingCount: account.ratingCount ,
             ratingGiven: account.ratingGiven,
             ratingGivenCount: account.ratingGivenCount,
             ratingRecieved: account.ratingRecieved,
             ratingRecievedCount: account.ratingRecievedCount,
             tags : account.tags,
             funds : account.funds,
             createdDate : account.createdDate,
             convertedDate : convertedCreated.month + "/" + convertedCreated.day + "/" + convertedCreated.year  ,
            })
         })
         .catch( (error) => { localStorage.removeItem('api_token');
           alert("Error from : myAccount page" + error);
         });


 }

 convertDate = (date) => ({
     year : date.substr(0,4),
     month : date.substr(5,2) ,
     day : date.substr(8,2) ,
     hour : date.substr(11,2) ,
     minutes : date.substr(14,2) ,
     seconds : date.substr(17,2)
 })

  render() {
    return(
      <div>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
         <Row className="clearfix">
           <Col sm={4}>
             <CustomNav bsStyle="pills" stacked>
               <CustomNavItem eventKey="first">
                 User Info
               </CustomNavItem>
               <CustomNavItem eventKey="second">
                 Projects
               </CustomNavItem>
               <CustomNavItem eventKey="fourth">
                 Ratings
               </CustomNavItem>
             </CustomNav>
           </Col>
           <Col sm={8}>


             <Tab.Content animation>
               <Tab.Pane eventKey="first">
               <h4> <b>First name </b>:{this.state.firstName } </h4>
               <h4> <b>Last name </b>: {this.state.lastName } </h4>
               <h4> <b>Member Since </b>: {this.state.createdDate } </h4>
               <h4> <b>Email  </b>: {this.state.email} </h4>
               <h4> <b>userID </b>: <Link to = {`/user/userId=${this.state.userId}`}>{this.state.userId}</Link></h4>
               <h4> <b>Interests </b>: {this.state.interests}</h4>
               <h4> <b>Funds </b>: ${this.state.funds }</h4>
               <h4> <b>Resume </b>: {this.state.resume}</h4>
               <h4> <b>Sample Work </b>: <a href ={`${this.state.sampleWork}`}>{this.state.sampleWork} </a> </h4>
               <h4> <b>Account Status </b>:{this.state.blacklist ? "Blacklisted"  : "OK"}</h4>

               </Tab.Pane>
               <Tab.Pane eventKey="second">
                  <FeedContainer>{this.state.showProjects.map( object => object)} </FeedContainer>
               </Tab.Pane>

               <Tab.Pane eventKey="fourth">
               <h4> <b>Rating</b> : {this.state.rating ? this.state.rating : "Not Rated"}</h4>
               <h4> <b>Rating Count</b> : {this.state.ratingCount}</h4>

               </Tab.Pane>

             </Tab.Content>
           </Col>
         </Row>
       </Tab.Container>

      </div>
    );
  }
}

export default UserPage;
