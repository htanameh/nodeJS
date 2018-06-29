const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
	id : Number,
	Name : String,
	Message : String
}, 
{
	timestamp : true
});

module.exports = mongoose.model('Message',modelSchema);