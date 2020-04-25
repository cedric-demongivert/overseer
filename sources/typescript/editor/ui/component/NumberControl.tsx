import { Component } from 'react'
import { ReactNode } from 'react'
import { ChangeEvent } from 'react'
import { KeyboardEvent } from 'react'
import * as React from 'react'

import { nothing } from '../nothing'

const NUMBER_REGEXP : RegExp = /^[\+-]?\d*(\.\d*)?$/i

function minus (text : string) : string {
  if (text.startsWith("+")) {
    return '-' + text.substring(1)
  } else if (!text.startsWith("-")) {
    return '-' + text
  } else {
    return text
  }
}

function plus (text : string) : string {
  if (text.startsWith("-")) {
    return text.substring(1)
  } else {
    return text
  }
}

function precision (value : number) : number {
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

export class NumberControl extends Component<NumberControl.Properties, NumberControl.State> {
  private precision : number

  public static defaultProps : NumberControl.Properties = {
    value: 0,
    onChange: nothing,
    increment: 0.01
  }


  /**
  * @see React.Component#constructor
  */
  public constructor (properties : NumberControl.Properties, context : any) {
    super(properties, context)

    this.precision = precision(properties.increment)

    this.state = {
      value: this.format(properties.value)
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  public format (value : number) : string {
    return value.toFixed(this.precision)
  }

  /**
  * @see React.Component#componentDidUpdate
  */
  public componentDidUpdate (previousProps : NumberControl.Properties) : void {
    if (previousProps.increment !== this.props.increment) {
      this.precision = precision(this.props.increment)
      this.setState({ value: this.format(this.props.value) })
    }

    if (previousProps.value !== this.props.value) {
      this.setState({ value: this.format(this.props.value) })
    }
  }

  /**
  * Handle a change of this input inner content.
  *
  * @param event - The change event emitted by this text input.
  */
  public handleChange (event : ChangeEvent<HTMLInputElement>) : void {
    const nextValue : string = event.target.value

    if (NUMBER_REGEXP.test(nextValue)) { this.setState({ value: nextValue }) }
  }

  /**
  * Handle a keyboard event.
  *
  * @param event - Emitted event to handle.
  */
  public handleKeyUp (event : KeyboardEvent) : void {
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
  * @return The numberic value of this field.
  */
  public value () : number {
    const value : string = this.state.value
    return value.trim() === '' ? 0 : parseFloat(value)
  }

  /**
  * Handle a loose of focus.
  */
  public handleBlur () : void {
    this.commit(this.value())
  }

  /**
  * Commit an input change.
  *
  * @param value - The value to commit.
  */
  public commit (value : number) : void {
    this.setState({ value: this.format(this.props.value) })
    this.props.onChange(value, this.props.value)
  }

  /**
  * @see React.Component#render
  */
  public render () : ReactNode {
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

export namespace NumberControl {
  export type Properties = {
    value: number,
    onChange: (newValue : number, oldValue : number) => void,
    increment: number
  }

  export type State = {
    value: string
  }
}
