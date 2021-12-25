import { createRef } from 'react'
import { Component } from 'react'
import { RefObject } from 'react'
import { ReactElement } from 'react'
import * as React from 'react'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'
import { Vector3f } from '@cedric-demongivert/gl-tool-math'

import { Empty } from '../Empty'

import { RenderingLoop } from '../RenderingLoop'

import { EntityComponentSystemMouseInput } from './EntityComponentSystemMouseInput'

const CLEAR_COLOR : Vector3f = Vector3f.create(66/255, 114/255, 245/255)

export class EntityComponentSystemRenderer extends Component<EntityComponentSystemRenderer.Properties, EntityComponentSystemRenderer.State> {
  public static defaultProps : EntityComponentSystemRenderer.Properties = {
    entityComponentSystem: null,
    camera: 0,
    onSizeChange: Empty.callback
  }

  private readonly _loop : RenderingLoop
  private readonly _canvas : RefObject<HTMLCanvasElement>
  private readonly _container : RefObject<HTMLDivElement>
  private _oldRendererSize : EntityComponentSystemRenderer.Size
  private _newRendererSize : EntityComponentSystemRenderer.Size

  //
  //private _renderer : WebGLRenderingSystem

  /**
  * @see React/Component#constructor
  */
  public constructor (props : EntityComponentSystemRenderer.Properties) {
    super(props)

    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.ECSWillRender = this.ECSWillRender.bind(this)

    //this._renderer = null
    this._loop = new RenderingLoop(this.ECSWillRender)
    this._canvas = createRef()
    this._container = createRef()
    this._oldRendererSize = null
    this._newRendererSize = { width: 0, height: 0 }
    this.state = { frame: 0 }
  }

  private ECSWillRender () : void {
    //this._renderer.clear(CLEAR_COLOR)
    //this._renderer.render(this.props.camera)
    this.setState(x => ({ frame: x.frame + 1 }))
  }

  /**
  * @see React/Component#componentDidMount
  */
  public componentDidMount () : void {
    //this._renderer = WebGLRenderingSystem.wrap(this._canvas.current)
    //this.props.entityComponentSystem.addSystem(this._renderer)

    this.handleSizeChange()
    window.addEventListener('resize', this.handleSizeChange)

    this._loop.start()
  }

  /**
  * @see React/Component#componentDidUpdate
  */
  public componentDidUpdate (oldProps : EntityComponentSystemRenderer.Properties) : void {

  }

  /**
  * @see React/Component#componentWillUnmount
  */
  public componentWillUnmount () : void {
    window.removeEventListener('resize', this.handleSizeChange)

    this._loop.cancel()
    //this._renderer.destroy()
    //this._renderer = null
  }

  /**
  * Handle a change of dimension of the rendered element.
  */
  private handleSizeChange () : void {
    this._newRendererSize.width = this._container.current.offsetWidth
    this._newRendererSize.height = this._container.current.offsetHeight

    this._canvas.current.width = this._newRendererSize.width
    this._canvas.current.height = this._newRendererSize.height

    this.props.onSizeChange(this._newRendererSize, this._oldRendererSize)

    if (this._oldRendererSize == null) {
      this._oldRendererSize = { width: 0, height: 0 }
    }

    this._oldRendererSize.width = this._newRendererSize.width
    this._oldRendererSize.height = this._newRendererSize.height
  }

  /**
  * @see React/Component#render
  */
  public render () : ReactElement {
    return (
      <div className='renderer renderer-webgl' ref={this._container}>
        <canvas ref={this._canvas} />
        <EntityComponentSystemMouseInput
          entityComponentSystem={this.props.entityComponentSystem}
          camera={this.props.camera}
          mouse={0}
        />
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
    onSizeChange: (newSize : Size, oldSize : Size) => void
  }

  export type State = {
    frame: number
  }
}
