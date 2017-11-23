var User = require('../app/models/userSchema');

exports.getUserbyEmail = (req, res) => {
    if (req.body.email == undefined) {
        res.status(400);
        res.json("Error: No email specified");
    } else {
        User.findOne({ 'email': req.body.email }, '-password_hash -api_token', function (err, user) {
            err? res.json(err) : res.send(user);
        });
    }
}

exports.getUserbyID = (req, res) => {
    if (req.body.user_id == undefined) {
        res.status(400);
        res.json("Error: No user ID specified");
    } else {
        User.findOne({ '_id': req.body.user_id }, '-password_hash -api_token', function (err, user) {
            err? res.json(err) : res.send(user);
        });
    }
}

exports.getUserbyAPI = (req, res) => {
    User.findOne({ 'api_token': req.body.api_token }, '-password_hash -api_token', function (err, user) {
        err? res.json(err) : res.send(user);
    });
}