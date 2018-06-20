import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import store, {history} from './store/store';
import GitReposExplorer from './components/gitReposExplorer';
import GitRepos from './components/gitRepos';
import ProjectsComparator from './components/projectsComparator';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route exact path="/" render={(props) => (<GitReposExplorer/>)} />
          <Route exact path="/repos/:org" render={(props) => <GitRepos org={props.match.params.org}/>} />
          <Route exact path="/compare/" render={(props) => <ProjectsComparator />} />

          <Route render={() => (<div>Miss</div>)} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)