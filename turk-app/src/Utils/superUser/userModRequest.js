import axios from 'axios';
const baseUrl = "http://localhost:3001/sudoApi";

export {getUnverifiedUsers};
function getUnverifiedUsers(API_token) {
  console.log("Logging in");
  // alert("Making request");
  // alert("logging in ");
  return axios.post(baseUrl+"/unverifiedUsers", {
      "api_token" : API_token
    })
    .then((response) => response.data)
    .catch( (error) => {
      console.log(error);
      alert("Error " + error.response.data.error);
    });
}

export {getAllUsers};
function getAllUsers(API_token) {
  console.log("Logging in");
  // alert("Making request");
  // alert("logging in ");
  return axios.post(baseUrl+"/getAllUsers", {
      "api_token" : API_token
    })
    .then((response) => response.data)
    .catch( (error) => {
      console.log(error);
      alert("Error " + error.response.data.error);
    });
}



export {verifyUser};
function verifyUser(userId,api_token){
  alert("making the verify call")
  return axios.post(baseUrl+"/verifyUser",{
      api_token: api_token,
      userId: userId
    })
    .then((response) => response.data.message )
    .catch( (error) => {
        console.log( "this is an error from verifyUser " + error.response.data.error + " message" + error.response.data.message);
    });
}

export {denyUser};
function denyUser(api_token,userId,rejectedMessage){
  return axios.post(baseUrl+"/rejectUser",{
    api_token : api_token,
    userId : userId,
    rejectedMessage: rejectedMessage
  })
    .then((response) => response.data.message)
    .catch( (error) => {
        alert( "this is an error from auth " + error.response.data.error);
    });
}
