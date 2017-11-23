var Opportunity = require('../app/models/opportunitySchema');
var User = require('../app/models/userSchema');

exports.getOpportunities = (req, res) => {
    Opportunity.find({}, function (err, opportunities) {

        (err || !opportunities) ? res.status(404).json({err: "Events not found"}) : res.send(opportunities);
    });
}

exports.getOpportunitybyID = (req, res) => {
    Opportunity.findOne({ "_id": req.body.opportunity_id }, function (err, opportunity) {
        (err || !opportunity) ? res.status(404).json({err: "Event not found"})  : res.send(opportunity);
    });
}

exports.getOpportunitiesbyVolunteer = (req, res) => {
    promise = new Promise(function (resolve, reject) {
        var opportunitiesSignedUp = [];
        // Find user in database and get their list of events they're signed up for
        User.findById({ "_id": req.body.volunteer_id }, function (err, user) {
            if (err || !user) res.status(404).json({err: "User not found"});
            else {
                if (user.eventsHelped.length == 0) res.json("User is not signed up for any event");
                for (var i = 0; i < user.eventsHelped.length; i++) {
                    Opportunity.findOne({ "_id": user.eventsHelped[i] }, function (err, event) {
                        (err || !event) ? res.status(404).json({err: "Event not found"}) : opportunitiesSignedUp.push(event);
                        if(opportunitiesSignedUp.length == user.eventsHelped.length){
                            resolve(opportunitiesSignedUp);
                        }
                    })
                }
            }
        });
    })
    promise.then(function(result){
        res.send(result);
    })
}