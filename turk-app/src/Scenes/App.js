import React, { Component } from 'react';
import '../Styles/App.css';
import {Route,Router} from 'react-router-dom'
import history from '../Utils/history'
import NavBar from '../Components/Navigation/NavBar';
import Home from './Home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from './Login';
import MoreDemands from './MoreDemands';
import MoreUsers from './MoreUsers';
import Demand from './Demand';
import RegisterUser from './RegisterUser';
import MyAccount from './Account/myAccount';
import UserPage from './Account/UserPage';
import RegisterDemand from './RegisterDemand';
import SuperUserHome from './SuperUser/superUser';
class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        isSignedIn : (localStorage.getItem('api_token') !== null),
        userType : localStorage.getItem('userType'),
        canBid : true,
      }
  }

  userIsSignedIn = (userSignedInStatus,userTypeString) => {
    this.setState({
      isSignedIn : userSignedInStatus,
      userType : userTypeString
     })
  }



  render() {
    return (
      <Router history = {history}>
          <div >
            <NavBar enableLogout = {this.state.isSignedIn} />
              {this.state.isSignedIn && "user is signed in with type : " + this.state.userType + "with api token : " + localStorage.getItem('api_token')}
          <div>
            <Route exact path = "/" component = {
               (routeProps) => <Home {...routeProps} userType = {this.state.userType} />
            }/>
            <Route  path = "/Login" component = {
               (routeProps) => <Login {...routeProps} testCall = {this.state.isSignedIn} isTheUserSignedIn={this.userIsSignedIn} />
            }/>
            <Route  path = "/RegisterUser" component = {RegisterUser}/>
            <Route  path = "/RegisterDemand" component = {
              (routeProps) => <RegisterDemand {...routeProps} />
            }/>
            <Route  path = "/user/userId=:userId" component = {
              (routeProps) => <UserPage  {...routeProps} />
            }/>
            <Route  path = "/myAccount" component = {
              (routeProps) => <MyAccount  {...routeProps} isTheUserSignedIn={this.userIsSignedIn}/>
            }/>
            <Route  path = "/demands/:id" component = {
              (routeProps) => <Demand {...routeProps} appState={this.state}/>
            }/>

            <Route  path = "/MoreDemands" component = {MoreDemands}/>

            <Route  path = "/MoreUsers" component = {MoreUsers}/>

            <Route path = "/superUserHome" component = {SuperUserHome} />
          </div>

          </div>

      </Router>
    );
  }
}

export default App;
