import React from 'react';

class Statistic extends React.Component {
    render(){
      return (
        <div className='statistic'>
          <div className='value'>{Math.floor(this.props.val * 100)}%</div>
          <div className='label'>{this.props.label}</div>
        </div>
      )
    }
}

export default Statistic
