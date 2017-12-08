import React, { Component} from 'react';
import { Button, Row,Col,Nav,NavItem,Tab} from 'react-bootstrap';
import {getDevCount,getClientCount} from '../Utils/User.js';
// import { FeedContainer } from '../../Styles/feed.style';
// import '../../Styles/App.css';
// import AlertMessage from './AlertMessage'
// import DemandPanel from '../Feed/DemandPanel';

class AboutUs extends Component {
  constructor(props){
      super(props);
      this.state = {
        devCount : 0,
        clientCount : 0
      }



      // this.getAccountInfo = this.getAccountInfo.bind(this);
      this.aboutUs();
  }




  aboutUs(){
     //call our axios promise, then retrieve the token from axios
     getDevCount()
         .then( (count) => {
           //console.log(UserID);
           this.setState({
             devCount : count.userCount
            })
         })
         .catch( (error) => {
           alert("Error from : aboutUs page" + error);
         });
         getClientCount()
             .then( (count) => {
               //console.log(UserID);
               this.setState({
                 clientCount : count.userCount
                })
             })
             .catch( (error) => {
               alert("Error from : aboutUs page" + error);
             });


 }

  render() {
    return(
      <div>
        <h1> We have {this.state.devCount} Developers</h1>
        <h1> We have {this.state.clientCount} Customers</h1>



      </div>
    );
  }
}

export default AboutUs;
