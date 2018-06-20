import React, { Component } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  ListView,
  Text
} from "react-native";

class GitRepos extends Component {
  constructor(props) {
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
    //   const storeState = store.getState();
    //   this.setState({
    //     repos: storeState.projects,
    //     reposInFocus: storeState.reposInFocus,
    //     projectsToCompare: storeState.projectsToCompare
    //   });
    // });

    this.fetchReposByOrg(this.props.org);
  }
  // componentWillUnmount() {
  //   store.dispatch({ type: "REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST" });
  //   this.unsubscribe();
  // }
  generateGetReposByOrgUrl(org) {
    return `https://api.github.com/orgs/${org}/repos`;
  }
  fetchReposByOrg(org) {
    fetch(this.generateGetReposByOrgUrl(org))
      .then(resp => resp.json())
      .then(
        repos =>
          this.setState({
            repos
          })
        // store.dispatch({
        //   type: "SET_PROJECTS",
        //   payload: repos
        // })
      );
  }
  addToCompare(repo) {
    // store.dispatch({
    //   type: "ADD_REPO_TO_COMPARE_LIST",
    //   payload: repo
    // });
    // store.dispatch({
    //   type: "REMOVE_PROJECT_FOCUS",
    //   payload: repo
    // });
  }
  // projectBriefInfoOnClick = repo => {
  //   store.dispatch({
  //     type: "SET_PROJECT_FOCUS",
  //     payload: repo
  //   });
  // };
  // projectFullInfoOnClick = repo => {
  //   store.dispatch({
  //     type: "REMOVE_PROJECT_FOCUS",
  //     payload: repo
  //   });
  // };
  handleFilterInput = event => {
    this.setState({ filterByStr: event.target.value });
  };
  renderBriefRepoInfo(repo, key) {
    return (
      <Text key={key} onPress={() => this.projectBriefInfoOnClick(repo)}>
        {repo.name}
      </Text>
    );
  }
  renderFullProjectInfo(repo) {
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
  renderRepos(repos, reposInFocus) {
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
  filterReposByStr(repos, substr) {
    return repos.filter(repo => repo.name.includes(substr));
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
          store.dispatch(push("/compare/"));
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
        <TextInput onChange={this.handleFilterInput} />
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
