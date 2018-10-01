/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Route, Switch } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './pages/containers/home';
import MovieDetailsPage from './pages/containers/movie-details';
import PlayerPage from './pages/containers/player';

export default () => (
  <App>
    <Switch>
      <Route path={routes.MOVIE_DETAILS} component={MovieDetailsPage} />
      <Route path={routes.PLAYER} component={PlayerPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
