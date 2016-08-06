var router = require('express').Router();

router.post('/data', function(req, res) {
	//console.log(req.body);
	//res.send({msg: 'test'});
	var status = req.session.status;
	if(req.session == undefined)
		res.status(403);

	switch(status) {
		case 'empty' : sendFirstTweets(res); req.session.status = 'gotTweets'; break;
		case 'gotTweets' : sendAnaylsis(res); break;
		//case 'analysis': res.json({}); break;
	}
})

module.exports = router;

function sendFirstTweets(res) {
	res.json({test: 'tweets'});
}

function sendAnaylsis(res) {
	res.json({data: 'anaylsis'});
}


//var twitter = require('./getTweets.js');

/*twitter(function (data) {
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
    });*/
