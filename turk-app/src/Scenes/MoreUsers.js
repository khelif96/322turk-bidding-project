import React, { Component } from 'react';
import '../Styles/App.css';
import {PanelGroup ,Panel,ButtonGroup,ButtonForm, FormGroup, FormControl,Button} from 'react-bootstrap';
import { FeedContainer,SwitchDemands } from '../Styles/feed.style';
import UserPanel from './Feed/UserPanel';
import {retrieveVerifiedDevelopers,retrieveVerifiedClients} from '../Utils/auth.js';
import {searchUsers} from '../Utils/User.js';



class MoreUsers extends Component {
  constructor(props){
      super(props);
      this.state = {
        developers : [],
        clients : [],
        searchString : "",
        searchUsers : [],
        showSearch : false,
        showDeveloper : true,
      }

      this.handleChange = this.handleChange.bind(this);

      this.getDevs = this.getDevs.bind(this)
      this.getClients = this.getClients.bind(this)

      this.retrieveVerifiedDevelopers = retrieveVerifiedDevelopers.bind(this);
      this.retrieveVerifiedClients = retrieveVerifiedClients.bind(this);

      this.searchUsers = searchUsers.bind(this);

      this.searchUsersWithTag = this.searchUsersWithTag.bind(this)
      //this.showDemandsClick = this.showDemandsClick.bind(this);
      this.getDevs();
      this.getClients();


  }

  searchUsersWithTag = (searchString) => {
      this.searchUsers(searchString)
        .then( response => {
            let tempArray = this.state.searchUsers;
            tempArray = response.map( user => this.createPanel(user))
            this.setState({
              searchUsers : tempArray
            })
        })
  }

  validateSearch = () => { return this.state.searchString.length > 0}

  handleChange(event) {
    this.setState(
      {[event.target.id]: event.target.value})

    this.searchUsers(event.target.value)
      .then( response => {

        if(response != null){
          let tempArray = this.state.searchUsers;
          tempArray = response.map( user => this.createPanel(user) )

          this.setState({
            searchUsers : tempArray
          })
        }
        else this.setState({searchUsers : []})
      })
  }

  createPanel(user){
      return  (<UserPanel user = {user} />);
  }

  getDevs(){
    this.retrieveVerifiedDevelopers()
        .then( arrayOfDevs => {
          let tempDevs= []
          for(var i = 0; i < arrayOfDevs.length; i++) tempDevs.push(this.createPanel(arrayOfDevs[i]))
          this.setState({
            developers : tempDevs,
          })

        })
        .catch( (error) => {  alert("Error " + error);
        });
  }

  getClients = () => {
    this.retrieveVerifiedClients()
        .then( arrayOfClients => {
          let tempClients= []
          for(var i = 0; i < arrayOfClients.length; i++) tempClients.push(this.createPanel(arrayOfClients[i]))
          this.setState({
            clients : tempClients,
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
                   placeholder="type in the tags to find a user"
                   value ={this.state.searchString}
                   onChange = {this.handleChange}
                />
            </FormGroup>

            {this.state.searchUsers }
          <SwitchDemands>
              <Button onClick={ (event) => {this.setState({showDeveloper : true})} }> Show Developers </Button>
              <Button onClick={ (event) => {this.setState({showDeveloper : false})}}> Show Clients </Button>
          </SwitchDemands>
          <PanelGroup>

            {this.state.showDeveloper && this.state.developers }
            { !this.state.showDeveloper && this.state.clients}

          </PanelGroup>

      </FeedContainer>
    );
  }
}

export default MoreUsers;
