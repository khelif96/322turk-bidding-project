// BASE SETUP

// dependencies
try{
  var express = require('express'); // Call express
  var mongoose = require('mongoose'); // Interface for mongodb
  var bodyParser = require('body-parser'); // Middle wear to parse Request Bodies
  require('dotenv').config(); // Library to allow the importing of  enviromental variables in .env files

  var cors = require('cors');
}catch(err){
  console.error("ERROR are all the Dependencies installed?");
  console.log(error);
  process.exit(1);
}

// Config
var port = 3001;


// Mongodb Config
mongoose.connect(process.env.DB_URL,{useMongoClient:true}); // Connect to database on Server
console.log("Connecting too " + process.env.DB_URL)
var db = mongoose.connection;

db.once('open', function() {
  // we're connected!
console.log("info", "Status Code " + mongoose.connection.readyState + " Connected");

});

// When the connection is disconnected
db.on('disconnected', function () {
  console.log("info", 'Mongoose default connection disconnected');
});

db.on('error', function(){
  console.log("error", "ERROR Status Code " + mongoose.connection.readyState);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  db.close(function () {
    console.log('info', 'Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


var app = express(); // Define our app

app.use(cors());
// Configure app to use bodyParser()
// This will let us get data from a POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// ROUTES FOR API
// ===============================================
var apiRouter = require('./routes/api');      // Get an instance of the express router

// REGISTER ROUTES --------------------------
// All api routes will be prefixed with /api
app.use('/api', apiRouter);

app.listen(port);

console.log("Server Started on PORT " + port);
