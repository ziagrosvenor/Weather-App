var http = require('http');
var Database = require('./database.js');

var db = new Database();
db.configDb();

db.LocationModel.find( function (err, data) {
	for(var i = 0; i < data.length; i++) {
		var metId = data[i].metId;

		http.get('http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/'+ metId +'?res=daily&key=2f010694-136b-495a-838e-98f4119750e6', 
			function(response) {
				var body = '';
				response.on('data', function(chunk){
					body += chunk;
				});
		
				response.on('end', function(){
					var metOfficeData = JSON.parse(body);
					var forecastData = metOfficeData.SiteRep.DV.Location.Period;
					var metLocation = metOfficeData.SiteRep.DV.Location;
	
					fiveDayForecast = new db.WeatherModel({
						location: metLocation.name,
						country: metLocation.country,
					lat: metLocation.lat,
						lng: metLocation.lon,
						period: []
					});

					for(var i = 0; i < forecastData.length; i++ ) {
						var oneDayForecast = { 
							date: forecastData[i].value,
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
						fiveDayForecast.period.push(oneDayForecast);
			 		}

			 		fiveDayForecast.save(function (err) {
						if (!err) {
							return console.log("created");
						} else {
							return console.log(err);
						}
					});
			});
			response.on('error', console.error);
		});
	}
});