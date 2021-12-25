import { PureComponent } from 'react'
import { ReactNode } from 'react'
import * as React from 'react'

import { Vector2f } from '@cedric-demongivert/gl-tool-math'

import { NumberEditor } from './NumberEditor'

import { nothing } from '../nothing'

const ZERO_VECTOR : Vector2f = new Vector2f()

export class Vector2fEditor extends PureComponent<Vector2fEditor.Properties> {
  public static defaultProps : Vector2fEditor.Properties = {
    value: ZERO_VECTOR,
    readonly: false,
    onChange: nothing
  }

  /**
  * @see React.Component#constructor
  */
  public constructor (properties : Vector2fEditor.Properties, context : any) {
    super(properties, context)

    this.handleXChange = this.handleXChange.bind(this)
    this.handleYChange = this.handleYChange.bind(this)
  }

  public handleXChange (value : number) : void {
    const nextValue : Vector2f = new Vector2f()

    nextValue.copy(this.props.value)
    nextValue.x = value

    this.props.onChange(nextValue, this.props.value)
  }

  public handleYChange (value : number) : void  {
    const nextValue : Vector2f = new Vector2f()

    nextValue.copy(this.props.value)
    nextValue.y = value

    this.props.onChange(nextValue, this.props.value)
  }

  /**
  * @see React.Component#render
  */
  public render () : ReactNode {
    return (
      <div className='collection collection-table'>
        <div className='element'>
          <div className='element'>X</div>
          <div className='element'>Y</div>
        </div>
        <div className='element'>
          <div className='element'>
            <NumberEditor
              value={this.props.value.x}
              onChange={this.handleXChange}
              readonly={this.props.readonly}
            />
          </div>
          <div className='element'>
            <NumberEditor
              value={this.props.value.y}
              onChange={this.handleYChange}
              readonly={this.props.readonly}
            />
          </div>
        </div>
      </div>
    )
  }
}

export namespace Vector2fEditor {
  export type Properties = {
    value: Vector2f,
    onChange: (newValue : Vector2f, oldValue : Vector2f) => void,
    readonly: boolean
  }
}
