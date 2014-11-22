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

// app.post('/', function (req, res) {
// 	title = req.body.title;
// 	content = req.body.content;

// 	db.create(title, content);
// 	res.redirect('/');
// });

// app.post('/update/:id?', function (req, res) {
// 	newData = {title: req.body.title, content: req.body.content};

// 	db.BlogModel.findOneAndUpdate({_id: req.params.id}, newData, {upsert: true}, function(err, data){
// 		if (err) return console.error(err);
// 		res.redirect('/');
// 	});
// });

app.get('/', function(req, res){
	res.render(__dirname + '/client/views/index', {

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

app.delete('/api/comments/', function (req, res) {

	var comments = req.query;
	console.log(comments);

	// db.BlogModel.findById(comments[0].id, function (err, comment) {
	// 	if(err) return console.error(err);
	// 	comment.remove();

	// });
	return res.send(comments);
	// return db.BlogModel.find(function (err, comments) {
	// 	if (!err) {
	// 		
	// 	} else {
	// 		return console.log(err);
	// 	}
	// });
});


var server = app.listen(3000, function(){
	console.log('listening on port 3000');
});