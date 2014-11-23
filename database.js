module.exports = function() {
	// Define properties to be assigned in dbConfig
	this.BlogSchema;
	this.BlogModel;
	this.LocationSchema;
	this.LocationModel;

	this.configDb = function(){
		// Require mongoose module
		var Mongoose = require('mongoose');
		// Select DB test
		var db = Mongoose.connect('mongodb://localhost/test');
		// Connect to test
		var con = Mongoose.connection;
		// Incase of error log error
		con.on('error', console.error.bind(console, 'connection error'));
		// Assign Schema object to variable
		var Schema = Mongoose.Schema;
		// Instantiate Blog Schema Object
		this.BlogSchema = new Schema({
			title: String,
			content: String
		});
		this.LocationSchema = new Schema({
			metId: Number,
			name: String,
			lat: Number,
			lng: Number
		});
		// Creates a model named Blog with this.Schema as its schema
		// Assign it to the BlogModel property
		this.BlogModel = Mongoose.model('Blog', this.BlogSchema);
		this.LocationModel = Mongoose.model('MetData', this.LocationSchema);
	};
}