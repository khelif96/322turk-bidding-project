import React, { Component } from 'react';
//import logo from './logo.svg';
import '../Styles/App.css';
import { Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {FormContainer} from '../Styles/form.style'
import {registerDemand} from '../Utils/auth.js';

class RegisterDemand extends Component {

  constructor(props){
      super(props);
      this.state = {
        content : "",
        titleOfEvent : "",
        api_token : localStorage.getItem("api_token")
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.registerDemand = registerDemand.bind(this);
  }

  validateForm() {
     return (this.state.content.length > 0  && this.state.titleOfEvent.length > 0 );
   }

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }

//records our organization and description and calls the login authentication
//if passed we do another promise call to say that when we find our response
// we will set the response's api token into our current state and localStorage
//local storage will keep our token even after a refresh
  handleSubmit(event) {
      const Content = this.state.content;
      const TitleOfEvent = this.state.titleOfEvent;
      const API_token = this.state.api_token;

      //call our axios promise, then retrieve the token from axios
      this.registerDemand(TitleOfEvent,Content,API_token)

      event.preventDefault();
  }

  render() {

    return (

      <FormContainer>
          <form onSubmit ={this.handleSubmit}>

          <FormGroup controlId="titleOfEvent" bsSize = "large">
            <ControlLabel>Title of the Job</ControlLabel>
            <FormControl
                  autoFocus
                  type="titleOfEvent"
                  value={this.state.titleOfEvent}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="content" bsSize = "large">
            <ControlLabel>Create your description</ControlLabel>
            <FormControl
                  componentClass="textarea"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Create Job
          </Button>

        </form>
      </FormContainer>
    );
  }
}

export default RegisterDemand;
