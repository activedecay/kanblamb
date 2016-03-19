import {createStore, combineReducers} from 'redux'
import React from 'react'
import * as reducers from './reducers'

import {App} from './presentational'

import DevTools from './devtools'

let todoApp = combineReducers(reducers)

export const store = createStore(
  todoApp,
  undefined, /*current state*/
  DevTools.instrument())

export const Todos = React.createClass({
  render: function () {
    return (
      <span>
        crazy awesome
        <Provider store={store}>
          <App/>
        </Provider>
        <DevTools store={store}/>
      </span>
    );
  }
});


