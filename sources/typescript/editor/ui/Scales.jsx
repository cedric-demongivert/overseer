import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'

import { Viewport, Camera, Unit } from '@overseer/components'

import { Scale } from './Scale'
import { Viewport as ViewportComponent } from './Viewport'

export class Scales extends Component {
  render () {
    return (
      <div className={classnames(this.props.className, 'layer')}>
        {this.renderScales()}
      </div>
    )
  }

  renderScales () {
    const ecs = this.props.entityComponentSystem
    const result = []

    if (ecs != null) {
      const viewports = ecs.getEntitiesWithType(Viewport)

      for (let index = 0, size = viewports.size; index < size; ++index) {
        result.push(this.renderScale(viewports.get(index)))
      }

      return result
    }

    return result
  }

  renderScale (entity) {
    const ecs = this.props.entityComponentSystem
    const viewport = ecs.getInstance(entity, Viewport)
    const camera = viewport.camera
    const unit = ecs.getInstance(ecs.getEntityOfInstance(camera), Unit)

    return (
      <ViewportComponent key={entity} value={viewport}>
        <Scale viewport={viewport} camera={camera} unit={unit} />
      </ViewportComponent>
    )
  }
}

Scales.propTypes = {
  className: PropTypes.string,
  entityComponentSystem: PropTypes.instanceOf(EntityComponentSystem)
}

Scales.defaultProps = {

}
