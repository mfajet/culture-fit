import React from 'react';
import Tweet from './tweet.component.js'

class SixTweets extends React.Component{
    render(){
      return(
        <div className='tweets'>
          <Tweet tweet={this.props.tweets[0]}/>
          <Tweet tweet={this.props.tweets[1]}/>
          <Tweet tweet={this.props.tweets[2]}/>
          <Tweet tweet={this.props.tweets[3]}/>
          <Tweet tweet={this.props.tweets[4]}/>
          <Tweet tweet={this.props.tweets[5]}/>
        </div>
      )
    }
}

export default SixTweets
