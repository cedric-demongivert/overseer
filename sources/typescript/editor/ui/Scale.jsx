import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Vector4f } from '@cedric-demongivert/gl-tool-math'

import { Viewport, Camera, Unit } from '@overseer/data'

export class Scale extends Component {
  constructor (props, context) {
    super(props, context)
    this._left = new Vector4f()
    this._right = new Vector4f()
  }

  get cameraWidth () {
    const viewToWorld = this.props.camera.viewToWorld
    const left = this._left
    const right = this._right

    left.set(-1.0, -1.0, 0.0, 1.0)
    right.set(1.0, -1.0, 0.0, 1.0)

    viewToWorld.multiplyWithVector(left)
    viewToWorld.multiplyWithVector(right)

    left.subtract(right)

    return Math.sqrt(left.x * left.x + left.y * left.y)
  }

  render () {
    const length = this.props.unit.unit.clone()
    length.value *= this.cameraWidth
    length.order(3)
    const min = Math.ceil(length.value * 0.3)
    const size = (Math.floor(min / 30.0) + 1.0) * 30.0
    const pixelByUnit = this.props.viewport.width / length.value
    const unitByPixel = length.value / this.props.viewport.width
    length.value = size
    length.order(1)

    return (
      <div
        className={classnames(this.props.className, 'scale')}
        style={{ width: `${Math.floor(size * pixelByUnit)}px`}}
      >
        <div className='scale-label'>
          { size } { length.unit }
        </div>
        <div className='scale-bars collection'>
          <div className='scale-bar element' />
          <div className='scale-bar element' />
          <div className='scale-bar element' />
          <div className='scale-bar element' />
          <div className='scale-bar element' />
          <div className='scale-bar element' />
          <div className='scale-bar element' />
          <div className='scale-bar element' />
          <div className='scale-bar element' />
          <div className='scale-bar element' />
        </div>
      </div>
    )
  }
}

Scale.propTypes = {
  className: PropTypes.string,
  viewport: PropTypes.instanceOf(Viewport).isRequired,
  camera: PropTypes.instanceOf(Camera).isRequired,
  unit: PropTypes.instanceOf(Unit).isRequired
}

Scale.defaultProps = {

}
