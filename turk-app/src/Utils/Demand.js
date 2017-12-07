import axios from 'axios';

const baseUrl = "http://localhost:3001/api";

export {getDemandbyID};
function getDemandbyID(DemandId){
  return axios.get(baseUrl + "/demands/" + DemandId )
  .then( response =>  response.data )
  .catch((error) => {  });
}

export {submitProduct};
function submitProduct(DemandId, Product, API_token){
    return axios.post(baseUrl + "/submitProduct", {
        api_token : API_token,
        finishedProduct : Product,
        demandId : DemandId
    })
    .then((response) => this.openProductMessage("bid submission successful" ))
    .catch((error) => {
      this.openProductMessage("error: " + error.response.data.error);
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
    .then((response) => this.openBidMessage("bid submission successful" ))
    .catch((error) => {
      this.openBidMessage("error: " + error.response.data.error);
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
      alert("This is an error from chooseBidder " + error.response.data.error);
    });
}
export{searchDemands};
function searchDemands(Input){
    return axios.post(baseUrl + "/searchDemands", {
        input : Input
    })
    .then((response) =>  response.data )
    .catch((error) => { });
}
