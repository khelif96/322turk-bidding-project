var User = require('../app/models/userSchema');

exports.addFunds = (req, res) =>{
   if(req.body.amount === undefined){
      res.status(404).json({error: "amount isn't specified"});
   }
   else{
      User.findOne({api_token: req.body.api_token},function(err, userDoc){
         if(!userDoc || err){
            res.status(401).json({error: "Invalid api_token"});
         }
         else{
            if(parseInt(req.body.amount) > 0){
               userDoc.funds = userDoc.funds + parseInt(req.body.amount);
               userDoc.save(function(err){
                  if(err){
                     res.status(500).json({error: "Error adding funds"});
                  }
               });
               res.status(201).json({message: "Successfully added funds"});
            }
            else{
               res.status(400).json({error: "Invalid amount"});
            }
         }
      });
   }
}

exports.giveRating = (req, res) =>{
    if(req.body.rating === undefined || req.body.demandId === undefined){
        res.status(404).json({error: "Incomplete request"});
    }
    else{
        Demand.findById(req.body.demandId,function(err, demand){
            if(!demand || err){
                res.status(404).json({error: "Can not find Demand"});
            }
            else{
                User.findOne({api_token: req.body.api_token},function(err, userDoc){
                    if(!userDoc || err){
                        res.status(401).json({error: "Invalid api_token"});
                    }
                    else{
                        if(parseInt(req.body.rating) > 0 && parseInt(req.body.rating) < 6){
                            res.status(401).json({error: "Invalid rating"});
                        }
                        else{
                            if(userDoc.userType == "Developer"){
                                if(demand.devRated){
                                    res.status(400).json({error: "Already gave a rating for this project."});
                                }
                                else{
                                    User.findById(demand.ownerId, function(err, userClient){
                                        userClient.rating = Math.round((userClient.rating + ((parseInt(req.body.rating) - userClient.rating)/(userClient.ratingCount + 1))) * 100) / 100;
                                        demand.devRated = true;
                                        if(parseInt(req.body.rating) <= 2){
                                            userClient.badRatingRecieved = userClient.badRatingRecieved + 1;
                                            if(userClient.badRatingRecieved == 5){
                                                userClient.badRatingRecieved = 0;
                                                userClient.warningCount = userClient.warningCount + 1;
                                                if(userClient.warningCount == 2){
                                                    userClient.warningCount = 0;
                                                    userClient.blacklist = true;
                                                }
                                            }
                                        }
                                        if(parseInt(req.body.rating) < 2 || parseInt(req.body.rating) > 4){
                                            userDoc.badRatingGiven = userDoc.badRatingGiven + 1;
                                            if(userDoc.badRatingGiven == 8){
                                                userDoc.badRatingGiven = 0;
                                                userDoc.warningCount = userDoc.warningCount + 1;
                                                if(userDoc.warningCount == 2){
                                                    userDoc.warningCount = 0;
                                                    userDoc.blacklist = true;
                                                }
                                            }
                                        }
                                        userClient.save(function(err){
                                            if(err){
                                                res.status(500).json({error: "Error Saving client"});
                                            }
                                            else{
                                                userDoc.save(function(err){
                                                    if(err){
                                                        res.status(500).json({error: "Error Saving Developer"});
                                                    }
                                                    else{
                                                        demand.save(function(err){
                                                            if(err){
                                                                res.status(500).json({error: "Error Saving demand"});
                                                            }
                                                            else{
                                                                res.status(201).json({message: "Successfully saved rating."});
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    });
                                }
                            }
                            else if(userDoc.userType == "Client"){
                                if(demand.clientRated){
                                    res.status(400).json({error: "Already gave a rating for this project."});
                                }
                                else{
                                    User.findById(demand.ownerId, function(err, userDeveloper){
                                        userDeveloper.rating = Math.round((userDeveloper.rating + ((parseInt(req.body.rating) - userDeveloper.rating)/(userDeveloper.ratingCount + 1))) * 100) / 100;
                                        demand.clientRated = true;
                                        if(parseInt(req.body.rating) <= 2){
                                            userDeveloper.badRatingRecieved = userDeveloper.badRatingRecieved + 1;
                                            if(userDeveloper.badRatingRecieved >= 5){
                                                userDeveloper.badRatingRecieved = 0;
                                                userDeveloper.warningCount = userDeveloper.warningCount + 1;
                                                if(userDeveloper.warningCount == 2){
                                                    userDeveloper.warningCount = 0;
                                                    userDeveloper.blacklist = true;
                                                }
                                            }
                                        }
                                        if(parseInt(req.body.rating) >= 3){
                                            userDoc.funds = userDoc.funds - (Math.round((0.5 * demand.winningBid.bidAmount) * 100) / 100);
                                            userDeveloper.funds = userDeveloper.funds + (Math.round((0.5 * demand.winningBid.bidAmount) * 100) / 100);
                                        }
                                        else{
                                            // TODO contact super user
                                        }
                                        if(parseInt(req.body.rating) < 2 || parseInt(req.body.rating) > 4){
                                            userDoc.badRatingGiven = userDoc.badRatingGiven + 1;
                                            if(userDoc.badRatingGiven >= 8){
                                                userDoc.badRatingGiven = 0;
                                                userDoc.warningCount = userDoc.warningCount + 1;
                                                if(userDoc.warningCount == 2){
                                                    userDoc.warningCount = 0;
                                                    userDoc.blacklist = true;
                                                }
                                            }
                                        }
                                        userDeveloper.save(function(err){
                                            if(err){
                                                res.status(500).json({error: "Error Saving client"});
                                            }
                                            else{
                                                userDoc.save(function(err){
                                                    if(err){
                                                        res.status(500).json({error: "Error Saving Developer"});
                                                    }
                                                    else{
                                                        demand.save(function(err){
                                                            if(err){
                                                                res.status(500).json({error: "Error Saving demand"});
                                                            }
                                                            else{
                                                                res.status(201).json({message: "Successfully saved rating."});
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    });
                                }
                            }
                        }
                    }
                });
            }
        });
    }
}
