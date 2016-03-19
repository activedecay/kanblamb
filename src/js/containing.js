import {Provider, connect} from 'react-redux'

import * as dumb from './presentational'
import * as actions from './actionTypes'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed)
  }
}

export const VisibleTodoList = connect(
  (state) => {
    return ({
      todos: getVisibleTodos(state.todos, state.viewFilter)
    })
  },
  (dispatch) => {
    return ({
      onTodoClick: (id) => {
        dispatch(actions.toggleTodo(id))
      }
    })
  }
)(dumb.TodoList)


export const FilterLink = connect(
  (state, ownProps) => {
    return ({
      active: ownProps.filter === state.viewFilter
    })
  },
  (dispatch, ownProps) => {
    return ({
      onClick: () => {
        dispatch(setVisibilityFilter(ownProps.filter))
      }
    })
  }
)(dumb.Link)

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        dispatch(actions.addTodo(input.value))
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}
AddTodo = connect()(AddTodo)

