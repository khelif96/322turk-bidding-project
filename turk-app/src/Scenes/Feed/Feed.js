import React, { Component } from 'react';
//import logo from './logo.svg';
import '../../Styles/App.css';
import {PanelGroup ,Panel} from 'react-bootstrap';
import { FeedContainer } from '../../Styles/feed.style';
import JobPanel from './JobPanel';
import data from '../../jobs.json';
import {retrieveJobs} from '../../Utils/auth.js';


class Feed extends Component {
  constructor(props){
      super(props);
      this.state = {
        jobs : []
      }

      this.getJobs = this.getJobs.bind(this)
      this.retrieveJobs = retrieveJobs.bind(this);

  }

  createPanel(job){
      return  (<JobPanel title = {job.title} posterID = {job.posterId} createdDate = {job.createdDate} description = {job.description}/>);
  }

  getJobs(){
    this.retrieveJobs()
        .then( arrayOfJobs => {
          let tempArray = []
          for(var i = 0; i < arrayOfJobs.length; i++)  tempArray.push(this.createPanel(arrayOfJobs[i]));
          this.setState({jobs : tempArray})
        })
        .catch( (error) => {  alert("Error " + error);
        });
  }
  render() {
    this.getJobs();
    return (
      <FeedContainer>
          <PanelGroup>
          {this.state.jobs}
          </PanelGroup>

      </FeedContainer>
    );
  }
}

export default Feed;
