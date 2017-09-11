import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Nlp from 'page/nlp/nlp';
import Login from 'page/login/index';
import Container from '../component/container';
const routes = (
  <Router history={hashHistory}>
      <Route path="/" component={Container}>
          <IndexRoute component={Nlp}/>
          <Route path="/login" component={Login} />
          <Route path="/nlp" component={Nlp}></Route>
      </Route>
  </Router>);
export default routes;
