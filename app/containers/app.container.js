import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../components/search.component'
import Logo from '../components/logo.component'
import Loading from '../components/loading.component'
import SixTweets from '../components/sixTweets.component'
import UserCard from '../components/userCard.component'
import Statistic from '../components/statistic.component'
var Twitter = require('twitter-node-client').Twitter;
var config = require('../../config.js');
var getNotable = require('../../public/js/getNotableTweets.js');
var analysis = require('../../public/js/analysis');
var twitter = new Twitter(config);
// Search component created as a class
class AppContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:{},
      autoCompleteValue: '',
      user:{},
      names:[],
      tweets:[]
    }
  }
  handleSelect(value, item){
    this.setState({ autoCompleteValue: value, name: item });
  }


  handleChange(event, value) {
    this.setState({autoCompleteValue: event.target.value});

    if(!(value === null || value.match(/^ *$/) !== null)){
      // Update input box
      let _this = this;
      var namesError = function (err){
        _this.setState({names: []});
        console.log("error");

      }
      var namesSuccess = function(data){
        var arr = JSON.parse(data);
        _this.setState({names: arr});
      }
      twitter.getCustomApiCall('/users/search.json',{ q: value}, namesError, namesSuccess);
    }else {
      this.setState({names:[]});
    }
  }
  getTweets(){
    var _this = this;
    var tweetsError = function(){
      console.log("No tweets Found");
    }

    var tweetsSuccess = function(data){
      var tweets = JSON.parse(data);
      var bruntness = analysis.brunt(tweets);
      var professionalism = analysis.prof(tweets);
      var positivity = analysis.sentiment(tweets);
      _this.setState({'tweets': tweets, user: tweets[0].user});
          ReactDOM.render(<SixTweets tweets={getNotable(tweets)}/>, document.getElementById('placeForTweets'));
          ReactDOM.render(<UserCard user={_this.state.user}/>, document.getElementById('placeForUser'));
          ReactDOM.render((<div>
                              <Statistic val={positivity} label="Positivity" />
                              <Statistic val={professionalism} label="Professionalism" />
                              <Statistic val={bruntness} label="Bruntness" />
                          </div>), document.getElementById('statistics'));

    }

    twitter.getUserTimeline({ screen_name: this.state.autoCompleteValue, count: '200'}, tweetsError, tweetsSuccess);
  }
    // render method is most important
    // render method returns JSX template
    render() {

        return (
          <div>
            <Loading/>
            <Logo/>
            <Search header = "Recruitment Analysis Done Right" buttonText="Analyze"
            autoCompleteValue={this.state.autoCompleteValue}
            names={this.state.names}
            handleSelect={this.handleSelect.bind(this)}
            handleChange={this.handleChange.bind(this)}
            placeholder="Twitter handle"
            onSubmit ={this.getTweets.bind(this)}/>
            <div id='placeForUser'></div>
            <div id='placeForTweets'>
            </div>
            <div className='ui statistics' id='statistics'></div>
          </div>
        );
    }
}

export default AppContainer
