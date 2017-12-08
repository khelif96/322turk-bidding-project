var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Schema
var transactionSchema = new Schema({
  createdDate : {type : Date, default:Date.now},
  origin_id : {type: String, required: true}, // Who made the transaction
  destination_id : String, // Is the transaction going to any one
  amount : Number,
  complete : {type:Boolean, default:false},
  transactionType: String, // 2 Types AddFunds, Payments
  message : String,
  rating : Number
});

module.exports = mongoose.model('Transaction',transactionSchema);
