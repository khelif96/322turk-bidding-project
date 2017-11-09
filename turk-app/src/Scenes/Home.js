import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Route,Router } from 'react-router-dom'
import {NavBarLink} from '../Styles/navBar.style'
import history from '../utils/history'
import Login from './Login';
import NavBar from './NavBar';

class Home extends Component {

  constructor(props){
      super(props);
  }

  render() {
    return (
          <div>
            <h1> home page </h1>
          </div>
    );
  }
}

export default Home;
