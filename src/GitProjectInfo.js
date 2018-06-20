import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class GitProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reactInfo: null
    };
  }
  componentDidMount() {
    this.fetchReactInfo(this.props.url);
  }
  fetchReactInfo(url) {
    fetch(url)
      .then(response => response.json())
      .then(react => {
        this.setState({
          reactInfo: react
        });
      });
  }
  renderReactInfo(reactInfo) {
    return (
      <View>
        <Text>{`Full Name: ${reactInfo.full_name}`}</Text>
        <Text>{`Stars: ${reactInfo.stargazers_count}`}</Text>
        <Text>{`Watchers: ${reactInfo.watchers_count}`}</Text>
        <Text>{`Forks: ${reactInfo.forks}`}</Text>
        <Text>{`Open issues count: ${reactInfo.open_issues}`}</Text>
        <Text>{`Subscribers count: ${reactInfo.subscribers_count}`}</Text>
      </View>
    );
  }
  render() {
    const { reactInfo } = this.state;
    if (!reactInfo) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>{this.renderReactInfo(reactInfo)}</View>
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
