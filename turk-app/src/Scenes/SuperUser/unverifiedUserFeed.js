import React, { Component } from 'react';
//import logo from './logo.svg';
// import '../../Styles/App.css';
import {PanelGroup ,Panel, Table} from 'react-bootstrap';
import { FeedContainer } from '../../Styles/feed.style';
import UserPanel from './userPanel';
import {retrieveDemands} from '../../Utils/auth.js';
import {getUnverifiedUsers} from '../../Utils/superUser/userModRequest'

class UnverifiedUserFeed extends Component {
  constructor(props){
      super(props);
      this.state = {
        unverifiedUsers : []
      }

      this.getUnverifiedUsers = this.getUnverifiedUsers.bind(this)
      this.retrieveDemands = retrieveDemands.bind(this);
      this.getUnverifiedUsers();

  }

//takes a demand and creates a UserPanel and passes the demands title, demandID and description
  createPanel(user){
      return  (<UserPanel user = {user} />);
  }

  getUnverifiedUsers(){
    getUnverifiedUsers(localStorage.getItem('api_token'))
        .then( arrayOfUsers => {
          // alert("test" + arrayOfUsers);
          // this.setState({unverifiedUsers:arrayOfUsers})
          // alert(arrayOfUsers.length)
          let tempArray = []
          for(var i = 0; i < arrayOfUsers.length; i++)  tempArray.push(this.createPanel(arrayOfUsers[i]));
          this.setState({unverifiedUsers : tempArray})
        })
        .catch( (error) => {  alert("Error " + error);
        });
  }
  render() {
    return (
      <div>
          <h4> Unverified User</h4>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>
                  Email
                </th>
                <th>
                  Name
                </th>
                <th>
                  Account Type
                </th>
                <th>
                  Account Creation Date
                </th>
                <th>
                  Approve
                </th>
                <th>
                  Decline
                </th>
                <th>
                  Reason For Decline
                </th>
              </tr>
              </thead>
            <tbody>
            {this.state.unverifiedUsers}
            </tbody>
          </Table>
          </div>
    );
  }
}

export default UnverifiedUserFeed;
