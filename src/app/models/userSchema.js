var mongoose = require('mongoose');
var Schema = mongoose.Schema

// Schema
var userSchema = new Schema({
  name: {
    first : String,
    last : String,
  },
  createdDate : {type : Date, default:Date.now},
  email: String,
  password_hash: String,
  api_token: String,
  profileImage : String,
  eventsHelped: [],
  eventsCreated: [],
  userType: {type: String, required: true} // 2 types Volunteer, Organizer

});

module.exports = mongoose.model('User',userSchema);
