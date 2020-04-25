import { PureComponent } from 'react'
import { ReactNode } from 'react'
import * as React from 'react'

import { Matrix4f } from '@cedric-demongivert/gl-tool-math'

import { NumberEditor } from './NumberEditor'

import { nothing } from '../nothing'

const ZERO_MATRIX : Matrix4f = new Matrix4f()

export class Matrix4fEditor extends PureComponent<Matrix4fEditor.Properties> {
  public static defaultProps : Matrix4fEditor.Properties = {
    value: ZERO_MATRIX,
    readonly: false,
    onChange: nothing
  }

  private changeHandlers : ((value : number) => void)[]

  /**
  * @see React.Component#constructor
  */
  public constructor (properties : Matrix4fEditor.Properties, context : any) {
    super(properties, context)

    this.changeHandlers = new Array(4 * 4)

    for (let x = 0; x < 4; ++x) {
      for (let y = 0; y < 4; ++y) {
        this.changeHandlers[y * 4 + x] = this.handleChange.bind(this, x, y)
      }
    }
  }

  public handleChange (x : number, y : number, value : number) : void {
    const nextValue : Matrix4f = new Matrix4f()

    nextValue.copy(this.props.value)
    nextValue.setCell(x, y, value)

    this.props.onChange(nextValue, this.props.value)
  }

  /**
  * @see React.Component#render
  */
  public render () : ReactNode {
    return (
      <div className='collection collection-table'>
        <div className='element'>
          <div className='element' style={{flex: '0 0 25px'}} />
          <div className='element'>X</div>
          <div className='element'>Y</div>
          <div className='element'>Z</div>
          <div className='element'>W</div>
        </div>
        { this.renderRows() }
      </div>
    )
  }

  public renderRows () : ReactNode {
    const result : ReactNode[] = []

    for (let row = 0; row < 4; ++row) {
      result.push(this.renderRow(row))
    }

    return result
  }

  public renderRow (row : number) : ReactNode {
    const cells : ReactNode[] = []

    cells.push(
      <div className='element' style={{flex: '0 0 25px'}} key={0}>
        { row + 1 }
      </div>
    )

    for (let cell = 0; cell < 4; ++cell) {
      // transposed due to incapacity of webgl to transpose matrix in live
      cells.push(
        <div className='element' key={cell + 1}>
          <NumberEditor
            value={this.props.value.getCell(row, cell)}
            onChange={this.changeHandlers[cell * 4 + row]}
            readonly={this.props.readonly}
          />
        </div>
      )
    }

    return <div className='element' key={row}>{cells}</div>
  }
}

export namespace Matrix4fEditor {
  export type Properties = {
    value: Matrix4f,
    onChange: (newValue : Matrix4f, oldValue : Matrix4f) => void,
    readonly: boolean
  }
}
