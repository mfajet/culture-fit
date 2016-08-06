var express = require('express');
var bodyParser = require('body-parser');

app.use(bodyParser().urlencoded({
	extended: true
}));

app.use(bodyParser.json());

var app = express();
var sessID = 0;
var sessions = {};

app.use('/sess', function(req, res) {
	res.send(sessID);
	sessions[sessID] = {status: 'empty'}; //empty, notable tweets, anaylsis
	sessID++;
});

app.use('/tw', function(req, res, next) {
	if(req.body.sessID) {
		console.log('Got sessID');
		req.session = sessions[req.body.sessID]
		next();
	} else {
		console.log('No sessID given. Blocked.');
		res.status(403).send('Need a session id');	
	}
});

app.use('/tw', require('./twitter'));

var port = 3000;

app.listen(port, function() {
	console.log('Listening at port: ' + port);
});
