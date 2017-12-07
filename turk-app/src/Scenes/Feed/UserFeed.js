import React, { Component } from 'react';
//import logo from './logo.svg';
import '../../Styles/App.css';
import {PanelGroup ,Panel} from 'react-bootstrap';
import { FeedContainer } from '../../Styles/feed.style';
import DemandPanel from './DemandPanel';
import UserPanel from './UserPanel';
import {retrieveDemands} from '../../Utils/auth.js';


class UserFeed extends Component {
  constructor(props){
      super(props);
      this.state = {
        demands : []
      }

      this.getDemands = this.getDemands.bind(this)
      this.retrieveDemands = retrieveDemands.bind(this);
      this.getDemands();

  }

//takes a demand and creates a DemandPanel and passes the demands title, demandID and description
  createPanel(demand){
      return  (<DemandPanel demand = {demand} />);
  }

  getDemands(){
    this.retrieveDemands()
        .then( arrayOfdemands => {
          let tempArray = []
          for(var i = 0; i < arrayOfdemands.length; i++)  tempArray.push(this.createPanel(arrayOfdemands[i]));
          this.setState({demands : tempArray})
        })
        .catch( (error) => {  alert("Error " + error);
        });
  }
  render() {
    return (
      <FeedContainer>
          <PanelGroup>
          {this.state.demands}
          </PanelGroup>

      </FeedContainer>
    );
  }
}

export default UserFeed;
