import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'

import { Match } from '@redux'

export class Highlight extends PureComponent {
  /**
  * @see React/Component#render
  */
  render () {
    if (this.props.match.size > 0) {
      return this.getTokens().map(
        function (token, index) {
          if (index % 2 === 1) {
            return <span className='highlight' key={index}>{ token }</span>
          } else {
            return <span key={index}>{ token }</span>
          }
        }
      )
    } else {
      return this.props.children
    }
  }

  /**
  * @return An array of matched / unmatched token sequence in accordance with this component properties.
  */
  getTokens () {
    const result = []
    const match = this.props.match
    const string = this.props.children

    result.push(
      string.substring(0, this.getBoundary(0))
    )
    
    for (let index = 0, size = match.size - 1; index < size; ++index) {
      result.push(
        string.substring(
          this.getBoundary(index),
          this.getBoundary(index + 1)
        )
      )
    }

    result.push(
      string.substring(this.getBoundary(match.size - 1), string.length)
    )

    return result
  }

  /**
  * @param {number} index - Index of the boundary to get.
  *
  * @return {number} The nth text boundary.
  */
  getBoundary (index) {
    const match = this.props.match
    const boundary = match.get(index)

    if (index === 0 && boundary == null) {
      return 0
    } else if (index === match.size - 1 && boundary == null) {
      return this.props.children.length
    } else {
      return boundary
    }
  }
}

const EMPTY_MATCH = new Match()

Highlight.propTypes = {
  children: PropTypes.string,
  match: PropTypes.instanceOf(Match).isRequired
}

Highlight.defaultProps = {
  children: '',
  match: EMPTY_MATCH
}
