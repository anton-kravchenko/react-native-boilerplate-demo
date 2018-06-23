// @flow

import React from "react";

import { View, Text } from "react-native";

import GitReposExplorer from "./src/GitReposExplorer";
import GitRepos from "./src/GitRepos";
import GitReposComparator from "./src/GitProjectsComparator";

import { createStackNavigator } from "react-navigation";

import { StackNavigator } from "react-navigation";

class DetailsScreen extends React.Component<{}> {
  render() {
    return <Text>Details Screen</Text>;
  }
}

const RootStack = createStackNavigator({
  Home: {
    screen: GitReposExplorer,
    Details: DetailsScreen
  },
  Projects: {
    screen: GitRepos,
    Details: DetailsScreen
  },
  Comparator: {
    screen: GitReposComparator,
    Details: DetailsScreen
  }
});

export default class App extends React.Component<{}> {
  render() {
    return <RootStack />;
  }
}
// class App extends React.Component<{}, {}> {
//   render() {
//     // return <GitRepos org="google" />;
//     return <GitReposExplorer />;
//     return <GitProjects org="google" />;
//
//     return (
//       <View>
//         <GitProjectInfo url="https://api.github.com/repos/facebook/react" />
//         <GitProjects url="https://api.github.com/orgs/google/repos" />
//       </View>
//     );
//   }
// }
