var mongoose = require('mongoose'); // Interface for mongodb

var User = require('../app/models/userSchema');
exports.getUserByApiToken = (req,res) => {
    User.findOne({api_token: req.params.api_token}, '-password_hash' ,function(err,userDoc){
        if(!userDoc || err){
            res.status(401).json({error: "Invalid api_token"});
        }
        else{
            res.send(userDoc);
        }
    });
}
