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
exports.isBlacklist = (req,res,next) => {
  User.findOne({api_token: req.body.api_token}, '-password_hash' ,function(err,userDoc){
      if(!userDoc || err){
          res.status(401).json({error: "Invalid api_token"});
      }
      else{
        if(userDoc.blacklist === false){
          next();
        }else{
          res.status(400).json({error: "Your account is Blacklisted "});
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

exports.getUserById = (req,res) => {
  User.findById(req.params.userId, '-password_hash', function(err,user){
    if(!user || err){
      res.status(401).json({error: "Could not find user"});
    }else{
      res.send(user);
    }
  })
}

exports.getTopClients = (req,res) => {
  User.find({accountApproved:true,userType:"Client"},'-password_hash').sort({projectCount:-1}).exec(function(err,users){
    if(!users || err){
      res.status(404).json({error: "Didnt find any users"})
    }else{
      res.send(users);
    }
  });
}

exports.getTopDevs = (req,res) => {
  User.find({accountApproved:true,userType:"Developer"},'-password_hash').sort({funds:-1}).exec(function(err,users){
    if(!users || err){
      res.status(404).json({error: "Didnt find any users"})
    }else{
      res.send(users);
    }
  });
}

exports.getVerifiedDevelopers = (req,res) => {
  User.find({accountApproved : true, userType : "Developer"}, function(err,users){
    if(!users || err){
      res.status(400).json({error: "Could not find matching users"});
    }else{
      res.send(users);
    }
  })
}

exports.getVerifiedClients = (req,res) => {
  User.find({accountApproved : true, userType : "Client"}, function(err,users){
    if(!users || err){
      res.status(400).json({error: "Could not find matching users"});
    }else{
      res.send(users);
    }
  })
}

exports.searchUsers = (req, res) => {
    if(req.body.input === undefined){
        res.status(404).json({error: "search field empty"});
    }
    else{
        var arr = (req.body.input).split(/\s* \s*/);
        User.find({tags : {$in : arr}}, function (err,docs){
            if(!docs.length || err){
                res.status(404).json({error: "Could not find any users"});
            }
            else{
                res.send(docs);
            }
        });
    }
}

exports.getAlerts = (req, res) =>{
    User.findOne({api_token: req.body.api_token},function(err, userDoc){
       if(!userDoc || err){
          res.status(401).json({error: "Invalid api_token"});
       }
       else{
           res.send(userDoc.accountAlerts);
       }
   });
}
