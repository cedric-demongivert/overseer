import { System, Component } from '@overseer/engine/ecs'
import { Texture2D } from '@overseer/engine/components'
import { GLKitTexture2DBank } from '@overseer/engine/services'
import { GLContext } from '@glkit'

/**
* A system that manage 2d textures for a context.
*/
@System.provide(* function (system) { yield system.Service })
export class GLKitTexture2DSystem extends System {
  /**
  * Create a new GLKitTexture2DSystem for a particular glkit context.
  *
  * @param {GLContextualised} context - Any GLContextualised object.
  */
  constructor (context) {
    super()
    this._gl = GLContext.context(context)
    this.Service = GLKitTexture2DBank.of(this._gl)
    this._service = new this.Service()
  }

  /**
  * @return {GLContext} The context related to this system.
  */
  get context () {
    return this._gl
  }

  /**
  * @return {this.Service} The holded service instance.
  */
  getService () {
    return this._service
  }

  /**
  * @see System#initialize
  */
  initialize () {
    for (const texture of this.manager.components(Texture2D)) {
      this._service.add(texture)
    }
  }

  /**
  * @see System#managerDidAddComponent
  */
  managerDidAddComponent (component) {
    if (component.type === Component.typeof(Texture2D)) {
      this._service.add(component)
    }
  }

  /**
  * @see System#managerWillDeleteComponent
  */
  managerWillDeleteComponent (component) {
    if (component.type === Component.typeof(Texture2D)) {
      this._service.delete(component)
    }
  }

  /**
  * @see System#update
  */
  update () {
    for (const texture of this.manager.components(Texture2D)) {
      this._service.update(texture)
    }
  }

  /**
  * @see System#destroy
  */
  destroy () {
    this._service.clear()
  }
}
