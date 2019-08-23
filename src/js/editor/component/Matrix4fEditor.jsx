import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Matrix4f } from '@cedric-demongivert/gl-tool-math'

import { NumberEditor } from './NumberEditor'

import { nothing } from '../nothing'

export class Matrix4fEditor extends PureComponent {
  /**
  * @see React.Component#constructor
  */
  constructor (props, context) {
    super(props, context)
    this.handleChanges = new Array(4 * 4)

    for (let x = 0; x < 4; ++x) {
      for (let y = 0; y < 4; ++y) {
        this.handleChanges[y * 4 + x] = this.handleChange.bind(this, x, y)
      }
    }
  }

  handleChange (x, y, value) {
    const nextValue = new Matrix4f()
    nextValue.copy(this.props.value)
    nextValue.setCell(x, y, value)

    this.props.onChange(nextValue)
  }

  /**
  * @see React.Component#render
  */
  render () {
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

  renderRows () {
    const result = []

    for (let row = 0; row < 4; ++row) {
      result.push(this.renderRow(row))
    }

    return result
  }

  renderRow (row) {
    const cells = []

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
            onChange={this.handleChanges[cell * 4 + row]}
            readonly={this.props.readonly}
          />
        </div>
      )
    }

    return <div className='element' key={row}>{cells}</div>
  }
}

const ZERO_MATRIX = new Matrix4f()

Matrix4fEditor.propTypes = {
  value: PropTypes.instanceOf(Matrix4f).isRequired,
  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool.isRequired
}

Matrix4fEditor.defaultProps = {
  value: ZERO_MATRIX,
  readonly: false,
  onChange: nothing
}
