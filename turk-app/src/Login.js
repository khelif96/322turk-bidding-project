import React, { Component } from 'react';
//import logo from './logo.svg';
import $ from 'jquery';
import './App.css';

class Login extends Component {



  constructor(props){
      super(props);
      this.state = {
        user : "",
        password : ""
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState(
      {[event.target.name]: event.target.value}
    );
  }

  handleSubmit() {
  	const Username = this.state.user;
    const Password = this.state.password;
    //alert(" Username : " + this.state.user + " password : " + this.state.password);
    //event.preventDefault();
    if(Username === "" || Password === ""){
      alert("Please Enter a username/password");
    }
    else{
      $.ajax({
          url: '/api/addEmailList',
          type:'POST',
          data:
          {
              user : Username,
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
      <div> <h1> Please Log in</h1>

      <form onSubmit={this.handleSubmit}>
        <h3>
          Username:
          <input type="text" value={this.state.value} name = "user" onChange={this.handleChange} />
        </h3>

        <h3>
          Password:
          <input type="text" value={this.state.value} name = "password" onChange={this.handleChange} />
        </h3>

        <input type="submit" value="Submit" />
    </form>
    </div>
    );
  }
}

export default Login;
