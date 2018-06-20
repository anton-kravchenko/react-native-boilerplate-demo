import React from "react";
import { StyleSheet, Text, ListView, View, Button } from "react-native";

const generateGitOranizationUrl = (org) => `https://api.github.com/orgs/${org}/repos`

function ProjectItem(props) {
  const { project } = props;
  return (
    <View>
      <Text>{`Full Name: ${project.full_name}`}</Text>
      <Text>{`Stars: ${project.stargazers_count}`}</Text>
      <Text>{`Watchers: ${project.watchers_count}`}</Text>
    </View>
  );
}

export default class GitProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    };
  }
  componentDidMount() {
    this.fetchProjects(generateGitOranizationUrl(this.props.org));
  }
  fetchProjects(url) {
    fetch(url)
      .then(response => response.json())
      .then(projects => this.setState({ projects }));
  }
  renderProjects(projects) {
    return <View>{projects.map(({ name }) => <Text>{name}</Text>)}</View>;
  }
  render() {
    const { projects } = this.state;
    if (!projects) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
      <ListView
        dataSource={ds.cloneWithRows(projects)}
        renderRow={project => <ProjectItem project={project} />}
      />
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
