import React, { Component } from 'react';
import '../../Styles/App.css';
import {PanelGroup ,Panel} from 'react-bootstrap';
import { JobHeading,FeedContainer,Organization,DatePosted,Description,Title } from '../../Styles/list.style'; 


class JobTitle extends Component {

  constructor(props){
      super(props);
  }

  render() {
    console.log( " job title from panel is : " + this.props.title)
    return (
      <div>
        <Title>{this.props.title}</Title>
        <Organization>{this.props.posterID} </Organization>
      </div>
    );
  }
}

export default JobTitle;
