import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Viewport } from '../../components/Viewport'

export class Viewport extends Component {
  render () {
    return (
      <div
        className={classnames(this.props.className, 'layer')}
        style={{
          bottom: `${this.props.value.bottom}px`,
          left: `${this.props.value.left}px`,
          width: `${this.props.value.width}px`,
          height: `${this.props.value.height}px`
        }}
      >{this.props.children}</div>
    )
  }
}

Viewport.propTypes = {
  className: PropTypes.string,
  value: PropTypes.instanceOf(ViewportData).isRequired,
  children: PropTypes.node
}

Viewport.defaultProps = {

}
