import React, { Component } from 'react';
import '../Styles/App.css';
import {retrieveDemands} from '../Utils/auth.js';
import DemandTitle from './Feed/DemandTitle';
import data from '../jobs.json';

class PostList extends Component {
  constructor(props){
    super(props);
    this.state = {
      jobs : []
    }

    this.getDemands = this.getDemands.bind(this)
    this.retrieveDemands = retrieveDemands.bind(this);

}

createPanel(job){
    return  (<DemandTitle title = {job.title} posterID = {job.posterId} createdDate = {job.createdDate} description = {job.description}/>);
}

getDemands(){
  this.retrieveDemands()
      .then( arrayOfJobs => {
        let tempArray = []
        for(var i = 0; i < arrayOfJobs.length; i++)  tempArray.push(this.createPanel(arrayOfJobs[i]));
        this.setState({jobs : tempArray})
      })
      .catch( (error) => {  alert("Error " + error);
      });
}
render() {
  this.getDemands();
  return (

    <a href = "/PostPage">
        {this.state.jobs}
    </a>
    );
  }
}

export default PostList;
