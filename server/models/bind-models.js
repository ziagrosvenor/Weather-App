module.exports = function (db) {
	var Schema = db.Schema;
	
	// Instantiate Blog Schema Object
	var BlogSchema = new Schema({
		title: String,
		content: String
	});

	// Require weather models. Schema object is required
	var WeatherSchemas = require('./weather-model.js')(Schema);

	// Creates a model named Blog with this.Schema as its schema
	// Assign it to the BlogModel property
	return {
		BlogModel : db.model('Blog', BlogSchema),
		LocationModel : db.model('MetData', WeatherSchemas.LocationSchema),
		WeatherModel : db.model('WeatherData', WeatherSchemas.WeatherSchema)
	}
}