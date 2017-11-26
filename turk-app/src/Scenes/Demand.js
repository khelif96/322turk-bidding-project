import React, { Component } from 'react';
import {getDemandbyID} from '../Utils/Demand.js';

import '../Styles/App.css';

class Demand extends Component {

  constructor(props){
      super(props);
      this.state = {
        title : "",
        content : "",
        demandID :this.props.match.params.id
      }
      this.getDemandbyID = getDemandbyID.bind(this);
      this.retrieveDemandbyID = this.retrieveDemandbyID.bind(this);
      this.retrieveDemandbyID(this.state.demandID);

  }
  retrieveDemandbyID(demandID){
    //  const Api_token = this.state.api_token;
     //call our axios promise, then retrieve the token from axios
     console.log("About to make the request to " + this.state.demandID);

     this.getDemandbyID(this.state.demandID)
         .then( opportunity => {
              this.setState(opportunity.responseState);
         })
         .catch( (error) => { localStorage.setItem('api_token',"");
           this.setState({ api_token : ""});
           alert("Error " + error);
         });

     // event.preventDefault();
 }

  render() {
    var styleVolunCard = {
      background: '#D3D3D3',
      marginLeft: 70,
      marginRight: 70,
      marginTop: 40,
      borderRadius: 8,
      boxShadow: '4px 4px 4px #D3D3D3',
      alignContent: 'center',
      paddingBottom: 15
    }
    var styleVolunCardHeader = {
      padding: 30,
      paddingBottom: 10,
      borderTopLeftRadius: 8,
      background: '#4c4c4c',
      borderTopRightRadius: 8,
      boxShadow: '2px 2px 2px gray'
    }
    var styleJobCardParagraph = {
      padding: 30
    }
    var styleBigHeader =  {
        color : 'white',
        fontSize : 40,
        textAlign : 'left'
    }
    var styleMediumHeader = {
        color: 'white',
        fontSize: 20,
        textAlign: 'left'
    }
    var styleSmallHeader = {
        color : 'black',
        fontSize : 20,
        textAlign : 'left'
    }
    var styleParagraph = {
        color : 'black',
        fontSize: 15,
        textAlign : 'left'
    }
    var styleAcceptButton = {
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
    var styleBackButton = {
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
    return (
          <div>
            title : {this.state.title}
          </div>
    );
  }
}

export default Demand;
