import React, { PropTypes, Component } from 'react';
import NotFound from 'components/default/NotFound';
export default class Default extends Component{
  render(){
    return(
      <div className="log">
               这是缺省页面
        <NotFound/>
      </div>
    );
  }
}