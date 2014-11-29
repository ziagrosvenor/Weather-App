 // Require modules
var express = require('express');
var bodyParser = require('body-parser');
var Database = require('./server/models/database');
var CommentsController = require('./server/controllers/comments-controller.js');

// Instantiate database class
var db = new Database();
db.configDb();

// Instantiate comments controller class
var commentsCtrl = new CommentsController(db);

// Create instance of express() as app
var app = express();

app.set('view engine', 'jade');

// Routes for asset requests
app.use('/', express.static(__dirname + '/client'));
app.use('/bower', express.static(__dirname + '/bower_components'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));

// Body parser for JSON
app.use(bodyParser.json());

// HTTP request bodyparser
app.use(bodyParser.urlencoded({ 
 	extended: true
}));

app.get('/', function(req, res){
	res.render(__dirname + '/client/views/jade/index', {

	});
});

// Read weather data
app.get('/api/weather/:period', function (req, res ) {

	var period = Number(req.params.period);

	function isEven(value){
    	if (value%2 === 0)
    	    return true;
    	else
    	    return false;
	}

	if (isEven(period) === true) {
		period = (period / 2);
	}
	else {
		period = ((period - 1) / 2);
	}

	db.WeatherModel.find( function (err, data) {
		if(err) console.error(err);
		var weather = [];

		for(var i = 0; i < data.length; i++) {

			if(isEven(period)) 
			{
				console.log(period);
				weatherPeriod = {
					location: data[i].location,
					lat: data[i].lat,
					lng: data[i].lng,
					icon: data[i].period[period].dayTime.weatherType,
					temp: data[i].period[period].dayTime.temp,
					date: data[i].period[period].date
				};
			} 
			else {
				weatherPeriod = {
					location: data[i].location,
					lat: data[i].lat,
					lng: data[i].lng,
					icon: data[i].period[period].nightTime.weatherType,
					temp: data[i].period[period].nightTime.temp,
					date: data[i].period[period].date
				};
			}
			console.log(weatherPeriod);
			weather.push(weatherPeriod);
		}

		res.send(weather);
	});
});

// Return all comments on request
app.get('/api/comments', commentsCtrl.read);

// Read comment by ID on request
app.get('/api/comments/:id', commentsCtrl.readById);

// Add a comment on request
app.post('/api/comments', commentsCtrl.create);

// Update a comment on request
app.put('/api/comments/:id', commentsCtrl.update);

// Delete selected comments on request 
app.delete('/api/comments/', commentsCtrl.delete);

// Start server
var server = app.listen(3000, function(){
	console.log('listening on port 3000 ...');
});