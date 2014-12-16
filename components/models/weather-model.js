module.exports = function (Schema) {
	// Location Schema
	var LocationSchema = new Schema({
		metId: Number,
		name: String,
		lat: Number,
		lng: Number
	});

	// Weather Schema
	var WeatherSchema = new Schema({
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

	return {
		WeatherSchema: WeatherSchema,
		LocationSchema: LocationSchema
	};
};