// @flow
import type { State } from "./state";
import type { Repo } from "../src/Repo";

type SET_FETCH_FAIL_ACTION = {
  type: "SET_FETCH_FAIL",
  payload: string
};

type REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST_ACTION = {
  type: "REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST"
};

type ADD_REPO_TO_COMPARE_LIST_ACTION = {
  type: "ADD_REPO_TO_COMPARE_LIST",
  payload: Repo
};

type SET_PROJECTS_ACTION = {
  type: "SET_PROJECTS",
  payload: Repo[]
};

type SET_ORGANIZATION_NAME_ACTION = {
  type: "SET_ORGANIZATION_NAME",
  payload: string
};

export type Action =
  | SET_FETCH_FAIL_ACTION
  | REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST_ACTION
  | ADD_REPO_TO_COMPARE_LIST_ACTION
  | SET_PROJECTS_ACTION
  | SET_ORGANIZATION_NAME_ACTION;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ORGANIZATION_NAME":
      return {
        ...state,
        organizationName: action.payload
      };
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "ADD_REPO_TO_COMPARE_LIST":
      return {
        ...state,
        projectsToCompare: [...state.projectsToCompare, action.payload]
      };
    case "REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST":
      return { ...state, projectsToCompare: [] };
    case "SET_FETCH_FAIL":
      return { ...state, fetchFailed: true, fetchError: action.payload };

    default:
      return state;
  }
};

export default reducer;
