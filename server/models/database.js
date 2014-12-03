module.exports = function() {
	// Require mongoose module
	var Mongoose = require('mongoose');
	// Select Mongo DB 
	var db = Mongoose.connect('mongodb://localhost/test');
	// Connect to test
	var con = Mongoose.connection;
	// Incase of error log error
	con.on('error', console.error.bind(console, 'connection error'));

	return Mongoose;
};