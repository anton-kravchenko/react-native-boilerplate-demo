// @flow

import {
  getSorterProjectsWithScores,
  calcScoreForProject,
  calculateScoresForProjects,
  sortProjectsByScore
} from "../src/projectsComparator";

import type {
  RepoScoreIdTriple,
  RepoScorePair
} from "../src/projectsComparator";

import type { Repo } from "../src/GitRepos";

describe("test projectsComparator module", () => {
  test("test calcScoreForProject function", () => {
    const repo = {
      stargazers_count: 100,
      forks_count: 100,
      watchers: 100,
      open_issues_count: 100,
      full_name: "",
      name: ""
    };
    const expectedScore =
      repo.stargazers_count * 1 +
      repo.forks_count * 0.9 +
      repo.watchers * 0.8 -
      repo.open_issues_count * 0.5;
    expect(calcScoreForProject(repo)).toBe(expectedScore);
  });

  test("test calcScoreForProjects function", () => {
    const repo = {
      stargazers_count: 100,
      forks_count: 100,
      watchers: 100,
      open_issues_count: 100,
      full_name: "",
      name: ""
    };
    const expectedScore =
      repo.stargazers_count * 1 +
      repo.forks_count * 0.9 +
      repo.watchers * 0.8 -
      repo.open_issues_count * 0.5;
    expect(calculateScoresForProjects([repo, repo, repo])).toEqual([
      { repo, score: expectedScore },
      { repo, score: expectedScore },
      { repo, score: expectedScore }
    ]);
  });

  test("test sortProjectsByScore function", () => {
    const repoShouldBeFirst = {
      repo: {
        stargazers_count: 100,
        forks_count: 100,
        watchers: 100,
        open_issues_count: 100,
        full_name: "",
        name: ""
      },
      score: 101
    };

    const repoShouldBeSecond = {
      ...repoShouldBeFirst,
      score: 100
    };

    expect(
      sortProjectsByScore([repoShouldBeSecond, repoShouldBeFirst])
    ).toEqual([repoShouldBeFirst, repoShouldBeSecond]);
  });

  test("test getSorterProjectsWithScores function", () => {
    const firstRepo = {
      stargazers_count: 100,
      forks_count: 100,
      watchers: 100,
      open_issues_count: 100,
      full_name: "",
      name: ""
    };

    const secondRepo = {
      ...firstRepo,
      open_issues_count: 101
    };

    const expectedFirstRepo = {
      repo: { ...firstRepo },
      score: 220,
      id: 0
    };
    const expectedSecondRepo = {
      repo: { ...secondRepo },
      score: 219.5,
      id: 1
    };
    expect(getSorterProjectsWithScores([secondRepo, firstRepo])).toEqual([
      expectedFirstRepo,
      expectedSecondRepo
    ]);
  });
});
