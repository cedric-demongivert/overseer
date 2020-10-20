import { PureComponent } from 'react'
import { ReactNode } from 'react'
import { ReactElement } from 'react'
import * as React from 'react'
import classnames from 'classnames'

import * as Redux from '../../redux'

import { OrderingField } from './OrderingField'
import { nothing } from './nothing'

export class Ordering extends PureComponent<Ordering.Properties> {
  public static defaultProps : Ordering.Properties = {
    value: Redux.Ordering.EMPTY,
    onChange: nothing
  }

  /**
  * @see React/Component#constructor
  */
  public constructor (props : Ordering.Properties, context : any) {
    super(props, context)
    this.handleChange = this.handleChange.bind(this)
    this.renderChild = this.renderChild.bind(this)
  }

  /**
  * Handle an update of this ordering.
  *
  * @param event - Event that describe the update of this ordering.
  */
  private handleChange (event : Redux.OrderingEvent) : void {
    this.props.onChange(event)
  }

  /**
  * @see React/Component#render
  */
  public render () : ReactElement {
    return (
      <div className={classnames('ordering', this.props.className)}>
        { React.Children.map(this.props.children, this.renderChild) }
      </div>
    )
  }

  /**
  * Called over each child element of this ordering in order to augment them.
  *
  * @param child - Child element to augment.
  * @param key - Key related to the child element to augment.
  */
  private renderChild (child : ReactElement, key : number) : ReactElement {
    if (child.type as Function === OrderingField) {
      return React.cloneElement(child, {
        onChange: this.handleChange,
        direction: this.props.value.getDirection(child.props.field),
        key
      })
    } else {
      return React.cloneElement(child, { key })
    }
  }
}

export namespace Ordering {
  export type Properties = {
    className?: string,
    children?: ReactNode,
    value: Redux.Ordering,
    onChange: (event : Redux.OrderingEvent) => void
  }
}
