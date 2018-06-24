// @flow
import { createStore as createReduxStore } from "redux";
import reducer from "./reducer";

import type { State } from "./state";

const defaultState: State = {
  org: "",
  projects: [],
  projectsInFocus: [],
  projectsToCompare: [],
  fetchFailed: false,
  fetchError: "",
  organizationName: ""
};

// @$FlowFixMe
const createStore = () => createReduxStore(reducer, defaultState);

export default createStore;
export { defaultState };
