// @flow

import React, { Component } from "react";

import {
  Container,
  Text,
  Item,
  Icon,
  List,
  ListItem,
  Card,
  CardItem
  // $FlowFixMe
} from "native-base";

import store from "../store/store";
import type { Repo } from "./Repo";
import { getSorterProjectsWithScores } from "./projectsComparator";
import type { RepoScoreIdTriple } from "./projectsComparator";

type State = {
  repos: Repo[]
};

class GitRepos extends Component<{}, State> {
  constructor(props: empty) {
    super(props);
    this.state = {
      repos: []
    };
  }

  componentDidMount() {
    const storeState = store.getState();
    this.setState({ repos: storeState.projectsToCompare });
  }

  renderRepos(repos: Repo[]) {
    const sortedProjects: RepoScoreIdTriple[] = getSorterProjectsWithScores(repos);
    return (
      <List
        dataArray={sortedProjects}
        renderRow={(rsp: RepoScoreIdTriple) => {
          const { repo, score, id } = rsp;
          return (
            <ListItem>
              <Card>
                <CardItem header bordered>
                  <Item>
                    <Icon name="github-circle" type="MaterialCommunityIcons" />
                    <Text>{repo.name}</Text>
                  </Item>
                </CardItem>
                <CardItem bordered>
                  <Item>
                    <Icon name="list-number" type="Foundation" />
                    <Text>{`Position: ${id + 1}`}</Text>
                  </Item>
                </CardItem>
                <CardItem bordered>
                  <Item>
                    <Icon name="arrow-long-up" type="Entypo" />
                    <Text>{`Score: ${score.toFixed(2)}`}</Text>
                  </Item>
                </CardItem>
                <CardItem bordered>
                  <Item>
                    <Icon name="ios-star" type="Ionicons" />
                    <Text>{`Stars: ${repo.stargazers_count}`}</Text>
                  </Item>
                </CardItem>
                <CardItem bordered>
                  <Item>
                    <Icon name="ios-glasses" type="Ionicons" />
                    <Text>{`Watchers: ${repo.watchers}`}</Text>
                  </Item>
                </CardItem>
                <CardItem bordered>
                  <Item>
                    <Icon name="code-fork" type="FontAwesome" />
                    <Text>{`Forks: ${repo.forks_count}`}</Text>
                  </Item>
                </CardItem>
                <CardItem bordered>
                  <Item>
                    <Icon name="ladybug" type="MaterialCommunityIcons" />
                    <Text>{`Open issues count: ${repo.open_issues_count}`}</Text>
                  </Item>
                </CardItem>
              </Card>
            </ListItem>
          );
        }}
      />
    );
  }

  render() {
    const { repos } = this.state;

    return (
      // <Container style={{ alignSelf: "center" }}>
      <Container>{this.renderRepos(repos)}</Container>
    );
  }
}

export default GitRepos;
