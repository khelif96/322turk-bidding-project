import React, { Component } from 'react';
//import logo from './logo.svg';
import $ from 'jquery';
import './App.css';

class CreateAccount extends Component {

  constructor(props){
      super(props);
      this.state = {
        user : "",
        email:"",
        password : "",
        confirmPassword : ""
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
  	const Email = this.state.email;
    const Username = this.state.user;
    const Password = this.state.password;
    if(Username !== "" && Email !== "" && Password !== "" && this.state.confirmPassword !== ""){
      if(Password === this.state.confirmPassword) alert("Account created!");
      else alert("Passwords don't match !");
    }
    else alert("Please fill out all Fields!");
    //event.preventDefault();
    /*if(Username === "" || Password === ""){
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
    */

  }

  render() {
    return (
      <div> <h1> Please create an Account</h1>
      <form onSubmit={this.handleSubmit}>
        <h3>
          Email:
          <input type="text" value={this.state.value} name = "email" onChange={this.handleChange} />
        </h3>

        <h3>
          Username:
          <input type="text" value={this.state.value} name = "user" onChange={this.handleChange} />
        </h3>
        <h3>
          Password:
          <input type="text" value={this.state.value} name = "password" onChange={this.handleChange} />
        </h3>

        <h3>
          Re-enter Password:
          <input type="text" value={this.state.value} name = "confirmPassword" onChange={this.handleChange} />
        </h3>


        <input type="submit" value="Submit" />
    </form>
    </div>
    );
  }
}

export default CreateAccount;
