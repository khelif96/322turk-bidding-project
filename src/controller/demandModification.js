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
  if(req.body.api_token === undefined || req.params.demandId === undefined){
    res.status(400).json({error: "INVALID Request"});
  }else{
    // console.log(new mongoose.Types.ObjectId(req.body.demandId));
    Demand.findById(req.params.demandId,function(err,demandDoc){
      if(!demandDoc || err){
        res.json({error: "invalid demand id", expanded: err});
      }else{
        User.findById(demandDoc.ownerId,function(err,userDoc){
          if(!userDoc || err){
            res.status(400).json({error: "Could not find internal userId Report error to ADMIN"});
          }else{
            if(req.body.api_token === userDoc.api_token){

              if(req.body.hasOwnProperty("title")){
                demandDoc.title = req.body.title;
              }
              if(req.body.hasOwnProperty("content")){
                demandDoc.content = req.body.content;
              }
              if(req.body.hasOwnProperty("isActive")){
                demandDoc.isActive = req.body.isActive;
              }

              demandDoc.save(function(err){
                if(err){
                  res.send(err);
                }
              });
              res.send(demandDoc);
            }else{
              res.status(400).json({error : "Invalid Api Request, You do not have access to this function"});
            }

            // console.log(doc);
          }
        }
      );
    }
  });
}
};

exports.bidOnDemand = (req, res) => { // Need to check if user is of Developer type
   User.findOne({api_token: req.body.api_token},function(err, userDoc){
      if(!userDoc || err){
         res.status(401).json({error: "Invalid api_token"});
      }
      else{
         Demand.findById(req.body.demandId,function(err, demand){
            if(!demand || err){
               res.status(404).json({error: "Can not find Demand"});
            }
            else{
               var i;
               // Check to see if there's a bid already placed by this developer
               // If there is remove it
               for(i = 0; i < demand.totalBids.length; i++){
                  if(demand.totalBids[i].devId == userDoc._id) demand.totalBids.splice(i, 1);
               }
               var bid = {
                  "bidAmount" : req.body.bidAmount,
                  "devId" : userDoc._id
               }
               console.log(demand);
               // Ensure sorted from least to greatest by bidAmount
               var i = demand.totalBids.length - 1;
               while((i > 0) && (demand.totalBids[i - 1].bidAmount > bid.bidAmount)){
                  i = i - 1;
               }
               // Place bid in correct position
               demand.totalBids.splice(i, 0, bid);
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

// Need to prodive check for if chosen developer is the lowest or not
// Also need to check if sufficient funds for chosen developer
exports.approveBidder = (req, res) =>{
   if(req.body.winningDev === undefined || req.body.demandId === undefined){ // Ensure dev ID passed
      res.status(404).json({error: "Incomplete request"});
   }
   else{
      Demand.findById(req.body.demandId,function(err, demand){
         if(!demand || err){
            res.json({error: "invalid demand id", expanded: err});
         }
         else{
            User.findOne({api_token: req.body.api_token},function(err,userDoc){
               if(!userDoc || err){
                  res.status(401).json({error: "Invalid api_token"});
               }
               else{
                  if(userDoc._id === demand.ownerId){
                     if(demand.winningBid === undefined){
                        var found = false;
                        for(i = 0; i < demand.totalBids.length; i++){
                           if(demand.totalBids[i].devId === req.body.winningDev){
                              found = true;
                              var winner = {
                                 "winAmount" : demand.totalBids[i].bidAmount,
                                 "winDev" : demand.totalBids[i].devId
                              }
                              demand.winningBid = winner;
                              demand.save(function(err){
                                 if(err) {
                                    res.status(500).json({error: "Error Saving entry"});
                                 }
                                 else{
                                    res.status(200).json({message: "Successfully Approved Bidder"});
                                 }
                              });
                              break;
                           }
                        }
                        if(!found) res.status(401).json({error: "Winning developer never placed a bid on demand. This should never print"});
                     }
                     else{
                        res.status(401).json({error: "Winning developer already chosen for this demand"});
                     }
                  }
                  else{
                     res.status(401).json({error: "User and demand owner do not match"});
                  }
               }
            });
         }
      });
   }
}
