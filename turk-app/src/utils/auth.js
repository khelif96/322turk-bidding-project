import axios from 'axios';
const baseUrl = "http://localhost:3001/api";

export {login};
function login(userName,Password) {
  console.log("Logging in");
  // alert("logging in ");
  axios.post(baseUrl+"/loginUser", {
      email: userName,
      password: Password
    })
    .then(function (response) {
      console.log("Response " + response.data.api_token);
      alert("REsponse " + response.data.api_token);
    })
    .catch(function (error) {
      console.log(error);
      alert("Error " + error);
    });
}
