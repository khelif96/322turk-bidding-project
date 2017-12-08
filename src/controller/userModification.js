var User = require('../app/models/userSchema');
var Demand = require('../app/models/demandSchema');

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
            if(req.body.amount > 0){
               userDoc.funds = userDoc.funds + req.body.amount;
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
        User.findOne({userType: "Super_User"}, function(err, superUser){
            if(!superUser || err){
                res.status(401).json({error: "There is a major problem. No super user"});
            }
            else{
                Demand.findById(req.body.demandId,function(err, demand){
                    if(!demand || err){
                        res.status(404).json({error: "Can not find Demand"});
                    }
                    else{

                        if( req.body.rating < 0 || req.body.rating > 5){
                            res.status(401).json({error: "Invalid rating"});

                        if(demand.isActive){
                            res.status(404).json({error: "You can't give a rating for this demand yet"});

                        }
                        else{
                            User.findOne({api_token: req.body.api_token},function(err, userDoc){
                                if(!userDoc || err){
                                    res.status(401).json({error: "Invalid api_token"});
                                }
                                else{
                                    if(!(req.body.rating > 0 && req.body.rating < 6)){
                                        res.status(401).json({error: "Invalid rating"});
                                    }
                                    else{
                                        if(userDoc.userType == "Developer"){
                                            if(demand.devRated){
                                                res.status(400).json({error: "Developer already gave a rating for this project."});
                                            }
                                            else{
                                                User.findById(demand.ownerId, function(err, userClient){
                                                    if(!userClient || err){
                                                        res.status(404).json({error: "Can not find the owner of this demand"});
                                                    }
                                                    else{
                                                        if(req.body.rating <= 2 && req.body.justification === undefined){
                                                            res.status(400).json({error: "A paragraph reason must be provided for this low reason."});
                                                        }
                                                        else{
                                                            if(req.body.justification !== undefined) demand.devRating.reason = req.body.justification;
                                                            demand.devRating.rating = req.body.rating;
                                                            userClient.rating = Math.round((userClient.rating + ((req.body.rating - userClient.rating)/(userClient.ratingCount + 1))) * 100) / 100;
                                                            userClient.ratingRecieved = Math.round((userClient.ratingRecieved + ((req.body.rating - userClient.ratingRecieved)/(userClient.ratingRecievedCount + 1))) * 100) / 100;
                                                            userClient.ratingCount = userClient.ratingCount + 1;
                                                            userClient.ratingRecievedCount = userClient.ratingRecievedCount + 1;
                                                            demand.devRated = true;
                                                            if(userClient.ratingRecievedCount >= 5 && userClient.ratingRecieved <= 2){
                                                               userClient.ratingRecievedCount = 0;
                                                               userClient.ratingRecievedCount = 0;
                                                               userClient.warningCount = userClient.warningCount + 1;
                                                               if(userClient.warningCount == 2){
                                                                  userClient.warningCount = 0;
                                                                  userClient.blacklist = true;
                                                               }
                                                            }

                                                            userDoc.ratingGiven = Math.round((userDoc.ratingGiven + ((req.body.rating - userDoc.ratingGiven)/(userDoc.ratingGivenCount + 1))) * 100) / 100;
                                                            userDoc.ratingGivenCount = userDoc.ratingGivenCount + 1;
                                                            if((userDoc.ratingGiven < 2 || userDoc.ratingGiven > 4) && (userDoc.ratingGivenCount >= 8)){
                                                                userDoc.ratingGiven = 0;
                                                                userDoc.ratingGivenCount = 0;
                                                                userDoc.warningCount = userDoc.warningCount + 1;
                                                                if(userDoc.warningCount == 2){
                                                                   userDoc.warningCount = 0;
                                                                   userDoc.blacklist = true;
                                                                }
                                                            }
                                                            userClient.save(function(err){
                                                                if(err){
                                                                    res.status(500).json({error: "Error Saving Client"});
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
                                                                                    superUser.save(function(err){
                                                                                        if(err){
                                                                                            res.status(500).json({error: "Error Saving superUser"});
                                                                                        }
                                                                                        else{
                                                                                            res.status(201).json({message: "Successfully saved rating."});
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
                                                });
                                            }
                                        }
                                        else if(userDoc.userType == "Client"){
                                            if(demand.clientRated){
                                                res.status(400).json({error: "Client already gave a rating for this project."});
                                            }
                                            else{
                                                User.findById(demand.winningBid.devId, function(err, userDeveloper){
                                                    if(!userDeveloper || err){
                                                        res.status(404).json({error: "Can not find the winning developer of this demand"});
                                                    }
                                                    else{
                                                        if(req.body.rating <= 2 && req.body.justification === undefined){
                                                            res.status(400).json({error: "A paragraph reason must be provided for this low reason."});
                                                        }
                                                        else{
                                                            if(req.body.justification !== undefined) demand.clientRating.reason = req.body.justification;
                                                            demand.clientRating.rating = req.body.rating;
                                                            userDeveloper.rating = Math.round((userDeveloper.rating + ((req.body.rating - userDeveloper.rating)/(userDeveloper.ratingCount + 1))) * 100) / 100;
                                                            userDeveloper.ratingRecieved = Math.round((userDeveloper.ratingRecieved + ((req.body.rating - userDeveloper.ratingRecieved)/(userDeveloper.ratingRecievedCount + 1))) * 100) / 100;
                                                            userDeveloper.ratingCount = userDeveloper.ratingCount + 1;
                                                            userDeveloper.ratingRecievedCount = userDeveloper.ratingRecievedCount + 1;
                                                            demand.clientRated = true;
                                                            if(userDeveloper.ratingRecievedCount >= 5 && userDeveloper.ratingRecieved <= 2){
                                                               userDeveloper.ratingRecievedCount = 0;
                                                               userDeveloper.ratingRecievedCount = 0;
                                                               userDeveloper.warningCount = userDeveloper.warningCount + 1;
                                                               if(userDeveloper.warningCount == 2){
                                                                  userDeveloper.warningCount = 0;
                                                                  userDeveloper.blacklist = true;
                                                               }
                                                            }
                                                            if(req.body.rating >= 3){
                                                                superUser.funds = superUser.funds - (Math.round((0.5 * demand.winningBid.bidAmount) * 100) / 100);
                                                                userDeveloper.funds = userDeveloper.funds + (Math.round((0.5 * demand.winningBid.bidAmount) * 100) / 100);
                                                            }
                                                            else{
                                                                // TODO contact super user
                                                            }
                                                            userDoc.ratingGiven = Math.round((userDoc.ratingGiven + ((req.body.rating - userDoc.ratingGiven)/(userDoc.ratingGivenCount + 1))) * 100) / 100;
                                                            userDoc.ratingGivenCount = userDoc.ratingGivenCount + 1;
                                                            if((userDoc.ratingGiven < 2 || userDoc.ratingGiven > 4) && (userDoc.ratingGivenCount >= 8)){
                                                                userDoc.ratingGiven = 0;
                                                                userDoc.ratingGivenCount = 0;
                                                                userDoc.warningCount = userDoc.warningCount + 1;
                                                                if(userDoc.warningCount == 2){
                                                                   userDoc.warningCount = 0;
                                                                   userDoc.blacklist = true;
                                                                }
                                                            }
                                                            userDeveloper.save(function(err){
                                                                if(err){
                                                                    res.status(500).json({error: "Error Saving developer"});
                                                                }
                                                                else{
                                                                    userDoc.save(function(err){
                                                                        if(err){
                                                                            res.status(500).json({error: "Error Saving client"});
                                                                        }
                                                                        else{
                                                                            demand.save(function(err){
                                                                                if(err){
                                                                                    res.status(500).json({error: "Error Saving demand"});
                                                                                }
                                                                                else{
                                                                                    superUser.save(function(err){
                                                                                        if(err){
                                                                                            res.status(500).json({error: "Error Saving superUser"});
                                                                                        }
                                                                                        else{
                                                                                            res.status(201).json({message: "Successfully saved rating."});
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
                                                });
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
}
