// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import isLoading from './is-loading';
import documentTitle from './document-title';
import data from './data';
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
