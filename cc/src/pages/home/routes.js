import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Container from './container';
import Login from './components/login';

import notFind from '../other/notFind'
// import Login from '';
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Container}>
      <IndexRoute component={Login}/>
      <Route path="/login" component={Login}/>
      {/*<Route path="/default" component={Default}/>*/}
    </Route>
    <Route path='*' component={notFind}></Route>
  </Router>);
export default routes;
