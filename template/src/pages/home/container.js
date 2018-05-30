/**
 * Created by cg on 2017/9/1.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from 'components/Header';
import Bottom from 'components/Bottom';
import './index.less'
class LeftBar extends Component {
  render() {
    return (
      <div className="left-nav">
        <Link to="/login" activeClassName="active">
          登录
        </Link>
        <Link to="/default" activeClassName="active">
          404
        </Link>
      </div>
    );
  }
}
export default class Container extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <LeftBar />
          <div className="right-container">
            {this.props.children}
          </div>
        </div>
        <Bottom />
      </div>
    );
  }
}