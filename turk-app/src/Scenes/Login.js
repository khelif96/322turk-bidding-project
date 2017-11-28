import React, { Component } from 'react';
//import logo from './logo.svg';
import '../Styles/App.css';
import { Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {FormContainer} from '../Styles/form.style'
import {login} from '../Utils/auth.js';
import {Link} from 'react-router-dom';


class Login extends Component {

  constructor(props){
      super(props);
      this.state = {
        username : "",
        password : "",
        api_token : "",
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

//records our username and password and calls the login authentication
//if passed we do another promise call to say that when we find our response
// we will set the response's api token into our current state and localStorage
//local storage will keep our token even after a refresh
  handleSubmit(event) {
      const Username = this.state.username;
      const Password = this.state.password;
      if(Username === "" || Password === "") alert("Please Enter a username/password");
      else console.log("Your username is "+ Username + " Password" + Password);

      //call our axios promise, then retrieve the token from axios
      this.login(Username,Password)
          .then( api_token => { localStorage.setItem('api_token',api_token);
                                alert("Api Token " + api_token);
          })
          .catch( (error) => { localStorage.setItem('api_token',"");
            this.setState({ api_token : ""});
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
