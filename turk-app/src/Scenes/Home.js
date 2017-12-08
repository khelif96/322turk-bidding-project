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
        color : '#00251a',
        fontSize : 80,
        textAlign : 'center'
    }
    return (

          <div >
            <div style = {style}> HOME </div>
            <Feed />
          </div>
    );
  }
}

export default Home;
