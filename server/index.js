var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var sessID = 0;
var sessions = { 0: {status: 'empty'} };

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.use('/sess', function(req, res) {
	console.log('res');
	res.json({sessID: sessID});
	sessions[sessID] = {status: 'empty'}; //empty, notable tweets, anaylsis
	sessID++;
});

app.use('/tw', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	//if(req.body.sessID != undefined && req.body != undefined) {
		//console.log('Got sessID');
		req.session = sessions[0];
		next();
	/*} else {
		console.log('No sessID given. Blocked.');
		res.status(403).send('Need a session id');	
	}*/
});

app.use('/tw', require('./twitter'));

var port = 3000;

app.listen(port, function() {
	console.log('Listening at port: ' + port);
});
