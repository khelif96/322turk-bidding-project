var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Schema
var opportunitySchema = new Schema({
  createdDate : {type : Date, default:Date.now},
  title : String,
  description: String,
  posterId : String,
  volunteerIds: [],
  opportunityDate: Date
});

module.exports = mongoose.model('opportunity',opportunitySchema);
