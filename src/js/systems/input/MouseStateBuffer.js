import { Packs } from '@cedric-demongivert/gl-tool-collection'
import { bissect } from '@cedric-demongivert/gl-tool-collection'

export class MouseStateBuffer {
  /**
  * Instantiate a new mouse state buffer.
  *
  * @param {number} capacity - The capacity of the buffer to allocate.
  */
  constructor (capacity) {
    this._offset = 0
    this._size = 0

    this._states = Packs.circular(Packs.uint16(capacity))
    this._timestamps = Packs.circular(Packs.uint32(capacity))
  }

  /**
  * @return {number} The current capacity of this buffer.
  */
  get capacity () {
    return this._states.capacity
  }

  /**
  * @return {number} The number of locations stored into this buffer.
  */
  get size () {
    return this._states.size
  }

  /**
  * Reallocate this buffer in order to increase or decrease is capacity.
  *
  * @param {number} capacity - The new capacity of this buffer.
  */
  reallocate (capacity) {
    this._states.reallocate(capacity)
    this._timestamps.reallocate(capacity)
  }

  /**
  * Fit this buffer capacity to its size.
  */
  fit () {
    this._states.fit()
    this._timestamps.fit()
  }

  /**
  * Push a state into this buffer.
  *
  * @param {number} timestamp - Timestamp of the state.
  * @param {number} state - The state to push.
  */
  push (timestamp, state) {
    if (this._timestamps.size <= 0 || timestamp >= this._timestamps.get(0)) {
      const index = bissect(this._timestamps, timestamp)

      if (index >= 0) {
        this._timestamps.set(index, timestamp)
        this._states.set(index, state)
      } else {
        const insertionIndex = - index - 1
        this._timestamps.insert(insertionIndex, timestamp)
        this._states.insert(insertionIndex, state)
      }
    }
  }

  /**
  * Return a state stored into this buffer from the newest to the oldest.
  *
  * @param {number} index - Index of the state to get.
  *
  * @return {number} The ith state stored into this buffer from the newest to the oldest.
  */
  state (index) {
    return this._states.get(this._states.size - index - 1)
  }

  /**
  * Return true if the given button is up.
  *
  * @param {MouseButton} button - Button to check.
  * @param {number} [index = 0] - Index of the state to use, from the newest to the oldest.
  *
  * @return {number} True if the given button is up at the given state.
  */
  isUp (button, index = 0) {
    return (this._states.get(this._states.size - index - 1) & button) === 0
  }

  /**
  * Return true if the given button is down.
  *
  * @param {MouseButton} button - Button to check.
  * @param {number} [index = 0] - Index of the state to use, from the newest to the oldest.
  *
  * @return {number} True if the given button is down at the given state.
  */
  isDown (button, index = 0) {
    return (this._states.get(this._states.size - index - 1) & button) === button
  }

  /**
  * Return the timestamp of a state stored into this buffer from the newest to the oldest.
  *
  * @param {number} index - Index of the timestamp to get.
  *
  * @return {number} The ith timestamp of a state stored into this buffer from the newest to the oldest.
  */
  timestamp (index) {
    return this._timestamps.get(this._timestamps.size - index - 1)
  }

  /**
  * Clear this buffer.
  */
  clear () {
    this._states.clear()
    this._timestamps.clear()
  }
}
