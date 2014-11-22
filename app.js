var express = require('express');
var bodyParser = require('body-parser');
var Database = require('database');

// Instantiate database
var db = new Database();

db.configDb();

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
	res.render(__dirname + '/client/views/index', {

	});
});

// Read all comments
app.get('/api/comments', function (req, res) {
	return db.BlogModel.find(function (err, comments) {
		if (!err) {
			return res.send(comments);
		} else {
			return console.log(err);
		}
	});
});

// Read comment by ID
app.get('/api/comments/:id', function (req, res) {
	return db.BlogModel.findById(req.params.id, function (err, comment) {
		if (!err) {
			return res.send(comment);
		} else {
			return console.log(err);
		}
	});
});

// Add a comment
app.post('/api/comments', function (req, res) {
	console.log(req.body);
	var comment = new db.BlogModel({
		title: req.body.title,
		content: req.body.content
	});

	comment.save(function (err) {
		if (!err) {
			return console.log("created");
		} else {
			return console.log(err);
		}
	});

	return res.send(comment);
});

// Update a comment
app.put('/api/comments/:id', function (req, res) {

	var putData = {
		title: req.body.title,
		content: req.body.content
	};

	return db.BlogModel.findOneAndUpdate({_id: req.params.id}, putData , {upsert: true}, function (err, data) {
		if (err) return console.error(err);
		res.send(data);		
	});
});

// Delete selected comments 
app.delete('/api/comments/', function (req, res) {

	var comments = req.query;
	console.log(comments._id);

	db.BlogModel.find({_id: {$in: comments._id}}, function (err, comments) {
		if(err) return console.error(err);
		comments.forEach( function(comment) {
			comment.remove();
		})
	});
});


var server = app.listen(3000, function(){
	console.log('listening on port 3000');
});