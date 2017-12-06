var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Schema
var demandSchema = new Schema({
  createdDate : {type : Date, default:Date.now},
  title : String,
  content: String,
  ownerId : String,
  winningDevId : String,
  totalBids: [{bidAmount : Number, devId: String}] ,
  isActive: {type: Boolean, default:true},
  expDate: Date,
  winningBid : {winAmount : Number, winDev : String},
  finishedProduct : String
});

module.exports = mongoose.model('Demand',demandSchema);
