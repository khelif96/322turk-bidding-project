import React, { Component } from 'react';
import {login} from '../utils/auth.js';
// import logo from '../logo.svg';
import './styles/loginComponent.css';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    /*props.userName = "";
    props.password = "";*/
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  postLogin(email,password) {
    login(email,password).then((api_token) => {
      this.setState({ "api_token" : api_token.data.api_token });
      console.log("postLogin " + this.state.api_token);
    });
  }

  handleChange(event) {
    this.setState(
      {[event.target.name]: event.target.value}
    );
  }

  handleSubmit(event) {
    /*props.userName = this.state.email;
    props.Password = this.state.password;
    */
    const userName = this.state.email;
    const Password = this.state.password;
    if(userName === "" || Password === ""){
      alert("Please Enter a username/password");
    }else{
      console.log("Your username is "+ userName + " Password" + Password);
    }

    login(userName,Password);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailInput">Email address</label>
          <input type="email" className="form-control" id="emailInput" name="email" onChange={this.handleChange} placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input type="password" className="form-control" id="passwordInput" name="password" onChange={this.handleChange} placeholder="Password"/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    );
  }
}

export default LoginComponent;
