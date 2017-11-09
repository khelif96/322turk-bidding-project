import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Route,Router } from 'react-router-dom'
import history from '../utils/history'
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar';

class App extends Component {

  constructor(props){
      super(props);
      this.state = {
          api_token : " "
      }


      this.myCallback = this.myCallback.bind(this);
  }

  //retrieves our api token from login
  myCallback = (child_api) => {
      this.setState( { api_token : child_api });
  }

  render() {
    return (

       <Router history={history}>
          <div>
          <NavBar />
            <div>
              <Route exact path = "/" component = {Home}/>
              <Route path = "/Login" component = {Login}/>
            </div>
          </div>
       </Router>

    );
  }
}

export default App;
