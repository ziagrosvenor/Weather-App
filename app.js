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

app.post('/', function (req, res) {
	title = req.body.title;
	content = req.body.content;

	db.create(title, content);
	res.redirect('/');
});

app.post('/update/:id?', function (req, res) {
	newData = {title: req.body.title, content: req.body.content};

	db.BlogModel.findOneAndUpdate({_id: req.params.id}, newData, {upsert: true}, function(err, data){
		if (err) return console.error(err);
		res.redirect('/');
	});
});

app.get('/', function(req, res){
	db.BlogModel.find(function (err, results) {
  		if (err) return console.error(err);
  		console.log(results);
		res.render(__dirname + '/client/views/index', {
			blogEntries: results
	    });
	});
});

// Edit comment route 
app.get('/edit/:id?', function (req, res) {
	var id = req.params.id;

	// Find comment and render it in form
	db.BlogModel.findById(id, function (err, post) {
		if(err) return console.error(err);
		res.render(__dirname + '/client/views/editPost', {
			blogEntry: post
	    });
	});
});

// Query db for id passed in route
app.get('/delete/:id?', function (req, res) {
	var id = req.params.id;

	// Delete comment
	db.BlogModel.findById(id, function (err, post) {
		if(err) return console.error(err);
		post.remove();
		res.redirect('/');
	});
});

app.get('/map/', function(req, res) {
	db.LocationModel.find(function (err, results) {
		if (err) return console.error(err);
		res.render(__dirname + '/client/views/map', {
			locations: results
		});
	})
});

var server = app.listen(3000, function(){
	console.log('listening on port 3000');
});