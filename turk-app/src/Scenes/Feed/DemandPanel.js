import React, { Component } from 'react';
import '../../Styles/App.css';
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
import {getAccountByID} from '../../Utils/User.js';
import Bidder from "../Bidder"
import {getDemandbyID} from '../../Utils/Demand.js';



class DemandPanel extends Component {

  constructor(props){
      super(props);
      this.state = {
        bidderIds : this.props.demand.bidderIds,
        createdDate : this.props.demand.createdDate,
        isActive : this.props.demand.isActive,
        title : this.props.demand.title,
        content : this.props.demand.content,
        ownerID :this.props.demand.ownerId,
        totalBids : this.props.demand.totalBids,
        winningBid : "",
        demandID : this.props.demand._id,
        ownerName : "",
      }

      this.getAccountByID = getAccountByID.bind(this);
      this.getDemandbyID = getDemandbyID.bind(this);
      this.convertName(this.state.ownerID)


  }
  convertDate = (date) => ({
      year : date.substr(0,4),
      month : date.substr(5,2) ,
      day : date.substr(8,2) ,
      hour : date.substr(11,2) ,
      minutes : date.substr(14,2) ,
      seconds : date.substr(17,2)
  })

  convertName = (ownerId) => {
    getAccountByID(ownerId)
        .then( (clientName) => { this.setState({
            ownerName : clientName.name.first + " " + clientName.name.last
          })
        })
        .catch( (error) => {
          alert("Error from : demand panel page" + error);
    });

    /*getDemandbyID(this.state.demandID)
        .then( (response) =>{
          this.setState({
              winningBid : response.winningBid.deadline
          })
        })
        .catch( (error) => {alert("Error from : demand panel page" + error);} )*/
  }


  render() {
    const convertedCreated = this.convertDate(this.state.createdDate);
    const createdDate = convertedCreated.month + "/" + convertedCreated.day + "/" + convertedCreated.year
    return (
      <Panel collapsible header={ <DemandHeading>{this.state.title}</DemandHeading> } eventKey="1">
      <SectionHeadings> Created by : </SectionHeadings>
        <Organization>  <Link to = {`/user/userId=${this.state.ownerID}`}>{this.state.ownerName + " on " +  createdDate} </Link></Organization>

      <SectionHeadings> Description : </SectionHeadings>
        <Description>{this.state.content}</Description>

      <SectionHeadings> Is Active: </SectionHeadings>
      <Description>{ this.state.isActive ? "is active" : "is not active"}</Description>


      <Link to = {`/demands/${this.state.demandID}`}><MoreDetails> More details </MoreDetails> </Link>
      </Panel>
    );
  }
}

export default DemandPanel;
