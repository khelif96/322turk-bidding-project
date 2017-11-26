import React, { Component } from 'react';
import '../Styles/App.css';
import {Route,Router} from 'react-router-dom'
import history from '../Utils/history'
import NavBar from '../Components/Navigation/NavBar';
import Home from './Home';

import Login from './Login';
import PostList from './PostList';
import DemandPage from './DemandPage';
import Feed from './Feed/Feed'
import RegisterVolunteer from './RegisterVolunteer';
import MyAccount from './myAccount';
import RegisterDemand from './RegisterDemand';

class App extends Component {
  render() {
    return (
      <Router history = {history}>
        <div >
          <NavBar/>
        <div>

          <Route exact path = "/" component = {Home}/>

          <Route  path = "/Login" component = {Login}/>
          <Route  path = "/RegisterVolunteer" component = {RegisterVolunteer}/>
          <Route  path = "/RegisterDemand" component = {RegisterDemand}/>
          <Route  path = "/DemandPage" component = {DemandPage}/>
          <Route  path = "/myAccount" component = {MyAccount}/>
          <Route  path = "/Demand/:id" component = {DemandPage}/>

        </div>

        </div>
      </Router>
    );
  }
}

export default App;
