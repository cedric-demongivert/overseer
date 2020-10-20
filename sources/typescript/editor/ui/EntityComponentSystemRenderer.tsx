import { createRef } from 'react'
import { Component } from 'react'
import { RefObject } from 'react'
import { ReactElement } from 'react'
import { ReactNode } from 'react'
import * as React from 'react'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import { WebGLRenderingSystem } from '../../systems/WebGLRenderingSystem'
import { RenderingLoop } from '../../RenderingLoop'

import { nothing } from './nothing'

export class EntityComponentSystemRenderer extends Component<EntityComponentSystemRenderer.Properties, EntityComponentSystemRenderer.State> {
  public static defaultProps : EntityComponentSystemRenderer.Properties = {
    entityComponentSystem: null,
    camera: 0,
    onSizeChange: nothing,
    onInitialization: nothing,
    onDestruction: nothing
  }

  private readonly _loop : RenderingLoop
  private readonly _canvas : RefObject<HTMLCanvasElement>
  private readonly _custom : RefObject<HTMLDivElement>
  private _oldRendererSize : EntityComponentSystemRenderer.Size
  private _newRendererSize : EntityComponentSystemRenderer.Size
  private _renderer : WebGLRenderingSystem

  /**
  * @see React/Component#constructor
  */
  public constructor (props : EntityComponentSystemRenderer.Properties) {
    super(props)

    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.ECSWillRender = this.ECSWillRender.bind(this)

    this._renderer = null
    this._loop = new RenderingLoop(this.ECSWillRender)
    this._canvas = createRef()
    this._custom = createRef()
    this._oldRendererSize = null
    this._newRendererSize = { width: 0, height: 0 }
    this.state = { frame: 0 }
  }

  private ECSWillRender () : void {
    this._renderer.render(this.props.camera)
    this.setState(x => ({ frame: x.frame + 1 }))
  }

  /**
  * @see React/Component#componentDidMount
  */
  public componentDidMount () : void {
    this._renderer = WebGLRenderingSystem.wrap(this._canvas.current)
    this.props.entityComponentSystem.addSystem(this._renderer)

    this.handleSizeChange()
    window.addEventListener('resize', this.handleSizeChange)

    this.props.onInitialization(this._custom.current)
    this._loop.start()
  }

  /**
  * @see React/Component#componentDidUpdate
  */
  public componentDidUpdate (oldProps : EntityComponentSystemRenderer.Properties) : void {
    if (oldProps.entityComponentSystem !== this.props.entityComponentSystem) {
      oldProps.entityComponentSystem.deleteSystem(this._renderer)
      this.props.entityComponentSystem.addSystem(this._renderer)
    }
  }

  /**
  * @see React/Component#componentWillUnmount
  */
  public componentWillUnmount () : void {
    this.props.onDestruction(this._custom.current)
    window.removeEventListener('resize', this.handleSizeChange)
    this._loop.cancel()
    this._renderer.destroy()
    this._renderer = null
  }

  /**
  * Handle a change of dimension of the rendered element.
  */
  private handleSizeChange () : void {
    this._newRendererSize.width = this._renderer.width
    this._newRendererSize.height = this._renderer.height

    this.props.onSizeChange(this._newRendererSize, this._oldRendererSize)

    if (this._oldRendererSize == null) {
      this._oldRendererSize = { width: 0, height: 0 }
    }

    this._oldRendererSize.width = this._renderer.width
    this._oldRendererSize.height = this._renderer.height
  }

  /**
  * @see React/Component#render
  */
  public render () : ReactElement {
    return (
      <div className='rendering entity-component-system-rendering'>
        <canvas style={{ width: '100%', height: '100%' }} ref={this._canvas} />

        <div className='layer'>
          <div className='layer' ref={this._custom} />
          {
            React.Children.map(this.props.children, (child : ReactElement) => (
              React.cloneElement(child, { frame: this.state.frame })
            ))
          }
        </div>
      </div>
    )
  }
}

export namespace EntityComponentSystemRenderer {
  export type Size = {
    width: number,
    height: number
  }

  export type Properties = {
    entityComponentSystem: EntityComponentSystem,
    camera: Entity,
    onSizeChange: (newSize : Size, oldSize : Size) => void,
    onInitialization: (element : HTMLDivElement) => void,
    onDestruction: (element : HTMLDivElement) => void,
    children?: ReactNode
  }

  export type State = {
    frame: number
  }
}
