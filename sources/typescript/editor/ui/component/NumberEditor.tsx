import { Component } from 'react'
import { ReactNode } from 'react'
import * as React from 'react'

import { nothing } from '../nothing'

import { NumberControl } from './NumberControl'
import { Increment } from './Increment'

export class NumberEditor extends Component<NumberEditor.Properties, NumberEditor.State> {
  public static defaultProps : NumberEditor.Properties = {
    value: 0,
    increment: 0.001,
    readonly: false,
    onChange: nothing
  }

  /**
  * @see React.Component#constructor
  */
  public constructor (properties : NumberEditor.Properties, context : any) {
    super(properties, context)

    this.state = { increment: null }
    this.handleIncrementStart = this.handleIncrementStart.bind(this)
    this.handleIncrement      = this.handleIncrement.bind(this)
  }

  /**
  * Handle an incrementation tick.
  *
  * @param increment - The current total incrementation.
  */
  public handleIncrement (increment : number) : void {
    this.props.onChange(this.state.increment + increment, this.props.value)
  }

  /**
  * Handle an incrementation start.
  */
  public handleIncrementStart () {
    this.setState({ increment: this.props.value })
  }

  /**
  * @see React.Component#render
  */
  public render () : ReactNode {
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

export namespace NumberEditor {
  export type Properties = {
    value: number,
    increment: number,
    onChange: (newValue : number, oldValue : number) => void,
    readonly: boolean
  }

  export type State = {
    increment: number
  }
}
