import React, { Component } from 'react';
import store from '../store/store';
import CompareProjectsList from './compareProjectsList';
import { push } from 'connected-react-router';

// https://api.github.com/orgs/google/repos
// GET /orgs/:org/repos

// GET /repos/:owner/:repo
// https://api.github.com/repos/facebook/react


class GitRepos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      projectsInFocus: [],
      filterByStr: '',
      projectsToCompare: []
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const storeState = store.getState();
      this.setState({
        repos: storeState.projects,
        reposInFocus: storeState.projectsInFocus,
        projectsToCompare: storeState.projectsToCompare
      });
    })

    this.fetchReposByOrg(this.props.org);
  }
  componentWillUnmount() {
    store.dispatch({type: "REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST"});
    this.unsubscribe();
  }
  generateGetReposByOrgUrl(org) {
    return `https://api.github.com/orgs/${org}/repos`
  }
  fetchReposByOrg(org) {
    fetch(this.generateGetReposByOrgUrl(org))
    .then(resp => resp.json())
    .then(repos => store.dispatch({
      type: "SET_PROJECTS",
      payload: repos
    }));
  }
  addToCompare(repo) {
    store.dispatch({
      type: "ADD_REPO_TO_COMPARE_LIST",
      payload: repo
    });
    store.dispatch({
      type: "REMOVE_PROJECT_FOCUS",
      payload: repo
    })
  }
  projectBriefInfoOnClick = (repo) => {
    store.dispatch({
      type: "SET_PROJECT_FOCUS",
      payload: repo
    })
  }
  projectFullInfoOnClick = (repo) => {
    store.dispatch({
      type: "REMOVE_PROJECT_FOCUS",
      payload: repo
    })
  }
  handleFilterInput = (event) => {
    this.setState({filterByStr: event.target.value});
  }
  renderBriefRepoInfo(repo, key) {
    return <li key={key} onClick={() => this.projectBriefInfoOnClick(repo)}>{repo.name}</li>
  }
  renderFullProjectInfo(repo, key) {
    return (
      <div key={key}>
        <div onClick={() => this.projectFullInfoOnClick(repo)}>
          <p>Name {repo.name}</p>
          <p>Full name {repo.full_name}</p>
          <p>Wathcers count {repo.watchers}</p>
          <p>Stars count {repo.stargazers_count}</p>
          <p>Open issues count {repo.open_issues_count}</p>
          <p>Forks count {repo.forks_count}</p>
        </div>
        {false === this.state.projectsToCompare.includes(repo) && <button onClick={() => this.addToCompare(repo)}>Compare</button>}
      </div>
    );
  }
  renderRepos(repos, reposInFocus) {
    return <ul>{repos.map((repo, key) => reposInFocus.includes(repo) ? this.renderFullProjectInfo(repo, key) : this.renderBriefRepoInfo(repo, key))}</ul>
  }
  filterReposByStr(repos, substr) {
    return repos.filter(repo => repo.name.includes(substr));
  }
  renderCompareAllButton() {
    return (<button onClick={() => {
      store.dispatch({
        type: "ADD_REPOS_TO_COMPARE_LIST",
        payload: this.filterReposByStr(this.state.repos, this.state.filterByStr)
      });
      store.dispatch(push('/compare/'));
    }}>Compare all</button>);
  }
  render() {
    const {repos, reposInFocus, filterByStr, projectsToCompare} = this.state;
    const {org} = this.props;

    if (!repos) {
      return <div>Loading repos from {org}...</div>
    }

    const filteredRepos = this.filterReposByStr(repos, filterByStr);

    return (
      <div>
        <p>Filter <input onChange={this.handleFilterInput}/></p>
        <div>Repos by {org}</div>
        {this.renderRepos(filteredRepos, reposInFocus)}
        {0 !== projectsToCompare.length && <CompareProjectsList />}
        {this.renderCompareAllButton()}
      </div>
    );
  }
}

export default GitRepos;
