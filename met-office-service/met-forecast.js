// Require modules
var http = require('http');
var Database = require('../server/models/database.js');
var bindModels = require('../server/models/bind-models.js');

// Instantiate + config database
var db = Database();
var models = bindModels();

models.WeatherModel.find( function (err, data) {
	data.forEach(function(dataItem){
		dataItem.remove();
	});
});

// Find all in location model
models.LocationModel.find( function (err, data) {
	for(var i = 0; i < 150; i++) {
		var metId = data[i].metId;

		// Get Met of weather forecast for each of the locations
		// stored in location model
		http.get('http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/'+ metId +'?res=daily&key=2f010694-136b-495a-838e-98f4119750e6', 
			function(response) {
				var body = '';

				// Sets data as chunk to be available outside the
				// scope of its call back
				response.on('data', function (chunk) {
					body += chunk;
				});
				
				// Parse data on response end
				response.on('end', function(){
					var metOfficeData = JSON.parse(body);
					var forecastData = metOfficeData.SiteRep.DV.Location.Period;
					var metLocation = metOfficeData.SiteRep.DV.Location;
					
					// Primary JSON object for each location
					var fiveDayForecast = new db.WeatherModel({
						location: metLocation.name,
						country: metLocation.country,
						lat: metLocation.lat,
						lng: metLocation.lon,
						period: []
					});

					// Loop through the forecast periods. Result is five periods/days
					// per location with a daytime key and a nightime key
					for(var i = 0; i < forecastData.length; i++ ) {

						var date = forecastData[i].value;
						date = date.replace(/[a-zA-Z]+/g,'');

						var oneDayForecast = { 
							date: date,
							dayTime: {
								weatherType:forecastData[i].Rep[0].W,
								temp: forecastData[i].Rep[0].FDm,
								windDir: forecastData[i].Rep[0].D,
								windSpeed: forecastData[i].Rep[0].S,
								rainChance: forecastData[i].Rep[0].PPd,
							},
							nightTime: {
								weatherType:forecastData[i].Rep[1].W,
								temp: forecastData[i].Rep[1].FNm,
								windDir: forecastData[i].Rep[1].D,
								windSpeed: forecastData[i].Rep[1].S,
								rainChance: forecastData[i].Rep[1].PPn,
							}
						}

						// Add to the period/day to the main JSON object
						fiveDayForecast.period.push(oneDayForecast);
			 		}

			 		// fiveDayForecast.save( function(err) {
			 		// 	if (err) console.error(err);
			 		// 	console.log('created');
			 		// });

			 		var upsertData = fiveDayForecast;
                     
			 		delete upsertData._id;

			 		// Run an update on the weather model in the DB
			 		models.WeatherModel.findOneAndUpdate({location: fiveDayForecast.location}, upsertData, {upsert: false}, function (err, numCreated) {
						if (!err) {
							return console.log(numCreated);
						} else {
							return console.log(err);
						}
					});
			});
			response.on('error', console.error);
		});
	}
});