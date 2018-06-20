import React, { Component } from 'react';
import store from '../store/store';

const CompareReposHeader = (props) => {
  const {repos} = props;
  console.log("CompareReposHeader", repos);
  return (
    <div><p>{repos.map(repo => repo.name).join(' vs ')}</p></div>
  );
}

const STARS_WEIGHT = 1;
const FORKS_WEIGHT = 0.9;
const WATCHERS_COUNT = 0.8;
const OPEN_ISSUES_COUNT = -0.1;

const calcScoreForProject = (repo) => {
  return  (repo.stargazers_count * STARS_WEIGHT
        + repo.forks_count * FORKS_WEIGHT
        + repo.watchers * WATCHERS_COUNT
        + repo.open_issues_count * OPEN_ISSUES_COUNT).toFixed(2);
}

const calculateScoresForProjects = (repos) => {
  return repos.map(repo => [repo, calcScoreForProject(repo)]);
}

const sortProjectsByScore = (repoScorePairs) => {
  return repoScorePairs.sort((a, b) => b[1] - a[1]);
}


class ProjectsComparator extends Component {
  constructor(props) {
    super(props);
    this.state = { projectsToCompare: store.getState().projectsToCompare }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState({ projectsToCompare: store.getState().projectsToCompare}));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const {projectsToCompare} = this.state;
    const sortedByScore = sortProjectsByScore(calculateScoresForProjects(projectsToCompare));

    if (0 === projectsToCompare.length) {
      return (<div> Nothing to compare</div>);
    }
    return (
      <div>
        <CompareReposHeader repos={projectsToCompare}/>
        <ul>
          {sortedByScore.map(([repo, score], key) => <li key={key}>Number: {key + 1}, Name: {repo.name}, Score: {score}</li>)}
        </ul>
      </div>
    );
  }
}

export default ProjectsComparator;
