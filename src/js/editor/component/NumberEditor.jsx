import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { nothing } from '../nothing'

import { NumberControl } from './NumberControl'
import { Increment } from './Increment'

export class NumberEditor extends Component {
  /**
  * @see React.Component#constructor
  */
  constructor (props, context) {
    super(props, context)

    this.state = { increment: null }

    this.handleIncrementStart = this.handleIncrementStart.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
  }

  /**
  * Handle an incrementation tick.
  *
  * @param {number} increment - The current total incrementation.
  */
  handleIncrement (increment) {
    this.props.onChange(this.state.increment + increment)
  }

  /**
  * Handle an incrementation start.
  */
  handleIncrementStart () {
    this.setState({ increment: this.props.value })
  }

  /**
  * @see React.Component#render
  */
  render () {
    return (
      <div className='control control-number'>
        <NumberControl
          value={this.props.value}
          increment={this.props.increment}
          onChange={this.props.onChange}
        />
        <div className='control-increments'>
          <Increment
            increment={this.props.increment}
            period={200}
            onStart={this.handleIncrementStart}
            onChange={this.handleIncrement}
          ><button className='btn btn-block fas fa-caret-up' /></Increment>
          <Increment
            increment={-this.props.increment}
            period={200}
            onStart={this.handleIncrementStart}
            onChange={this.handleIncrement}
          ><button className='btn btn-block fas fa-caret-down' /></Increment>
        </div>
      </div>
    )
  }
}

NumberEditor.propTypes = {
  value: PropTypes.number.isRequired,
  increment: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool.isRequired
}

NumberEditor.defaultProps = {
  value: 0,
  increment: 0.001,
  readonly: false,
  onChange: nothing
}
