// opportunity Modification Schema

var Opportunity = require('../app/models/opportunitySchema');
var User = require('../app/models/userSchema');

exports.createOpportunity = (req,res) => {
  if(req.body.title === undefined || req.body.description === undefined || req.body.opportunityDate === undefined){
    res.status(401).json({error: "Incomplete Request Missing required paramaters"});
  }
  User.findOne({api_token: req.body.api_token},function(err,doc){
    if(!doc || err){
      res.status(401).json({error: "Invalid api_token"});
    }else{
      var tempOpportunity = new Opportunity();
      tempOpportunity.title = req.body.title;
      tempOpportunity.description = req.body.description;
      tempOpportunity.opportunityDate = req.body.opportunityDate;
      tempOpportunity.posterId = doc._id;
      tempOpportunity.save(function(err){
        if(err){
          res.status(500).json({error: "Internal Server Error when Creating Opportunity. If this happens again please contact us"});
        }
      });
      doc.eventsCreated.push(tempOpportunity._id);
      doc.save(function(err){
        if(err){
          res.status(500).json({error: "Internal Server Error when Saving the Opportunity to your Account. If this happens again please contact us"});
        }
      });
      res.status(201).json({message: "Successfully Created Opportunity"});
    }
  }
)};

exports.registerForOpportunity = (req,res) => {
  User.findOne({api_token: req.body.api_token},function(err,userDoc){
    if(!userDoc || err){
      res.status(401).json({error: "Invalid api_token"});
    }else{
      Opportunity.findById(req.body.opportunityId,function(err, opportunity){
        opportunity.volunteerIds.push(userDoc._id);
        userDoc.eventsHelped.push(opportunity._id);
        opportunity.save(function(err){
          if(err){

            console.log("Opportunity Join Error");
            res.status(500).json({error: "Error joining this Opportunity"});
          }
        });
        userDoc.save(function(err){
          if(err){
          console.log("user Save Error");
          res.status(500).json({error: "Error joining this Opportunity"});
        }
        });
        console.log("Sending Response");
        res.status(201).json({message: "Successfully Registered For this Opportunity"});
      });
}
});
}
