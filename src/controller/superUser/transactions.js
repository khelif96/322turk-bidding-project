var mongoose = require('mongoose'); // Interface for mongodb

var Transaction = require('../../app/models/transactionSchema');
var User = require('../../app/models/userSchema');
var Demand = require('../../app/models/demandSchema');

exports.getTransactions = (req,res) => {
    Transaction.find({complete : false}, function (err,docs){
        if(!docs.length || err){
            res.status(404);
            res.json({error: "Could not find any thing"})
        }else{
            res.status(200);
            res.send(docs);
        }
    });
};

exports.approveTransaction = (req, res) => {
    Transaction.findById(req.body.transactionId, function(err, transaction){
        if(!transaction || err){
            res.status(400).json({error: "could not find transaction"});
        }else{
            if(transaction.transactionType == "AddFunds"){
                User.findById(transaction.origin_id, function(err,client){
                    if(!client || err){
                        res.status(401).json({error: "Could not find user"});
                    }
                    else{
                        client.funds = client.funds + transaction.amount;
                        transaction.complete = true;
                        client.save(function(err){
                            if(err){
                                res.status(500).json({error: "Error Saving client"});
                            }
                            else{
                                transaction.save(function(err){
                                    if(err){
                                        res.status(500).json({error: "Error Saving transaction"});
                                    }
                                    else{
                                        res.status(200).json({message: "Successfully added funds."});
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else{
                if(req.body.rating === undefined || req.body.amount === undefined || req.body.message === undefined){
                    res.status(404).json({error: "Incomplete"});
                }
                else{
                    if(req.body.amount > transaction.amount){
                        res.status(404).json({error: "Invalid amount to pay developer"});
                    }
                    else{
                        Demand.findById(transaction.origin_id, function(err, demand){
                            if(!demand || err){
                                res.status(401).json({error: "Could not find demand"});
                            }
                            else{
                                User.findById(transaction.destination_id, function(err, userDeveloper){
                                    if(!userDeveloper || err){
                                        res.status(401).json({error: "Could not find developer"});
                                    }
                                    else{
                                        User.findById(demand.ownerId, function(err, userClient){
                                            if(!userClient || err){
                                                res.status(401).json({error: "Could not find client"});
                                            }
                                            else{
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
                                                superUser.funds = superUser.funds - (Math.round(transaction.amount * 100) / 100);
                                                userDeveloper.funds = userDeveloper.funds + (Math.round(req.body.amount * 100) / 100);
                                                userClient.funds = userClient.funds + (Math.round((transaction.amount - req.body.amount) * 100) / 100);

                                                superUser.funds = superUser.funds + (Math.round(demand.winningBid.bidAmount * 0.05 * 100) / 100);
                                                userClient.funds = userClient.funds - (Math.round(demand.winningBid.bidAmount * 0.05 * 100) / 100);
                                                userDeveloper.funds = userDeveloper.funds - (Math.round(demand.winningBid.bidAmount * 0.05 * 100) / 100);

                                                userClient.ratingGiven = Math.round((userClient.ratingGiven + ((req.body.rating - userClient.ratingGiven)/(userClient.ratingGivenCount + 1))) * 100) / 100;
                                                userClient.ratingGivenCount = userClient.ratingGivenCount + 1;
                                                if((userClient.ratingGiven < 2 || userClient.ratingGiven > 4) && (userClient.ratingGivenCount >= 8)){
                                                    userClient.ratingGiven = 0;
                                                    userClient.ratingGivenCount = 0;
                                                    userClient.warningCount = userClient.warningCount + 1;
                                                    if(userClient.warningCount == 2){
                                                       userClient.warningCount = 0;
                                                       userClient.blacklist = true;
                                                    }
                                                }
                                                var superMessage = userDeveloper.userName + " was given a rating of " + req.body.rating + " and paid an amount of " + req.body.amount + " for demand: " + demand._id + "\n Message from super user: " + req.body.message;
                                                var message = {
                                                           messageType : "superUserNotification",
                                                           description : superMessage,
                                                           senderID : userDeveloper._id
                                                       };
                                                userDeveloper.accountAlerts.push(message);
                                                userClient.accountAlerts.push(message);
                                                transaction.complete = true;
                                                userClient.save(function(err){
                                                    if(err){
                                                        res.status(500).json({error: "Error Saving client"});
                                                    }
                                                    else{
                                                        transaction.save(function(err){
                                                            if(err){
                                                                res.status(500).json({error: "Error Saving transaction"});
                                                            }
                                                            else{
                                                                userDeveloper.save(function(err){
                                                                    if(err){
                                                                        res.status(500).json({error: "Error Saving developer"});
                                                                    }
                                                                    else{
                                                                        demand.save(function(err){
                                                                            if(err){
                                                                                res.status(500).json({error: "Error Saving demand"});
                                                                            }
                                                                            else{
                                                                                res.status(200).json({message: "Successfully added funds."});
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
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
    });
}
