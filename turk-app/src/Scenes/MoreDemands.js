import React, { Component } from 'react';
import '../Styles/App.css';
import {PanelGroup ,Panel,ButtonGroup,ButtonForm, FormGroup, FormControl,Button} from 'react-bootstrap';
import { FeedContainer,SwitchDemands } from '../Styles/feed.style';
import DemandPanel from './Feed/DemandPanel';
import {retrieveDemands} from '../Utils/auth.js';
import {searchDemands} from '../Utils/Demand.js';



class MoreDemands extends Component {
  constructor(props){
      super(props);
      this.state = {
        activeDemands : [],
        inactiveDemands : [],
        showActive: true,
        searchString : "",
        searchDemands : [],
        showSearch : false,
      }

      this.handleChange = this.handleChange.bind(this);

      this.getDemands = this.getDemands.bind(this)
      this.retrieveDemands = retrieveDemands.bind(this);
      this.searchDemands = searchDemands.bind(this);

      this.searchDemandsWithTag = this.searchDemandsWithTag.bind(this)
      //this.showDemandsClick = this.showDemandsClick.bind(this);
      this.getDemands();

  }

  searchDemandsWithTag = (searchString) => {
      this.searchDemands(searchString)
        .then( response => {
            let tempArray = this.state.searchDemands;
            tempArray = response.map( demand => this.createPanel(demand))
            this.setState({
              searchDemands : tempArray
            })
        })
  }

  validateSearch = () => { return this.state.searchString.length > 0}

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value})

    this.searchDemands(event.target.value)
      .then( response => {

        if(response != null){
          let tempArray = this.state.searchDemands;
          tempArray = response.map( demand => this.createPanel(demand))
          this.setState({
            searchDemands : tempArray
          })
        }
        else this.setState({searchDemands : []})
      })
  }

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

  render() {
    return (
      <FeedContainer>
            <FormGroup controlId="searchString">
               <FormControl
                   placeholder="type in the tags to find a demand"
                   value ={this.state.searchString}
                   onChange = {this.handleChange}
                />
            </FormGroup>

            {this.state.searchDemands}
          <SwitchDemands>
              <Button onClick={ (event) => {this.setState({showActive : true})} }> Show Active </Button>
              <Button onClick={ (event) => {this.setState({showActive : false})}}> Show Inactive </Button>
          </SwitchDemands>
          <PanelGroup>
            { this.state.showActive && this.state.activeDemands }
            { ! this.state.showActive && this.state.inactiveDemands }
          </PanelGroup>

      </FeedContainer>
    );
  }
}

export default MoreDemands;
