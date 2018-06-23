// @flow

import React, { Component } from "react";

import {
  Container,
  Button,
  Text,
  Input,
  Item,
  Icon
  // @$FlowFixMe
} from "native-base";

import store from "../store/store";

type State = {
  org: string
};

class GitReposExplorer extends Component<{}, State> {
  constructor(props: empty) {
    super(props);

    this.state = {
      org: ""
    };
  }

  handleOrgSubmit = (): void => {
    store.dispatch({
      type: "SET_ORGANIZATION_NAME",
      payload: this.state.org
    });
    // eslint-disable-next-line react/prop-types
    this.props.navigation.navigate("Projects");
  };

  render() {
    return (
      <Container
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Project name"
            onChangeText={(text: string) => this.setState({ org: text })}
          />
        </Item>

        <Button
          style={{ alignSelf: "center", top: 20 }}
          bordered
          success
          onPress={this.handleOrgSubmit}
        >
          <Text>Search</Text>
        </Button>
      </Container>
    );
  }
}

export default GitReposExplorer;
