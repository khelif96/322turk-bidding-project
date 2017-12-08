import React, { Component } from 'react';
//import logo from './logo.svg';
// import '../../Styles/App.css';
import {PanelGroup ,Panel, Table} from 'react-bootstrap';
import { FeedContainer } from '../../Styles/feed.style';
import TransactionPanel from './transactionPanel';
// import {retrieveDemands} from '../../Utils/auth.js';
import {getTransactions} from '../../Utils/superUser/userModRequest'

class TransactionFeed extends Component {
  constructor(props){
      super(props);
      this.state = {
        allTransactions : []
      }

      this.getTransactions = this.getTransactions.bind(this)
      // this.retrieveDemands = retrieveDemands.bind(this);
      this.getTransactions();

  }

//takes a demand and creates a UserPanel and passes the demands title, demandID and description
  createPanel(user){
      return  (<TransactionPanel user = {user} />);
  }

  getTransactions(){
    getTransactions(localStorage.getItem('api_token'))
        .then( arrayOfUsers => {
          // alert("Overhe")
          // alert("test" + arrayOfUsers);
          // this.setState({allTransactions:arrayOfUsers})
          // alert(arrayOfUsers.length)
          let tempArray = []
          for(var i = 0; i < arrayOfUsers.length; i++)  tempArray.push(this.createPanel(arrayOfUsers[i]));
          this.setState({allTransactions : tempArray})
        })
        .catch( (error) => {  alert("Error Overhere " + error);
        });
  }
  render() {
    return (
      <div>
          <h4> Pending Transactions</h4>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>
                  Transaction Date
                </th>
                <th>
                  origin_id
                </th>
                <th>
                  destination_id
                </th>
                <th>
                  Amount
                </th>
                <th>
                  transactionType
                </th>
                <th>
                  Status
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
            {this.state.allTransactions}
            </tbody>
          </Table>
          </div>
    );
  }
}

export default TransactionFeed;
