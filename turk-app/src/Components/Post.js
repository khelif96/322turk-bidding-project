import React, { Component } from 'react';
//import logo from './logo.svg';
import '../Styles/App.css';

class Post extends Component {

  constructor(props){
      super(props);
  }

  render() {
    var style =  {
        color : 'orange',
        fontSize : 100,
        textAlign : 'center'
    }
    return (
          <div style = {style}>
            <div> SOME POST </div>
          </div>
    );
  }
}

export default Post;
