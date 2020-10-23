import { CircularBuffer } from '@cedric-demongivert/gl-tool-collection'
import { bissect } from '@cedric-demongivert/gl-tool-collection'

import { MouseButton } from './MouseButton'
import { MouseSourceSystem } from './MouseSourceSystem'

export class MouseStateBuffer {
  private _sources    : CircularBuffer<MouseSourceSystem>
  private _states     : CircularBuffer<MouseButton>
  private _timestamps : CircularBuffer<number>

  /**
  * Instantiate a new mouse state buffer.
  *
  * @param capacity - The capacity of the buffer to allocate.
  */
  public constructor (capacity : number) {
    this._sources    = CircularBuffer.any(capacity)
    this._states     = CircularBuffer.uint16(capacity)
    this._timestamps = CircularBuffer.uint32(capacity)
  }

  /**
  * @return The current capacity of this buffer.
  */
  public get capacity () : number {
    return this._states.capacity
  }

  /**
  * @return The number of locations stored into this buffer.
  */
  public get size () : number {
    return this._states.size
  }

  /**
  * Reallocate this buffer in order to increase or decrease is capacity.
  *
  * @param capacity - The new capacity of this buffer.
  */
  public reallocate (capacity : number) : void {
    this._sources.reallocate(capacity)
    this._states.reallocate(capacity)
    this._timestamps.reallocate(capacity)
  }

  /**
  * Fit this buffer capacity to its size.
  */
  public fit () : void {
    this._sources.fit()
    this._states.fit()
    this._timestamps.fit()
  }

  /**
  * Push a state into this buffer.
  *
  * @param source - Source of the event.
  * @param timestamp - Timestamp of the state.
  * @param state - The state to push.
  */
  public push (source : MouseSourceSystem, timestamp : number, state : MouseButton) : void {
    if (this._timestamps.size <= 0 || timestamp >= this._timestamps.get(0)) {
      const index = bissect(this._timestamps, timestamp)

      if (index >= 0) {
        this._timestamps.set(index, timestamp)
        this._states.set(index, state)
        this._sources.set(index, source)
      } else {
        const insertionIndex = - index - 1
        this._timestamps.insert(insertionIndex, timestamp)
        this._states.insert(insertionIndex, state)
        this._sources.insert(insertionIndex, source)
      }
    }
  }

  public source (index : number) : MouseSourceSystem {
    return this._sources.get(this._sources.size - index - 1)
  }

  /**
  * Return a state stored into this buffer from the newest to the oldest.
  *
  * @param index - Index of the state to get.
  *
  * @return The ith state stored into this buffer from the newest to the oldest.
  */
  public state (index : number) : MouseButton {
    return this._states.get(this._states.size - index - 1)
  }

  /**
  * Return true if the given button is up.
  *
  * @param button - Button to check.
  * @param [index = 0] - Index of the state to use, from the newest to the oldest.
  *
  * @return True if the given button is up at the given state.
  */
  public isUp (button : MouseButton, index : number = 0) : boolean {
    return (this._states.get(this._states.size - index - 1) & button) === 0
  }

  /**
  * Return true if the given button is down.
  *
  * @param button - Button to check.
  * @param [index = 0] - Index of the state to use, from the newest to the oldest.
  *
  * @return True if the given button is down at the given state.
  */
  public isDown (button : MouseButton, index : number = 0) : boolean {
    return (this._states.get(this._states.size - index - 1) & button) === button
  }

  /**
  * Return the timestamp of a state stored into this buffer from the newest to the oldest.
  *
  * @param index - Index of the timestamp to get.
  *
  * @return The ith timestamp of a state stored into this buffer from the newest to the oldest.
  */
  public timestamp (index : number) : number {
    return this._timestamps.get(this._timestamps.size - index - 1)
  }

  /**
  * Clear this buffer.
  */
  public clear () : void {
    this._states.clear()
    this._timestamps.clear()
    this._sources.clear()
  }
}
