import React, { Component } from 'react';
import '../Styles/App.css';
import {PanelGroup ,Panel,ButtonGroup,Button} from 'react-bootstrap';
import { FeedContainer,SwitchDemands } from '../Styles/feed.style';
import DemandPanel from './Feed/DemandPanel';
import {retrieveDemands} from '../Utils/auth.js';


class MoreDemands extends Component {
  constructor(props){
      super(props);
      this.state = {
        activeDemands : [],
        inactiveDemands : [],
        showActive: true,

      }

      this.getDemands = this.getDemands.bind(this)
      this.retrieveDemands = retrieveDemands.bind(this);
      //this.showDemandsClick = this.showDemandsClick.bind(this);
      this.getDemands();

  }

//takes a demand and creates a DemandPanel and passes the demands title, demandID and description
  createPanel(demand){
      return  (<DemandPanel demand = {demand} />);
  }

  getDemands(){
    this.retrieveDemands()
        .then( arrayOfdemands => {
          let tempActive= []
          let tempInactive = []
          for(var i = 0; i < arrayOfdemands.length; i++) arrayOfdemands[i].isActive == false ? tempInactive.push(this.createPanel(arrayOfdemands[i])) : tempActive.push(this.createPanel(arrayOfdemands[i]));
          this.setState({
            activeDemands : tempActive,
            inactiveDemands : tempInactive,
          })
        })
        .catch( (error) => {  alert("Error " + error);
        });
  }

  //showDemandsClick = (demands) => {this.setState({ showDemands : demands})}


  render() {
    return (
      <FeedContainer>
          <SwitchDemands>
              <Button onClick={ (event) => {this.setState({showActive : true})} }> Show Active </Button>
              <Button onClick={ (event) => {this.setState({showActive : false})}}> Show Inactive </Button>
          </SwitchDemands>
          <PanelGroup>
            { this.state.showActive ? this.state.activeDemands : this.state.inactiveDemands }
          </PanelGroup>

      </FeedContainer>
    );
  }
}

export default MoreDemands;
