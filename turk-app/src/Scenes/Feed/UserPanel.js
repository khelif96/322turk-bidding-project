import React, { Component } from 'react';
import '../../Styles/App.css';
import {getAccountByID} from '../../Utils/User.js';
import {getDemandbyID} from '../../Utils/Demand.js';
import {Link} from 'react-router-dom';
import {PanelGroup ,Panel} from 'react-bootstrap';
import { DemandHeading,
         FeedContainer,
         Organization,
         DatePosted,
         Description,
         SectionHeadings,
         MoreDetails
      } from '../../Styles/feed.style';
import DemandPanel from '../Feed/DemandPanel';



class UserPanel extends Component {
  constructor(props){
      super(props);
      this.state = {
        rating : "",
        devId : this.props.user._id,
        name : "",
        interests : [],
        ratingCount : "",
        userType : "",
        createdDate : "",
        mostRecentProject : "",

      }

      this.getDemandbyID = getDemandbyID.bind(this);
      this.getAccountByID = getAccountByID.bind(this);
      this.displayContent = this.displayContent.bind(this);

      this.displayContent()
  }

  convertDate = (date) => ({
      year : date.substr(0,4),
      month : date.substr(5,2) ,
      day : date.substr(8,2) ,
      hour : date.substr(11,2) ,
      minutes : date.substr(14,2) ,
      seconds : date.substr(17,2)
  })

  displayContent = () => {
    getAccountByID(this.state.devId)
        .then( (user) => {
          this.setState({
            rating : user.rating,
            name : user.name.first + " " + user.name.last,
            interests : user.interests,
            ratingCount : user.ratingCount,
            userType :  user.userType,
            createdDate :  user.createdDate,
          })
          this.getDemandbyID(user.projects[user.projects.length-1])
            .then( (response) => {
              if(response != null){
                this.setState({
                  mostRecentProject :( <DemandPanel demand = {response} />)
                })
              }
            })
        })
        .catch( (error) => {
          alert(error +  "Error from : bidder");
        });
  }

  render() {
    const convertedCreated = this.convertDate(this.state.createdDate);
    const createdDate = convertedCreated.month + "/" + convertedCreated.day + "/" + convertedCreated.year
    return (
      <Panel collapsible header={ <DemandHeading>{this.state.name}</DemandHeading> } eventKey="1">

        <SectionHeadings> Joined on : {createdDate} </SectionHeadings>

        <SectionHeadings> Rating :  {this.state.rating}</SectionHeadings>

        <SectionHeadings> Interests:</SectionHeadings>
          <Description>{this.state.interests}</Description>

        <SectionHeadings> Newest Project:  </SectionHeadings>
          <Description>{this.state.mostRecentProject}</Description>


        <Link to = {`/user/userId=${this.state.devId}`}><MoreDetails> More detail </MoreDetails> </Link>
      </Panel>
    );
  }
}

export default UserPanel;
