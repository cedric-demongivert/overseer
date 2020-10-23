import { CircularBuffer } from '@cedric-demongivert/gl-tool-collection'
import { bissect } from '@cedric-demongivert/gl-tool-collection'

import { MouseSourceSystem } from './MouseSourceSystem'

export class MouseLocationBuffer {
  private readonly _x : CircularBuffer<number>
  private readonly _y : CircularBuffer<number>
  private readonly _timestamps : CircularBuffer<number>
  private readonly _sources : CircularBuffer<MouseSourceSystem>

  /**
  * Instantiate a new mouse location buffer.
  *
  * @param capacity - The capacity of the buffer to allocate.
  */
  public constructor (capacity : number) {
    this._x = CircularBuffer.float32(capacity)
    this._y = CircularBuffer.float32(capacity)
    this._timestamps = CircularBuffer.uint32(capacity)
    this._sources = CircularBuffer.any(capacity)
  }

  /**
  * @return The current capacity of this buffer.
  */
  public get capacity () : number {
    return this._x.capacity
  }

  /**
  * @return The number of locations stored into this buffer.
  */
  public get size () : number {
    return this._x.size
  }

  /**
  * Reallocate this buffer in order to increase or decrease is capacity.
  *
  * @param capacity - The new capacity of this buffer.
  */
  public reallocate (capacity : number) : void {
    this._x.reallocate(capacity)
    this._y.reallocate(capacity)
    this._timestamps.reallocate(capacity)
    this._sources.reallocate(capacity)
  }

  /**
  * Fit this buffer capacity to its size.
  */
  public fit () : void {
    this._x.fit()
    this._y.fit()
    this._timestamps.fit()
    this._sources.fit()
  }

  /**
  * Push a location into this buffer.
  *
  * @param source - Source of the information.
  * @param timestamp - Timestamp of the location.
  * @param x - X location of the mouse in screen space.
  * @param y - Y location of the mouse in screen space.
  */
  public push (source : MouseSourceSystem, timestamp : number, x : number, y : number) : void {
    if (this._timestamps.size <= 0 || timestamp >= this._timestamps.get(0)) {
      const index = bissect(this._timestamps, timestamp)

      if (index >= 0) {
        this._timestamps.set(index, timestamp)
        this._x.set(index, x)
        this._y.set(index, y)
        this._sources.set(index, source)
      } else {
        const insertionIndex = - index - 1
        this._timestamps.insert(insertionIndex, timestamp)
        this._x.insert(insertionIndex, x)
        this._y.insert(insertionIndex, y)
        this._sources.insert(insertionIndex, source)
      }
    }
  }

  public source (index : number) : MouseSourceSystem {
    return this._sources.get(this._sources.size - index - 1)
  }

  /**
  * Return an x location stored into this buffer from the newest to the oldest.
  *
  * @param index - Index of the x location to get.
  *
  * @return The ith x location stored into this buffer from the newest to the oldest.
  */
  public x (index : number) : number {
    return this._x.get(this._x.size - index - 1)
  }

  /**
  * Return an y location stored into this buffer from the newest to the oldest.
  *
  * @param index - Index of the y location to get.
  *
  * @return The ith y location stored into this buffer from the newest to the oldest.
  */
  public y (index : number) : number {
    return this._y.get(this._y.size - index - 1)
  }

  /**
  * Return the timestamp of a location stored into this buffer from the newest to the oldest.
  *
  * @param index - Index of the timestamp to get.
  *
  * @return The ith timestamp of a location stored into this buffer from the newest to the oldest.
  */
  public timestamp (index : number) : number {
    return this._timestamps.get(this._timestamps.size - index - 1)
  }

  /**
  * Clear this buffer.
  */
  public clear () : void {
    this._x.clear()
    this._y.clear()
    this._timestamps.clear()
    this._sources.clear()
  }
}
