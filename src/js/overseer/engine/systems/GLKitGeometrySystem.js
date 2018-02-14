import { System, Component } from '@overseer/engine/ecs'
import { Geometry } from '@overseer/engine/components'
import { GLKitGeometryBank } from '@overseer/engine/services'
import { GLContext } from '@glkit'

function * services (system) {
  yield system.Service
}

/**
* A system that manage geometries for a context.
*/
@System.provide(services)
export class GLKitGeometrySystem extends System {
  /**
  * Create a new GLKitGeometrySystem for a particular glkit context.
  *
  * @param {GLContextualised} context - Any GLContextualised object.
  */
  constructor (context) {
    super()
    this._gl = GLContext.context(context)
    this.Service = GLKitGeometryBank.of(this._gl)
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
    for (const geometry of this.manager.components(Geometry)) {
      this._service.add(geometry)
    }
  }

  /**
  * @see System#managerDidAddComponent
  */
  managerDidAddComponent (component) {
    if (Component.isOfType(component, Geometry)) {
      this._service.add(component)
    }
  }

  /**
  * @see System#managerWillDeleteComponent
  */
  managerWillDeleteComponent (component) {
    if (Component.isOfType(component, Geometry)) {
      this._service.delete(component)
    }
  }

  /**
  * @see System#update
  */
  update () {
    for (const geometry of this.manager.components(Geometry)) {
      this._service.update(geometry)
    }
  }

  /**
  * @see System#destroy
  */
  destroy () {
    this._service.clear()
  }
}
