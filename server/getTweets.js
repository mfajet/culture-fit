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
          const exec2 = require('child_process').exec;

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
            fiveNames.map(function(str){
                twitter.getUser({screen_name: str}, error, namesSuccess);
              });
            console.log('stderr: '+ stderr);
            console.log(fiveNames);
          })
          exec2("Rscript WordCloudMaker.R ./test.JSON", (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log('stdout: ' + stdout );
            console.log('stderr: '+ stderr);
          })
      }
    )};
    var config = require('../config.js');

    var twitter = new Twitter(config);

    var username = 'MarkFajita';
    var fiveUsers = [];

var counter =0;
    var namesSuccess = function(data){
      fiveUsers.push(data);
      counter++;
      if(counter>=5){
        console.log("KERLIN SEND IT");
      }
    }
    var start=Date.now();
    twitter.getUserTimeline({ screen_name: username, count: '200'}, error, success);

	module.exports = function(cb, screen_name) {
		screen_name = typeof screen_name !== 'undefined' ?  screen_name : 'MarkFajita';
		twitter.getUserTimeline({ screen_name: screen_name, count: '200'}, error, cb);
	}
