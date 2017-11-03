/*jshint esversion: 6 */

var bcrypt = require('bcryptjs');
var hat = require('hat');

var User = require('../app/models/userSchema');

const saltRounds = 10; // How many times to salt the password

// Configure Hat for generating api tokens
var rack = hat.rack(64,16);


exports.getLoginUser = (req,res) => {
  res.json({message: "/loginUser Route"});
};

exports.loginUser = (req,res) => {
  console.log("Connection Made");
  if(req.body.email === undefined || req.body.password === undefined){

    res.status(400);
    res.json({error: "Missing email or password in request"});

  }else{
    console.log("Trying to find email");
    User.find({email: new RegExp(req.body.email, 'i')}, function (err,docs){ // Search User Database for User with matching Email
      if(!docs.length || err){
        res.status(401);
        res.json({error: "Could not find account"});

      }else{
        // TODO check password hash if matches stored password if so return an api_token
          bcrypt.compare(req.body.password,docs[0].password_hash, function(err, valid){
            if(valid){
              console.log("Successfull login");
              res.status(201);
              res.json({"api_token":docs[0].api_token });
              // res.json({api_token: docs[0].api_token});
            }else{
              console.log("INvalid password");
              res.status(401);
              res.json({error:"Invalid Password"});
            }
          });
      }
  });
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
