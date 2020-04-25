import { OverseerSystem } from '../OverseerSystem'
import { MouseManagementSystem } from './MouseManagementSystem'

/**
* A system that publish information about a mouse input to all registered
* mouse management systems of its parent entity-component-system.
*/
export class MouseSourceSystem extends OverseerSystem {
  /**
  * @param {object} system - An object to check.
  *
  * @return {boolean} True if the given object is a mouse source.
  */
  static is (system) {
    return system.isMouseSource === true
  }

  /**
  * @return {boolean} True if the current object is a mouse source.
  */
  get isMouseSource () {
    return true
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System#initialize
  */
  initialize () {
    super.initialize()

    const systems = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system = systems.get(index)

      if (MouseManagementSystem.is(system)) {
        system.handleSourceAddition(this)
      }
    }
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System#destroy
  */
  destroy () {
    super.destroy()

    const systems = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system = systems.get(index)

      if (MouseManagementSystem.is(system)) {
        system.handleSourceDeletion(this)
      }
    }
  }

  /**
  * @return {number} The identifier of the mouse tracked by this system.
  */
  get identifier () {
    throw new Error("MouseSource#get identifier is not implemented.")
  }

  /**
  * @return {Cursor[]} A list of cursors states of this source.
  */
  get cursor () {
    throw new Error("MouseSource#get cursor is not implemented.")
  }

  /**
  * @param {Cursor[]} cursor - A list of cursor states for this source.
  */
  set cursor (cursor) {
    throw new Error("MouseSource#set cursor is not implemented.")
  }
}
