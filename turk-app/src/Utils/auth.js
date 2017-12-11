import axios from 'axios';
import baseUrlDomain from '../Assets/baseUrl'
const baseUrl = baseUrlDomain+":3001/api";
console.log(baseUrl);
export {login};
function login(userName,Password) {
  console.log("Logging in");
  // alert("logging in ");
  return axios.post(baseUrl+"/loginUser", {
      email: userName,
      password: Password
    })
    .then((response) => response.data.api_token )
    .catch( (error) =>  {
      this.OpenPopUp(error.response.data.error )
    });
}
export {registerUser};
function registerUser(Username,Password,Email,FirstName,LastName,UserType, Interests){
  return axios.post(baseUrl+"/registerUser",{
      email: Email,
      userName: Username,
      password: Password,
      name : {
        first : FirstName,
        last : LastName
      },
      userType : UserType,
      interests : Interests
    })
    .then((message) => this.OpenPopUp( "Your account is waiting for Approval") )
    .catch( (error) => {
      this.OpenPopUp(error.response.data.error)
    });
}

export {retrieveDemands};
function retrieveDemands(){
  return axios.get(baseUrl+"/demands")
    .then((response) => response.data )
    .catch( (error) => {
        alert( "this is an error from auth " + error.message);
    });
}

export {retrieveVerifiedDevelopers};
function retrieveVerifiedDevelopers(){
  return axios.get(baseUrl+"/getVerifiedDevelopers")
    .then((response) => response.data )
    .catch( (error) => {
        alert( "this is an error from auth " + error.message);
    });
}

export {retrieveVerifiedClients};
function retrieveVerifiedClients(){
  return axios.get(baseUrl+"/getVerifiedClients")
    .then((response) => response.data )
    .catch( (error) => {
        alert( "this is an error from auth " + error.message);
    });
}

export {registerDemand};
function registerDemand(Title,Content,API_token, ExpDate, Tags){
  return axios.post(baseUrl+"/createDemand",{
      title: Title,
      content: Content,
      api_token: API_token,
      date : ExpDate,
      tags : Tags
    })
    .then( (response) => {
      this.props.history.push(`/demands/${response.data.demandId}`)
    } )
    .catch( (error) => {
        this.openRegisterMessage(error.response.data.error)
    });
}


export {protestWarning};
function protestWarning(API_token){
  return axios.post(baseUrl+"/protestWarning",{
      api_token: API_token,
    })
    .then( (response) =>  response.data  )
    .catch( (error) => {
        alert(error.response.data.error)
    });
}

export {addFunds};
function addFunds(API_token,newFunds){
  return axios.post(baseUrl+"/addFunds",{
      api_token: API_token,
      amount : newFunds
    })
    .then( (response) =>  alert("Successful Admission")  )
    .catch( (error) => error.response.data.error );
}

export {updateUser};
function updateUser(API_token,Interests,SampleWork,Resume){
  return axios.post(baseUrl+"/updateUser",{
      api_token: API_token,
      interests : Interests,
      sampleWork : SampleWork,
      resume : Resume
    })
    .then( (response) =>  alert("Successful Update")  )
    .catch( (error) => error.response.data.error );
}
