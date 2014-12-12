var app = require('../app');

var should = require('should'),
	supertest = require('supertest');

describe('weather', function () {
	it('should return index view', function (done) {
		supertest(app)
		.get('/')
		.expect(200)
		.end( function (err, res) {
			res.status.should.equal(200);
			done(); 
		});
	});

	it('should return an error for invalid request', function (done) {
		supertest(app)
		.get('/foo')
		.expect(404)
		.end( function (err, res) {
			res.status.should.equal(404);
			done();
		});
	});

	it('should return 250 records from the database', function (done) {
		supertest(app)
		.get('/api/weather/')
		.expect(200)
		.end( function (err, res) {
			res.status.should.equal(200);
			res.body.length.should.equal(250);
			done();
		});
	});
});