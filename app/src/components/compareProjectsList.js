import React, { Component } from 'react';
import { push } from 'connected-react-router';

import store from '../store/store';

const CompareReportItem = (props) => {
  const {name, full_name, key} = props;
  return (
    <div key={key}><p>Name {name}, Full name {full_name}</p></div>
  );
}

class CompareProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsToCompare: store.getState().projectsToCompare
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState({ projectsToCompare: store.getState().projectsToCompare}));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  hanleSubmitToCompareButton = () => {
    store.dispatch(push('/compare/'));
  }
  render() {
    const {projectsToCompare} = this.state;

    if (!projectsToCompare) {
      return <div>Choose at least two repos to compare...</div>
    }

    return (
      <div>
        <p>List of repos to compare:</p>
        <ul>
          {projectsToCompare.map((r, key) => CompareReportItem({full_name: r.full_name, name: r.name, key}))}
        </ul>
        {projectsToCompare.length > 1 && <button onClick={this.hanleSubmitToCompareButton}>Compare</button>}
      </div>
    );
  }
}

export default CompareProjectsList;
