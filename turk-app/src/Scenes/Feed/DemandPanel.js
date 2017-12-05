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


class DemandPanel extends Component {

  constructor(props){
      super(props);
      this.state = {
        bidderIds : this.props.demand.bidderIds,
        createdDate : this.props.demand.createdDate,
        isActive : this.props.demand.isActive,
        title : this.props.demand.title,
        content : this.props.demand.content,
        ownerID :this.props.demand.ownerID,
        totalBids : this.props.demand.totalBids,
        winningBid : this.props.demand.winningBid,
        demandID : this.props.demand._id
      }
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
    const convertedCreated = this.convertDate(this.state.createdDate)
    const createdDate = convertedCreated.month + "/" + convertedCreated.day + "/" + convertedCreated.year
    return (
      <Panel collapsible header={ <DemandHeading>{this.state.title}</DemandHeading> } eventKey="1">
      <SectionHeadings> Created by : </SectionHeadings>
        <Organization> {this.state.demandID + " on " +  createdDate}</Organization>

      <SectionHeadings> Description : </SectionHeadings>
        <Description>{this.state.content}</Description>

      <SectionHeadings> Lowest Bidder : </SectionHeadings>


      <Link to = {`/demands/${this.state.demandID}`}><MoreDetails> More details </MoreDetails> </Link>
      </Panel>
    );
  }
}

export default DemandPanel;
