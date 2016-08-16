# kanblamb
kanban that people use

# lessons learned
## es6
- `import X from m` and `import {X,Y,Z} from m`
- `export default var X` and `export var X`
## react
https://babeljs.io/repl
https://facebook.github.io/react/docs
https://facebook.github.io/react/docs/jsx-in-depth.html

- components are just state machines
- components have state, props and render html
- components are uppercase, html is lowercase
- state, setState, getInitialState called once
- getInitialState is called once for each mount
- props, JSX attrs, never write to `this.props`
- props has children, which are html elements
- return (jsx), single root
- {} surrounds javascript
- ... spread operator, e.g., `{...props}`
- write unicode, \u0000 string,
- DOM events
- xml attr names: className, htmlFor
- js function bind(), handy for component funcs
- SRP
- static page (typing intensive)
- interactivity (thinking intensive)
- DRY - minimal, complete state representation
- how to answer "is it state?"
  1. passed via props from owner, no.
  1. changes over time, no.
  1. computable from state/props, no.
  1. original data, no. (props from owner)
  1. filtered data, no. (computable)
  1. input box text, yes. (changes/time)
  1. checkboxes, yes. (changes/time)
- which component owns the state
  ### one-way data flow
  1. identify components that *render state*
  1. find common owner component
  1. create component above if none exists
  1. add getInitialState for the component
  1. pass prop=state to owned components
  1. ownee components use props
- inverse data flow
  ### owned components update state
  1. owner passes a callback as prop
  1. ownee calls callback on DOM events
  1. owner state is mutated in the callback
- child reconciliation: DOM updates, render pass
- reconciliation is first come first serve
- reconciliation is problematic with
  1. stateful children
    - hide children instead of destroy
  1. dynamic children (as in search results)
    - reconciles keyed children
    - reordered not clobbered
    - destroyed not reused
    - from owner, add props `key` to ownee
    - do not add `key` on child container
- performance problems? shouldComponentUpdate
- DOM manipulation is way slower than JS
- validation only in development mode
- React.PropTypes
- default props getDefaultProps
- component mixins for cross-cutting concerns
- deconstruction `var { a, ...more } = object`
- forms
  1. textarea not children, use value attr
  1. onChange or readOnly
  1. select uses value, not option's selected
- the event system is synthetic
- only IE 9 and above (lol)

## redux
3 principles
1. all app state lives in a single store
1. state is read-only
    1. use reducers and actions to modify
    1. actions express an intent to mutate
1. changes are made with are pure functions
    1. must return new state object
    1. reducers can manage subtree of state
    1. function reducer(state=default, action)
    1. use actions to pass any additional data

other redux lessons
- difference between action and action-creator
- reducer composition and store creation
- only one store (use reducer composition)

# questions
## react
1. when do I call render?
1. is getInitialState really called once?
1. what is ReactLink?
1. what is development mode?
1. valid use case for component.forceUpdate?
1. what is this ref prop stuff