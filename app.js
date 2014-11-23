// Require modules
var express = require('express');
var bodyParser = require('body-parser');
var Database = require('./database');
var CommentsController = require('./server/controllers/comments-controller.js');

// Instantiate database
var db = new Database();
db.configDb();

// Instantiate comments controller
var commentsCtrl = new CommentsController(db);

// Create instance of express() as app
var app = express();

app.set('view engine', 'jade');

// Route for CSS and JS
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

// Read all comments
app.get('/api/comments', commentsCtrl.read);

// Read comment by ID
app.get('/api/comments/:id', commentsCtrl.readById);

// Add a comment
app.post('/api/comments', commentsCtrl.create);

// Update a comment
app.put('/api/comments/:id', commentsCtrl.update);

// Delete selected comments 
app.delete('/api/comments/', commentsCtrl.delete);


var server = app.listen(3000, function(){
	console.log('listening on port 3000 ...');
});