import React, { Component } from 'react';
import './notFound.less';

class NotFound extends Component {
 
  render() {
    const props = this.props;
    return (
      <div className="not-found">
        <h1>404</h1>
        <p>您访问的页面不存在，也可能被移除了</p>
        <p onClick={() => props.history.goBack()}>返回</p>
      </div>
    );
  }
}

export default NotFound;