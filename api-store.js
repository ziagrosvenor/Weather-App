var http = require('http');
var Database = require('database');

var db = new Database();
db.configDb();

http.get('http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=2f010694-136b-495a-838e-98f4119750e6', function(response) {
	var body = '';
	response.on('data', function(chunk){
		// console.log(data.current_obervation.observation_location);
		body += chunk;
	});
	
	response.on('end', function(){
		metOfficeData = JSON.parse(body);

		console.log(metOfficeData.Locations.Location[0].name);

		for(var i = 0; i < metOfficeData.Locations.Location.length; i++ ) {
			var id = metOfficeData.Locations.Location[i].id;
			var name = metOfficeData.Locations.Location[i].name;
			var lat = metOfficeData.Locations.Location[i].latitude;
			var lng = metOfficeData.Locations.Location[i].longitude;
			console.log(name);
			db.createLocation(id, name, lat, lng);
		}
	});

	response.on('error', console.error);
});