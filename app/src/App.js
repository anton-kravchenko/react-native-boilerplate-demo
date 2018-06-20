import React, { Component } from 'react';
import './App.css';
import GitReposExplorer from './components/gitReposExplorer';

// https://api.github.com/orgs/google/repos
// GET /orgs/:org/repos

// GET /repos/:owner/:repo
// https://api.github.com/repos/facebook/react


class App extends Component {
  render() {
    return (
      <div className="App">
        <GitReposExplorer/>
      </div>
    );
  }
}

export default App;
