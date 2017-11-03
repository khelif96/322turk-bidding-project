var mongoose = require('mongoose'); // Interface for mongodb

var User = require('../app/models/userSchema');
var Demand = require('../app/models/demandSchema');

exports.createDemand = (req,res) => {
  if(req.body.api_token === undefined){
    res.status(400).json({error: "Missing api_token in request"});
  }else if(req.body.title  === undefined || req.body.content === undefined){
    res.status(201).json({erro: "Incomplete Request"})
  }else{
    User.findOne({api_token: req.body.api_token},function(err,doc){
      if(!doc || err){
        res.status(401).json({error: "Invalid api_token"});
      }else{
        var tempDemand = new Demand();
        tempDemand.title = req.body.title;
        tempDemand.content = req.body.content;
        tempDemand.ownerId = doc._id;
        doc.projects.push(tempDemand);
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
  if(req.body.api_token === undefined){
    res.status(400).json({error: "Missing api_token in request"});
  }else{
    console.log(new mongoose.Types.ObjectId(req.body.demandId));
    Demand.find({_id : new mongoose.Types.ObjectId(req.body.demandId)},function(err,doc){
      if(!doc || err){
        res.json({error: "invalid demand id", expanded: err});
      }
      console.log(doc);
      res.send(doc);
    })
  }
};

exports.registerUser = (req,res) => {
  if(req.body.email === undefined || req.body.password === undefined){
    res.status(400);
    res.json({error: "Missing email or password in request"});
  }else{
    User.find({email: new RegExp(req.body.email, 'i')}, function (err,docs){
      if(!docs.length){
        var tempUser = new User();
        tempUser.email = req.body.email;
        tempUser.api_token = rack();
        tempUser.userType = "Client"; // By Default everyone starts off as a client
        bcrypt.hash(req.body.password, saltRounds, function(err,hash){
          tempUser.password_hash = hash;
          tempUser.save(function(err){
            if(err){
            // console.log("ERROR");
              res.send(err);
          }

          res.status(201);
          res.json({"api_token":tempUser.api_token} );
          // res.status(201);
          // res.json({api_token: tempUser.api_token, status: "Successfully Created User"});
        });

      });
      }else{

        res.status(400);
        res.json({error:"Email belongs to another user"});
      }
    });
  }
};
