// @flow

import React, { Component } from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";

// import store from '../store/store';
type Props = {
  org?: string
};
type State = {
  org: string
};

class GitReposExplorer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      org: ""
    };
  }
  handleOrgSubmit = (): void => {
    //   store.dispatch(push(`/repos/${this.state.org}/`));
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Enter org</Text>
        <TextInput
          style={{ backgroundColor: "white", width: "80%", height: "5%" }}
          onChangeText={text => this.setState({ org: text })}
        />
        <Button onClick={this.handleOrgSubmit} title="Submit" />
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

export default GitReposExplorer;
