var app = require('./app');

// Start server
var server = app.listen(3000, function(){
	console.log('listening on port 3000 ...');
});