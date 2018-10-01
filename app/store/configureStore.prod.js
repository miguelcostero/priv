// @flow
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import type { initialStateType } from '../types/initialState';

const history = createHashHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: initialStateType) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
