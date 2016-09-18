
var getTopSix = function(tweets, userName){

  var sixPop=[];//=[tweets[0],tweets[1],tweets[2],tweets[3],tweets[4],tweets[5]];
  //console.log(sixPop[0]);
  for(var i=0;i<tweets.length;i++){
    if(tweets[i].screen_name===userName){
      if(sixPop.length<6){
        sixPop.push(tweets[i]);
      }else if(sixPop.length==6){
        sixPop.sort(function(a,b){
          if((a.favorite_count + a.retweet_count) > (b.favorite_count + b.retweet_count)){
            return 1;
          }else if((a.favorite_count + a.retweet_count) < (b.favorite_count + b.retweet_count)){
            return -1;
          }else {
            return 0;
          }
        });
      }else {
        var obj = tweets[i];
        var nums = obj.favorite_count + obj.retweet_count;
        if(nums>=(sixPop[0].favorite_count + sixPop[0].retweet_count)){
          sixPop[5]=sixPop[4];
          sixPop[4]=sixPop[3];
          sixPop[3]=sixPop[2];
          sixPop[2]=sixPop[1];
          sixPop[1]=sixPop[0];
          sixPop[0]=obj;
        }else if(nums>(sixPop[1].favorite_count + sixPop[1].retweet_count)){
          sixPop[5]=sixPop[4];
          sixPop[4]=sixPop[3];
          sixPop[3]=sixPop[2];
          sixPop[2]=sixPop[1];
          sixPop[1]=obj;
        }else if(nums>(sixPop[2].favorite_count + sixPop[2].retweet_count)){
          sixPop[5]=sixPop[4];
          sixPop[4]=sixPop[3];
          sixPop[3]=sixPop[2];
          sixPop[2]=obj;
        }else if(nums>(sixPop[3].favorite_count + sixPop[3].retweet_count)){
          sixPop[5]=sixPop[4];
          sixPop[4]=sixPop[3];
          sixPop[3]=obj;
        }else if(nums>(sixPop[4].favorite_count + sixPop[4].retweet_count)){
          sixPop[5]=sixPop[4];
          sixPop[4]=obj;
        }else if(nums>(sixPop[5].favorite_count + sixPop[5].retweet_count)){
          sixPop[5]=obj;
        }
      };
    }
  }
  return sixPop;
};
module.exports = getTopSix;
