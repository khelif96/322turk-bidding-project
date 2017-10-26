import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import $ from 'jquery';
import './App.css';

class App extends Component {
  render(){
    return (
      <div>
        <h1> Welcome to the turk project </h1>
        <Main/>
      </div>
    )
  }


}


export default App;
