import React, { createRef, Component } from 'react'
import PropTypes from 'prop-types'
import { RenderingLoop } from '@overseer/RenderingLoop'
import { GLToolECSRenderer } from '@overseer/overseer'

export class EntityComponentSystemRenderer extends Component {
  constructor (props, context) {
    super(props, context)
    this._renderer = null
    this._loop = new RenderingLoop(
      this.entityComponentSystemWillRender.bind(this)
    )
    this._container = createRef()
    this.onSizeChange = this.onSizeChange.bind(this)
  }

  entityComponentSystemWillRender (delta) {
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
    if (this.props.onSizeChange)
      this.props.onSizeChange(this._renderer.width, this._renderer.height)
  }

  render () {
    return <div
      className="entity-component-system-renderer"
      ref={this._container}
    />
  }
}

EntityComponentSystemRenderer.propTypes = {
  entityComponentSystem: PropTypes.object.isRequired,
  onSizeChange: PropTypes.func
}
