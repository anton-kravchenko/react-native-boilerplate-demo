// @flow
import type { State } from "./store";
import type { Repo } from "../src/GitRepos";

type SET_ORG_ACTION = {
  type: "SET_ORG",
  payload: string
};

type SET_PROJECTS_ACTION = {
  type: "SET_PROJECTS",
  payload: Repo[]
};

type SET_PROJECT_FOCUS_ACTION = {
  type: "SET_PROJECT_FOCUS",
  payload: Repo
};

type REMOVE_PROJECT_FOCUS_ACTION = {
  type: "REMOVE_PROJECT_FOCUS",
  payload: Repo
};

type ADD_REPO_TO_COMPARE_LIST_ACTION = {
  type: "ADD_REPO_TO_COMPARE_LIST",
  payload: Repo
};

type ADD_REPOS_TO_COMPARE_LIST_ACTION = {
  type: "ADD_REPOS_TO_COMPARE_LIST",
  payload: Repo[]
};

type REMOVE_REPO_FROM_COMPARE_LIST = {
  type: "REMOVE_REPO_FROM_COMPARE_LIST",
  payload: Repo
};

type REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST_ACTION = {
  type: "REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST",
  payload: Repo[]
};
//fixme rename to action

type SET_FETCH_FAIL = {
  type: "SET_FETCH_FAIL",
  payload: string
};
//fixme rename to action
type SET_ORGANIZATION_NAME = {
  type: "SET_ORGANIZATION_NAME",
  payload: string
};

export type Action =
  | SET_ORG_ACTION
  | SET_PROJECTS_ACTION
  | SET_PROJECT_FOCUS_ACTION
  | REMOVE_PROJECT_FOCUS_ACTION
  | ADD_REPO_TO_COMPARE_LIST_ACTION
  | ADD_REPOS_TO_COMPARE_LIST_ACTION
  | REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST_ACTION
  | SET_FETCH_FAIL
  | REMOVE_REPO_FROM_COMPARE_LIST
  | SET_ORGANIZATION_NAME;

//FIXME: uncomment
// const reducer = (state: State, action: Action): State => {
const reducer = (state: State, action: Action): State => {
  console.log(action.type);
  switch (action.type) {
    case "SET_ORG":
      return { ...state, org: action.payload };
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "SET_ORGANIZATION_NAME":
      return {
        ...state,
        organizationName: action.payload
      };
    case "SET_FETCH_FAIL":
      return { ...state, fetchFailed: true, fetchError: action.payload };
    case "SET_PROJECT_FOCUS":
      return {
        ...state,
        projectsInFocus: [...state.projectsInFocus, action.payload]
      };
    case "REMOVE_PROJECT_FOCUS":
      return {
        ...state,
        projectsInFocus: state.projectsInFocus.filter(p => p !== action.payload)
      };
    case "ADD_REPO_TO_COMPARE_LIST":
      return {
        ...state,
        projectsToCompare: [...state.projectsToCompare, action.payload]
      };
    case "ADD_REPOS_TO_COMPARE_LIST":
      return {
        ...state,
        projectsToCompare: [...state.projectsToCompare, ...action.payload]
      };
    case "REMOVE_REPO_FROM_COMPARE_LIST":
      return {
        ...state,
        projectsToCompare: state.projectsToCompare.filter(
          r => r !== action.payload
        )
      };
    case "REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST":
      return { ...state, projectsToCompare: [] };

    default:
      return state;
  }
};

export default reducer;
