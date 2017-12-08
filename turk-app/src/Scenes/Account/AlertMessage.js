import React, { Component } from 'react';
import '../../Styles/App.css';
import {getAccountByID,rateUser} from '../../Utils/User.js';
import {getDemandbyID} from '../../Utils/Demand.js';
import {
   DemandHeading,
         FeedContainer,
         Organization,
         DatePosted,
         Description,
         SectionHeadings,
         MoreDetails,ChooseBidder
      } from '../../Styles/feed.style';
import {PanelGroup ,Panel, FormGroup, FormControl, ControlLabel,Modal,Button,ToggleButton,ToggleButtonGroup,ButtonToolbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';


class AlertMessage extends Component {
  constructor(props){
      super(props);
      this.state = {
          senderID : this.props.message.senderID,
          description : this.props.message.description,
          messageType : this.props.message.messageType,
          header :  "",
          showModal : false,
          rating : 0,
          ratingMessage : "",
          demandId : this.props.message.demandID,
          demandName : ""
      }

      this.getAccountByID = getAccountByID.bind(this);
      this.rateUser = rateUser.bind(this);
      this.getDemandbyID = getDemandbyID.bind(this);


      this.handleChange = this.handleChange.bind(this);

      this.SubmitRating = this.SubmitRating.bind(this);

      this.convertMessage()

  }

  validateForm() {
     return (this.state.reason.length > 0 );
   }

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }

  convertDate = (date) => ({
      year : date.substr(0,4),
      month : date.substr(5,2) ,
      day : date.substr(8,2) ,
      hour : date.substr(11,2) ,
      minutes : date.substr(14,2) ,
      seconds : date.substr(17,2)
  })

  convertMessage = () =>{
    const messageType = this.state.messageType
    this.getDemandbyID(this.props.message.demandID)
      .then( (response) => {

        if(response != null) {
          this.setState({  demandName : response.title })}
      })

    this.getAccountByID(this.state.senderID)
      .then( account => {
        if(messageType == "projectSubmitted") {
          const headerMessage = " User " + account.name.first + " " + account.name.last + " submitted his product for " +  this.state.demandName
          this.setState( {header  : headerMessage} )
        }
      })

  }

  openModal = () => {
    this.setState({showModal : true});
  }

  closeModal = () => {
    this.setState({showModal : false});

  }

  SubmitRating = (event) => {
    alert(this.state.demandId)
    alert(this.state.rating)
    alert(this.state.ratingMessage)
    alert(localStorage.getItem('api_token'))

    this.rateUser(localStorage.getItem('api_token'),this.state.demandId,this.state.rating, this.state.ratingMessage)
  }

render() {
    return (
      <div>
        <Panel onClick = {this.openModal} >
          <DemandHeading>{this.state.messageType}</DemandHeading>
        </Panel>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title> {this.state.header} </Modal.Title>
          </Modal.Header>
          <Modal.Body>

              { this.state.messageType == "projectSubmitted" &&
                (<div>
                  <ControlLabel> Please rate the developer </ControlLabel>
                  <ButtonToolbar>
                     <ToggleButtonGroup type="radio" name="options"  onChange = { (event) => {this.setState({ rating : event}) } }>
                       <ToggleButton value={1}> 1 </ToggleButton>
                       <ToggleButton value={2}> 2 </ToggleButton>
                       <ToggleButton value={3}> 3 </ToggleButton>
                       <ToggleButton value={4}> 4 </ToggleButton>
                       <ToggleButton value={5}> 5 </ToggleButton>
                     </ToggleButtonGroup>
                  </ButtonToolbar>

                  <ControlLabel> Users Product :  </ControlLabel>
                  <p> {this.state.description}</p>

                  <FormGroup controlId="ratingMessage" bsSize = "large">
                    <ControlLabel>Create your message for your rating </ControlLabel>
                    <FormControl
                          componentClass="textarea"
                          value={this.state.ratingMessage}
                          onChange={this.handleChange}
                        />

                    <Button onClick = { event => {this.SubmitRating()}} >Submit Rating</Button>
                   </FormGroup>
                </div>)
              }

              { this.state.messageType == "superUserNotification" &&
                (<div>
                  <ControlLabel> Notification :  </ControlLabel>

                  <p> {this.state.description}</p>

                </div>)
              }

          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AlertMessage;
