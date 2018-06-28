const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of URL
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of JSON
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome!!"});
});

//define a different route
app.get('/',(req,res) => {
	res.json({"message" : "Welcomr to Test Route!"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});