var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var sessID = 0;
var sessions = {};

app.use('/sess', function(req, res) {
	res.json({sessID: sessID});
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


var twitter = require('./getTweets.js');

twitter(function (data) {
      var fs = require('fs');
      fs.writeFile("./test.JSON", data, function(err) {
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
          const exec = require('child_process').exec;
          exec("R CMD BATCH '--args ./test.JSON' simpleRFile.R", (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            console.log(start-Date.now());
          });

      });
    });
