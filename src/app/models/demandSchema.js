var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Schema
var demandSchema = new Schema({
  createdDate : {type : Date, default:Date.now},
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
  justification : String
});

module.exports = mongoose.model('Demand',demandSchema);
