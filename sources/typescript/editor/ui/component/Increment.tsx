import { Component } from 'react'
import { ReactNode } from 'react'
import { ReactElement } from 'react'
import { SyntheticEvent } from 'react'
import { KeyboardEvent } from 'react'
import * as React from 'react'

import { nothing } from '../nothing'

export class Increment extends Component<Increment.Properties, Increment.State> {
  public static defaultProps : Increment.Properties = {
    increment: 1,
    period: 200,
    onChange: nothing,
    onStart: nothing,
    onStop: nothing,
    children: null
  }

  /**
  * @see React/Component#constructor
  */
  public constructor (properties : Increment.Properties, context : any) {
    super(properties, context)

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
  * @param event - The key down event to handle.
  */
  public handleKeyDown (event : KeyboardEvent) : void {
    if (event.key === ' ' && !event.repeat) {
      this.startIncrementation(event)
    }
  }

  /**
  * Handle a key up event.
  *
  * @param event - The key up event to handle.
  */
  public handleKeyUp (event : KeyboardEvent) : void {
    if (event.key === ' ') {
      this.stopIncrementation(event)
    }
  }

  /**
  * Start the incrementation process.
  *
  * @param event - Event that triggered the begining of the incrementation.
  */
  public startIncrementation (event : SyntheticEvent) : void {
    this.props.onStart()
    this.setState({ since: event.timeStamp })
    window.requestAnimationFrame(this.increment)
  }

  /**
  * Perform an incrementation.
  *
  * @param current - The number of milliseconds elapsed since the first animation call.
  */
  public increment (current : number) : void {
    if (this.state.since != null) {
      const delta : number = current - this.state.since

      if (delta > this.props.period) {
        const steps : number = Math.floor(Math.pow(delta, 1.8) /  this.props.period)
        this.props.onChange(steps * this.props.increment, (steps - 1) * this.props.increment)
      }

      window.requestAnimationFrame(this.increment)
    }
  }


  /**
  * Stop the incrementation process.
  *
  * @param event - Event that triggered the stop of the incrementation process.
  */
  public stopIncrementation (event : SyntheticEvent) : void {
    const since : number = this.state.since

    this.setState({ since: null })

    if (event.timeStamp - since < this.props.period) {
      this.props.onChange(this.props.increment, 0)
    }

    this.props.onStop()
  }

  /**
  * @see React/Component#render
  */
  public render () : ReactNode {
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

export namespace Increment {
  export type Properties = {
    increment: number,
    period: number,
    onStart: () => void,
    onChange: (newValue : number, oldValue : number) => void,
    onStop: () => void,
    children: ReactElement
  }

  export type State = {
    since: number
  }
}
