import React, { Component } from 'react';
import '../Styles/App.css';
import {getAccountByID} from '../Utils/User.js';
import {chooseBidder} from '../Utils/Demand.js';
import {
   DemandHeading,
         FeedContainer,
         Organization,
         DatePosted,
         Description,
         SectionHeadings,
         MoreDetails,ChooseBidder
      } from '../Styles/feed.style';
import {PanelGroup ,Panel, FormGroup, FormControl, ControlLabel,Modal,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


class Bidder extends Component {
  constructor(props){
      super(props);
      this.state = {
        demandID : "",
        rating : "",
        devId : this.props.devId,
        name : "",
        bidAmount : this.props.bidAmount,
        deadline : this.props.deadline,
        showReason : false,
        reason : "",
      }

      this.getAccountByID = getAccountByID.bind(this);
      this.chooseBidder = chooseBidder.bind(this);

      this.displayContent = this.displayContent.bind(this);

      this.selectBidder = this.selectBidder.bind(this);
      this.confirmBidder = this.confirmBidder.bind(this);

      this.handleChange = this.handleChange.bind(this);

      this.displayContent()
  }

  validateForm() {
     return (this.state.reason.length > 0 );
   }

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }

  displayContent = () => {
    getAccountByID(this.state.devId)
        .then( (clientName) => {
          //alert(JSON.stringify(clientName.name))
          this.setState({
            name : clientName.name.first + " " + clientName.name.last,
            rating : clientName.rating.type
          })
        })
        .catch( (error) => {
          alert(error +  "Error from : bidder");
        });
  }

  convertDate = (date) => ({
      year : date.substr(0,4),
      month : date.substr(5,2) ,
      day : date.substr(8,2) ,
      hour : date.substr(11,2) ,
      minutes : date.substr(14,2) ,
      seconds : date.substr(17,2)
  })



  selectBidder = () => {
    if ( localStorage.getItem('userType') == "Client"){
      let showReasonValue = this.state.showReason
      this.setState({ showReason : !showReasonValue})
    }
  }

  confirmBidder = () => {
      this.chooseBidder(this.props.demandID, this.state.devId, this.state.reason, localStorage.getItem('api_token') )
        .then( response => { alert(response) })

  }



  render() {
    const deadlineDate = this.convertDate(this.state.deadline)
    const deadlineDateTranslated = deadlineDate.month + "/" + deadlineDate.day + "/" + deadlineDate.year
    return (

      <Panel>
      <SectionHeadings>
        <Link to = {`/user/userId=${this.state.devId}`}>
          {this.state.name + " placed a bid of $" + this.state.bidAmount + " due on " + deadlineDateTranslated }
        </Link>
        <Panel collapsible expanded={this.state.showReason}>

          <form onSubmit = {this.confirmBidder}>
            <FormGroup controlId="reason" bsSize = "large">
              <ControlLabel>Your Reasoning For choosing this bidder</ControlLabel>
              <FormControl
                    componentClass="textarea"
                    value={this.state.reason}
                    onChange={this.handleChange}
                  />
            </FormGroup>

            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Confirm Selection
            </Button>
        </form>
        </Panel>
        { localStorage.getItem('userType') == "Client" && (<ChooseBidder onClick = { event => this.selectBidder()}> { !this.state.showReason ? "Choose Bidder" : "cancel"} </ChooseBidder>) }
      </SectionHeadings>

      </Panel>
    );
  }
}

export default Bidder;
