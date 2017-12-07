import React, { Component } from 'react';
//import logo from './logo.svg';
import '../Styles/App.css';
import Feed from './Feed/Feed'
import UserFeed from './Feed/UserFeed'



class Home extends Component {

  constructor(props){
      super(props);
  }

  render() {
    var style =  {
        color : 'gray',
        fontSize : 100,
        textAlign : 'center'
    }
    return (

          <div >
            <div style = {style}> HOME </div>
            <UserFeed />
          </div>
    );
  }
}

export default Home;
