// Require modules
var express = require('express');
var bodyParser = require('body-parser');
var Database = require('./database');
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

// Read map data
app.get('/api/map', function (req, res ) {
	db.WeatherModel.find( function (err, data) {
		res.send(data);
	});
});

// Return all comments request
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