import React, { Component } from 'react';
//import logo from './logo.svg';
// import '../Styles/App.css';
import UnverifiedUserFeed from './unverifiedUserFeed'
// import { browserHistory } from 'react-router'


class SuperUserHome extends Component {

  constructor(props){
      super(props);
  }

 componentWillMount(){
    //If user is an Alumno, throw them to '/some/path'
    // alert(this.props.userType);
    if(localStorage.getItem('userType') !== 'Super_User')
      this.props.history.push('/')
  }
  render() {
    var style =  {
        color : 'gray',
        fontSize : 100,
        textAlign : 'center'
    }
    return (

          <div >
            <div style = {style}> Super User Home Page </div>
            <UnverifiedUserFeed />
          </div>
    );
  }
}

export default SuperUserHome;
