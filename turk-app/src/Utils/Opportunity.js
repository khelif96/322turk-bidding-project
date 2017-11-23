import axios from 'axios';
import {getAccountByID} from './getProfile.js';

const baseUrl = "http://localhost:3001/api";

export {getOpportunitybyID};
function getOpportunitybyID(opportunityId){
  return axios.post(baseUrl + "/getOpportunitybyID",{
    opportunity_id: opportunityId
  })
  .then((response) => {this.setState({description: response.data.description,
  title: response.data.title})
  //   getAccountById(response.data.posterID)
  //   .then((profile) => {this.setState({posterName: profile.name.first})}
  // )
  })
  .catch((error) => {
    alert("Error" + error)
  });
}
