import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import './index.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import EventIndex from './components/event_index'
import EventNew from './components/event_new'
import EventShow from './components/event_show'


const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/events/new" component={EventNew} />
        <Route path="/events/:id" component={EventShow} />
        <Route path="/" component={EventIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
