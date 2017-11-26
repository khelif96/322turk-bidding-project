import React, { Component } from 'react';
import {getOpportunitybyID} from '../Utils/Opportunity.js';

import '../Styles/App.css';

class DemandPage extends Component {

  constructor(props){
      super(props);
      this.state = {
        title : "Sample Title",
        description : "No Description",
        opportunity_id :this.props.match.params.id



      }
      this.getOpportunitybyID = getOpportunitybyID.bind(this);
      this.retrieveOpportunitybyID = this.retrieveOpportunitybyID.bind(this);
      this.retrieveOpportunitybyID(this.state.opportunity_id);

  }
  retrieveOpportunitybyID(opportunity_id){
    //  const Api_token = this.state.api_token;
     //call our axios promise, then retrieve the token from axios
     console.log("About to make the request to " + this.state.opportunity_id);

     this.getOpportunitybyID(this.state.opportunity_id)
         .then( opportunity => {

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
            <div style = {styleVolunCard}>

              <div style = {styleVolunCardHeader} className="VolunCard">
                <div style = {styleBigHeader} id="VolunTitle" > <p><b>Create a Rock, Paper, Scissors game</b></p> </div>
                <div style = {styleMediumHeader} id="VolunOrgName"> <p>By:  Abraham Villaroman </p> </div>
                <div style = {styleMediumHeader} id="VolunDatePosted"> <p>Posted: November 11, 2017 at 11:45AM</p></div>
              </div>

                <div style = {styleJobCardParagraph}>
                    <div><p style = {styleParagraph}><b> Description:</b> </p></div>
                    <p style ={styleParagraph}>
                    Creates a rock paper scissor simulator that allows the user to pick between the three choices,
                    and the computer randomly picks the opposing decision and shows the probability of creating
                    each outcome based on your decision
                    </p>

                    <br></br>

                    <p style = {styleParagraph}><b> Requirements:</b> </p>
                    <p style ={styleParagraph}>
                      Knowledge in Javascript, HTML, CSS
                    </p>

                    <br></br>

                    <div>
                    <button style = {styleAcceptButton} className="mdc-button">
                      <i className="material-icons mdc-button"></i>
                        Bid on Job
                      </button>
                    </div>
                    <div>
                    <button style = {styleBackButton} className="mdc-button">
                      <i className="material-icons mdc-button"></i>
                        BACK
                      </button>
                  </div>
                </div>
              </div>
          </div>
    );
  }
}

export default DemandPage;
