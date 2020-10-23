import { Pack } from '@cedric-demongivert/gl-tool-collection'
import { Sequence } from '@cedric-demongivert/gl-tool-collection'
import { System } from '@cedric-demongivert/gl-tool-ecs'

import { OverseerSystem } from '../OverseerSystem'

import { MouseSourceSystem } from './MouseSourceSystem'
import { MouseLocationBuffer } from './MouseLocationBuffer'
import { MouseStateBuffer } from './MouseStateBuffer'

import { MouseButton } from './MouseButton'

const DEFAULT_BUFFER_SIZE : number = 30
const EMPTY_LOCATION : MouseLocationBuffer = new MouseLocationBuffer(DEFAULT_BUFFER_SIZE)
const EMPTY_STATES : MouseStateBuffer = new MouseStateBuffer(DEFAULT_BUFFER_SIZE)

export class MouseManagementSystem extends OverseerSystem {
  private _sources : Set<MouseSourceSystem>
  private _locations : Pack<MouseLocationBuffer>
  private _states : Pack<MouseStateBuffer>

  /**
  * Instantiate a new mouse management system.
  */
  public constructor (capacity : number = 10) {
    super()

    this._sources = new Set()
    this._locations = Pack.any(capacity)
    this._states = Pack.any(capacity)
  }

  /**
  * @return All sources known by this manager.
  */
  public get sources () : Set<MouseSourceSystem> {
    return this._sources
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System.initialize
  */
  public initialize () : void {
    super.initialize()

    const systems : Sequence<System> = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system : System = systems.get(index)

      if (MouseSourceSystem.is(system)) {
        this.handleSourceAddition(system as MouseSourceSystem)
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

      if (MouseSourceSystem.is(system)) {
        this.handleSourceDeletion(system as MouseSourceSystem)
      }
    }
  }

  /**
  * Return the state buffer of a given mouse.
  *
  * @param [identifier = 0] - The identifier of a mouse.
  *
  * @return The state buffer of the given mouse.
  */
  public states (identifier : number = 0) : MouseStateBuffer {
    return this._states.get(identifier) || EMPTY_STATES
  }

  public state (identifier : number = 0, index : number = 0) : number {
    const states : MouseStateBuffer = this.states(identifier)

    if (states.size > 0) {
      return states.state(index)
    } else {
      return 0
    }
  }

  /**
  * Return true if the given button is up.
  *
  * @param button - Button to check.
  * @param [identifier = 0] - The identifier of a mouse.
  * @param [index = 0] - Index of the state to use, from the newest to the oldest.
  *
  * @return True if the given button is up at the given state.
  */
  public isUp (button : MouseButton, identifier : number = 0, index : number = 0) : boolean {
    const states : MouseStateBuffer = this.states(identifier)

    if (states.size > 0) {
      return states.isUp(button, index)
    } else {
      return false
    }
  }

  /**
  * Return true if the given button is down.
  *
  * @param button - Button to check.
  * @param [identifier = 0] - The identifier of a mouse.
  * @param [index = 0] - Index of the state to use, from the newest to the oldest.
  *
  * @return True if the given button is down at the given state.
  */
  public isDown (button : MouseButton, identifier : number = 0, index : number = 0) : boolean {
    const states : MouseStateBuffer = this.states(identifier)

    if (states.size > 0) {
      return states.isDown(button, index)
    } else {
      return false
    }
  }

  /**
  * Return the location buffer of a given mouse.
  *
  * @param [identifier = 0] - The identifier of a mouse.
  *
  * @return The location buffer of the given mouse.
  */
  public location (identifier : number = 0) : MouseLocationBuffer {
    return this._locations.get(identifier) || EMPTY_LOCATION
  }

  /**
  * Return the x location of a given mouse in world space.
  *
  * @param [identifier = 0] - The identifier of a mouse.
  * @param [index = 0] - Index of the event to get, from the newest to the oldest.
  *
  * @return The x location in world space of the given mouse if any.
  */
  public x (identifier : number = 0, index : number = 0) : number {
    const locations : MouseLocationBuffer = this.location(identifier)

    if (locations.size > 0) {
      return locations.x(index)
    } else {
      return undefined
    }
  }

  /**
  * Return the y location of a given mouse in screen space.
  *
  * @param [identifier = 0] - The identifier of a mouse.
  * @param [index = 0] - Index of the event to get, from the newest to the oldest.
  *
  * @return The y location in world space of the given mouse if any.
  */
  public y (identifier : number = 0, index : number = 0) : number {
    const locations : MouseLocationBuffer = this.location(identifier)

    if (locations.size > 0) {
      return locations.y(index)
    } else {
      return undefined
    }
  }

  /**
  * Handle the discovering of a new mouse source.
  *
  * @param source - A discovered mouse source system.
  */
  public handleSourceAddition (source : MouseSourceSystem) {
    this._sources.add(source)
  }

  /**
  * Handle the disparition of an existing mouse source system.
  *
  * @param source - A discovered mouse source system.
  */
  public handleSourceDeletion (source : MouseSourceSystem) {
    this._sources.delete(source)
  }

  /**
  * Handle and store a mouse moving event.
  *
  * @param source - Source of the event.
  * @param timestamp - Timestamp of the move event.
  * @param x - Absissa location of the mouse in screen space.
  * @param y - Ordinate location of the mouse in screen space.
  */
  public handleMove (source : MouseSourceSystem, timestamp : number, x : number, y : number) : void {
    if (this._locations.get(source.identifier) == null) {
      this._locations.set(source.identifier, new MouseLocationBuffer(DEFAULT_BUFFER_SIZE))
    }

    this._locations.get(source.identifier).push(source, timestamp, x, y)
  }

  /**
  * Handle and store a mouse state event.
  *
  * @param source - Source of the event.
  * @param timestamp - Timestamp of the move event.
  * @param state - Buttons that are down.
  */
  public handleState (source : MouseSourceSystem, timestamp : number, state : number) : void {
    if (this._states.get(source.identifier) == null) {
      this._states.set(source.identifier, new MouseStateBuffer(DEFAULT_BUFFER_SIZE))
    }

    this._states.get(source.identifier).push(source, timestamp, state)
  }

  public handleWheel (mouse : number, timestamp : number) : void {

  }
}

export namespace MouseManagementSystem {
  /**
  * Return true if the given system is a mouse management system.
  *
  * @param system - A system to check.
  *
  * @return True if the given system is a mouse management system.
  */
  export function is (system : System) : boolean {
    return system instanceof MouseManagementSystem
  }
}
