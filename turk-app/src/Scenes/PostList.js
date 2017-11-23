import React, { Component } from 'react';
import '../Styles/App.css';
import {retrieveJobs} from '../Utils/auth.js';
import JobTitle from './Feed/JobTitle';
import data from '../jobs.json';

class PostList extends Component {
  constructor(props){
    super(props);
    this.state = {
      jobs : []
    }

    this.getJobs = this.getJobs.bind(this)
    this.retrieveJobs = retrieveJobs.bind(this);

}

createPanel(job){
    return  (<JobTitle title = {job.title} posterID = {job.posterId} createdDate = {job.createdDate} description = {job.description}/>);
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
   
    <a href = "/PostPage"> 
        {this.state.jobs}
    </a>
    );
  }
}

export default PostList;