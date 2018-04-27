import React, { Component } from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { Home}  from './components';
import App from './App';

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
        </Route>
      </Router>
    );
  }
}
