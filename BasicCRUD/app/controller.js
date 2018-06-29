const Message = require('./model.js');

// Create and Save a new Message
exports.create = (req, res) => {
	 // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Message
    const mess = new Message({
        id: req.body.id , 
        Name: req.body.Name,
        Message : req.body.message
    });

    // Save Message in the database
    mess.save()
    .then(data => {
        console.log(data);
        res.end();
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};


// Retrieve and return all Messages from the database.
exports.findAll = (req, res) => {

};

// Find a single note with a messageID
exports.findOne = (req, res) => {

};

// Update a message identified by the messageId in the request
exports.update = (req, res) => {

};

// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {

};