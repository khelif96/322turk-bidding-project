import React, { Component } from 'react';
//import logo from './logo.svg';
import '../../Styles/App.css';
import {PanelGroup ,Panel} from 'react-bootstrap';
import { FeedContainer } from '../../Styles/feed.style';
import DemandPanel from './DemandPanel';
import UserPanel from './UserPanel';
import {retrieveDemands} from '../../Utils/auth.js';
import {getTopClients,getTopDevs} from '../../Utils/User.js';


class Feed extends Component {
  constructor(props){
      super(props);
      this.state = {
        demands : [],
        topDevs : [],
        topClients : [],
      }

      this.getDemands = this.getDemands.bind(this)
      this.retrieveDemands = retrieveDemands.bind(this);
      this.getTopClients = getTopClients.bind(this);
      this.getTopDevs = getTopDevs.bind(this);

      this.getDemands();

  }

//takes a demand and creates a DemandPanel and passes the demands title, demandID and description
  createPanel(demand){
      return  (<DemandPanel demand = {demand} />);
  }
  createUserPanel(user){
      return  (<UserPanel user = {user} />);
  }

  getDemands(){
    this.retrieveDemands()
        .then( arrayOfdemands => {
          let tempArray = []
          for(var i = 0; i < arrayOfdemands.length; i++) if(arrayOfdemands[i].isActive && !arrayOfdemands[i].devChosen) tempArray.push(this.createPanel(arrayOfdemands[i]));
          this.setState({demands : tempArray})
        })
        .catch( (error) => {  alert("Error " + error);
        });

    this.getTopClients()
        .then( arrayOfClients => {
          let tempArray = []
          for(var i = 0; i < 3; i++)  tempArray.push(this.createUserPanel(arrayOfClients[i]));
          this.setState({topDevs : tempArray})
        })
        .catch( (error) => {  alert("Error " + error);
        });
    this.getTopDevs()
        .then( arrayOfDevs => {
          let tempArray = []
          for(var i = 0; i < 3; i++)  tempArray.push(this.createUserPanel(arrayOfDevs[i]));
          this.setState({topClients : tempArray})
        })
        .catch( (error) => {  alert("Error " + error);
        });
  }
  render() {
    const showDemands = []
    for( let i =0 ; i < 3; i++ ) showDemands.push(this.state.demands[i])
    return (
      <FeedContainer>
          <PanelGroup>
          "Highest Rated Clients : "
          {this.state.topClients}
          </PanelGroup>

          <PanelGroup>
          "Highest Rated Developers : "
          {this.state.topDevs}
          </PanelGroup>

          <PanelGroup>
          "Active Demands : "
          { showDemands }
          </PanelGroup>

      </FeedContainer>
    );
  }
}

export default Feed;
