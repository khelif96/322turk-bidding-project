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
  userId: String,
  password_hash: String,
  api_token: String,
  profileImage : String,
  resume : String,
  interests: String,
  sampleWork: String,
  projects: [],
  accountBalance: String,
  accountApproved: {type: Boolean, default: false}

});

module.exports = mongoose.model('User',userSchema);
