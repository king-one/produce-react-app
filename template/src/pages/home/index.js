/**
 * Created by cg on 2017/9/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './stores';
import routes from './routes';
import './index.less';
ReactDOM.render(
  <Provider store={store}>
    { routes }
  </Provider>,
  document.getElementById('app')
//多页应用配置多个页面入口
); 