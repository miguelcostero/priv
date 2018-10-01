// @flow
import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redux';
import counter from './counter';
import data from './data';
import documentTitle from './document-title';
import isLoading from './is-loading';
import modal from './modal';

const rootReducer = combineReducers({
  counter,
  router,
  isLoading,
  documentTitle,
  data,
  modal
});

export default rootReducer;
