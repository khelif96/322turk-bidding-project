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
  accountApproved: {type: Boolean, default: false},
  accountAlerts : [],
  rating: {type: Number, default: 0},
  ratingCount: {type: Number, default: 0},
  badRatingGiven: {type: Number, default: 0},
  badRatingRecieved: {type: Number, default: 0},
  warningCount : {type: Number, default: 0},
  userType: {type: String, required: true}, // 3 types Client, Developer, Super_User
  funds : {type: Number, default: 0}
});

module.exports = mongoose.model('User',userSchema);
