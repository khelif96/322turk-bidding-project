import React, { Component} from 'react';
import { Button, Row,Col,Nav,NavItem,Tab} from 'react-bootstrap';
import {getAccountByApiToken,getAccountByID} from '../../Utils/User.js';
import {getDemandbyID} from '../../Utils/Demand.js';
import { FeedContainer } from '../../Styles/feed.style';
import '../../Styles/App.css';
import AlertMessage from './AlertMessage'
import DemandPanel from '../Feed/DemandPanel';

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
           //console.log(UserID);
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
            })
         })
         .catch( (error) => { localStorage.removeItem('api_token');
           alert("Error from : myAccount page" + error);
         });


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

               </Tab.Pane>
               <Tab.Pane eventKey="second">
                  <FeedContainer>{this.state.showProjects.map( object => object)} </FeedContainer>
               </Tab.Pane>

               <Tab.Pane eventKey="fourth">
               <h4> rating : {this.state.rating}</h4>
               <h4> rating count : {this.state.ratingCount}</h4>
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
