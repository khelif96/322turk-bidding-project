import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Login from './Login';
import CreateAccount from './CreateAccount';
import {
  HashRouter,
  Switch,
  Route,
  Link } from 'react-router-dom'


class Main extends Component{
  render(){
      return(
        <Switch>
          <Route path ='/App' component = {App}/>
          <Route path ='/Login' component = {Login}/>
          <Route path ='/CreateAccount' component = {CreateAccount}/>
        </Switch>
      );
  }
}

export default Main;
