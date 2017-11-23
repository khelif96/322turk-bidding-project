import React, { Component } from 'react';
//import logo from './logo.svg';
import '../Styles/App.css';
import { Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {FormContainer} from '../Styles/form.style'
import {register} from '../Utils/auth.js';


class RegisterVolunteer extends Component {

  constructor(props){
      super(props);
      this.state = {
        username : "",
        firstName : "",
        lastName : "",
        password : "",
        api_token : ""
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.register = register.bind(this);
  }

  validateForm() {
     return (this.state.username.length > 0 && this.state.password.length > 0
            && this.state.firstName.length > 0 && this.state.lastName.length > 0);
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

      const currentState = this.state;

      alert("Your username is "+ Username + "\nPassword : " + Password +
            "\nYour First Name is "+ FirstName + "\nLast Name : " + LastName + "\n"
            );

      //call our axios promise, then retrieve the token from axios
      this.register(Username,Password,FirstName,LastName)
          .then( api_token => {localStorage.setItem('api_token',api_token);
                                alert("Api Token " + api_token);
          })
          .catch( (error) => { console.log(error);
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
            <ControlLabel>enter in your email</ControlLabel>
            <FormControl
                  autoFocus
                  type="username"
                  value={this.state.username}
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

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>

        </form>
      </FormContainer>
    );
  }
}

export default RegisterVolunteer;
