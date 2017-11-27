var mongoose = require('mongoose'); // Interface for mongodb
var User = require('../../app/models/userSchema');



// Middle wear to check if api_token is in request
exports.checkAuth = (req,res,next) => {
  if(req.body.api_token === undefined){
    res.status(400).json({"error": "Missing api_token in request"});
  }else{
    console.log("Checking Super User auth");

    User.findOne({api_token: req.body.api_token},function(err,doc){
      if(!doc || err){
        res.status(404).json({error: "Could not find User"});
      }else{
        if(doc.userType === "Super_User"){
          console.log("Super User Approved");
          next();
        }else{
          res.json({error: "You do not have access to this route"});
        }
      }
    });
}
}
