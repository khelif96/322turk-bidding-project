import React, { Component } from 'react';
import '../Styles/App.css';
import {Route,Router} from 'react-router-dom'
import history from '../Utils/history'
import NavBar from '../Components/Navigation/NavBar';
import Home from './Home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from './Login';
import PostList from './PostList';
import Demand from './Demand';
import Feed from './Feed/Feed'
import RegisterUser from './RegisterUser';
import MyAccount from './Account/myAccount';
import UserPage from './Account/UserPage';
import RegisterDemand from './RegisterDemand';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        isSignedIn : (localStorage.getItem('api_token') !== null),
        userType : localStorage.getItem('userType'),
        canBid : ""
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
              {this.state.isSignedIn && "user is signed in with type : " + this.state.userType}
          <div>
            <Route exact path = "/" component = {
               (routeProps) => <Home {...routeProps} userType = {this.state.userType} />
            }/>
            <Route  path = "/Login" component = {
               (routeProps) => <Login {...routeProps} testCall = {this.state.isSignedIn} isTheUserSignedIn={this.userIsSignedIn} />
            }/>
            <Route  path = "/RegisterUser" component = {RegisterUser}/>
            <Route  path = "/RegisterDemand" component = {RegisterDemand}/>
            <Route  path = "/user/userId=:userId" component = {
              (routeProps) => <UserPage  {...routeProps} />
            }/>
            <Route  path = "/myAccount" component = {
              (routeProps) => <MyAccount  {...routeProps} isTheUserSignedIn={this.userIsSignedIn}/>
            }/>
            <Route  path = "/demands/:id" component = {Demand}/>

          </div>

          </div>

      </Router>
    );
  }
}

export default App;
