import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import {createStore, combineReducers, applyMiddleware} from 'redux'
import React from 'react'
import {Provider} from 'react-redux'
import * as reducers from './reducers'
import {selectSubreddit, fetchPostsIfNeeded} from './actionTypes'

import App from './dumb/app'

import DevTools from './devtools'

let rootReducer = combineReducers(reducers)

// export const store = createStore(
//   rootReducer,
//   undefined, /*current state*/
//   DevTools.instrument())

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

store.dispatch(selectSubreddit('reactjs'))
store.dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log('gotten'))

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
