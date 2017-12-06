import React, { Component } from 'react';
//import logo from './logo.svg';
import '../Styles/App.css';
import { Button, FormGroup, FormControl, ControlLabel,Modal} from 'react-bootstrap';
import {FormContainer} from '../Styles/form.style'
import {login} from '../Utils/auth.js';
import {getAccountByApiToken} from '../Utils/User.js';
import {Link} from 'react-router-dom';

class Login extends Component {

  constructor(props){
      super(props);
      this.state = {
        username : "",
        password : "",
        api_token : "",
        showError : false,
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.login = login.bind(this);
      this.getAccountByApiToken = getAccountByApiToken.bind(this);

  }

  validateForm() {
     return this.state.username.length > 0 && this.state.password.length > 0;
   }

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value}
    );
  }

  OpenPopUp = () => {
    this.setState({ showError : true })
  }

  closePopUp = () => {
    this.setState({ showError : false })
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
          .then( api_token => {
            if(api_token.length > 0) {
              this.getAccountByApiToken(api_token)
                  .then( (account) => {
                    localStorage.setItem('userType',account.userType);
                    this.props.isTheUserSignedIn(true,account.userType);
                  })
                  .catch( (error) => {
                    localStorage.setItem('api_token',"");
                    localStorage.setItem('userType',"");
                    alert("Error from : Login page" + error);
                  });
              localStorage.setItem('api_token',api_token);
              this.props.history.push('/')
            }
            else this.OpenPopUp();
          })
          .catch( error => {
            localStorage.setItem('api_token',"");
            this.OpenPopUp();
          })
      //history.push('/')
      event.preventDefault();
  }

  render() {

    const actions = []

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
            <Modal show={this.state.showError} onHide={this.closePopUp}>
                      <Modal.Header closeButton>
                        <Modal.Title>Login Error</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p> There is No account under this name, Please Try again </p>
                      </Modal.Body>
            </Modal>

        </form>
      </FormContainer>
    );
  }
}

export default Login;
