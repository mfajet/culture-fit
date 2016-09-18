import React from 'react';

class Tweet extends React.Component {
  render(){
    return(
      <div className="tweet">
        <div className="ui card">
          <div className="content">
            <div className="description">
              <p>{this.props.tweet.text}</p>
            </div>
          </div>
          <div className="extra content">
            <i className="empty heart icon"></i> {this.props.tweet.favorite_count} &nbsp; <i className="retweet icon"></i> {this.props.tweet.retweet_count}
            <div className="right floated meta">{this.props.tweet.created_at}</div>
          </div>
        </div>
      </div>
    )
  }

}

export default Tweet
