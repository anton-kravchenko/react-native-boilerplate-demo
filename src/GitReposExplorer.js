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
// import getTheme from '../native-base-theme/components';

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
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Project name"
              onChangeText={text => this.setState({ org: text })}
            />
            <Icon name="ios-people" />
          </Item>
          <Button transparent onPress={this.handleOrgSubmit}>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
    );
  }
}

export default GitReposExplorer;
