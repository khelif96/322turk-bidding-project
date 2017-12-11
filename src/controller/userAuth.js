/*jshint esversion: 6 */

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
    User.find({email : {$regex : new RegExp("^" + req.body.email + "$", "i")}}, function (err,docs){ // Search User Database for User with matching Email
      if(!docs.length || err){
          User.find({userName : {$regex : new RegExp("^" + req.body.email + "$", "i")}}, function (err,docs){
              if(!docs.length || err){
                  res.status(401);
                  res.json({error: "Could not find account"});
              }
              else{
                  bcrypt.compare(req.body.password,docs[0].password_hash, function(err, valid){
                    if(valid){
                        if(docs[0].accountApproved){
                            res.status(201);
                            res.json({"api_token":docs[0].api_token });
                        }
                        else if(!docs[0].accountApproved && docs[0].accountAlerts !== undefined){
                            res.status(401);
                            res.json({error: "Account rejected with reason: " + docs[0].accountAlerts[0].message});
                        }
                        else{
                            res.status(401);
                            res.json({error: "Account needs to be verified."});
                        }
                    }else{

                      res.status(401);
                      res.json({error:"Invalid Password"});
                    }
                  });
              }
          });
      }else{
        console.log("Somehow got here");
        // TODO check password hash if matches stored password if so return an api_token
          bcrypt.compare(req.body.password,docs[0].password_hash, function(err, valid){
            if(valid){
                if(docs[0].accountApproved){
                    res.status(201);
                    res.json({"api_token":docs[0].api_token });
                }
                else{
                    res.status(401);
                    res.json({error: "Account needs to be verified."});
                }
            }else{

              res.status(401);
              res.json({error:"Invalid Password"});
            }
          });
      }
  });
}
};

exports.updateUser = (req, res) => {
    User.findOne({api_token: req.body.api_token},function(err, userDoc){
       if(!userDoc || err){
          res.status(401).json({error: "Invalid api_token"});
       }
       else{
           if(req.body.interests != ""){
               userDoc.interests = req.body.interests;
               userDoc.tags = (req.body.interests).split(/\s* \s*/);
           }
           if(req.body.resume != ""){
               userDoc.resume = req.body.resume;
           }
           if(req.body.sampleWork != ""){
               userDoc.sampleWork = req.body.sampleWork;
           }
           userDoc.save(function(err){
              if(err){
                 res.status(500).json({error: "Error saving demand"});
              }
              else{
                  res.status(201).json({message: "Successfully updated user."});
              }
          });
       }
   });
}

exports.registerUser = (req,res) => {
  if(req.body.email === undefined || req.body.password === undefined || req.body.name  === undefined || req.body.userName === undefined || req.body.userType === undefined){
    res.status(400);
    res.json({error: "Incomplete request"});
  }else{
    User.find({email : {$regex : new RegExp("^" + req.body.email + "$", "i")}}, function (err,docs){
      if(!docs.length){
        User.find({userName : {$regex : new RegExp("^" + req.body.userName + "$", "i")}}, function (err,docs){
          if(!docs.length){
            var tempUser = new User();
            tempUser.email = req.body.email;
            tempUser.api_token = rack();
            tempUser.userType = req.body.userType;
            tempUser.name = req.body.name;
            if(req.body.interests !== undefined) {
                tempUser.interests = req.body.interests;
                tempUser.tags = (req.body.interests).split(/\s* \s*/);
            }
            tempUser.userName = req.body.userName;
            tempUser.tags.push(req.body.userName);
            bcrypt.hash(req.body.password, saltRounds, function(err,hash){
              tempUser.password_hash = hash;
              tempUser.save(function(err){
                if(err){
                // console.log("ERROR");
                  res.send(err);
              }

              res.status(201);
              res.json({message: "Successfully registered."} );
          });
        });

          // res.status(201);
          // res.json({api_token: tempUser.api_token, status: "Successfully Created User"});
        }
        else{

          res.status(400);
          res.json({error:"Username belongs to another user"});
        }
      });

      }else{

        res.status(400);
        res.json({error:"Email belongs to another user"});
      }
    });
  }
};
