/**
 * Created by cg on 2017/9/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import routes from './routes/index';
import './index.less';
ReactDOM.render(
  <Provider store={store}>
    { routes }
  </Provider>,
  document.getElementById('app')
//多页应用多个页面入口
); 
//处理base标签
if (document.head.getElementsByTagName('base') && document.head.getElementsByTagName('base')[0]) {
  document.head.getElementsByTagName('base')[0].remove();
}