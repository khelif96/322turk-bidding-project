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
        password : "",
        api_token : "",
        events : []
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.login = login.bind(this);
  }

  validateForm() {
     return this.state.username.length > 0 && this.state.password.length > 0;
   }

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }

//records our username and react and calls the login authentication
//if passed we do another promise call to say that when we find our response
//we will set the response's api token into our current state
  handleSubmit(event) {
      const Username = this.state.username;
      const Password = this.state.password;
      if(Username === "" || Password === "") alert("Please Enter a username/password");
      else console.log("Your username is "+ Username + " Password" + Password);


      this.login(Username,Password)
          .then( api_token => {this.setState({api_token : api_token});
                                console.log("api token from handle submit is : " + this.state.api_token );} )
          .catch( (error) => {
            console.log(error)
            alert("Error " + error);
          });


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
