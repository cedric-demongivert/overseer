import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { $ordering } from '@redux'

export class OrderingElement extends PureComponent {
  constructor (props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    return (
      <button
        className={this.getClassName()}
        onClick={this.handleClick}
        style={this.getStyle()}
      >
        <div className='ordering-element-label'>
          {this.props.children}
        </div>
        <div className={this.getIndicatorClasses()} />
      </button>
    )
  }

  getClassName () {
    if (this.props.className) {
      return `ordering-element ${this.props.className}`
    } else {
      return 'ordering-element'
    }
  }

  getStyle () {
    if (this.props.width != null) {
      if (this.props.width === 'auto') {
        return { width: 'auto' }
      } else {
        return {
          flex: 'none',
          width: `${this.props.width}px`
        }
      }
    } else {
      return {}
    }
  }

  getIndicatorClasses () {
    const result = ['ordering-element-indicator']

    switch (this.props.direction) {
      case $ordering.Direction.ASCENDING:
        result.push('ordering-element-indicator-ascending')
        break
      case $ordering.Direction.DESCENDING:
        result.push('ordering-element-indicator-descending')
        break
      case $ordering.Direction.NONE:
      default:
        result.push('ordering-element-indicator-none')
        break
    }

    return result.join(' ')
  }

  handleClick (event) {
    event.stopPropagation()
    this.props.onToggle(this.props.field, event.shiftKey)
  }
}

OrderingElement.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]),
  children: PropTypes.node,
  field: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([
    $ordering.Direction.ASCENDING,
    $ordering.Direction.DESCENDING,
    $ordering.Direction.NONE
  ]).isRequired,
  onToggle: PropTypes.func.isRequired
}

OrderingElement.defaultProps = {
  className: null,
  children: null,
  field: 0,
  direction: $ordering.Direction.NONE,
  onToggle: _ => {},
  width: 'auto'
}
