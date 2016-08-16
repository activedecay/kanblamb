import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import marked from 'marked'
import fetch from 'isomorphic-fetch'
import $ from 'jquery'
import {Todos} from './todo'
// import DevTools from './devtools'

// React component
class Counter extends React.Component {
  render() {
    const {value, onIncreaseClick} = this.props
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
function counter(state = {count: 0}, action) {
  let count = state.count
  switch (action.type) {
    case 'increase':
      return {count: count - 1}
    default:
      return state
  }
}

// Store /*todo: remove devtools in production*/
// let store = createStore(counter, {count: 0})

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
//
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app')
// )

// my first component
var CommentBox = React.createClass({
  getInitialState: function () { // executes exactly once
    return {comments: []};
  },
  componentWillMount: function () {
    this.loadComments()
    setInterval(this.loadComments, this.props.pollInterval)
  },
  loadComments: function () {
    fetch(this.props.url)
      .then(function (response) {
        return response.json()
      })
      .then(((json) => {
        this.setState({comments: json});
      }).bind(this))
      .catch((ex) => {
        console.error('parse failed', ex);
      })
  },
  handleCommentSubmit: function (comment) {
    /* Warning: Each child in an array or iterator should have a unique "key"
     prop. Check the render method of `CommentList`.
     See https://fb.me/react-warning-keys for more information.*/
    comment.id = Date.now()

    this.setState({comments: this.state.comments.concat([comment])})
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList comments={this.state.comments}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});
var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.comments.map(function (comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
var Comment = React.createClass({
  rawMarkup: function () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return {__html: rawMarkup};
  },
  render: function () {
    //noinspection HtmlUnknownAttribute
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          <img /*src={this.props.author + ".png"}*/ /> {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    );
  }
});
var CommentForm = React.createClass({
  getInitialState: function () {
    return {author: '', text: ''};
  },
  handleAuthorChange: function (e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function (e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text})
    this.setState({author: '', text: ''})
  },
  render: function () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post"/>
      </form>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={20000}/>,
  document.getElementById('comments')
)

var LikeButton = React.createClass({
  getInitialState: function () {
    return {liked: false};
  },
  handleClick: function (event) {
    this.setState({liked: !this.state.liked});
  },
  render: function () {
    var text = this.state.liked ? 'like' : 'don\'t like';
    var likeCheck = this.state.liked ? '√' : '';
    return (
      <p style={{"textDecoration":"underline"}} onClick={this.handleClick}>
        {likeCheck} You {text} this.
      </p>
    );
  }
});
var Avatar = React.createClass({
  render: function () {
    return (
      <div>
        <PagePic pagename={this.props.pagename}/>
        <PageLink pagename={this.props.pagename}/>
      </div>
    );
  }
});
var PagePic = React.createClass({
  render: function () {
    return (
      <img src={'https://graph.facebook.com/' + this.props.pagename + '/picture'}/>
    );
  }
});
var PageLink = React.createClass({
  render: function () {
    return (
      <a href={'https://www.infowars.com/' + this.props.pagename}>
        {this.props.pagename}
      </a>
    );
  }
});

var SetIntervalMixin = {
  componentWillMount: function () {
    this.intervals = [];
  },
  interval: function () {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function () {
    this.intervals.forEach(clearInterval);
  }
};
var TickTock = React.createClass({
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function () {
    return {seconds: 0};
  },
  componentDidMount: function () {
    this.interval(this.tick, 1000); // Call a method on the mixin
  },
  tick: function () {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function () {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

ReactDOM.render(
  <div>
    <input type="text" value="Hello!" readOnly/>
    <TickTock />
    <Avatar pagename="Engineering"/>
    <LikeButton />
  </div>,
  document.getElementById('content')
);

ReactDOM.render(
  <div>
    <span>todos:</span>
    <Todos/>
  </div>,
  document.getElementById('todos'))