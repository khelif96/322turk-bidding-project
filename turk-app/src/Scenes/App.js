import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Route,Router } from 'react-router-dom'
import {NavBarLink} from '../Styles/navBar.style'
import history from '../utils/history'
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar';

class App extends Component {

  constructor(props){
      super(props);
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
