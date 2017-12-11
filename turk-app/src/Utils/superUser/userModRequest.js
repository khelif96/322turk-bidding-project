import axios from 'axios';
import baseUrlDomain from '../../Assets/baseUrl'
const baseUrl = baseUrlDomain+":3001/sudoApi";

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
  // alert("making the verify call")
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


export {getTransactions};
function getTransactions(API_token) {
  // console.log("Logging in");
  // alert("Making request");
  // alert("logging in ");
  return axios.post(baseUrl+"/getTransactions", {
      "api_token" : API_token
    })
    .then((response) => response.data)
    .catch( (error) => {
      console.log(error);
      alert("Error " + error.response.data.error);
    });
}

export {approveTransactionFunds};
function approveTransactionFunds(transactionId,API_token) {
  // console.log("Logging in");
  // alert("Making request");
  // alert("logging in ");
  return axios.post(baseUrl+"/approveTransaction", {
      "api_token" : API_token,
      "transactionId": transactionId
    })
    .then((response) => response.data)
    .catch( (error) => {
      console.log(error);
      alert("Error " + error.response.data.error);
    });
}

export {approveTransactionPayment};
function approveTransactionPayment(transactionId,API_token,reason,amount,rating) {
  // console.log("Logging in");
  // alert("Making request");
  // alert("logging in ");
  return axios.post(baseUrl+"/approveTransaction", {
      "api_token" : API_token,
      "transactionId": transactionId,
      "amount" : amount,
      "message" : reason,
      "rating" : rating
    })
    .then((response) => response.data)
    .catch( (error) => {
      console.log(error);
      alert("Error " + error.response.data.error);
    });
}
