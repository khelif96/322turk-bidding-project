import React, { Component} from 'react';
import { Button } from 'react-bootstrap';
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
        rating: 0,
        ratingCount: 0,
        badRatingGiven: 0,
        badRatingRecieved: 0,
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
             badRatingGiven: account.badRatingGiven ,
             badRatingRecieved: account.badRatingRecieved ,
            })
         })
         .catch( (error) => { localStorage.removeItem('api_token');
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
      <h1> project : <FeedContainer>{ this.state.showProjects.map( object => object)} </FeedContainer></h1>
      <h1> rating : {this.state.rating}</h1>
      <h1> rating count : {this.state.ratingCount}</h1>
      <h1> bad rating given: {this.state.badRatingGiven}</h1>
      <h1> badRatingRecieved : {this.state.badRatingRecieved}</h1>

      </div>
    );
  }
}

export default UserPage;
