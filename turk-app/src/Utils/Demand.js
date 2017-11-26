import axios from 'axios';

const baseUrl = "http://localhost:3001/api";

export {getDemandbyID};
function getDemandbyID(DemandId){
  return axios.get(baseUrl + "/demands/" + DemandId
  )
  .then((response) => {
    const responseState  = {
      content: response.data.content,
      title: response.data.title,
      demandID : DemandId,
    };
  })
  .catch((error) => {
    alert("Error" + error)
  });
}
