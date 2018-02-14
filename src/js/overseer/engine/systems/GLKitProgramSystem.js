import { System, Component } from '@overseer/engine/ecs'
import { Program } from '@overseer/engine/components'
import { GLKitProgramBank } from '@overseer/engine/services'
import { GLContext } from '@glkit'

function * services (system) {
  yield system.Service
}

/**
* A system that manage programs for a context.
*/
@System.provide(services)
export class GLKitProgramSystem extends System {
  /**
  * Create a new GLKitProgramSystem for a particular glkit context.
  *
  * @param {GLContextualised} context - Any GLContextualised object.
  */
  constructor (context) {
    super()
    this._gl = GLContext.context(context)
    this.Service = GLKitProgramBank.of(this._gl)
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
    for (const program of this.manager.components(Program)) {
      this._service.add(program)
    }
  }

  /**
  * @see System#managerDidAddComponent
  */
  managerDidAddComponent (component) {
    if (Component.isOfType(component, Program)) {
      this._service.add(component)
    }
  }

  /**
  * @see System#managerWillDeleteComponent
  */
  managerWillDeleteComponent (component) {
    if (Component.isOfType(component, Program)) {
      this._service.delete(component)
    }
  }

  /**
  * @see System#update
  */
  update () {
    for (const program of this.manager.components(Program)) {
      this._service.update(program)
    }
  }

  /**
  * @see System#destroy
  */
  destroy () {
    this._service.clear()
  }
}
