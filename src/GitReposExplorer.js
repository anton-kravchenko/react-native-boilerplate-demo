import React, { Component } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from "react-native";

// import store from '../store/store';
import {  } from 'react-native';

class GitReposExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        org: ''
    }
  }
  handleOrgSubmit = (event) => {
    // store.dispatch(push(`/repos/${this.state.org}/`));
  }
  handleOrgInput = (event) => {
    this.setState({ org: event.target.value });
  }
  handleOrgEnterClick = (event) => {
    if ('Enter' === event.key) {
      this.handleOrgSubmit();
    }
  }
  render() {
    return (
        <View style={styles.container}>
            <Text>Enter org</Text>
            <TextInput style={{backgroundColor: "white", width: "80%", height: "5%"}} onChange={this.handleOrgInput} onKeyPress={this.handleOrgEnterClick}/>
            <Button onClick={this.handleOrgSubmit} title="Submit"/>
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
