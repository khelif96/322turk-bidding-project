import React, { Component } from 'react';
import '../../Styles/App.css';
import {getAccountByID} from '../../Utils/User.js';


class Bidder extends Component {
  constructor(props){
      super(props);
      this.state = {
        rating : "",
        devId : this.props.devId,
        name : "",
        bidAmount : this.props.bidAmount,
        deadline : this.props.deadline,

      }

      this.getAccountByID = getAccountByID.bind(this);
      this.displayContent = this.displayContent.bind(this);

      this.displayContent()
  }

  displayContent = () => {
    getAccountByID(this.state.devId)
        .then( (clientName) => {
          //alert(JSON.stringify(clientName.name))
          this.setState({
            name : clientName.name.first + " " + clientName.name.last,
            rating : clientName.rating.type
          })
        })
        .catch( (error) => {
          alert(error +  "Error from : bidder");
        });
  }

  render() {
    const style ={ color : "orange"}
    return (
      <h3 style={ style }>
        {this.state.name + " placed a bid of $" + this.state.bidAmount + " due on " + this.state.deadline}
      </h3>
    );
  }
}

export default Bidder;
