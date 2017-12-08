import React, { Component } from 'react';
//import logo from './logo.svg';
import '../Styles/App.css';
import { Button, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem, Modal} from 'react-bootstrap';
import {FormContainer} from '../Styles/form.style'
import {registerUser} from '../Utils/auth.js';


class RegisterUser extends Component {

  constructor(props){
      super(props);
      this.state = {
        username : "",
        firstName : "",
        lastName : "",
        password : "",
        api_token : "",
        email: "",
        userType : "Client",
        showError: false,
        errorMessage: "Problem",
        tags : ""

      }
      // this.errorMessage = "Problem";
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.registerUser = registerUser.bind(this);
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
            && this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.email.length > 0 && this.state.userType.length > 0);
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
      const Username = this.state.username;
      const Password = this.state.password;
      const FirstName = this.state.firstName;
      const LastName = this.state.lastName;
      const Email = this.state.email;
      const UserType = this.state.userType;

      const currentState = this.state;

      // alert("Your username is "+ Username + "\nPassword : " + Password +
      //       "\nYour First Name is "+ FirstName + "\nLast Name : " + LastName + "\n" + "UserType : " + UserType
      //       );

      //call our axios promise, then retrieve the token from axios
      this.registerUser(Username,Password,Email,FirstName,LastName,UserType)
          .then( message => {
              // alert(message + " from creating user")
          })
          .catch( (error) => {

          });

      event.preventDefault();
  }

  render() {

    return (

      <FormContainer>
          <form onSubmit ={this.handleSubmit}>

          <FormGroup controlId="firstName" bsSize = "large">
            <ControlLabel>What is your first name?</ControlLabel>
            <FormControl
                  autoFocus
                  type="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="lastName" bsSize = "large">
            <ControlLabel>What is your last name?</ControlLabel>
            <FormControl
                  autoFocus
                  type="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="username" bsSize = "large">
            <ControlLabel>Enter in your username</ControlLabel>
            <FormControl
                  autoFocus
                  type="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
          </FormGroup>
          <FormGroup controlId="email" bsSize = "large">
            <ControlLabel>Enter in your email</ControlLabel>
            <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="password" bsSize = "large">
            <ControlLabel>create your password</ControlLabel>
            <FormControl
                  autoFocus
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="tags" bsSize = "large">
            <ControlLabel>Add tags for other users to search you, seperate them with spaces</ControlLabel>
            <FormControl
                  autoFocus
                  type="tags"
                  value={this.state.tags}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="userType">
            <ControlLabel>Choose your Account Type</ControlLabel>
            <FormControl componentClass="select"
              value={this.state.userType}
              onChange={this.handleChange}
              placeholder="Account Type"
            >
              <option value="Client">Client</option>
              <option value="Developer">Developer</option>
            </FormControl>
            </FormGroup>



          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Register
          </Button>
          <Modal show={this.state.showError} onHide={this.closePopUp}>
                    <Modal.Header closeButton>
                      <Modal.Title>Registration Error</Modal.Title>
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
