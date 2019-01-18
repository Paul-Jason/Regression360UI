import React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App';
import MiscellanousCard from './components/MiscellanousCard';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import {  Route, Switch, BrowserRouter, HashRouter } from 'react-router-dom';
import Commit from './components/commit';
const store = createStore(rootReducer, applyMiddleware(reduxThunk));

hydrate(
<Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Route exact path="/:commitId" component={App}/>
      <Route path="/miscellanous" component={MiscellanousCard}/>
    </Switch>
  </BrowserRouter> 
</Provider>,
document.querySelector('#app')
);