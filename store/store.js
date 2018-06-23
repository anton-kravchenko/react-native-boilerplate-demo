// @flow

import { applyMiddleware, compose, createStore } from "redux";

import type { Repo } from "../src/GitRepos";
import reducer from "./reducer";

export type State = {
  org: string,
  projects: Repo[],
  projectsInFocus: Repo[],
  projectsToCompare: Repo[],
  fetchFailed: boolean,
  fetchError: string,
  organizationName: string
};

const defaultState: State = {
  org: "",
  projects: [],
  projectsInFocus: [],
  projectsToCompare: [],
  fetchFailed: false,
  fetchError: "",
  organizationName: ""
};

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from "redux";
import type { Action } from "./reducer";
export type Store = ReduxStore<State, Action>;
export type GetState = () => State;

// @$FlowFixMe
const store = createStore(reducer, defaultState);

export default store;
