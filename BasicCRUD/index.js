
/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');


// create express app
const app = express();

//Schema of the message
const modelSchema = mongoose.Schema({
  id : Number,
  name : String,
  msg : String
}, 
{
  timestamp : true
});

//creating a model 
var msgModel = mongoose.model("msgModel",modelSchema);

// parse requests of URL
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of JSON
app.use(bodyParser.json());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome!!"});
});

//define a different route
app.get('/test',(req,res) => {
	res.json({"message" : "Welcome to Test Route!"});
});

//route to input message html file
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
});

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

//route to add Message
app.get('/process_get', function (req, res) {
   var newMsg = new msgModel({
    id : req.query.id,
    name : req.query.name,
    msg : req.query.message
});
   newMsg.save((err) => {
    if(err) console.log("Error in saving message : " + err);
    else
      console.log("Message saved Successfully, msg : " + newMsg);
  });
   res.json({"message" : newMsg});
   res.end();
});

// Retrieve and return all Messages from the database.
app.get('/get_messages', function (req, res) {
  msgModel.find().then(msgmodels => {
    res.json(msgmodels);
    console.log("Message retrieved Successfully");
  }).catch(err => {
    console.log("Error in retrieving message : " + err);
    res.end();
  });
  
});

//Find a single message with a messageID
app.get('/get_message/:msgID', function (req, res) {
  msgModel.find({ id: req.params.msgID }).then(msg => {
    res.json(msg);
    console.log("Message retrieved Successfully");
  }).catch(err => {
    console.log("Error in retrieving message : " + err);
    res.end();
  });
});

//Find a single message and update
app.get('/get_message/:msgID/:updateMsg', function (req, res) {
  msgModel.findOneAndUpdate({ id: req.params.msgID },{msg : req.params.updateMsg }).then(msg => {
    res.json({"message" : msg});
    console.log("Message updated Successfully");
  }).catch(err => {
    console.log("Error in updating message : " + err);
    res.end();
  });
});

//Delete a single message
app.get('/delete_message/:msgID', function (req, res) {
  msgModel.deleteOne({ id: req.params.msgID }).then(msg => {
    res.json({"message" : msg});
    console.log("Message deleted Successfully");
  }).catch(err => {
    console.log("Error in updating message : " + err);
    res.end();
  });
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});