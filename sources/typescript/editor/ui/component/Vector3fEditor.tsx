import { PureComponent } from 'react'
import { ReactNode } from 'react'
import * as React from 'react'

import { Vector3f } from '@cedric-demongivert/gl-tool-math'

import { NumberEditor } from './NumberEditor'

import { nothing } from '../nothing'

const ZERO_VECTOR : Vector3f = new Vector3f()

export class Vector3fEditor extends PureComponent<Vector3fEditor.Properties> {
  public static defaultProps : Vector3fEditor.Properties = {
    value: ZERO_VECTOR,
    readonly: false,
    onChange: nothing
  }

  /**
  * @see React.Component#constructor
  */
  public constructor (properties : Vector3fEditor.Properties, context : any) {
    super(properties, context)

    this.handleXChange = this.handleXChange.bind(this)
    this.handleYChange = this.handleYChange.bind(this)
    this.handleZChange = this.handleZChange.bind(this)
  }

  public handleXChange (value : number) : void {
    const nextValue : Vector3f = new Vector3f()

    nextValue.copy(this.props.value)
    nextValue.x = value

    this.props.onChange(nextValue, this.props.value)
  }

  public handleYChange (value : number) : void {
    const nextValue : Vector3f = new Vector3f()

    nextValue.copy(this.props.value)
    nextValue.y = value

    this.props.onChange(nextValue, this.props.value)
  }

  public handleZChange (value : number) : void {
    const nextValue : Vector3f = new Vector3f()

    nextValue.copy(this.props.value)
    nextValue.z = value

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
          <div className='element'>Z</div>
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
          <div className='element'>
            <NumberEditor
              value={this.props.value.z}
              onChange={this.handleZChange}
              readonly={this.props.readonly}
            />
          </div>
        </div>
      </div>
    )
  }
}

export namespace Vector3fEditor {
  export type Properties = {
    value    : Vector3f,
    onChange : (newValue : Vector3f, oldValue : Vector3f) => void,
    readonly : boolean
  }
}
