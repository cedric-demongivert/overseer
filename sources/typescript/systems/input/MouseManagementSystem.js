import { Packs } from '@cedric-demongivert/gl-tool-collection'

import { OverseerSystem } from '../OverseerSystem'
import { MouseSourceSystem } from './MouseSourceSystem'
import { MouseLocationBuffer } from './MouseLocationBuffer'
import { MouseStateBuffer } from './MouseStateBuffer'

const DEFAULT_BUFFER_SIZE = 30
const EMPTY_LOCATION = new MouseLocationBuffer(DEFAULT_BUFFER_SIZE)
const EMPTY_STATES = new MouseStateBuffer(DEFAULT_BUFFER_SIZE)

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
    this._locations = Packs.any(10)
    this._states = Packs.any(10)
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
  * Return the state buffer of a given mouse.
  *
  * @param {number} [identifier = 0] - The identifier of a mouse.
  *
  * @return {MouseStateBuffer} The state buffer of the given mouse.
  */
  states (identifier = 0) {
    return this._states.get(identifier) || EMPTY_STATES
  }

  state (identifier = 0, index = 0) {
    const states = this.states(identifier)

    if (states.size > 0) {
      return states.get(index)
    } else {
      return 0
    }
  }

  /**
  * Return true if the given button is up.
  *
  * @param {MouseButton} button - Button to check.
  * @param {number} [identifier = 0] - The identifier of a mouse.
  * @param {number} [index = 0] - Index of the state to use, from the newest to the oldest.
  *
  * @return {number} True if the given button is up at the given state.
  */
  isUp (button, identifier = 0, index = 0) {
    const states = this.states(identifier)

    if (states.size > 0) {
      return states.isUp(button, index)
    } else {
      return false
    }
  }

  /**
  * Return true if the given button is down.
  *
  * @param {MouseButton} button - Button to check.
  * @param {number} [identifier = 0] - The identifier of a mouse.
  * @param {number} [index = 0] - Index of the state to use, from the newest to the oldest.
  *
  * @return {number} True if the given button is down at the given state.
  */
  isDown (button, identifier = 0, index = 0) {
    const states = this.states(identifier)

    if (states.size > 0) {
      return states.isDown(button, index)
    } else {
      return false
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

  viewport (identifier = 0, index = 0) {
    const locations = this.location(identifier)

    if (locations.size > 0) {
      return locations.viewport(index)
    } else {
      return undefined
    }
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

  worldX (identifier = 0, index = 0) {
    const locations = this.location(identifier)

    if (locations.size > 0) {
      return locations.viewport(index).camera.viewToWorld.computeXComponentOfMultiplicationWithVector(
        locations.x(index), locations.y(index), 0, 1
      )
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

  worldY (identifier = 0, index = 0) {
    const locations = this.location(identifier)

    if (locations.size > 0) {
      return locations.viewport(index).camera.viewToWorld.computeYComponentOfMultiplicationWithVector(
        locations.x(index), locations.y(index), 0, 1
      )
    } else {
      return undefined
    }
  }

  /**
  * Handle the discovering of a new mouse source.
  *
  * @param {MouseSource} source - A discovered mouse source system.
  */
  handleSourceAddition (source) {
    this._sources.add(source)
  }

  /**
  * Handle the disparition of an existing mouse source system.
  *
  * @param {MouseSource} source - A discovered mouse source system.
  */
  handleSourceDeletion (source) {
    this._sources.delete(source)
  }

  /**
  * Handle and store a mouse moving event.
  *
  * @param {number} mouse - Identifier of the mouse that moved.
  * @param {number} timestamp - Timestamp of the move event.
  * @param {Viewport} viewport - Active viewport.
  * @param {number} x - Absissa location of the mouse in screen space.
  * @param {number} y - Ordinate location of the mouse in screen space.
  */
  handleMove (mouse, timestamp, viewport, x, y) {
    if (this._locations.get(mouse) == null) {
      this._locations.set(mouse, new MouseLocationBuffer(DEFAULT_BUFFER_SIZE))
    }

    this._locations.get(mouse).push(timestamp, viewport, x, y)
  }

  /**
  * Handle and store a mouse state event.
  *
  * @param {number} mouse - Identifier of the mouse that moved.
  * @param {number} timestamp - Timestamp of the move event.
  * @param {number} state - Buttons that are down.
  */
  handleState (mouse, timestamp, state) {
    if (this._states.get(mouse) == null) {
      this._states.set(mouse, new MouseStateBuffer(DEFAULT_BUFFER_SIZE))
    }

    this._states.get(mouse).push(timestamp, state)
  }

  handleWheel (mouse, timestamp) {

  }
}
