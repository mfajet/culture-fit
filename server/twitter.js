var router = require('express').Router();

var twitter = require('./getTweets.js');
var popTweets = require('./getNotableTweets.js');

router.post('/data', function(req, res) {
	//console.log(req.body);
	//res.send({msg: 'test'});
	var status = req.session.status;
	if(req.session == undefined)
		res.status(403);
	sendFirstTweets(res, req);
	//switch(status) {
		//case 'empty' : sendFirstTweets(res, req); req.session.status = 'gotTweets'; break;
		//case 'gotTweets' : sendAnaylsis(res, req); break;
		//case 'analysis': res.json({}); break;
	//}
})

router.post('/topfive', function(req, res) {
	sendAnaylsis(res, req);
});

router.post('/pos', function(req, res) {
	sentiment(req, res);
});

router.post('/brunt', function(req, res) {
	brunt(req, res);
});

router.post('/orig', function(req, res) {
	orig(req, res);
});

router.get('/cloud', function(req, res) {
	cloud(req, res);
})

module.exports = router;

function sendFirstTweets(res, req) {
	//res.json({test: 'tweets'});
	var screen_name = req.body.screen_name;
	popTweets(function(data){
  	var tweets = JSON.parse(data);
 	var fivePop=[tweets[0],tweets[1],tweets[2],tweets[3],tweets[4]];
  	for(var i=5;i<tweets.length;i++){
		var obj = tweets[i];
		var nums = obj.favorite_count + obj.retweet_count;
		if(nums>(tweets[0].favorite_count + tweets[0].retweet_count)){
	  		fivePop[4]=tweets[3];
	  		fivePop[3]=tweets[2];
	  		fivePop[2]=tweets[1];
	  		fivePop[1]=tweets[0];
	  	fivePop[0]=obj;
		}else if(nums>(tweets[1].favorite_count + tweets[1].retweet_count)){
	  		fivePop[4]=tweets[3];
	  		fivePop[3]=tweets[2];
	  		fivePop[2]=tweets[1];
	  		fivePop[1]=obj;
		}else if(nums>(tweets[2].favorite_count + tweets[2].retweet_count)){
	  		fivePop[4]=tweets[3];
	  		fivePop[3]=tweets[2];
	  		fivePop[2]=obj;
		}else if(nums>(tweets[3].favorite_count + tweets[3].retweet_count)){
	  		fivePop[4]=tweets[3];
	  		fivePop[3]=obj;
		}else if(nums>(tweets[4].favorite_count + tweets[4].retweet_count)){
	  		fivePop[4]=obj;
	}
  };
  console.log(fivePop);
	res.json(fivePop);
}, screen_name);
}

function cloud(req, res) {
var screen_name = req.body.screen_name;
twitter(function (data) {
      var fs = require('fs');
      fs.writeFile("./test.JSON", data, function(err) {
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
          const exec2 = require('child_process').exec;

          exec2("R CMD BATCH '--args ./test.JSON' WordCloudMaker.R", (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
			res.sendFile(__dirname +'/cloud.png')
            console.log('stdout: ' + stdout );
            console.log('stderr: '+ stderr);
          })
      }
    )});
}

function sentiment(req, res) {
	var sent = require('sentiment')
	var screen_name = req.body.screen_name;
	twitter(function(data) {
		console.log(typeof data);
		data = JSON.parse(data);
		var total = 0;
		var count = 0;
		for(var t in data) {
			var val = sent(data[t].text)
			//console.log('sentiment time: ' + data[t].text);
			console.log(val);
			total += val.score;
			count++;
		}
		console.log('avg: ' + (total/count));
		var avg = total/count;
		res.json({val: avg});
	}, screen_name);
}

function brunt(req, res) {
	var screen_name = req.body.screen_name;
	twitter(function(data) {
	data = JSON.parse(data);
	var passive = require('passive-voice');
	var passiveCount = 0;
	for(var t in data) {
		//arr.push({data[t].text}); //favorite_count
		var val = passive(data[t].text);
		console.log(data[t].text);
		console.log(val);
		console.log('---');
		if(val.length > 0)
			passiveCount++;
	}
	console.log(passiveCount*10/200);
	var val = passiveCount*10/200;
	res.json({val: val});
	}, screen_name);

}

function orig(req, res) {
	/*var screen_name = req.body.screen_name;
	twitter(function(data) {
	data = JSON.parse(data);
	var cliches = require('no-cliches');
	var clicheCount = 0;
	for(var t in data) {
		var val = cliches(data[t].text);
		console.log(data[t].text);
		console.log(val);
		console.log('---');
		if(val.length > 0)
			clicheCount++;
	}
	console.log(clicheCount*10/200);
	var val = clicheCount*10/200;
	res.json({val: val});
	}, screen_name);*/
}

function sendAnaylsis(res, req) {
	//res.json({data: 'anaylsis'});
	var screen_name = req.body.screen_name;
	twitter(function (data) {
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
            fiveNames.map(function(str){
                twitter.getUser({screen_name: str}, error, namesSuccess);
              });
            console.log('stderr: '+ stderr);
            console.log(fiveNames);
          })

      }
    )}, screen_name)
    var config = require('../config.js');

    var twitter = new Twitter(config);

    var username = 'MarkFajita';
    var fiveUsers = [];

var counter =0;
    var namesSuccess = function(data){
      fiveUsers.push(data);
      counter++;
      if(counter>=5){
        //console.log("KERLIN SEND IT");
				res.json(fiveUsers);
      }
    }
}
