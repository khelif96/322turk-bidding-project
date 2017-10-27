import React, { Component } from 'react';
//import logo from './logo.svg';
import $ from 'jquery';
import './App.css';
import { Form,Button, FormGroup, FormControl, ControlLabel,Col} from 'react-bootstrap';
import {FormContainer} from './form.style'

class Login extends Component {

  constructor(props){
      super(props);
      this.state = {
        email : "",
        password : ""
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
    const Password = this.state.password;
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

          <FormGroup controlId="email" bsSize = "large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
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
            Login
          </Button>

        </form>
      </FormContainer>
    );
  }
}

export default Login;
