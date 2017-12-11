import React, { Component } from 'react';
//import logo from './logo.svg';
import '../../Styles/App.css';
import { Button, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem, Modal} from 'react-bootstrap';
import {FormContainer} from '../../Styles/form.style'
import {updateUser} from '../../Utils/auth.js';


class RegisterUser extends Component {

  constructor(props){
      super(props);
      this.state = {
        username : "",
        firstName : "",
        lastName : "",
        email: "",
        showError: false,
        errorMessage: "Problem",
        tags : "",
        interests : "",
        sampleWork : "",
        resume : "",

      }
      // this.errorMessage = "Problem";
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateUser = updateUser.bind(this);
  }
  OpenPopUp = (message) => {
    this.setState({ showError : true, errorMessage : message })
    // this.errorMessage = message;
  }

  closePopUp = () => {
    this.setState({ showError : false })
  }

  validateForm() {
     return (this.state.username.length > 0 && this.state.password.length > 0
            && this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.email.length > 0 );
   }

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }

//records our username and password and calls the login authentication
//if passed we do another promise call to say that when we find our response
// we will set the response's api token into our current state and localStorage
//local storage will keep our token even after a refresh
  handleSubmit(event) {

      const API_token = localStorage.getItem('api_token');
      const UserName = this.state.username;
      const Email = this.state.email;
      const Interests = this.state.interests;
      const SampleWork = this.state.sampleWork;
      const Resume = this.state.resume;


      // alert("Your username is "+ Username + "\nPassword : " + Password +
      //       "\nYour First Name is "+ FirstName + "\nLast Name : " + LastName + "\n" + "UserType : " + UserType
      //       );

      //call our axios promise, then retrieve the token from axios

      //this.updateUser(API_token,UserName,Email,Interests,SampleWork,Resume)

      event.preventDefault();
  }

  render() {

    return (

      <FormContainer>
          <form onSubmit ={this.handleSubmit}>

          <FormGroup controlId="firstName" bsSize = "large">
            <ControlLabel>Update your first name</ControlLabel>
            <FormControl
                  autoFocus
                  type="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="lastName" bsSize = "large">
            <ControlLabel>Update your last name</ControlLabel>
            <FormControl
                  autoFocus
                  type="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="username" bsSize = "large">
            <ControlLabel>Update your username</ControlLabel>
            <FormControl
                  autoFocus
                  type="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
          </FormGroup>
          <FormGroup controlId="email" bsSize = "large">
            <ControlLabel>Update your email</ControlLabel>
            <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="interests" bsSize = "large">
            <ControlLabel>Add new tags</ControlLabel>
            <FormControl
                  autoFocus
                  type="interests"
                  value={this.state.interests}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="resume" bsSize = "large">
            <ControlLabel>Update your Resume</ControlLabel>
            <FormControl
                  componentClass="textarea"
                  value={this.state.resume}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="sampleWork" bsSize = "large">
            <ControlLabel>Add your Github</ControlLabel>
            <FormControl
                  value={this.state.sampleWork}
                  onChange={this.handleChange}
                />
          </FormGroup>


          <Button
            block
            bsSize="large"
            type="submit"
          >
            Register
          </Button>
          <Modal show={this.state.showError} onHide={this.closePopUp}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p> {this.state.errorMessage} </p>
                    </Modal.Body>
          </Modal>

        </form>

      </FormContainer>
    );
  }
}

export default RegisterUser;
