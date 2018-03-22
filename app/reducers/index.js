// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import isLoading from './is-loading';
import documentTitle from './document-title';
import data from './data';

const rootReducer = combineReducers({
  counter,
  router,
  isLoading,
  documentTitle,
  data
});

export default rootReducer;
