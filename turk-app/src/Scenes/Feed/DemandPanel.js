import React, { Component } from 'react';
import '../../Styles/App.css';
import {Link} from 'react-router-dom';
import {PanelGroup ,Panel} from 'react-bootstrap';
import { DemandHeading,FeedContainer,Organization,DatePosted,Description } from '../../Styles/feed.style';


class DemandPanel extends Component {

  constructor(props){
      super(props);
  }

  render() {
    return (
      <Panel collapsible header={ <DemandHeading>{this.props.title}</DemandHeading> } eventKey="1">
        <DatePosted> {this.props.demandID}</DatePosted>
        <Description>{this.props.content}</Description>
        <Link to = {`/demands/${this.props.demandID}`}><div> More details </div> </Link>
      </Panel>
    );
  }
}

export default DemandPanel;
