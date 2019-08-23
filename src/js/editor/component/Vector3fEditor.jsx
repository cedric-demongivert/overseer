import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Vector3f } from '@cedric-demongivert/gl-tool-math'

import { NumberEditor } from './NumberEditor'

import { nothing } from '../nothing'

export class Vector3fEditor extends PureComponent {
  /**
  * @see React.Component#constructor
  */
  constructor (props, context) {
    super(props, context)
    this.handleXChange = this.handleXChange.bind(this)
    this.handleYChange = this.handleYChange.bind(this)
    this.handleZChange = this.handleZChange.bind(this)
  }

  handleXChange (value) {
    const nextValue = new Vector3f()
    nextValue.copy(this.props.value)
    nextValue.x = value

    this.props.onChange(nextValue)
  }

  handleYChange (value) {
    const nextValue = new Vector3f()
    nextValue.copy(this.props.value)
    nextValue.y = value

    this.props.onChange(nextValue)
  }

  handleZChange (value) {
    const nextValue = new Vector3f()
    nextValue.copy(this.props.value)
    nextValue.z = value

    this.props.onChange(nextValue)
  }

  /**
  * @see React.Component#render
  */
  render () {
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

const ZERO_VECTOR = new Vector3f()

Vector3fEditor.propTypes = {
  value: PropTypes.instanceOf(Vector3f).isRequired,
  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool.isRequired
}

Vector3fEditor.defaultProps = {
  value: ZERO_VECTOR,
  readonly: false,
  onChange: nothing
}
