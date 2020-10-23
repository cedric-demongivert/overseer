import { createRef } from 'react'
import { PureComponent } from 'react'
import { RefObject } from 'react'
import { ReactElement } from 'react'
import * as React from 'react'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import { CameraType } from '../../types/CameraType'
import { DOMMouseSourceSystem } from '../../systems/input/DOMMouseSourceSystem'

export class EntityComponentSystemMouseInput extends PureComponent<EntityComponentSystemMouseInput.Properties> {
  private readonly _container : RefObject<HTMLDivElement>
  private _source : DOMMouseSourceSystem

  /**
  * @see React/Component#constructor
  */
  public constructor (props : EntityComponentSystemMouseInput.Properties) {
    super(props)

    this.handleSizeChange = this.handleSizeChange.bind(this)
    this._container = createRef()
  }

  /**
  * @see React/Component#componentDidMount
  */
  public componentDidMount () : void {
    this._source = new DOMMouseSourceSystem({
      element: this._container.current,
      camera: this.props.entityComponentSystem.getComponentOfEntity(this.props.camera, CameraType),
      identifier: this.props.mouse
    })

    this.props.entityComponentSystem.addSystem(this._source)

    window.addEventListener('resize', this.handleSizeChange)
  }

  /**
  * @see React/Component#componentDidUpdate
  */
  public componentDidUpdate (oldProps : EntityComponentSystemMouseInput.Properties) : void {
    if (oldProps.entityComponentSystem !== this.props.entityComponentSystem) {
      oldProps.entityComponentSystem.deleteSystem(this._source)
      this._source.setCamera(this.props.entityComponentSystem.getComponentOfEntity(this.props.camera, CameraType))
      this._source.setIdentifier(this.props.mouse)
      this.props.entityComponentSystem.addSystem(this._source)
    } else {
      if (oldProps.mouse !== this.props.mouse) {
        this._source.setIdentifier(this.props.mouse)
      }

      if (oldProps.camera !== this.props.camera) {
        this._source.setCamera(this.props.entityComponentSystem.getComponentOfEntity(this.props.camera, CameraType))
      }
    }
  }

  /**
  * @see React/Component#componentWillUnmount
  */
  public componentWillUnmount () : void {
    window.removeEventListener('resize', this.handleSizeChange)

    this._source.destroy()
    this._source = null
  }

  /**
  * Handle a change of dimension of the rendered element.
  */
  private handleSizeChange () : void {
    this._source.setViewport(
      0, 0,
      this._container.current.clientWidth,
      this._container.current.clientHeight
    )
  }

  /**
  * @see React/Component#render
  */
  public render () : ReactElement {
    return (
      <div className='layer input-layer' ref={this._container} />
    )
  }
}

export namespace EntityComponentSystemMouseInput {
  export type Properties = {
    entityComponentSystem: EntityComponentSystem,
    camera: Entity,
    mouse: number
  }
}
