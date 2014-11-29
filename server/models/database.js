module.exports = function() {
	// Define properties
	this.BlogSchema;
	this.BlogModel;
	this.LocationSchema;
	this.LocationModel;
	this.WeatherSchema;
	this.WeatherModel;

	this.configDb = function(){
		// Require mongoose module
		var Mongoose = require('mongoose');
		// Select Mongo DB 
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

		// Location Schema
		this.LocationSchema = new Schema({
			metId: Number,
			name: String,
			lat: Number,
			lng: Number
		});

		// Weather Schema
		this.WeatherSchema = new Schema({
			location: String,
			country: String,
			lat: Number,
			lng: Number,
			period: [{
				date: String,
				dayTime: {
					weatherType: Number,
					temp: Number,
					windDir: String,
					windSpeed: Number,
					rainChance: Number,
				},
				nightTime: {
					weatherType: Number,
					temp: Number,
					windDir: String,
					windSpeed: Number,
					rainChance: Number,
				}
			}]
		});

		// Creates a model named Blog with this.Schema as its schema
		// Assign it to the BlogModel property
		this.BlogModel = Mongoose.model('Blog', this.BlogSchema);
		this.LocationModel = Mongoose.model('MetData', this.LocationSchema);
		this.WeatherModel = Mongoose.model('WeatherData', this.WeatherSchema);
	};
}