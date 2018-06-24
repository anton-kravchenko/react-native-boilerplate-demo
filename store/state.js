// @flow
import type { Repo } from "../src/Repo";

export type State = {
  org: string,
  projects: Repo[],
  projectsInFocus: Repo[],
  projectsToCompare: Repo[],
  fetchFailed: boolean,
  fetchError: string,
  organizationName: string
};
