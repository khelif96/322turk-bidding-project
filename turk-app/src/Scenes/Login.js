import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {FormContainer} from '../Styles/form.style'
import {login} from '../utils/auth.js';


class Login extends Component {

  constructor(props){
      super(props);
      this.state = {
        username : "",
        password : ""
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
     return this.state.username.length > 0 && this.state.password.length > 0;
   }

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }

  handleSubmit(event) {
      const Username = this.state.username;
      const Password = this.state.password;
      if(Username === "" || Password === "") alert("Please Enter a username/password");
      else console.log("Your username is "+ Username + " Password" + Password);

      login(Username,Password);
      event.preventDefault();
  }



  render() {
    return (
      <FormContainer>
          <form onSubmit ={this.handleSubmit}>

          <FormGroup controlId="username" bsSize = "large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
                  autoFocus
                  type="username"
                  value={this.state.username}
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
