var mongoose = require('mongoose'); // Interface for mongodb

var User = require('../app/models/userSchema');
var Demand = require('../app/models/demandSchema');

exports.createDemand = (req,res) => {
  if(req.body.api_token === undefined){
    res.status(400).json({error: "Missing api_token in request"});
  }else if(req.body.title  === undefined || req.body.content === undefined){
    res.status(201).json({error: "Incomplete Request"})
  }else{
    User.findOne({api_token: req.body.api_token},function(err,doc){
      if(!doc || err){
        res.status(401).json({error: "Invalid api_token"});
      }else{
        var tempDemand = new Demand();
        tempDemand.title = req.body.title;
        tempDemand.content = req.body.content;
        tempDemand.ownerId = doc._id;
        tempDemand.save(function(err){
          if(err){
            res.send(err);
          }
        });
        doc.projects.push(tempDemand._id);

        doc.save(function(err){
          if(err){
          // console.log("ERROR");
            res.send(err);
          }
          res.status(200).json({message: "Successfully Created Note"});
        });
      }
    });
  }
  // res.json({message: "/loginUser Route"});
};

exports.editDemand = (req,res) => {
  console.log("Connection Made");
  if(req.body.api_token === undefined || req.body.demandId === undefined){
    res.status(400).json({error: "INVALID Request"});
  }else{
    // console.log(new mongoose.Types.ObjectId(req.body.demandId));
    Demand.find({_id : req.body.demandId},function(err,demandDoc){
      if(!demandDoc || err){
        res.json({error: "invalid demand id", expanded: err});
      }else{
      User.find({_id: demandDoc.ownerId},function(err,userDoc){
        if(!userDoc || err){
          res.status(400).json({error: "Could not find internal userId Report error to ADMIN"});
        }else{
        if(req.body.api_token === userDoc.api_token){
          if(req.body.hasOwnProperty(title)){
            demandDoc.title = req.body.title;
          }

          demandDoc.save(function(err){
            if(err){
              res.send(err);
            }
          });
          res.send(demandDoc);
        }else{
          res.status(400).json({error : "Invalid Api Request"});
        }

      // console.log(doc);
    }
  }
    );
  }
});
  }
};

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

exports.bidOnDemand = (req,res) => {
  User.findOne({api_token: req.body.api_token},function(err,userDoc){
      if(!userDoc || err){
        res.status(401).json({error: "Invalid api_token"});
      }else{
        Demand.findById(req.body.demandId,function(err, demand){
          if(!demand || err){
            res.status(404).json({error: "Can not find Demand"});
          }else{
          var bid = {
            "bidAmount" : req.body.bidAmount,
            "devId" : userDoc._id
          }
          console.log(demand);
          demand.totalBids.push(bid);

          demand.save(function(err){
            if(err){
            console.log("user Save Error");
            res.status(500).json({error: "Error Bidding on this demand"});
          }
          });
          console.log("Sending Response");
          res.status(201).json({message: "Successfully Bid on Demand"});
        }
        });

  }
  });
}
