// @flow

import React, { Component } from "react";

import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Input,
  Item,
  Icon,
  Spinner,
  List,
  ListItem,
  ScrollView,
  Body,
  CheckBox
} from "native-base";

import _ from "underscore";
import store from "../store/store";

export type Repo = {
  name: string,
  full_name: string,
  watchers: number,
  stargazers_count: number,
  open_issues_count: number,
  forks_count: number
};

type GitReposState = {
  repos: Repo[],
  reposInFocus: Repo[],
  filterByStr: string,
  projectsToCompare: Repo[],
  fetchFailed: boolean,
  fetchError: string,
  org: string
};

type GitRepoProps = {};

class GitRepos extends Component<GitRepoProps, GitReposState> {
  constructor(props: GitRepoProps) {
    super(props);
    this.state = {
      repos: [],
      reposInFocus: [],
      filterByStr: "",
      projectsToCompare: [],
      fetchFailed: false,
      fetchError: "",
      org: ""
    };
  }
  componentDidMount() {
    // this.unsubscribe = store.subscribe(() => {
    store.subscribe(() => {
      const storeState = store.getState();
      this.setState({
        repos: storeState.projects,
        reposInFocus: storeState.projectsInFocus,
        projectsToCompare: storeState.projectsToCompare,
        fetchFailed: storeState.fetchFailed,
        fetchError: storeState.fetchError,
        org: storeState.organizationName
      });
    });

    this.fetchReposByOrg(store.getState().organizationName);
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
      .then(async resp => {
        if (resp.status !== 200) {
          throw Error((await resp.json()).message);
        } else {
          return resp;
        }
      })
      .then(resp => resp.json())
      .then((repos: Repo[]) => {
        store.dispatch({
          type: "SET_PROJECTS",
          payload: repos
        });
      })
      .catch(e => {
        this.setState({
          fetchFailed: true,
          fetchError: e.message
        });
      });
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
  toggleProjectListItem = (repo: Repo) => {
    const projectsToCompare = this.state.projectsToCompare;

    if (projectsToCompare.includes(repo)) {
      store.dispatch({
        type: "REMOVE_REPO_FROM_COMPARE_LIST",
        payload: repo
      });
    } else {
      store.dispatch({
        type: "ADD_REPO_TO_COMPARE_LIST",
        payload: repo
      });
    }
  };
  renderRepos(repos: Repo[], reposInFocus: Repo[]) {
    const selectedRepos = this.state.projectsToCompare;
    const notSelected = repos.filter(r => -1 === selectedRepos.indexOf(r));
    return (
      <List
        dataArray={notSelected}
        renderRow={repo => {
          return (
            <ListItem onPress={() => this.toggleProjectListItem(repo)}>
              <Body>
                <Text>{repo.name}</Text>
              </Body>
            </ListItem>
          );
        }}
      />
    );
  }
  filterReposByStr(repos: Repo[], substr: string) {
    substr = substr.toLowerCase();
    return repos.filter(repo => repo.name.toLowerCase().includes(substr));
  }
  renderCompareButton() {
    const selectedReposAmount = this.state.projectsToCompare.length;
    if (selectedReposAmount < 2) {
      return null;
    }
    return (
      <Button
        bordered
        success
        active={false}
        style={{ alignSelf: "center", bottom: 20 }}
        onPress={() => this.props.navigation.navigate("Comparator")}
      >
        <Text>Compare {selectedReposAmount}</Text>
      </Button>
    );
  }
  render() {
    const {
      repos,
      reposInFocus,
      filterByStr,
      projectsToCompare,
      org,
      fetchFailed,
      fetchError
    } = this.state;

    if (0 === repos.length && false == fetchFailed) {
      return (
        <Container
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>{`Loading repos...`}</Text>;
          <Spinner color="blue" />
        </Container>
      );
    }
    if (true === fetchFailed) {
      return (
        <Container
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>{`Error during fetch: ${fetchError}`}</Text>;
        </Container>
      );
    }

    const filteredRepos = this.filterReposByStr(repos, filterByStr);

    return (
      <Container>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Project name"
            onChangeText={text => this.setState({ filterByStr: text })}
          />
        </Item>
        <Text style={{ textAlign: "center" }}>Repos by {org}</Text>
        {this.renderRepos(filteredRepos, reposInFocus)}
        {this.renderCompareButton()}
      </Container>
    );
  }
}

export default GitRepos;
