import { Component } from 'react'
import { ReactNode } from 'react'
import { MouseEvent } from 'react'
import { ReactElement } from 'react'
import * as React from 'react'

import classnames from 'classnames'

import { nothing } from '../nothing'

const SLIDER_ACTIVATION : number = 100

export class Slider extends Component<Slider.Properties, Slider.State> {
  public static defaultProps : Slider.Properties = {
    increment: 1,
    onChange: nothing,
    onStart: nothing,
    onStop: nothing,
    children: null
  }

  /**
  * @see React/Component#constructor
  */
  public constructor (properties : Slider.Properties, context : any) {
    super(properties, context)

    this.state = {
      since: null,
      origin: null,
      sliding: false,
      timeout: null
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp   = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleSliding   = this.handleSliding.bind(this)
  }

  /**
  * @param event
  */
  public handleMouseDown (event : MouseEvent) : void {
    this.setState({
      since: event.timeStamp,
      origin: event.screenX,
      sliding: false,
      timeout: window.setTimeout(this.handleSliding, SLIDER_ACTIVATION)
    })
  }

  public handleSliding () : void {
    if (this.state.since != null) {
      this.setState({ sliding: true, timeout: null })
      this.props.onStart()
    }
  }

  /**
  * @param event
  */
  public handleMouseUp (event : MouseEvent) : void {
    if (event.timeStamp - this.state.since > SLIDER_ACTIVATION) {
      if (this.state.timeout) {
        window.clearTimeout(this.state.timeout)
      }

      this.setState({
        since: null,
        origin: null,
        sliding: false,
        timeout: null
      })
      
      this.props.onStop()
    }
  }

  /**
  * @param event
  */
  public handleMouseMove (event : MouseEvent) : void {
    if (this.state.sliding) {
      this.props.onChange(
        (event.screenX - this.state.origin) * this.props.increment,
        0
      )
    }
  }

  /**
  * @see React/Component#render
  */
  public render () : ReactNode {
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

export namespace Slider {
  export type Properties = {
    increment: number,
    onStart: () => void,
    onChange: (newValue : number, oldValue : number) => void,
    onStop: () => void,
    children: ReactElement
  }

  export type State = {
    since: number,
    origin: number,
    sliding: boolean,
    timeout: number
  }
}
