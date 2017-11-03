import React, { Component } from 'react';
//import logo from './logo.svg';
import $ from 'jquery';
import './App.css';
import { Form,Button, FormGroup, FormControl, ControlLabel,Col} from 'react-bootstrap';
import {FormContainer} from './form.style'

class CreateAccount extends Component {

  constructor(props){
      super(props);
      this.state = {
        firstName: "",
        lastName: "",
        phone : "",
        email : "",
        password : "",
        userName : ""

      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
     return this.state.email.length > 0 && this.state.password.length > 0;
   }

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }

  handleSubmit() {
  	const Email = this.state.email;
    const UserName = this.state.firstName;
    const Password = this.state.password;
    const FirstName = this.state.firstName;
    const LastName = this.state.lastName;
    const Phone = this.state.phone;

    //alert(" Username : " + this.state.email + " password : " + this.state.password);
    //event.preventDefault();
    if(Email === "" || Password === ""){
      alert("Please Enter a username/password");
    }
    else{
      $.ajax({
          url: '/api/addEmailList',
          type:'POST',
          data:
          {
              userName : UserName,
              firstName : FirstName ,
              lastName : LastName ,
              phone : Phone ,
              email : Email,
              password : Password
          },
          success: function(msg)
          {
              alert(msg);
          }
      });
    }


  }

  render() {
    return (
      <FormContainer>
          <form onSubmit ={this.handleSubmit}>

          <FormGroup controlId="firstName" bsSize = "large">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
                  autoFocus
                  type="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="lastName" bsSize = "large">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
                  autoFocus
                  type="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="phone" bsSize = "large">
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl
                  autoFocus
                  type="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="email" bsSize = "large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="userName" bsSize = "large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
                  autoFocus
                  type="userName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
          </FormGroup>

          <FormGroup controlId="password" bsSize = "large">
            <ControlLabel>Password</ControlLabel>
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
            Create Account
          </Button>

        </form>
      </FormContainer>
    );
  }
}

export default CreateAccount;
