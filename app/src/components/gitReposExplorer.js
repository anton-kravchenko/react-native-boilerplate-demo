import React, { Component } from 'react';
import { push } from 'connected-react-router';

import store from '../store/store';

class GitReposExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        org: ''
    }
  }
  handleOrgSubmit = (event) => {
    store.dispatch(push(`/repos/${this.state.org}/`));
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
        <div>
            <p>Enter org</p>
            <input onChange={this.handleOrgInput} onKeyPress={this.handleOrgEnterClick}/>
            <button onClick={this.handleOrgSubmit}> Submit</button>
        </div>
    );
  }
}

export default GitReposExplorer;
