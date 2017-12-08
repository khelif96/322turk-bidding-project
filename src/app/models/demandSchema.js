var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Schema
var demandSchema = new Schema({
  createdDate : {type : Date, default:Date.now},
  createdNum : {type : Number, default: 0},
  title : String,
  content: String,
  ownerId : String,
  winningDevId : String,
  totalBids: [{bidAmount: Number, devId: String, deadline: Date}] ,
  isActive: {type: Boolean, default:true},
  expDate: Date,
  winningBid : {bidAmount: Number, devId: String, deadline: Date},
  devChosen : {type : Boolean, default: false},
  finishedProduct : String,
  justification : String,
  ownerProfile: {},
  clientRated : {type : Boolean, default: false},
  devRated : {type : Boolean, default: false},
  devRating : {rating : Number, reason : String},
  clientRating : {rating : Number, reason : String},
  tags: []
});

module.exports = mongoose.model('Demand',demandSchema);
