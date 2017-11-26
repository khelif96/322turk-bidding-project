var mongoose = require('mongoose'); // Interface for mongodb

var User = require('../../app/models/userSchema');

// Get all users in database
exports.getAllUsers = (req,res) => {
    User.find({}, function (err,users){
      if(!users.length || err){
        res.status(404);
        res.json({error: "Could not find any thing"})
      }else{
          res.status(200);
          res.send(users);
          // res.status(201);
          // res.json({api_token: tempUser.api_token, status: "Successfully Created User"});
        }
        });
  };

// Get individual User
exports.getUser = (req,res) => {
  User.findById(req.params.userId,function(err,doc){
    if(!doc || err){
      res.status(404).json({error: "Could not find User"});
    }else{
      res.send(doc);
    }
  })
};


exports.getUnverifiedUsers = (req,res) => {
  User.find({accountApproved : false}, function(err,users){
    if(!users || err){
      res.status(400).json({error: "Could not find matching users"});
    }else{
      res.send(users);
    }
  })
}

exports.verifyUser = (req,res) => {
  User.findById(req.body.userId, function(err,user){
    if(!user || err){
      res.status(400).json({error: "could not find user"});
    }else{
      user.accountApproved = true;
      user.save(function(err){
        if(err){
          res.status(500).json({error: "Error updating user"});
        }else{
          res.status(200).json({message: "Success"});

        }
      })
    }
  })
}

exports.rejectUser = (req,res) => {
  if(req.body.rejectedMessage === undefined){
    res.status(400).json({error: "Invalid Request"});
  }else{
  User.findById(req.body.userId, function(err,user){
    if(!user || err){
      res.status(400).json({error: "could not find user"});
    }else{
      user.accountApproved = false;
      user.accountAlerts.push({"message": req.body.rejectedMessage});
      user.save(function(err){
        if(err){
          res.status(500).json({error: "Error updating user"});
        }else{
          res.status(200).json({message: "Success"});

        }
      })
    }
  })
}
}
