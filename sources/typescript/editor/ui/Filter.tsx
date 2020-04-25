import { PureComponent } from 'react'
import { RefObject } from 'react'
import { ReactNode } from 'react'
import { ChangeEvent } from 'react'
import { KeyboardEvent } from 'react'
import * as React from 'react'

import { Button } from 'reactstrap'
import classnames from 'classnames'

import { nothing } from './nothing'

export class Filter extends PureComponent<Filter.Properties> {
  private control  : RefObject<HTMLInputElement>
  private oldValue : string

  public static defaultProps : Filter.Properties = {
    value: '',
    placeholder: 'filter',
    onChange: nothing,
    className: null
  }

  /**
  * @see React/Component#constructor
  */
  public constructor (properties : Filter.Properties, context : any) {
    super(properties, context)

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp  = this.handleKeyUp.bind(this)
    this.clear        = this.clear.bind(this)
    this.focus        = this.focus.bind(this)
    this.control        = React.createRef()
    this.oldValue     = undefined
  }

  /**
  * @see React/Component#componentDidMount
  */
  public componentDidMount () : void {
    this.oldValue = this.control.current.value
  }

  /**
  * Do focus the input element of this filter.
  */
  public focus () : void {
    this.control.current.focus()
  }

  /**
  * Clear this filter field.
  */
  public clear () : void {
    if (this.props.value !== '') {
      this.props.onChange('', this.oldValue)
      this.oldValue = ''
      this.focus()
    }
  }

  /**
  * Handle a change of this filter inner content.
  *
  * @param event - The change event emitted by this filter text input.
  */
  public handleChange (event : ChangeEvent<HTMLInputElement>) : void {
    this.props.onChange(event.target.value, this.oldValue)
    this.oldValue = event.target.value
  }

  /**
  * Handle a keyboard key up event.
  *
  * @param event - A key up event emitted by this filter text input.
  */
  public handleKeyUp (event : KeyboardEvent<HTMLInputElement>) : void {
    if (event.key === 'Escape') {
      this.clear()
    }
  }

  /**
  * @see React/Component#render
  */
  public render () : ReactNode {
    return (
      <div className={classnames('filter', this.props.className)}>
        <Button className='filter-focus fas fa-search' onClick={this.focus} />
        <input
          type='text'
          className='filter-control'
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          ref={this.control}
        />
        <Button className='filter-clear fas fa-times' onClick={this.clear} />
      </div>
    )
  }
}

export namespace Filter {
  export type Properties = {
    value: string,
    placeholder: string,
    onChange: (newValue : string, oldValue : string) => void,
    className?: string
  }
}
