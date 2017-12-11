var mongoose = require('mongoose'); // Interface for mongodb

var User = require('../app/models/userSchema');
var Demand = require('../app/models/demandSchema');

exports.createDemand = (req,res) => {
  if(req.body.api_token === undefined){
    res.status(400).json({error: "Missing api_token in request"});
}else if(req.body.title  === undefined || req.body.content === undefined || req.body.date === undefined){
    res.status(201).json({error: "Incomplete Request"})
  }
  else if(req.body.title  == "" || req.body.content == "" || req.body.date == ""){
      res.status(400).json({error: "Cannot leave fields blank"});
  }
  else if(new Date(req.body.date) <= new Date() || new Date(req.body.date) == "Invalid Date"){
      res.status(400).json({error: "Invalid date"});
  }else{
    User.findOne({api_token: req.body.api_token},function(err,doc){
      if(!doc || err){
        res.status(401).json({error: "Invalid api_token"});
      }else{
        var tempDemand = new Demand();
        tempDemand.title = req.body.title;
        tempDemand.createdNum = Number(tempDemand.createdDate);
        tempDemand.content = req.body.content;
        tempDemand.ownerId = doc._id;
        tempDemand.expDate = req.body.date;
        if(req.body.tags !== undefined) tempDemand.tags = (req.body.tags).split(/\s* \s*/);
        var arr = (req.body.title).split(/\s* \s*/);
        var i = 0;
        for(i = 0; i < arr.length; i++){
            tempDemand.tags.push(arr[i]);
        }
        tempDemand.save(function(err){
          if(err){
            res.send(err);
          }
        });
        doc.projects.push(tempDemand._id);
        doc.projectCount = doc.projectCount + 1;
        doc.save(function(err){
          if(err){
          // console.log("ERROR");
            res.send(err);
          }
          res.status(200).json({"demandId":tempDemand._id});
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
          }
        }
      );
    }
  });
}
};

exports.bidOnDemand = (req, res) => {
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
               if(req.body.bidAmount === undefined || parseInt(req.body.bidAmount) < 1){
                  res.status(401).json({error: "Invalid bidAmount"});
               }
               else{
                  User.findById(demand.ownerId, function(err, demandOwner){
                      if(!demandOwner || err){
                          res.status(401).json({error: "Can not find demand owner"});
                      }
                      else{
                          if(new Date() > demand.expDate && demand.totalBids.length == 0){
                              User.findOne({userType: "Super_User"}, function(err, superUser){
                                  if(!superUser || err){
                                      res.status(401).json({error: "There is a major problem. No super user"});
                                  }
                                  else{
                                      demand.isActive = false;
                                      if(demandOwner.funds >= 10){
                                          superUser.funds = superUser.funds + 10;
                                          demandOwner.funds = demandOwner.funds - 10;
                                      }
                                      else{
                                          superUser.funds = superUser.funds + demandOwner.funds;
                                          demandOwner.funds = 0;
                                      }
                                      var i = 0;
                                      for(i = 0; i < demandOwner.projects.length; i++){
                                          if(demandOwner.projects[i] == demand._id){
                                              demandOwner.projects.splice(i, 1);
                                              break;
                                          }
                                      }
                                      superUser.funds = Math.round(superUser.funds * 100) / 100;
                                      demandOwner.funds = Math.round(demandOwner.funds * 100) / 100;
                                      demand.title = "Nullified " + demand.title;
                                      demand.save(function(err){
                                         if(err){
                                            res.status(500).json({error: "Error saving demand"});
                                         }
                                         else{
                                             demandOwner.save(function(err){
                                                if(err){
                                                   res.status(500).json({error: "Error saving client"});
                                                }
                                                else{
                                                    superUser.save(function(err){
                                                       if(err){
                                                          res.status(500).json({error: "Error saving client"});
                                                       }
                                                       else{
                                                           res.status(201).json({message: "Demand removed due to no bidders"});
                                                       }
                                                   });
                                                }
                                            });
                                         }
                                      });
                                  }
                              });
                          }
                          else{
                              if(req.body.deadline === undefined || new Date(req.body.deadline) <= new Date() || new Date(req.body.deadline) == "Invalid Date"){
                                 res.status(401).json({error: "Invalid date for promised deadline"});
                              }
                              else{
                                 if(demand.isActive == false){
                                    res.status(404).json({error: "This demand is closed. Can no longer place bids."});
                                 }
                                 else{
                                    var i;
                                    // First, if the developer placed a bid previously, we remove that bid
                                    for(i = 0; i < demand.totalBids.length; i++){
                                       if(demand.totalBids[i].devId == userDoc._id) demand.totalBids.splice(i, 1);
                                    }
                                    var bid = {
                                       "bidAmount" : req.body.bidAmount,
                                       "devId" : userDoc._id,
                                       "deadline" : req.body.deadline
                                    }
                                    var i = demand.totalBids.length;
                                    // Now when we insert the new bid, we ensure that the bids are ordered from least to greatest
                                    while((i > 0) && (demand.totalBids[i - 1].bidAmount > bid.bidAmount)){
                                       i = i - 1;
                                    }
                                    demand.totalBids.splice(i, 0, bid);
                                    demand.save(function(err){
                                       if(err){
                                          res.status(500).json({error: "Error Bidding on this demand"});
                                       }
                                    });
                                    res.status(201).json({message: "Successfully Bid on Demand"});
                                 }
                              }
                          }
                      }
                  });
               }
            }
         });
      }
   });
}

exports.approveBidder = (req, res) =>{
   if(req.body.devId === undefined || req.body.demandId === undefined){
      res.status(404).json({error: "Incomplete request"});
   }
   else{
      Demand.findById(req.body.demandId,function(err, demand){
         if(!demand || err){
            res.json({error: "invalid demand id", expanded: err});
         }
         else{
            User.findOne({api_token: req.body.api_token},function(err,userClient){
               if(!userClient || err){
                  res.status(401).json({error: "Invalid api_token"});
               }
               else{
                  User.findById(req.body.devId, function(err, userDeveloper){
                     if(!userDeveloper || err){
                        res.status(401).json({error: "Invalid devId"});
                     }
                     else{
                        if(userClient._id == demand.ownerId){
                           if(!demand.devChosen){
                              var found = false;
                              var i;
                              for(i = 0; i < demand.totalBids.length; i++){
                                 if(demand.totalBids[i].devId === req.body.devId){
                                    found = true;
                                    break;
                                 }
                              }
                              if(found){
                                 if(demand.totalBids[i].deadline <= new Date()){
                                    res.status(401).json({error: "Can't choose this developer due to the promised deadline."});
                                 }
                                 else{
                                    if(userClient.funds >= demand.totalBids[i].bidAmount){
                                       if(i != 0){
                                          if(req.body.justification === undefined || req.body.justification == ""){
                                             res.status(404).json({error: "Need to provide a reason for choosing this developer who isn't the lowest bidder."});
                                          }
                                          else{
                                             demand.justification = req.body.justification;
                                             userClient.funds = userClient.funds - (Math.round((0.5 * demand.totalBids[i].bidAmount) * 100) / 100);
                                             userDeveloper.funds = userDeveloper.funds + (Math.round((0.5 * demand.totalBids[i].bidAmount) * 100) / 100);
                                             var winner = {
                                                "bidAmount" : demand.totalBids[i].bidAmount,
                                                "devId" : demand.totalBids[i].devId,
                                                "deadline" : demand.totalBids[i].deadline
                                             }
                                             demand.winningBid = winner;
                                             demand.devChosen = true;
                                             userDeveloper.projects.push(demand._id);
                                             userClient.funds = Math.round(userClient.funds * 100) / 100;
                                             userDeveloper.funds = Math.round(userDeveloper.funds * 100) / 100;
                                             demand.save(function(err){
                                                if(err) {
                                                   res.status(500).json({error: "Error saving winning bid"});
                                                }
                                                else{
                                                   userClient.save(function(err){
                                                      if(err){
                                                         res.status(500).json({error: "Error saving client"});
                                                      }
                                                      else{
                                                         userDeveloper.save(function(err){
                                                            if(err){
                                                               res.status(500).json({error: "Error saving developer"});
                                                            }
                                                            else{
                                                               res.status(201).json({message: "Successfully chose and paid developer"});
                                                            }
                                                         });
                                                      }
                                                   });
                                                }
                                             });
                                          }
                                       }
                                       else{
                                           userClient.funds = userClient.funds - (Math.round((0.5 * demand.totalBids[i].bidAmount) * 100) / 100);
                                           userDeveloper.funds = userDeveloper.funds + (Math.round((0.5 * demand.totalBids[i].bidAmount) * 100) / 100);
                                           var winner = {
                                              "bidAmount" : demand.totalBids[i].bidAmount,
                                              "devId" : demand.totalBids[i].devId,
                                              "deadline" : demand.totalBids[i].deadline
                                           }
                                           demand.winningBid = winner;
                                           demand.devChosen = true;
                                           userDeveloper.projects.push(demand._id);
                                           userClient.funds = Math.round(userClient.funds * 100) / 100;
                                           userDeveloper.funds = Math.round(userDeveloper.funds * 100) / 100;
                                           demand.save(function(err){
                                              if(err) {
                                                 res.status(500).json({error: "Error saving winning bid"});
                                              }
                                              else{
                                                 userClient.save(function(err){
                                                    if(err){
                                                       res.status(500).json({error: "Error saving client"});
                                                    }
                                                    else{
                                                       userDeveloper.save(function(err){
                                                          if(err){
                                                             res.status(500).json({error: "Error saving developer"});
                                                          }
                                                          else{
                                                             res.status(201).json({message: "Successfully chose and paid developer"});
                                                          }
                                                       });
                                                    }
                                                 });
                                              }
                                           });
                                       }
                                    }
                                    else{
                                       res.status(400).json({error: "Not enough funds to choose this bidder"});
                                    }
                                 }
                              }
                              else{
                                 res.status(401).json({error: "Winning developer never placed a bid on demand. This should never print"});
                              }
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
      });
   }
}

exports.submitProduct = (req,res) => {
   if(req.body.api_token === undefined || req.body.demandId === undefined || req.body.finishedProduct === undefined){
      res.status(400).json({error: "Invalid Request"});
   }
   else{
       User.findOne({userType: "Super_User"}, function(err, superUser){
           if(!superUser || err){
               res.status(401).json({error: "There is a major problem. No super user"});
           }
           else{
               Demand.findById(req.body.demandId,function(err, demand){
                  if(!demand || err){
                     res.json({error: "Invalid demand id", expanded: err});
                  }
                  else{
                     User.findOne({api_token: req.body.api_token},function(err, userDeveloper){
                        if(!userDeveloper || err){
                           res.status(401).json({error: "Invalid api_token"});
                        }
                        else{
                           User.findById(demand.ownerId, function(err, userClient){
                              if(!userClient || err){
                                 res.status(401).json({error: "Couldn't find owner of demand."});
                              }
                              else{
                                 if(userDeveloper._id != demand.winningBid.devId){
                                    res.status(400).json({error: "This developer didn't win this demand."});
                                 }
                                 else{
                                    if(req.body.finishedProduct == ""){
                                       res.status(400).json({error: "Product is empty"});
                                    }
                                    else{
                                       if(demand.isActive == false){
                                          res.status(401).json({error: "Product already submitted"});
                                       }
                                       else{
                                           // If the client doesn't have enough funds to pay the developer
                                          if(userClient.funds < (Math.round((0.5 * demand.winningBid.bidAmount) * 100) / 100)){
                                              var i = 0;
                                              for(i = 0; i < userDeveloper.projects.length; i++){
                                                  if(userDeveloper.projects[i] == req.body.demandId){
                                                      userDeveloper.projects.splice(i, 1);
                                                      break;
                                                  }
                                              }
                                              for(i = 0; i < userClient.projects.length; i++){
                                                  if(userClient.projects[i] == req.body.demandId){
                                                      userClient.projects.splice(i, 1);
                                                      break;
                                                  }
                                              }
                                              userClient.warningCount = userClient.warningCount + 1;
                                              if(userClient.warningCount == 2){
                                                 userClient.warningCount = 0;
                                                 userClient.blacklist = true;
                                              }
                                              demand.isActive = false;
                                              demand.devChosen = true;
                                              demand.title = "Nullified " + demand.title;
                                              demand.save(function(err){
                                                 if(err) {
                                                    res.status(500).json({error: "Error Saving product"});
                                                 }
                                                 else{
                                                    userClient.save(function(err){
                                                       if(err){
                                                          res.status(500).json({error: "Error Saving client"});
                                                       }
                                                       else{
                                                          userDeveloper.save(function(err){
                                                             if(err){
                                                                res.status(500).json({error: "Error Saving developer"});
                                                             }
                                                             else{
                                                                 superUser.save(function(err){
                                                                    if(err){
                                                                       res.status(500).json({error: "Error Saving superUser"});
                                                                    }
                                                                    else{
                                                                        res.status(201).json({message: "Successfully saved product."});
                                                                    }
                                                                });
                                                             }
                                                          });
                                                       }
                                                    });
                                                 }
                                              });
                                          }
                                          else{
                                              demand.finishedProduct = req.body.finishedProduct;
                                              demand.isActive = false;
                                              // If the deadline has already passed
                                              if(demand.winningBid.deadline < new Date()){
                                                 userDeveloper.rating = Math.round((userDeveloper.rating + ((1 - userDeveloper.rating)/(userDeveloper.ratingCount + 1))) * 100) / 100;
                                                 userDeveloper.ratingRecieved = Math.round((userDeveloper.ratingRecieved + ((1 - userDeveloper.ratingRecieved)/(userDeveloper.ratingRecievedCount + 1))) * 100) / 100;
                                                 userDeveloper.ratingCount = userDeveloper.ratingCount + 1;
                                                 userDeveloper.ratingRecievedCount = userDeveloper.ratingRecievedCount + 1;
                                                 if(userDeveloper.ratingRecievedCount >= 5 && userDeveloper.ratingRecieved <= 2){
                                                    userDeveloper.ratingRecievedCount = 0;
                                                    userDeveloper.ratingRecievedCount = 0;
                                                    userDeveloper.warningCount = userDeveloper.warningCount + 1;
                                                    if(userDeveloper.warningCount == 2){
                                                       userDeveloper.warningCount = 0;
                                                       userDeveloper.blacklist = true;
                                                    }
                                                 }
                                                 userDeveloper.funds = userDeveloper.funds - (Math.round((0.5 * demand.winningBid.bidAmount) * 100) / 100);
                                                 userClient.funds = userClient.funds + (Math.round((0.5 * demand.winningBid.bidAmount) * 100) / 100);

                                                 if(userDeveloper.funds > (Math.round((0.02 * demand.winningBid.bidAmount) * 100) / 100)){
                                                     userDeveloper.funds = userDeveloper.funds - (Math.round((0.02 * demand.winningBid.bidAmount) * 100) / 100);
                                                     superUser.funds = superUser.funds + (Math.round((0.02 * demand.winningBid.bidAmount) * 100) / 100);
                                                 }
                                                 else{
                                                     superUser.funds = superUser.funds + userDeveloper.funds;
                                                     userDeveloper.funds = 0;
                                                 }
                                              }
                                              else{
                                                 userClient.funds = userClient.funds - (Math.round((0.5 * demand.winningBid.bidAmount) * 100) / 100);
                                                 superUser.funds = superUser.funds + (Math.round((0.5 * demand.winningBid.bidAmount) * 100) / 100);
                                                 var message = {
                                                           messageType : "projectSubmitted",
                                                           description : req.body.finishedProduct,
                                                           senderID : userDeveloper._id,
                                                           demandID : demand._id
                                                       };
                                                 userClient.accountAlerts.push(message);
                                              }
                                              demand.save(function(err){
                                                 if(err) {
                                                    res.status(500).json({error: "Error Saving product"});
                                                 }
                                                 else{
                                                    userClient.save(function(err){
                                                       if(err){
                                                          res.status(500).json({error: "Error Saving client"});
                                                       }
                                                       else{
                                                          userDeveloper.save(function(err){
                                                             if(err){
                                                                res.status(500).json({error: "Error Saving developer"});
                                                             }
                                                             else{
                                                                 superUser.save(function(err){
                                                                    if(err){
                                                                       res.status(500).json({error: "Error Saving superUser"});
                                                                    }
                                                                    else{
                                                                        res.status(201).json({message: "Successfully saved product."});
                                                                    }
                                                                });
                                                             }
                                                          });
                                                       }
                                                    });
                                                 }
                                              });
                                          }
                                       }
                                    }
                                 }
                              }
                           });
                        }
                     });
                  }
               });
           }
       });
   }
}
