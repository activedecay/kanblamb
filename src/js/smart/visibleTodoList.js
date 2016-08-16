import {connect} from 'react-redux'
import * as actions from '../actionTypes'
import TodoList from '../dumb/todoList'

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

const VisibleTodoList = connect(
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
)(TodoList)

export default VisibleTodoList