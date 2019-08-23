import React, { createRef, Component } from 'react'
import PropTypes from 'prop-types'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'

import { RenderingLoop } from '@overseer/RenderingLoop'
import { GLToolECSRenderer } from '@overseer/GLToolECSRenderer'

import { nothing } from './nothing'

export class EntityComponentSystemRenderer extends Component {
  constructor (props, context) {
    super(props, context)

    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.ECSWillRender = this.ECSWillRender.bind(this)

    this._renderer = null
    this._loop = new RenderingLoop(this.ECSWillRender)
    this._container = createRef()
    this._custom = createRef()
    this._oldRendererSize = null
    this._newRendererSize = { width: 0, height: 0 }
    this.state = { frame: 0 }
  }

  ECSWillRender (delta) {
    this._renderer.render()
    this.setState(x => ({ frame: x.frame + 1 }))
  }

  componentDidMount () {
    this._renderer = new GLToolECSRenderer(this._container.current)
    this._renderer.entityComponentSystem = this.props.entityComponentSystem
    this.handleSizeChange()
    window.addEventListener('resize', this.handleSizeChange)
    this.props.onInitialization(this._custom.current)
    this._loop.start()
  }

  componentDidUpdate () {
    this._renderer.entityComponentSystem = this.props.entityComponentSystem
  }

  componentWillUnmount () {
    this.props.onDestruction(this._custom.current)
    window.removeEventListener('resize', this.handleSizeChange)
    this._loop.cancel()
    this._renderer.destroy()
    this._renderer = null
  }

  handleSizeChange () {
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
    return (
      <div className='rendering entity-component-system-rendering'>
        <div className='layer' ref={this._container} />
        <div className='layer'>
          <div className='layer' ref={this._custom} />
          {
            React.Children.map(this.props.children, child => (
              React.cloneElement(child, { frame: this.state.frame })
            ))
          }
        </div>
      </div>
    )
  }
}

EntityComponentSystemRenderer.propTypes = {
  entityComponentSystem: PropTypes.instanceOf(EntityComponentSystem),
  onSizeChange: PropTypes.func,
  onInitialization: PropTypes.func,
  onDestruction: PropTypes.func,
  children: PropTypes.node
}

EntityComponentSystemRenderer.defaultProps = {
  onSizeChange: nothing,
  onInitialization: nothing,
  onDestruction: nothing
}
