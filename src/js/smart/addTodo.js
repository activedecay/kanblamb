import {connect} from 'react-redux'
import * as actions from '../actionTypes'
import React from 'react'

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

export default AddTodo