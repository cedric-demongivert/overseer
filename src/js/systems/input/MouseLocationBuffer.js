import { Packs } from '@cedric-demongivert/gl-tool-collection'
import { bissect } from '@cedric-demongivert/gl-tool-collection'

export class MouseLocationBuffer {
  /**
  * Instantiate a new mouse location buffer.
  *
  * @param {number} capacity - The capacity of the buffer to allocate.
  */
  constructor (capacity) {
    this._offset = 0
    this._size = 0

    this._x = Packs.circular(Packs.float32(capacity))
    this._y = Packs.circular(Packs.float32(capacity))
    this._viewports = Packs.circular(Packs.any(capacity))
    this._timestamps = Packs.circular(Packs.uint32(capacity))
  }

  /**
  * @return {number} The current capacity of this buffer.
  */
  get capacity () {
    return this._x.capacity
  }

  /**
  * @return {number} The number of locations stored into this buffer.
  */
  get size () {
    return this._x.size
  }

  /**
  * Reallocate this buffer in order to increase or decrease is capacity.
  *
  * @param {number} capacity - The new capacity of this buffer.
  */
  reallocate (capacity) {
    this._x.reallocate(capacity)
    this._y.reallocate(capacity)
    this._timestamps.reallocate(capacity)
  }

  /**
  * Fit this buffer capacity to its size.
  */
  fit () {
    this._x.fit()
    this._y.fit()
    this._timestamps.fit()
  }

  /**
  * Push a location into this buffer.
  *
  * @param {number} timestamp - Timestamp of the location.
  * @param {Viewport} viewport - The active viewport.
  * @param {number} x - X location of the mouse in screen space.
  * @param {number} y - Y location of the mouse in screen space.
  */
  push (timestamp, viewport, x, y) {
    if (this._timestamps.size <= 0 || timestamp >= this._timestamps.get(0)) {
      const index = bissect(this._timestamps, timestamp)

      if (index >= 0) {
        this._timestamps.set(index, timestamp)
        this._viewports.set(index, viewport)
        this._x.set(index, x)
        this._y.set(index, y)
      } else {
        const insertionIndex = - index - 1
        this._timestamps.insert(insertionIndex, timestamp)
        this._viewports.set(insertionIndex, viewport)
        this._x.insert(insertionIndex, x)
        this._y.insert(insertionIndex, y)
      }
    }
  }

  viewport (index) {
    return this._viewports.get(this._viewports.size - index - 1)
  }

  /**
  * Return an x location stored into this buffer from the newest to the oldest.
  *
  * @param {number} index - Index of the x location to get.
  *
  * @return {number} The ith x location stored into this buffer from the newest to the oldest.
  */
  x (index) {
    return this._x.get(this._x.size - index - 1)
  }

  /**
  * Return an y location stored into this buffer from the newest to the oldest.
  *
  * @param {number} index - Index of the y location to get.
  *
  * @return {number} The ith y location stored into this buffer from the newest to the oldest.
  */
  y (index) {
    return this._y.get(this._y.size - index - 1)
  }

  /**
  * Return the timestamp of a location stored into this buffer from the newest to the oldest.
  *
  * @param {number} index - Index of the timestamp to get.
  *
  * @return {number} The ith timestamp of a location stored into this buffer from the newest to the oldest.
  */
  timestamp (index) {
    return this._timestamps.get(this._timestamps.size - index - 1)
  }

  /**
  * Clear this buffer.
  */
  clear () {
    this._x.clear()
    this._y.clear()
    this._viewports.clear()
    this._timestamps.clear()
  }
}
