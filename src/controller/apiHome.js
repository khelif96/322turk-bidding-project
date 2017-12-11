/*jshint esversion: 6 */
var User = require('../app/models/userSchema');
var Demand = require('../app/models/demandSchema');


exports.getApi = (req, res) => {
  res.json({message: "Welcome to the turkApi"});
  res.status(200);
};

exports.postApi = (req,res) => {
  res.json({error: "Route does not allow POST"});
  res.status(200);
};

// Middle wear to check if path is correct
exports.invalidPath = (req,res,next) => {

    res.status(400).json({"error": "Invalid Path"});

}



exports.getSiteStats = (req, res) => {
    var response = []
    User.find({userType : "Client" , accountApproved : true, blacklist : false}, function(err, users){
        if(!users || err){
            var object = {name: "Clients", value: 0};
            response.push(object);
            searchDevs();
        }
        else{
            var object = {name: "Clients", value: users.length};
            response.push(object);
            searchDevs();
        }
    });

    var searchDevs = () => {
    User.find({userType : "Developer" , accountApproved : true, blacklist : false}, function(err, users){
        if(!users || err){
          var object = {name: "Developers", value: 0};
          response.push(object);
          searchDemands();
        }
        else{
          var object = {name: "Developers", value: users.length};
          response.push(object);
          searchDemands();
        }
    });
  }
  var searchDemands = () => {
    Demand.find({isActive: false},function(err,demands){
      if(!demands || err){
        var object = {name: "Demands", value: 0};
        response.push(object);
        res.send(response);

      }else{
        var object = {name: "Demands", value: demands.length};
        response.push(object);
        res.send(response);

      }
    })
  }
}
