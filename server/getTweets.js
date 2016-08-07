var Twitter = require('twitter-node-client').Twitter;


//Callback functions
    var error = function (err, response, body) {
        console.log('ERROR [%s]', body);
    };
    var tweets;
    var success = function (data) {
      var fs = require('fs');
      fs.writeFile("./test.JSON", data, function(err) {
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
          const exec = require('child_process').exec;

          exec("Rscript TopFiveFriends.R ./test.JSON", (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log('stdout: ' + stdout );
            var fiveNames = stdout.split('\n');
            fiveNames.pop();

            var i = fiveNames.indexOf(username);
            if(i>=0){
              fiveNames.splice(i,1);
            }else {
              fiveNames.pop();
            }
            console.log('stderr: '+ stderr);
            console.log(fiveNames);
          });

      });
    };
    var config = require('../config.js');

    var twitter = new Twitter(config);

    var username = 'MarkFajita';

    var start=Date.now();
    twitter.getUserTimeline({ screen_name: username, count: '200'}, error, success);

	module.exports = function(cb) {
		twitter.getUserTimeline({ screen_name: username, count: '200'}, error, cb);
	}
