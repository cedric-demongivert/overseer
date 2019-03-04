import { connect } from 'react-redux'

import { Ordering as RawOrdering } from '@editor/components'
import { $orderings } from '@redux'

function mapStateToProps (state, ownProps) {
  console.log(this)

  return {
    className: ownProps.className,
    value: $orderings.Ordering.EMPTY,
    children: ownProps.children
  }
}


function mapDispatchToProps (state, ownProps) {
  console.log(this)

  return {
    onChange (newValue) {
      
    }
  }
}

export const Ordering = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawOrdering)

Ordering.Element = RawOrdering.Element
