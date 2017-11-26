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
  accountApproved: {type: Boolean, default: false},
  accountAlerts : [],
  rating: Number,
  warningCount : Number,
  userType: {type: String, required: true} // 3 types Client, Developer, Super_User

});

module.exports = mongoose.model('User',userSchema);
