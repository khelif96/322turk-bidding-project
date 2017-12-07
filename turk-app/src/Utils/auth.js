import axios from 'axios';
const baseUrl = "http://localhost:3001/api";

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
function registerUser(Username,Password,Email,FirstName,LastName,UserType){
  return axios.post(baseUrl+"/registerUser",{
      email: Email,
      userName: Username,
      password: Password,
      name : {
        first : FirstName,
        last : LastName
      },
      userType : UserType
    })
    .then((message) => alert(message + " success") )
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

export {registerDemand};
function registerDemand(Title,Content,API_token, ExpDate){
  return axios.post(baseUrl+"/createDemand",{
      title: Title,
      content: Content,
      api_token: API_token,
      date : ExpDate
    })
    .then((response) => {alert("Over here" + response.data.message)} )
    .catch( (error) => {
        alert( "this is an error from register " + error.response.data.error);
    });
}
