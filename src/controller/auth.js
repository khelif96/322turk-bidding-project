var bcrypt = require('bcryptjs');
var hat = require('hat');

var User = require('../app/models/userSchema');

const saltRounds = 10; // How many times to salt the password

// Configure Hat for generating api tokens
var rack = hat.rack(64,16);

// Middle wear to check if api_token is in request
exports.checkAuth = (req,res,next) => {
  if(req.body.api_token === undefined){
    res.status(400).json({"error": "Missing api_token in request"});
  }else{
    console.log("Auth Passed");
  next();
}
}
exports.registerUser = (req,res) => {
  if(req.body.email === undefined || req.body.password === undefined){
    res.status(400);
    res.json({error: "Missing email or password in request"});
  }else if (req.body.name === undefined || req.body.name.first === undefined || req.body.name.last === undefined){
    res.status(400);
    res.json({error: "Missing name in request"});
  }else{
    User.find({email: new RegExp(req.body.email, 'i')}, function (err,docs){
      if(!docs.length){
        var tempUser = new User();
        tempUser.email = req.body.email;
        tempUser.api_token = rack();
        tempUser.userType = "Volunteer";
        tempUser.name.first = req.body.name.first;
        tempUser.name.last = req.body.name.last
        bcrypt.hash(req.body.password, saltRounds, function(err,hash){
          tempUser.password_hash = hash;
          tempUser.save(function(err){
            if(err){
              // console.log("ERROR");
              res.send(err);
            }

            res.status(201);
            res.json({"status" : "Successfully Created An Account", "api_token":tempUser.api_token} );
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

exports.loginUser = (req,res) => {
  if(req.body.email === undefined || req.body.password === undefined){

    res.status(400);
    res.json({error: "Missing email or password in request"});

  }else{
    console.log("Trying to find email");
    User.findOne({email: new RegExp(req.body.email, 'i')}, function (err,doc){ // Search User Database for User with matching Email
      if(!doc || err){
        res.status(401);
        res.json({error: "Could not find account"});

      }else{
        // console.log("Somehow got here");
        // TODO check password hash if matches stored password if so return an api_token
        bcrypt.compare(req.body.password,doc.password_hash, function(err, valid){
          if(valid){

            res.status(201);
            res.json({"status": "Successful Login", "api_token":doc.api_token });
            // res.json({api_token: docs[0].api_token});
          }else{

            res.status(401);
            res.json({error:"Invalid Password"});
          }
        });
      }
    });
  }
};
