import axios from 'axios';

const baseUrl = "http://localhost:3001/api";

export {getDemandbyID};
function getDemandbyID(DemandId){
  return axios.get(baseUrl + "/demands/" + DemandId )
  .then( response =>  response.data )
  .catch((error) => {
    alert(error + " from getDemandbyID in utils/demand.js")
  });
}
