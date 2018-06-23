// @flow

import type { Repo } from "./GitRepos";

const STARS_WEIGHT = 1;
const FORKS_WEIGHT = 0.9;
const WATCHERS_COUNT = 0.8;
const OPEN_ISSUES_COUNT = -0.1;

const calcScoreForProject = (repo: Repo): number => {
  return (
    repo.stargazers_count * STARS_WEIGHT +
    repo.stargazers_count * STARS_WEIGHT +
    repo.forks_count * FORKS_WEIGHT +
    repo.watchers * WATCHERS_COUNT +
    repo.open_issues_count * OPEN_ISSUES_COUNT
  );
};

type RepoScorePair = {
  repo: Repo,
  score: number
};
type Id = {
  id: number
};
type RepoScoreIdTriple = RepoScorePair & Id;

const calculateScoresForProjects = (repos: Repo[]): RepoScorePair[] => {
  return repos.map((repo: Repo) => {
    return {
      repo,
      score: calcScoreForProject(repo)
    };
  });
};

const sortProjectsByScore = (repoScorePairs: RepoScorePair[]) =>
  repoScorePairs.slice().sort((a, b) => b.score - a.score);

const getSorterProjectsWithScores = (repos: Repo[]): RepoScoreIdTriple[] =>
  sortProjectsByScore(calculateScoresForProjects(repos)).map((rs, id) => {
    return { ...rs, id };
  });

export { getSorterProjectsWithScores };
export type { RepoScoreIdTriple };
