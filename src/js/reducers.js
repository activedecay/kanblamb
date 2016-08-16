import {
  ViewFilters,
  ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER,
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS
} from './actionTypes'

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export const todos = createReducer([], {
  [ADD_TODO](state, action) {
    return [
      ...state,
      {
        text: action.text,
        completed: false,
        id: +new Date()
      }
    ]
  },
  [TOGGLE_TODO](state, action) {
    /*todo: refactor todosById: { id -> todo } and todos: array<id> (normalizr!)*/
    return state.map((todo) => {
      if (todo.id === action.id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    })
  }
})

export const viewFilter = createReducer(ViewFilters.SHOW_ALL, {
  [SET_VISIBILITY_FILTER](state, action){
    return action.filter
  }
})

export const selectedSubreddit = createReducer('reactjs', {
  [SELECT_SUBREDDIT](state, action) {
    return action.subreddit
  }
})

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}
