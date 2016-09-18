var Twitter = require('twitter-node-client').Twitter;
//Callback functions
    var error = function (err, response, body) {
        console.log('ERROR [%s]', resoinse);
    };
    var tweets;
    var success = function (data) {
      var arr =(JSON.parse(data));
      arr.map(function(d){
        console.log(d.name + ": " +d.screen_name);
      });
      var fs = require('fs');
      // fs.writeFile("./test.JSON", data, function(err) {
      //     if(err) {
      //         return console.log(err);
      //     }
      //
      //     console.log("The file was saved!");
      //     const exec = require('child_process').exec;
      //     exec("R CMD BATCH '--args ./test.JSON' simpleRFile.R", (error, stdout, stderr) => {
      //       if (error) {
      //         console.error(`exec error: ${error}`);
      //         return;
      //       }
      //       console.log(`stdout: ${stdout}`);
      //       console.log(`stderr: ${stderr}`);
      //       console.log(start-Date.now());
      //     });
      //
      // });
    };
    var config = require('./config.js');

    var twitter = new Twitter(config);

    var start=Date.now();
    twitter.getCustomApiCall('/users/search.json',{ q: 'mark'}, error, success);

  //
	// module.exports = function(cb) {
	// 	twitter.getUserTimeline({ screen_name: 'MarkFajita', count: '10'}, error, cb);
	// }
