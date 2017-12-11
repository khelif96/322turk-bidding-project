import React, { Component } from 'react';
//import logo from './logo.svg';
// import '../Styles/App.css';
import UnverifiedUserFeed from './unverifiedUserFeed'
import AllUserFeed from './allUserFeed'
import TransactionFeed from './transactionFeed'
// import { browserHistory } from 'react-router'


class SuperUserHome extends Component {

  constructor(props){
      super(props);
      this.state = {
        time: Date.now()
      }
  }

 componentWillMount(){
    //If user is an Alumno, throw them to '/some/path'
    // alert(this.props.userType);
    if(localStorage.getItem('userType') !== 'Super_User')
      this.props.history.push('/')
  }

  componentDidMount() {
    setInterval(() => this.setState({ time: Date.now()}), 1000)
}

  render() {
    var style =  {
        color : 'gray',
        fontSize : 80,
        textAlign : 'center'
    }
    return (

          <div style={{margin:"25px"}}>
            <div style = {style}> Super User Panel </div>
            <UnverifiedUserFeed />
            <AllUserFeed/>
            <TransactionFeed/>

          </div>
    );
  }
}

export default SuperUserHome;
