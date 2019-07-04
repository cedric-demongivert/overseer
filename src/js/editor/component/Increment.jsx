import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { nothing } from '../nothing'

export class Increment extends Component {
  /**
  * @see React/Component#constructor
  */
  constructor (props, context) {
    super(props, context)

    this.state = { since: null }
    this.increment = this.increment.bind(this)
    this.startIncrementation = this.startIncrementation.bind(this)
    this.stopIncrementation = this.stopIncrementation.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  /**
  * Handle a key down event.
  *
  * @param {KeyboardEvent} event - The key down event to handle.
  */
  handleKeyDown (event) {
    if (event.key === ' ' && !event.repeat) {
      this.startIncrementation(event)
    }
  }

  /**
  * Handle a key up event.
  *
  * @param {KeyboardEvent} event - The key up event to handle.
  */
  handleKeyUp (event) {
    if (event.key === ' ') {
      this.stopIncrementation(event)
    }
  }

  /**
  * Start the incrementation process.
  *
  * @param {Event} event - Event to handle.
  */
  startIncrementation (event) {
    this.props.onStart(event)
    this.setState({ since: event.timeStamp })
    window.requestAnimationFrame(this.increment)
  }

  /**
  * Perform an incrementation.
  *
  * @param {number} current - The number of milliseconds elapsed since the first animation call.
  */
  increment (current) {
    if (this.state.since != null) {
      const delta = current - this.state.since

      if (delta > this.props.period) {
        const steps = Math.floor(Math.pow(delta, 1.8) /  this.props.period)
        this.props.onChange(steps * this.props.increment)
      }

      window.requestAnimationFrame(this.increment)
    }
  }


  /**
  * Stop the incrementation process.
  *
  * @param {Event} event - Event to handle.
  */
  stopIncrementation (event) {
    const since = this.state.since

    this.setState({ since: null })

    if (event.timeStamp - since < this.props.period) {
      this.props.onChange(this.props.increment)
    }

    this.props.onStop(event)
  }

  /**
  * @see React/Component#render
  */
  render () {
    return React.cloneElement(this.props.children, {
      onMouseDown: this.startIncrementation,
      onMouseUp: this.stopIncrementation,
      onMouseLeave: this.stopIncrementation,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      onBlur: this.stopIncrementation
    })
  }
}

Increment.propTypes = {
  increment: PropTypes.number.isRequired,
  period: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

Increment.defaultProps = {
  increment: 1,
  period: 200,
  onChange: nothing,
  onStart: nothing,
  onStop: nothing
}
