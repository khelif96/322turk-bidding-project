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

export {submitProduct};
function submitProduct(DemandId, Product, API_token){
    return axios.post(baseUrl + "/submitProduct", {
        api_token : API_token,
        finishedProduct : Product,
        demandId : DemandId
    })
    .then((response) => alert("success : " + response.message))
    .catch((error) => {
      alert("This is an error from submitProduct " + error.message);
    });
}

export {placeBid};
function placeBid(DemandId, BidAmount, Deadline, API_token){
    return axios.post(baseUrl + "/bidOnDemand", {
        api_token : API_token,
        demandId : DemandId,
        bidAmount : BidAmount,
        deadline : Deadline
    })
    .then((response) => alert("success : " + response.message))
    .catch((error) => {
      alert("This is an error from palceBid " + error.message);
    });
}

export {chooseBidder};
function chooseBidder(DemandId, DevId, Reason, API_token){
    return axios.post(baseUrl + "/approveBidder", {
        api_token : API_token,
        demandId : DemandId,
        devId : DevId,
        reason : Reason
    })
    .then((response) => alert("success : " + response.message))
    .catch((error) => {
      alert("This is an error from chooseBidder " + error.message);
    });
}
