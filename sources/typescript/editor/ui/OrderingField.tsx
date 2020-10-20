import { PureComponent } from 'react'
import { ReactNode } from 'react'
import { MouseEvent } from 'react'
import * as React from 'react'
import classnames from 'classnames'

import * as Redux from '../../redux'

import { nothing } from './nothing'

export class OrderingField extends PureComponent<OrderingField.Properties> {
  public static defaultProps : OrderingField.Properties = {
    field: 0,
    direction: Redux.OrderingDirection.NONE,
    onChange: nothing,
    width: 'auto'
  }

  /**
  * @see React/Component#constructor
  */
  public constructor (props : OrderingField.Properties, context : any) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
  }

  /**
  * @see React/Component#render
  */
  public render () {
    return (
      <button
        className={classnames('ordering-field', this.props.className)}
        onClick={this.handleClick}
        style={this.getFieldStyle()}
      >
        <div className='ordering-field-label'>
          {this.props.children}
        </div>
        <div className={this.getIndicatorClassName()} />
      </button>
    )
  }

  private getFieldStyle () : Object {
    if (this.props.width != null) {
      if (this.props.width === 'auto') {
        return { width: 'auto' }
      } else {
        return {
          flex: 'none',
          width: `${this.props.width}px`
        }
      }
    } else {
      return {}
    }
  }

  private getIndicatorClassName () : string {
    let result : string = 'ordering-field-indicator'

    switch (this.props.direction) {
      case Redux.OrderingDirection.ASCENDING:
        result += ' ordering-field-indicator-ascending'
        break
      case Redux.OrderingDirection.DESCENDING:
        result += ' ordering-field-indicator-descending'
        break
      case Redux.OrderingDirection.NONE:
      default:
        result += ' ordering-field-indicator-none'
        break
    }

    return result
  }

  /**
  * Handle a click on this ordering field.
  *
  * @param event - Related mouse event.
  */
  private handleClick (event : MouseEvent) : void {
    event.stopPropagation()

    if (!event.shiftKey) {
      this.props.onChange(Redux.OrderingEvent.only(this.props.field))
    }

    this.props.onChange(Redux.OrderingEvent.toggle(this.props.field))
  }
}

export namespace OrderingField {
  export type Properties = {
    className?: string,
    children?: ReactNode,
    width: number | 'auto',
    field: number,
    direction: Redux.OrderingDirection,
    onChange: (event : Redux.OrderingEvent) => void
  }
}
