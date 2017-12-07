var mongoose = require('mongoose'); // Interface for mongodb

var User = require('../app/models/userSchema');
var Demand = require('../app/models/demandSchema');


exports.getAllDemands = (req,res) => {
    Demand.find({}, function (err,docs){
      if(!docs.length || err){
        res.status(404);
        res.json({error: "Could not find any thing"})
      }else{
          res.status(200);
          res.send(docs);
          // res.status(201);
          // res.json({api_token: tempUser.api_token, status: "Successfully Created User"});
        }
        });
  };

exports.getDemand = (req,res) => {
  Demand.findById(req.params.demandId,function(err,doc){
    if(!doc || err){
      res.status(404).json({error: "Could not find Demand"});
    }else{
      if(req.params.expanded == "true"){
        User.findById(doc.ownerId, '-password_hash -api_token' ,function(err,user){
          if(!user | err){
            res.json({error: "error"});
          }else{
            console.log("Reached");
            doc.ownerProfile = user;
            res.send(doc);
          }
        });
      }else{
      res.send(doc);
    }
    }
  });
}

exports.getMyDemands = (req,res) => {
    User.findOne({api_token: req.params.api_token},function(err, userDoc){
        if(!userDoc || err){
            res.status(401).json({error: "Invalid api_token"});
        }
        else{
            Demand.find({_id : {$in : userDoc.projects}}, function (err,docs){
                if(!docs.length || err){
                    res.status(404).json({error: "Could not find anything"});
                }
                else{
                    res.send(docs);
                }
            });
        }
    });
}
