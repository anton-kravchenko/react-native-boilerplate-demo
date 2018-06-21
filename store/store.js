// @flow

// import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from "redux";
// import { connectRouter, routerMiddleware } from 'connected-react-router'

import type { Repo } from "../src/GitRepos";
import reducer from "./reducer";

export type State = {
  org: string,
  projects: Repo[],
  projectsInFocus: Repo[],
  projectsToCompare: Repo[],
  fetchFailed: boolean,
  fetchError: string
};

const defaultState: State = {
  org: "",
  projects: [],
  projectsInFocus: [],
  projectsToCompare: [],
  fetchFailed: false,
  fetchError: ""
};

// const history = createBrowserHistory();
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from "redux";

import type { Action } from "./reducer";
export type Store = ReduxStore<State, Action>;
export type GetState = () => State;

const store = createStore(
  //   connectRouter(history)(reducer),
  reducer,
  defaultState
  //   compose(applyMiddleware(routerMiddleware(history))),
);

export default store;
// export { history };
