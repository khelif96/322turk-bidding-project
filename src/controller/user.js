var mongoose = require('mongoose'); // Interface for mongodb

var User = require('../app/models/userSchema');

exports.isDeveloper = (req,res,next) => {
  User.findOne({api_token: req.body.api_token}, '-password_hash' ,function(err,userDoc){
      if(!userDoc || err){
          res.status(401).json({error: "Invalid api_token"});
      }
      else{
        if(userDoc.userType === "Developer"){
          next();
        }else{
          res.status(400).json({error: "You need to be a Developer to use this action"});
        }
      }
  });
}

exports.isClient = (req,res,next) => {
  User.findOne({api_token: req.body.api_token}, '-password_hash' ,function(err,userDoc){
      if(!userDoc || err){
          res.status(401).json({error: "Invalid api_token"});
      }
      else{
        if(userDoc.userType === "Client"){
          next();
        }else{
          res.status(400).json({error: "You need to be a Client to use this action"});
        }
      }
  });
}

exports.getUserByApiToken = (req,res) => {
    User.findOne({api_token: req.params.api_token}, '-password_hash' ,function(err,userDoc){
        if(!userDoc || err){
            res.status(401).json({error: "Invalid api_token"});
        }
        else{
            res.send(userDoc);
        }
    });
}
