import { PureComponent } from 'react'
import { ReactNode } from 'react'
import * as React from 'react'

import classnames from 'classnames'

import { OpenableState } from '../redux/openable/OpenableState'
import { nothing } from './nothing'

export class Openable extends PureComponent<Openable.Properties> {
  public static defaultProps : Openable.Properties = {
    value: OpenableState.CLOSED,
    onChange: nothing,
    className: '',
    children: null
  }

  /**
  * @see React/PureComponent#constructor
  */
  public constructor (properties : Openable.Properties, context : any) {
    super(properties, context)

    this.handleTransitionEnd = this.handleTransitionEnd.bind(this)
  }

  /**
  * Handle a css transition endinf event.
  */
  public handleTransitionEnd () {
    switch (this.props.value) {
      case OpenableState.OPENING:
        this.props.onChange(OpenableState.OPENED, OpenableState.OPENING)
        break
      case OpenableState.CLOSING:
        this.props.onChange(OpenableState.CLOSED, OpenableState.CLOSING)
        break
    }
  }

  /**
  * @see React/Component#render
  */
  public render () : ReactNode {
    return React.cloneElement(
      this.props.children as any, {
      className: classnames(this.getStateClass(), this.props.className),
      onTransitionEnd: this.handleTransitionEnd
    })
  }

  /**
  * @return The css class used as a marker of this openable state.
  */
  public getStateClass () : string {
    switch (this.props.value) {
      case OpenableState.OPENING : return 'is-opening'
      case OpenableState.OPENED  : return 'is-opened'
      case OpenableState.CLOSING : return 'is-closing'
      case OpenableState.CLOSED  : return 'is-closed'
      default                    : return undefined
    }
  }
}

export namespace Openable {
  export type Properties = {
    value : OpenableState,
    onChange : (newState : OpenableState, oldState : OpenableState) => void,
    className? : string,
    children : ReactNode
  }
}
