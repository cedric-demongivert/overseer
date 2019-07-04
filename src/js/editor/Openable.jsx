import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { openable } from '@redux'
import { nothing } from './nothing'

class Openable extends PureComponent {
  /**
  * @see React/PureComponent#constructor
  */
  constructor (props, context) {
    super(props, context)

    this.handleTransitionEnd = this.handleTransitionEnd.bind(this)
  }

  /**
  * Handle a css transition endinf event.
  *
  * @param {TransitionEvent} event - A css transition event.
  */
  handleTransitionEnd (event) {
    switch (this.props.state) {
      case openable.State.OPENING:
        this.props.onChange(openable.opened())
        break
      case openable.State.CLOSING:
        this.props.onChange(openable.closed())
        break
    }
  }

  /**
  * @see React/Component#render
  */
  render () {
    return React.cloneElement(this.props.children, {
      className: classnames(this.getStateClass(), this.props.className),
      onTransitionEnd: this.handleTransitionEnd
    })
  }

  /**
  * @return {string} The css class used as a marker of this openable state.
  */
  getStateClass () {
    switch (this.props.state) {
      case openable.State.OPENING: return 'is-opening'
      case openable.State.OPENED: return 'is-open'
      case openable.State.CLOSING: return 'is-closing'
      default: return 'is-close'
    }
  }
}

Openable.propTypes = {
  state: PropTypes.oneOf(openable.State.ALL).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

Openable.defaultProps = {
  state: openable.State.DEFAULT,
  onChange: nothing,
  className: ''
}

function makeOpenable (Component) {
  class OpenableComponent extends PureComponent {
    render () {
      const { state, onChange, className, ...rest } = this.props

      return (
        <Openable
          state={state}
          onChange={onChange}
          className={className}
        ><Component {...rest} /></Openable>
      )
    }
  }

  OpenableComponent.propTypes = Object.assign(
    {}, Openable.propTypes, Component.propTypes
  )

  OpenableComponent.defaultProps = Object.assign(
    {}, Openable.defaultProps, Component.defaultProps
  )

  Object.defineProperty(OpenableComponent, 'name', {
    value: `Openable(${Component.name})`
  })

  return OpenableComponent
}

export { makeOpenable as Openable }
