// Require modules
var express = require('express');
var bodyParser = require('body-parser');
var Database = require('./server/models/database');
var bindModels = require('./server/models/bind-models.js');
var CommentsController = require('./server/controllers/comments-controller.js');

var db = Database();

var models = bindModels(db);

// Instantiate comments controller class
var commentsCtrl = new CommentsController(models.BlogModel);

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

// Return all comments on request
app.route('/api/comments/')
	.get(commentsCtrl.read)
	// Add a comment on request
	.post(commentsCtrl.create)
	// Delete selected comments on request
	.delete(commentsCtrl.delete);

app.route('/api/comments/:id')
	// Read comment by ID on request
	.get(commentsCtrl.readById)
	// Update a comment on request
	.put(commentsCtrl.update);

// Start server
var server = app.listen(3000, function(){
	console.log('listening on port 3000 ...');
});