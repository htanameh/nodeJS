
/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');
const message = require('./app/controller.js');


// create express app
const app = express();

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

//route to add Message
app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   res.json({
   	"ID" : req.query.id , 
   	"first_name": req.query.first_name,
     "message " : req.query.message 
 });
   message.create;
});

// Create a new Message
app.post('/message', message.create);

// Retrieve all Messages
app.get('/messages', message.findAll);

// Retrieve a single Message with messageId
app.get('/messages/:messageId', message.findOne);

// Update a Message with messageId
app.put('/messages/:messageId', message.update);

// Delete a Message with messageId
app.delete('/messages/:messageId', message.delete);


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});