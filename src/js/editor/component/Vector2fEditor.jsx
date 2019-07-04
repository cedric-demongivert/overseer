import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Vector2f } from '@cedric-demongivert/gl-tool-math'

import { NumberEditor } from './NumberEditor'

import { nothing } from '../nothing'

export class Vector2fEditor extends PureComponent {
  /**
  * @see React.Component#constructor
  */
  constructor (props, context) {
    super(props, context)
    this.handleXChange = this.handleXChange.bind(this)
    this.handleYChange = this.handleYChange.bind(this)
  }

  handleXChange (value) {
    const nextValue = new Vector2f()
    nextValue.copy(this.props.value)
    nextValue.x = value

    this.props.onChange(nextValue)
  }

  handleYChange (value) {
    const nextValue = new Vector2f()
    nextValue.copy(this.props.value)
    nextValue.y = value

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

const ZERO_VECTOR = new Vector2f()

Vector2fEditor.propTypes = {
  value: PropTypes.instanceOf(Vector2f).isRequired,
  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool.isRequired
}

Vector2fEditor.defaultProps = {
  value: ZERO_VECTOR,
  readonly: false,
  onChange: nothing
}
