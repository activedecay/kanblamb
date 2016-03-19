import {
  ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER,
  ViewFilters
} from './actionTypes'

/*todo: refactor todosById: { id -> todo } and todos: array<id>*/
export function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return state.map((todo, index) => {
        if (index === action.id) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

export function viewFilter(state = ViewFilters.SHOW_ALL,
                           action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}
