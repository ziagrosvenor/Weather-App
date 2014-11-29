module.exports = function(db) {
	// Create comment
	this.create = function (req, res) {

		var comment = new db.BlogModel({
			title: req.body.title,
			content: req.body.content
		});

		comment.save(function (err) {
			if (err) console.error(err);
			console.log("created");
		});

		return res.send(comment);
	};

	// Find all blog model records
	this.read = function (req, res) {
		return db.BlogModel.find(function (err, comments) {
			if (err) console.error(err);
			res.send(comments);
		});
	};

	// Find one from blog model
	this.readById = function (req, res) {
		return db.BlogModel.findById(req.params.id, function (err, comment) {
			if (err) console.error(err);
			return res.send(comment);
		});
	};

	// Update one in blog model
	this.update = function (req, res) {
		var putData = {
			title: req.body.title,
			content: req.body.content
		};

		return db.BlogModel.findOneAndUpdate({_id: req.params.id}, putData , {upsert: true}, function (err, data) {
			if (err) return console.error(err);
			res.send(data);		
		});
	};

	// Delete one or many in blog model
	this.delete = function (req, res) {
		var comments = req.query;

		if(comments._id.length > 1 && comments._id.length < 15) 
		{
			db.BlogModel.find({_id: {$in: comments._id}}, function (err, comments) {
				if(err) return console.error(err);
				comments.forEach( function(comment) {
					comment.remove();
					console.log('comments removed');
				});		
			});
		} 
		else {
			db.BlogModel.findOneAndRemove({_id: comments._id}, function () {
				console.log('comment removed');
			});
		}
	};
}