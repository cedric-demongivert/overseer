import React, { createRef, Component } from 'react'
import PropTypes from 'prop-types'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'

import { RenderingLoop } from '@overseer/RenderingLoop'
import { GLToolECSRenderer } from '@overseer/GLToolECSRenderer'

import { nothing } from './nothing'

export class EntityComponentSystemRenderer extends Component {
  constructor (props, context) {
    super(props, context)

    this.onSizeChange = this.onSizeChange.bind(this)
    this.ECSWillRender = this.ECSWillRender.bind(this)

    this._renderer = null
    this._loop = new RenderingLoop(this.ECSWillRender)
    this._container = createRef()
    this._oldRendererSize = null
    this._newRendererSize = { width: 0, height: 0 }
  }

  ECSWillRender (delta) {
    this._renderer.render()
  }

  componentDidMount () {
    this._renderer = new GLToolECSRenderer(this._container.current)
    this._renderer.entityComponentSystem = this.props.entityComponentSystem
    this.onSizeChange()
    window.addEventListener('resize', this.onSizeChange)
    this._loop.start()
  }

  componentDidUpdate () {
    this._renderer.entityComponentSystem = this.props.entityComponentSystem
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onSizeChange)
    this._loop.cancel()
    this._renderer.destroy()
    this._renderer = null
  }

  onSizeChange () {
    this._newRendererSize.width = this._renderer.width
    this._newRendererSize.height = this._renderer.height

    this.props.onSizeChange(this._newRendererSize, this._oldRendererSize)

    if (this._oldRendererSize == null) {
      this._oldRendererSize = { width: 0, height: 0 }
    }

    this._oldRendererSize.width = this._renderer.width
    this._oldRendererSize.height = this._renderer.height
  }

  render () {
    return <div
      className="entity-component-system-renderer"
      ref={this._container}
    />
  }
}

EntityComponentSystemRenderer.propTypes = {
  entityComponentSystem: PropTypes.instanceOf(EntityComponentSystem),
  onSizeChange: PropTypes.func
}

EntityComponentSystemRenderer.defaultProps = {
  onSizeChange: nothing
}
