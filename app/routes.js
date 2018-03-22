/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import MovieDetailsPage from './pages/containers/movie-details';
import PlayerPage from './pages/containers/player';

export default () => (
  <App>
    <Switch>
      <Route path="/counter" component={CounterPage} exact />
      <Route path="/movie/:id" component={MovieDetailsPage} />
      <Route path="/player/:hash" component={PlayerPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
