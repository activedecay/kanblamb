import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
class Counter extends React.Component {
  render () {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = {type: 'increase'}

// Reducer
function counter (state = {count: 0}, action) {
  let count = state.count
  switch (action.type) {
    case 'increase':
      return {count: count - 1}
    default:
      return state
  }
}

// Store
let store = createStore(counter)

// Map Redux state to component props
function mapStateToProps (state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps (dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

// my first component
var CommentBox = React.createClass({
  render: function() {
    return (
        <div className="commentBox">
          Hello, world! I am a CommentBox.
        </div>
    );
  }
});
var CommentList = React.createClass({
  render: function() {
    return (
        <div className="commentList">
          Hello, world! I am a CommentList.
        </div>
    );
  }
});
var CommentForm = React.createClass({
  render: function() {
    return (
        <div className="commentForm">
          Hello, world! I am a CommentForm.
        </div>
    );
  }
});

ReactDOM.render(
  // <Provider store={store}>
  //   <App />
  // </Provider>,
    <CommentBox />,
    document.getElementById('root')
)
