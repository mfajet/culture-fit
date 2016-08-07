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

router.post('/prof', function(req, res) {
	prof(req, res);
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
		var fivePop=[tweets[0],tweets[1],tweets[2],tweets[3],tweets[4],tweets[5]];
	  console.log(fivePop[0]);
	  for(var i=6;i<tweets.length;i++){
	    var obj = tweets[i];
	    var nums = obj.favorite_count + obj.retweet_count;
	    if(nums>=(fivePop[0].favorite_count + fivePop[0].retweet_count)){
	      fivePop[5]=fivePop[4];
	      fivePop[4]=fivePop[3];
	      fivePop[3]=fivePop[2];
	      fivePop[2]=fivePop[1];
	      fivePop[1]=fivePop[0];
	      fivePop[0]=obj;
	    }else if(nums>(fivePop[1].favorite_count + fivePop[1].retweet_count)){
	      fivePop[5]=fivePop[4];
	      fivePop[4]=fivePop[3];
	      fivePop[3]=fivePop[2];
	      fivePop[2]=fivePop[1];
	      fivePop[1]=obj;
	    }else if(nums>(fivePop[2].favorite_count + fivePop[2].retweet_count)){
	      fivePop[5]=fivePop[4];
	      fivePop[4]=fivePop[3];
	      fivePop[3]=fivePop[2];
	      fivePop[2]=obj;
	    }else if(nums>(fivePop[3].favorite_count + fivePop[3].retweet_count)){
	      fivePop[5]=fivePop[4];
	      fivePop[4]=fivePop[3];
	      fivePop[3]=obj;
	    }else if(nums>(fivePop[4].favorite_count + fivePop[4].retweet_count)){
	      fivePop[5]=fivePop[4];
	      fivePop[4]=obj;
	    }else if(nums>(fivePop[5].favorite_count + fivePop[5].retweet_count)){
	      fivePop[5]=obj;
	    }
	  };
  console.log(fivePop);
	res.json(fivePop);
}, screen_name);
}

function cloud(req, res) {
var screen_name = req.body.screen_name || req.query.screen_name;
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

function prof(req, res) {
	var screen_name = req.body.screen_name;
	twitter(function(data) {
	data = JSON.parse(data);
<<<<<<< HEAD
	var emotional = require("emotional");
	var count = 0;
	emotional.load(function() {
		for(var t in data) {
			var val = emotional.get(data[t].text);
			//console.log(val);
			for(var as in val.assessments) {
				console.log(val.assessments[as][0][0]);
				var a = val.assessments[as][0][0];
				if(a == 'seriously' || a == 'corporate' || a == 'thanks' || a == 'future' || a == 'complete' || a == 'exactly' || a == 'possible') {
					count++; 
			} else if(a == 'hate' || a == 'mess') {
					count-= 2;
				}
			}
		}
		console.log(count*17/200);
		var val = count*17/200;
		res.json({val: val});
	})
	}, screen_name);
=======
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
>>>>>>> cf15a3500d6a689784410f721a57b88299de1aaf
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
