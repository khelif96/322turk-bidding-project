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
function getAccountByID(user_ID){
  return axios.get(baseUrl + "/user/userId=" + user_ID)
  .then( response => response.data )
  .catch((error) => {
    alert(error + " from USER in utils")
    console.log(error)
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

export{searchUsers};
function searchUsers(Input){
    return axios.post(baseUrl + "/searchUsers", {
        input : Input
    })
    .then((response) => alert("success : " + response.message))
    .catch((error) => {
      alert("Error in search " + error.response.data.error);
  });
}

export {rateUser};
function rateUser(API_token, DemandId, Rating, Reason){
    return axios.post(baseUrl + "/rate", {
        api_token : API_token,
        demandId : DemandId,
        rating : Rating,
        justification : Reason
    })
    .then((response) => alert("success : " + response.message))
    .catch((error) => {
      alert("This is an error from rating " + error.message);
    });
}
