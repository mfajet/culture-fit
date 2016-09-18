import React from 'react'

class UserCard extends React.Component {
  render(){
    return(
      <div className="info-column ui card">
        <div className="image"><img src={this.props.user.profile_image_url.replace('_normal', '')} /></div>
        <div className="content"> <h3>{this.props.user.name}</h3><a href={this.props.user.url}>{this.props.user.screen_name}</a></div>
        <div className="content"> <p>{this.props.user.description}</p></div>
        <div className="content"> <p>{this.props.user.created_at}</p></div>
      </div>
    )
  }

}

export default UserCard
