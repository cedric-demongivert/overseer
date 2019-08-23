import { ArrayPack } from '@cedric-demongivert/gl-tool-collection'

import { OverseerSystem } from '../OverseerSystem'
import { MouseSourceSystem } from './MouseSourceSystem'
import { MouseLocationBuffer } from './MouseLocationBuffer'

const DEFAULT_BUFFER_SIZE = 30
const EMPTY_LOCATION = new MouseLocationBuffer(DEFAULT_BUFFER_SIZE)

export class MouseManagementSystem extends OverseerSystem {
  /**
  * Return true if the given system is a mouse management system.
  *
  * @param {@cedric-demongivert/gl-tool-ecs/System} system - A system to check.
  *
  * @return {boolean} True if the given system is a mouse management system.
  */
  static is (system) {
    return system instanceof MouseManagementSystem
  }

  /**
  * Instantiate a new mouse management system.
  */
  constructor () {
    super()

    this._sources = new Set()
    this._locations = new ArrayPack(10)
  }

  /**
  * @return {Collection<MouseSource>} All sources known by this manager.
  */
  get sources () {
    return this._sources
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System#initialize
  */
  initialize () {
    super.initialize()

    const systems = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system = systems.get(index)

      if (MouseSourceSystem.is(system)) {
        this.handleSourceAddition(system)
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

      if (MouseSourceSystem.is(system)) {
        this.handleSourceDeletion(system)
      }
    }
  }

  /**
  * Return the location buffer of a given mouse.
  *
  * @param {number} [identifier = 0] - The identifier of a mouse.
  *
  * @return {MouseLocationBuffer} The location buffer of the given mouse.
  */
  location (identifier = 0) {
    return this._locations.get(identifier) || EMPTY_LOCATION
  }

  /**
  * Return the x location of a given mouse in screen space.
  *
  * @param {number} [identifier = 0] - The identifier of a mouse.
  * @param {number} [index = 0] - Index of the event to get, from the newest to the oldest.
  *
  * @return {number} The x location in screen space of the given mouse if any.
  */
  x (identifier = 0, index = 0) {
    const locations = this.location(identifier)

    if (locations.size > 0) {
      return locations.x(index)
    } else {
      return undefined
    }
  }

  /**
  * Return the y location of a given mouse in screen space.
  *
  * @param {number} [identifier = 0] - The identifier of a mouse.
  * @param {number} [index = 0] - Index of the event to get, from the newest to the oldest.
  *
  * @return {number} The y location in screen space of the given mouse if any.
  */
  y (identifier = 0, index = 0) {
    const locations = this.location(identifier)

    if (locations.size > 0) {
      return locations.y(index)
    } else {
      return undefined
    }
  }

  handleSourceAddition (source) {
    this._sources.add(source)
  }

  handleSourceDeletion (source) {
    this._sources.delete(source)
  }

  /**
  * Handle and store a mouse moving event.
  *
  * @param {number} mouse - Identifier of the mouse that moved.
  * @param {number} timestamp - Timestamp of the move event.
  * @param {number} x - X location of the mouse in screen space.
  * @param {number} y - Y location of the mouse in screen space.
  */
  handleMove (mouse, timestamp, x, y) {
    if (this._locations.get(mouse) == null) {
      this._locations.set(mouse, new MouseLocationBuffer(DEFAULT_BUFFER_SIZE))
    }

    this._locations.get(mouse).push(timestamp, x, y)
  }

  handleDown (mouse, timestamp) {

  }

  handleUp (mouse, timestamp) {

  }

  handleMouseClick (mouse, timestamp) {

  }

  handleWheel (mouse, timestamp) {

  }
}
