import axios from 'axios';
const baseUrl = "http://localhost:3001/api";

export {getAccountByApiToken};
function getAccountByApiToken(apiToken){
  return axios.get(baseUrl + "/user/api_token=" + apiToken)
  .then( response => response.data)
  .catch((error) => {
    alert(error + " from USER in utils")
  });
}

export {getAccountByID};
function getAccountByID(org_ID){
  return axios.post(baseUrl + "/userInfobyID",{
    user_id: org_ID
  })
  .then((response) => response.data)
  .catch((error) => {
    alert(error + " from USER in utils")
  });
}

export {addFunds};
function addFunds(Amount, API_token){
    return axios.post(baseUrl + "/addFunds", {
        api_token : API_token,
        amount : Amount
    })
    .then((response) => alert("success : " + response.message))
    .catch((error) => {
      alert("This is an error from addFunds " + error.message);
    });
}
