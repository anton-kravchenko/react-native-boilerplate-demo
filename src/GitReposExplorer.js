// @flow

import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Input,
  Item,
  Icon
} from "native-base";
import GitRepos from "./GitRepos";

// import store from '../store/store';
type Props = {
  org?: string
};
type State = {
  org: string,
  submitted: boolean
};

class GitReposExplorer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      org: "",
      submitted: false
    };
  }
  handleOrgSubmit = (): void => {
    this.setState({ submitted: true });
    //   store.dispatch(push(`/repos/${this.state.org}/`));
  };
  render() {
    const { submitted, org } = this.state;

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Project name"
              onChangeText={text => this.setState({ org: text })}
            />
          </Item>
          <Button transparent onPress={this.handleOrgSubmit}>
            <Text>Search</Text>
          </Button>
        </Header>
        // {submitted && <GitRepos org={org} />}
        {<GitRepos org={"Google"} />}
      </Container>
    );
  }
}

export default GitReposExplorer;
