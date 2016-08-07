var Twitter = require('twitter-node-client').Twitter;
var config = require('../config.js');

var twitter = new Twitter(config);
var success = function(data){
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
};
var error = function(err, response, body){
  console.log('ERROR [%s]', body);

};
twitter.getUserTimeline({ screen_name: 'MarkFajita',include_rts:"false", count: '200'}, error, success);

module.exports = function(cb, name) {
 	name = typeof name !== 'undefined' ?  name : 'MarkFajita';
	twitter.getUserTimeline({ screen_name: name,include_rts:"false", count: '200'}, error, cb);
}
