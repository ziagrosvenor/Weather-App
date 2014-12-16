module.exports = function (db) {
	var Schema = db.Schema;

	// Require weather models. Schema object is required
	var WeatherSchemas = require('./weather-model.js')(Schema);

	return {
		LocationModel : db.model('MetData', WeatherSchemas.LocationSchema),
		WeatherModel : db.model('WeatherData', WeatherSchemas.WeatherSchema)
	};
};