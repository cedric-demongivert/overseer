import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { nothing } from '../nothing'

const SLIDER_ACTIVATION = 100

export class Slider extends Component {
  /**
  * @see React/Component#constructor
  */
  constructor (props, context) {
    super(props, context)

    this.state = { since: null, origin: null, sliding: false, timeout: null }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleSliding = this.handleSliding.bind(this)
  }

  /**
  * @param {MouseEvent} event
  */
  handleMouseDown (event) {
    this.setState({
      since: event.timeStamp,
      origin: event.screenX,
      sliding: false,
      timeout: window.setTimeout(this.handleSliding, SLIDER_ACTIVATION)
    })
  }

  handleSliding () {
    if (this.state.since != null) {
      this.setState({ sliding: true, timeout: null })
      this.props.onStart()
    }
  }

  /**
  * @param {MouseEvent} event
  */
  handleMouseUp (event) {
    if (event.timeStamp - this.state.since > SLIDER_ACTIVATION) {
      if (this.state.timeout) {
        window.clearTimeout(this.state.timeout)
        this.state.timeout = null
      }

      this.setState({ since: null, origin: null, sliding: false })
      this.props.onStop()
    }
  }

  /**
  * @param {MouseEvent} event
  */
  handleMouseMove (event) {
    if (this.state.sliding) {
      this.props.onChange(
        (event.screenX - this.state.origin) * this.props.increment
      )
    }
  }

  /**
  * @see React/Component#render
  */
  render () {
    return React.cloneElement(this.props.children, {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onMouseMove: this.handleMouseMove,
      className: classnames(
        this.props.children.props.className,
        { 'is-sliding': this.state.sliding }
      )
    })
  }
}

Slider.propTypes = {
  increment: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

Slider.defaultProps = {
  increment: 1,
  onChange: nothing,
  onStart: nothing,
  onStop: nothing
}
