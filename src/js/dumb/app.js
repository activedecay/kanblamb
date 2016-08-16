import AddTodo from '../smart/addTodo'
import VisibleTodoList from '../smart/visibleTodoList'
import Footer from '../dumb/footer'
import React from 'react'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App