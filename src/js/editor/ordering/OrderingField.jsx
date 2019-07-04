import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ordering } from '@redux'

import { nothing } from '../nothing'

export class OrderingField extends PureComponent {
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
        <div className='ordering-field-label'>
          {this.props.children}
        </div>
        <div className={this.getIndicatorClasses()} />
      </button>
    )
  }

  getClassName () {
    if (this.props.className) {
      return `ordering-field ${this.props.className}`
    } else {
      return 'ordering-field'
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
    const result = ['ordering-field-indicator']

    switch (this.props.direction) {
      case ordering.Direction.ASCENDING:
        result.push('ordering-field-indicator-ascending')
        break
      case ordering.Direction.DESCENDING:
        result.push('ordering-field-indicator-descending')
        break
      case ordering.Direction.NONE:
      default:
        result.push('ordering-field-indicator-none')
        break
    }

    return result.join(' ')
  }

  handleClick (event) {
    event.stopPropagation()

    if (!event.shiftKey) this.props.onChange(ordering.only(this.props.field))
    this.props.onChange(ordering.toggle(this.props.field))
  }
}

OrderingField.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]).isRequired,
  children: PropTypes.node,
  field: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([
    ordering.Direction.ASCENDING,
    ordering.Direction.DESCENDING,
    ordering.Direction.NONE
  ]).isRequired,
  onChange: PropTypes.func.isRequired
}

OrderingField.defaultProps = {
  className: null,
  children: null,
  field: 0,
  direction: ordering.Direction.NONE,
  onChange: nothing,
  width: 'auto'
}
