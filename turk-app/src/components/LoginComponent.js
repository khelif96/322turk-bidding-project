import React, { Component } from 'react';
// import logo from '../logo.svg';
import './styles/loginComponent.css';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState(
      {[event.target.name]: event.target.value}
    );
  }

  handleSubmit(event) {
    const userName = this.state.email;
    const Password = this.state.password;

    if(userName === "" || Password === ""){
      alert("Please Enter a username/password");
    }else{
      console.log("Your username is "+ userName + " Password" + Password);
    }

    fetch('http://localhost:3001/api/loginUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userName,
        password: Password
      })
    }.then((response) => response.json())
      .then((responseJson) => {
        console.log( responseJson.api_token);
      })
      .catch((error) => {
        console.error(error);
      }));
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
