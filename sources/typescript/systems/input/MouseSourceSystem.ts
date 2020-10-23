import { Sequence } from '@cedric-demongivert/gl-tool-collection'
import { System } from '@cedric-demongivert/gl-tool-ecs'
import { Component } from '@cedric-demongivert/gl-tool-ecs'

import { Camera } from '../../components/Camera'

import { OverseerSystem } from '../OverseerSystem'

import { Cursor } from './Cursor'
import { MouseManagementSystem } from './MouseManagementSystem'

/**
* A system that publish information about a mouse input to all registered
* mouse management systems of its parent entity-component-system.
*/
export class MouseSourceSystem extends OverseerSystem {
  public get camera () : Component<Camera> {
    throw new Error("MouseSource.get camera is not implemented.")
  }

  /**
  * @return True if the current object is a mouse source.
  */
  public get isMouseSource () {
    return true
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System.initialize
  */
  public initialize () : void {
    super.initialize()

    const systems : Sequence<System> = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system : System = systems.get(index)

      if (MouseManagementSystem.is(system)) {
        (system as MouseManagementSystem).handleSourceAddition(this)
      }
    }
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System.destroy
  */
  public destroy () : void {
    super.destroy()

    const systems : Sequence<System> = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system : System = systems.get(index)

      if (MouseManagementSystem.is(system)) {
        (system as MouseManagementSystem).handleSourceDeletion(this)
      }
    }
  }

  /**
  * @return The identifier of the mouse tracked by this system.
  */
  public get identifier () : number {
    throw new Error("MouseSource.get identifier is not implemented.")
  }

  /**
  * @return A list of cursors states of this source.
  */
  public get cursor () : Cursor[] {
    throw new Error("MouseSource.get cursor is not implemented.")
  }

  /**
  * @param cursor - A list of cursor states for this source.
  */
  public set cursor (cursor : Cursor[]) {
    throw new Error("MouseSource.set cursor is not implemented.")
  }
}

export namespace MouseSourceSystem {
  /**
  * @param system - An object to check.
  *
  * @return True if the given object is a mouse source.
  */
  export function is (system : any) : boolean {
    return system.isMouseSource === true
  }
}
