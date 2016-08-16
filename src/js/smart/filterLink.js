import {connect} from 'react-redux'

import Link from '../dumb/link'
import {setVisibilityFilter} from '../actionTypes'

const FilterLink = connect(
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
)(Link)

export default FilterLink