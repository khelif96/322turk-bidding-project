import React, { Component } from 'react';
import '../../Styles/App.css';
import {Link} from 'react-router-dom'
import {PanelGroup ,Panel} from 'react-bootstrap';
import { JobHeading,FeedContainer,Organization,DatePosted,Description } from '../../Styles/feed.style';


class JobPanel extends Component {

  constructor(props){
      super(props);
  }

  render() {
    console.log( " job title from panel is : " + this.props.title)
    return (
      <Panel collapsible header={ <JobHeading>{this.props.title}</JobHeading> } eventKey="1">
        <DatePosted> {this.props.createdDate}</DatePosted>
        <Description>{this.props.description}</Description>
        <Link to ={`/getPost/${this.props.posterID}`}><div> More details </div>
        </Link>
      </Panel>
    );
  }
}

export default JobPanel;
