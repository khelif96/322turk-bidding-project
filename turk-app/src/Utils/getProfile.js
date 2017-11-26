import axios from 'axios';
const baseUrl = "http://localhost:3001/api";

export {getAccountByApiToken};
function getAccountByApiToken(apiToken){
  return axios.post(baseUrl + "/userInfobyAPI",{
    api_token: apiToken
  })
  .then((response) => response.data)
  .catch((error) => {
    alert("Error" + error)
  });
}

export {getAccountByID};
function getAccountByID(org_ID){
  return axios.post(baseUrl + "/userInfobyID",{
    user_id: org_ID
  })
  .then((response) => response.data)
  .catch((error) => {
    alert("Error" + error)
  });
}
