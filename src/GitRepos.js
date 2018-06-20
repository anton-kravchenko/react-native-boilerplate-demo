// @flow

import React, { Component } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  ListView,
  Text
} from "react-native";

import store from "../store/store";

export type Repo = {
  name: string,
  full_name: string,
  watchers: string,
  stargazers_count: string,
  open_issues_count: string,
  forks_count: string
};

type GitReposState = {
  repos: Repo[],
  reposInFocus: Repo[],
  filterByStr: string,
  projectsToCompare: Repo[]
};

type GitRepoProps = {
  org: string
};

class GitRepos extends Component<GitRepoProps, GitReposState> {
  constructor(props: GitRepoProps) {
    super(props);
    this.state = {
      repos: [],
      reposInFocus: [],
      filterByStr: "",
      projectsToCompare: []
    };
  }
  componentDidMount() {
    // this.unsubscribe = store.subscribe(() => {
    store.subscribe(() => {
      const storeState = store.getState();
      this.setState({
        repos: storeState.projects,
        reposInFocus: storeState.projectsInFocus,
        projectsToCompare: storeState.projectsToCompare
      });
    });

    this.fetchReposByOrg(this.props.org);
  }
  componentWillUnmount() {
    store.dispatch({ type: "REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST" });
    // this.unsubscribe();
  }
  generateGetReposByOrgUrl(org: string) {
    return `https://api.github.com/orgs/${org}/repos`;
  }
  fetchReposByOrg(org: string) {
    fetch(this.generateGetReposByOrgUrl(org))
      .then(resp => resp.json())
      .then((repos: Repo[]) =>
        store.dispatch({
          type: "SET_PROJECTS",
          payload: repos
        })
      );
  }
  addToCompare(repo: Repo) {
    store.dispatch({
      type: "ADD_REPO_TO_COMPARE_LIST",
      payload: repo
    });
    store.dispatch({
      type: "REMOVE_PROJECT_FOCUS",
      payload: repo
    });
  }
  projectBriefInfoOnClick = (repo: Repo) => {
    store.dispatch({
      type: "SET_PROJECT_FOCUS",
      payload: repo
    });
  };
  projectFullInfoOnClick = (repo: Repo) => {
    store.dispatch({
      type: "REMOVE_PROJECT_FOCUS",
      payload: repo
    });
  };
  renderBriefRepoInfo(repo: Repo) {
    return (
      <Text onPress={() => this.projectBriefInfoOnClick(repo)}>
        {repo.name}
      </Text>
    );
  }
  renderFullProjectInfo(repo: Repo) {
    return (
      <View>
        <View onPress={() => this.projectFullInfoOnClick(repo)}>
          <Text>Name {repo.name}</Text>
          <Text>Full name {repo.full_name}</Text>
          <Text>Wathcers count {repo.watchers}</Text>
          <Text>Stars count {repo.stargazers_count}</Text>
          <Text>Open issues count {repo.open_issues_count}</Text>
          <Text>Forks count {repo.forks_count}</Text>
        </View>
        {false === this.state.projectsToCompare.includes(repo) && (
          <Button title={"Compare"} onPress={() => this.addToCompare(repo)} />
        )}
      </View>
    );
  }
  renderRepos(repos: Repo[], reposInFocus: Repo[]) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
      <ListView
        dataSource={ds.cloneWithRows(repos)}
        renderRow={repo =>
          reposInFocus.includes(repo)
            ? this.renderFullProjectInfo(repo)
            : this.renderBriefRepoInfo(repo)
        }
      />
    );
  }
  filterReposByStr(repos: Repo[], substr: string) {
    substr = substr.toLowerCase();
    return repos.filter(repo => repo.name.toLowerCase().includes(substr));
  }
  renderCompareAllButton() {
    return (
      <Button
        title={"Compare all"}
        onPress={() => {
          store.dispatch({
            type: "ADD_REPOS_TO_COMPARE_LIST",
            payload: this.filterReposByStr(
              this.state.repos,
              this.state.filterByStr
            )
          });
          // store.dispatch(push("/compare/"));
        }}
      />
    );
  }
  render() {
    const { repos, reposInFocus, filterByStr, projectsToCompare } = this.state;
    const { org } = this.props;

    if (!repos) {
      return <Text>Loading repos from {org}...</Text>;
    }

    const filteredRepos = this.filterReposByStr(repos, filterByStr);

    return (
      <View style={styles.container}>
        <Text>Filter</Text>
        <TextInput
          onChangeText={(text) => this.setState({filterByStr :text})}
          style={{ backgroundColor: "white", width: "80%", height: "5%" }}
        />
        <Text>Repos by {org}</Text>
        {this.renderRepos(filteredRepos, reposInFocus)}
        {/* {0 !== projectsToCompare.length && <CompareProjectsList />} */}
        {this.renderCompareAllButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default GitRepos;
