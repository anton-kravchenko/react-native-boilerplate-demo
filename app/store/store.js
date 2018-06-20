import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import reducer from './reducer';

const defaultState = {
    org: '',
    projects: [],
    projectsInFocus: [],
    projectsToCompare: []
};

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(reducer),
  defaultState,
  compose(applyMiddleware(routerMiddleware(history))),
)

export default store;
export {
    history
};
