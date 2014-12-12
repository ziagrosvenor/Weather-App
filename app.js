// Require modules
var express = require('express');
var bodyParser = require('body-parser');
var Database = require('./components/models/database');
var bindModels = require('./components/models/bind-models.js');

var db = Database();

var models = bindModels(db);

// Create instance of express() as app
var app = express();

app.set('view engine', 'jade');

// Routes for asset requests
app.use('/', express.static(__dirname + '/client'));
app.use('/bower', express.static(__dirname + '/bower_components'));
app.use('/app', express.static(__dirname + '/client/app'));
app.use('/assets', express.static(__dirname + '/client/assets'));

// Body parser for JSON
app.use(bodyParser.json());

// HTTP request bodyparser
app.use(bodyParser.urlencoded({ 
 	extended: true
}));

app.get('/', function(req, res){
	res.render(__dirname + '/client/index');
});

// Read weather data
app.get('/api/weather/', function (req, res ) {
	models.WeatherModel.find( function (err, data) {
		if(err) console.error(err);
		res.send(data);
	});
});

module.exports = app;