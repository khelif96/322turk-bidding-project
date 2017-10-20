var mongoose = require('mongoose');
var Schema = mongoose.Schema


// Schema
var demandSchema = new Schema({
  createdDate : {type : Date, default:Date.now},
  title : String,
  content: String,
  ownerId : String,
  bidderIds: [],
  winningDevId : String,
  totalBids: [{bidAmmount : Number, devId: String}] ,
  expDate: Date
});

module.exports = mongoose.model('Demand',demandSchema);
