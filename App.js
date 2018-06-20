// @flow

import React from "react";
import GitProjectInfo from "./src/GitProjectInfo";
import GitProjects from "./src/GitProjects";
import { View } from "react-native";

import GitReposExplorer from './src/GitReposExplorer';
import GitRepos from './src/GitRepos';

export default class App extends React.Component<{}, {}> {
  render() {
    return <GitRepos org="google" />;
    // return <GitReposExplorer />;
    return <GitProjects org="google" />;

    return (
      <View>
        <GitProjectInfo url="https://api.github.com/repos/facebook/react" />
        <GitProjects url="https://api.github.com/orgs/google/repos" />
      </View>
    );
  }
}
