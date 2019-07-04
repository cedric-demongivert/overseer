import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { nothing } from '../nothing'

const NUMBER_REGEXP = /^[\+-]?\d*(\.\d*)?$/i

function minus (text) {
  if (text.startsWith("+")) {
    return '-' + text.substring(1)
  } else if (!text.startsWith("-")) {
    return '-' + text
  } else {
    return text
  }
}

function plus (text) {
  if (text.startsWith("-")) {
    return text.substring(1)
  } else {
    return text
  }
}

function precision (value) {
  if (Number.isFinite(value)) {
    let e = 1, p = 0

    while (Math.round(value * e) / e !== value) {
      e *= 10
      p++
    }

    return p
  } else {
    return 0
  }

}

export class NumberControl extends Component {
  /**
  * @see React.Component#constructor
  */
  constructor (props, context) {
    super(props, context)

    this.precision = precision(props.increment)
    
    this.state = {
      value: this.format(props.value)
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  format (value) {
    return value.toFixed(this.precision)
  }

  /**
  * @see React.Component#componentDidUpdate
  */
  componentDidUpdate (previousProps, previousState) {
    if (previousProps.increment !== this.props.increment) {
      this.precision = precision(props.increment)
        this.setState({ value: this.format(this.props.value) })
    }

    if (previousProps.value !== this.props.value) {
      this.setState({ value: this.format(this.props.value) })
    }
  }

  /**
  * Handle a change of this input inner content.
  *
  * @param {Event} event - The change event emitted by this text input.
  */
  handleChange (event) {
    const nextValue = event.target.value
    if (NUMBER_REGEXP.test(nextValue)) { this.setState({ value: nextValue }) }
  }

  /**
  * Handle a keyboard event.
  *
  * @param {KeyboardEvent} event - Emitted event to handle.
  */
  handleKeyUp (event) {
    if (event.key === '-') {
      this.setState(x => { value: minus(x.value) })
    } else if (event.key === '+') {
      this.setState(x => { value: plus(x.value) })
    } else if (event.key === 'Escape') {
      this.commit(0)
    } else if (event.key === 'Enter') {
      this.commit(this.value())
    }
  }

  /**
  * @return {number} The numberic value of this field.
  */
  value () {
    const value = this.state.value
    return value.trim() === '' ? 0 : parseFloat(value)
  }

  /**
  * Handle a loose of focus.
  *
  * @param {FocusEvent} event - Event to handle.
  */
  handleBlur (event) {
    this.commit(this.value())
  }

  /**
  * Commit an input change.
  *
  * @param {number} value - The value to commit.
  */
  commit (value) {
    this.setState({ value: this.format(this.props.value) })
    this.props.onChange(value)
  }

  /**
  * @see React.Component#render
  */
  render () {
    return (
      <input
        type='text'
        value={this.state.value}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
      />
    )
  }
}

NumberControl.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  increment: PropTypes.number.isRequired
}

NumberControl.defaultProps = {
  value: 0,
  onChange: nothing,
  increment: 0.01
}
