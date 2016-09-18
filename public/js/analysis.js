
function sentiment(tweets) {
	var sent = require('sentiment');

		var total = 0;
		var count = 0;
		for(var t in tweets) {
			var val = sent(tweets[t].text);
			//console.log('sentiment time: ' + data[t].text);
			total += val.score;
			count++;
		}
		var avg = total/count;
    return avg;
}

function brunt(tweets) {
	var passive = require('passive-voice');
	var passiveCount = 0;
	for(var t in tweets) {
		var val = passive(tweets[t].text);
		if(val.length > 0)
			passiveCount++;
	}
	var val = passiveCount*10/200;
  return val;

}

function prof(tweets) {
	// var emotional = require("emotional");
	// var count = 0;
  // var val;
	// emotional.load(function() {
	// 	for(var t in tweets) {
	// 		var val = emotional.get(tweets[t].text);
	// 		//console.log(val);
	// 		for(var as in val.assessments) {
	// 			var a = val.assessments[as][0][0];
	// 			if(a == 'seriously' || a == 'corporate' || a == 'thanks' || a == 'future' || a == 'complete' || a == 'exactly' || a == 'possible') {
	// 				count++;
	// 		} else if(a == 'hate' || a == 'mess') {
	// 				count-= 2;
	// 			}
	// 		}
	// 	}
	// 	val = count*17/200;
	// })
  return 0;
}

module.exports = {
  "prof": prof,
  "brunt": brunt,
  "sentiment": sentiment
}
