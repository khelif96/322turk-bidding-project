import React, { Component } from 'react';
import {getDemandbyID} from '../Utils/Demand.js';

import '../Styles/App.css';

class Demand extends Component {

  constructor(props){
      super(props);
      this.state = {
        title : "sample",
        content : "sample content",
        demandID : this.props.match.params.id
      }
      this.getDemandbyID = getDemandbyID.bind(this);
      this.displayContent = this.displayContent.bind(this);
      this.displayContent();
  }


  displayContent(){
      const DemandID = this.state.demandID;
      this.getDemandbyID(DemandID)
      .then( (response) =>{
        this.setState({
          title : response.title,
          content : response.content
        })
        console.log(response)
      })

  }
  render(){
    return (
      <div>
          <div>
            id : {this.state.demandID}
          </div>
          <div>
            title : {this.state.title}
          </div>
          <div>
            content : {this.state.content}
          </div>

      </div>
    );
  }
}


  const styleVolunCard = {
    background: '#D3D3D3',
    marginLeft: 70,
    marginRight: 70,
    marginTop: 40,
    borderRadius: 8,
    boxShadow: '4px 4px 4px #D3D3D3',
    alignContent: 'center',
    paddingBottom: 15
  }
  const styleVolunCardHeader = {
    padding: 30,
    paddingBottom: 10,
    borderTopLeftRadius: 8,
    background: '#4c4c4c',
    borderTopRightRadius: 8,
    boxShadow: '2px 2px 2px gray'
  }
  const styleJobCardParagraph = {
    padding: 30
  }
  const styleBigHeader =  {
      color : 'white',
      fontSize : 40,
      textAlign : 'left'
  }
  const styleMediumHeader = {
      color: 'white',
      fontSize: 20,
      textAlign: 'left'
  }
  const styleSmallHeader = {
      color : 'black',
      fontSize : 20,
      textAlign : 'left'
  }
  const styleParagraph = {
      color : 'black',
      fontSize: 15,
      textAlign : 'left'
  }
  const styleAcceptButton = {
    background: 'orange',
    color: 'white',
    float: 'right',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5,
    border: 0,
    boxShadow: '2px 2px 2px gray',
    borderRadius: 4
  }
  const styleBackButton = {
    background: 'gray',
    color: 'white',
    float: 'right',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    marginRight: 7,
    paddingTop: 5,
    border: 0,
    boxShadow: '2px 2px 2px gray',
    borderRadius: 4
  }

export default Demand;
