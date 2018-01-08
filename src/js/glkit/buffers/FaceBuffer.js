/**
* A generic face buffer.
*/
export class FaceBuffer {
  /**
  * Create a new empty face buffer with an initial capacity.
  *
  * @param {number} [capacity = 16] - Initial capacity of the buffer.
  */
  constructor (capacity = 16) {
    this._buffer = new Uint16Array(capacity * 3)
    this._size = 0
  }

  /**
  * Create a new empty face buffer with an initial capacity.
  *
  * @param {number} [capacity = 16] - Initial capacity of the created buffer.
  *
  * @return {FaceBuffer} The created buffer.
  */
  static empty (capacity = 16) {
    return new FaceBuffer(capacity)
  }

  /**
  * Create a clone of another face buffer.
  *
  * @param {FaceBuffer} toClone - The face buffer instance to clone.
  *
  * @return {FaceBuffer} A clone of the given instance.
  */
  static clone (toClone) {
    if (toClone == null) {
      throw new Error('Trying to clone a null face buffer.')
    }

    const clone = new FaceBuffer(toClone.capacity)
    clone._buffer.set(toClone._buffer, 0)
    clone._size = toClone.size
    return clone
  }

  /**
  * @return {ArrayBuffer} The raw buffer behind this face buffer.
  */
  get buffer () {
    return this._buffer.buffer
  }

  /**
  * Return the current capacity of the buffer.
  *
  * @return {number} The current capacity of the buffer.
  */
  get capacity () {
    return this._buffer.length / 3
  }

  /**
  * @param {number} capacity - The new capacity of the buffer.
  */
  set capacity (capacity) {
    if (capacity < 0) {
      throw new Error('A FaceBuffer capacity can\'t be negative.')
    }

    const byteCapacity = capacity * 3

    if (byteCapacity > this._buffer.length) {
      const next = new Uint16Array(byteCapacity)
      next.set(this._buffer, 0)
      this._buffer = next
      this._view = new DataView(this._buffer.buffer)
    } else if (byteCapacity < this._buffer.length) {
      const next = new Uint16Array(byteCapacity)
      next.set(this._buffer, 0)
      this._buffer = next
      if (this._size > capacity) this._size = capacity
      this._view = new DataView(this._buffer.buffer)
    }
  }

  /**
  * Return the number of elements in the buffer.
  *
  * @return {number} The number of elements in the buffer.
  */
  get size () {
    return this._size
  }

  /**
  * Change the current size of the buffer.
  *
  * @param {number} newSize - The new size of the buffer.
  */
  set size (newSize) {
    if (newSize < 0) {
      throw new Error('A FaceBuffer size can\'t be negative.')
    }

    if (newSize > this._size) {
      if (newSize > this._buffer.length / 3) {
        const byteCapacity = newSize * 3
        const next = new Uint16Array(byteCapacity)
        next.set(this._buffer, 0)
        this._buffer = next
        this._view = new DataView(this._buffer.buffer)
      }
      this._buffer.fill(
        0, this._size * 3, newSize * 3
      )
    }

    this._size = newSize
  }

  /**
  * Push face data into this buffer.
  *
  * @param {...number} faces - Face data to push into this face buffer.
  *
  * @return {FaceBuffer} This face buffer for chaining purpose.
  */
  push (...data) {
    const start = this._size * 3
    this.size += (data.length / 3) >> 0

    this._buffer.set(
      data.slice(0, data.length - (data.length % 3)),
      start
    )

    return this
  }

  /**
  * Set face data in this buffer.
  *
  * @param {number} index - Index of the first face to update.
  * @param {...number} faces - Face data to push into this face buffer.
  *
  * @return {FaceBuffer} This face buffer for chaining purpose.
  */
  set (index, ...data) {
    const faces = (data.length / 3) >> 0
    if (index + faces > this._size) this.size = index + faces

    this._buffer.set(data.slice(0, faces * 3), index * 3)

    return this
  }

  /**
  * Concat this buffer with anothers into a new face buffer and return the result.
  *
  * @param {...FaceBuffer} others - Buffers to concat.
  *
  * @return {FaceBuffer} A new instance with the result of the concatenation.
  */
  concat (...others) {
    return this.clone().concatIn(...others)
  }

  /**
  * Same as concat, but instead of creating a new buffer for the concatenation, it prefer to directly change the current buffer.
  *
  * @param {...FaceBuffer} others - Buffers to concat.
  *
  * @return {FaceBuffer} The current instance for chaining purpose.
  */
  concatIn (...others) {
    const nextCapacity = this._size + others.reduce((a, b) => a + b.size, 0)
    if (nextCapacity > this.capacity) this.capacity = nextCapacity
    const entrySize = 3

    for (const other of others) {
      this._buffer.set(
        other._buffer.slice(0, other.size * entrySize),
        this._size * entrySize
      )

      this._size += other.size
    }

    return this
  }

  /**
  * Copy some content within this buffer. It will not change the current buffer size.
  *
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/copyWithin
  *
  * @param {number} target
  * @param {number} start
  * @param {number} end
  *
  * @return {FaceBuffer} The current buffer instance for chaining purpose.
  */
  copyWithin (target, start = 0, end = this._size) {
    let ftarget = target >> 0
    let fstart = start >> 0
    let fend = end >> 0

    const size = this._size
    fstart = (fstart < 0) ? Math.max(fstart + size, 0) : Math.min(fstart, size)
    fend = (fend < 0) ? Math.max(fend + size, 0) : Math.min(fend, size)
    ftarget = (ftarget < 0) ? Math.max(ftarget + size, 0) : Math.min(ftarget, size)

    const entrySize = 3
    this._buffer.copyWithin(
      ftarget * entrySize,
      fstart * entrySize,
      fend * entrySize
    )

    return this
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/entries
  *
  * @return {Iterator<[number, [number, number, number]]>}
  */
  * entries () {
    for (let i = 0; i < this._size; ++i) {
      yield [i, this.get(i)]
    }
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/every
  */
  every (callback, thisArg) {
    for (const [index, value] of this.entries()) {
      if (!callback.call(thisArg, value, index, this)) {
        return false
      }
    }

    return true
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/fill
  */
  fill (value, start = 0, end = this._size) {
    start >>= 0
    end >>= 0

    const size = this._size
    const rstart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size)
    const rend = end < 0 ? Math.max(size + end, 0) : Math.min(end, size)

    let filled = 0

    while (rstart + filled < rend) {
      if (filled === 0) {
        this.set(rstart, value)
        filled += 1
      } else if (rstart + filled * 2 < rend) {
        this.copyWithin(rstart + filled, rstart, rstart + filled)
        filled += filled
      } else {
        this.copyWithin(rstart + filled, rstart, rend - filled)
        filled = rend
      }
    }

    return this
  }

  /**
  * Check if this buffer has an index.
  *
  * @param {number} index - Index to check.
  *
  * @return {boolean} True if the index exists in this buffer.
  */
  has (index) {
    return index >= 0 && index < this._size
  }

  /**
  * Return a face of the buffer.
  *
  * @param {number} index - Index of the face to get.
  *
  * @return {[number, number, number]} A face of this buffer.
  */
  get (index) {
    return [
      this._buffer.get(index * 3),
      this._buffer.get(index * 3 + 1),
      this._buffer.get(index * 3 + 2)
    ]
  }

  /**
  * Apply a map operation on this buffer.
  *
  * @param {function (value : [number, number, number], index : number, buffer : FaceBuffer)} mapper - Mapper.
  * @param {any} thisArg - Object to use as context of the callback.
  *
  * @return {FaceBuffer} The current buffer for chaining purpose.
  */
  map (mapper, thisArg) {
    const self = this.clone()

    for (let index = 0; index < this._size; ++index) {
      this.set(index, mapper.call(thisArg, this.get(index), index, self))
    }

    return this
  }

  /**
  * Apply a reduction operation on this buffer.
  *
  * @param {function (aggregator : any, current : [number, number, number], index : number, buffer : FaceBuffer)} reducer - Reducer.
  * @param {any} initialValue - Initial value to use.
  *
  * @return {FaceBuffer} The current buffer for chaining purpose.
  */
  reduce (reducer, initialValue) {
    let result = initialValue || this.get(0)

    for (
      let index = initialValue == null ? 1 : 0;
      index < this._size;
      ++index
    ) {
      result = reducer(result, this.get(index), index, this)
    }

    return result
  }

  /**
  * Delete one or multiple values from this buffer.
  *
  * @param {number} index - Index of the value to delete.
  * @param {number} [count = 1] - Count of value to delete.
  *
  * @return {FaceBuffer} The current buffer for chaining purpose.
  */
  delete (index, count = 1) {
    this._buffer.copyWithin(
      index * 3,
      (index + count) * 3,
      this._buffer.length
    )

    this.size -= count

    return this
  }

  /**
  * Check if this buffer is similar to another (have same size, and equal content).
  *
  * @param {FaceBuffer} other - Other buffer to compare.
  *
  * @return {boolean} True if both buffer are similar.
  */
  equals (other) {
    if (other === this) return true
    if (other == null) return false

    if (other instanceof FaceBuffer && other.size === this.size) {
      const thisBuffer = this._buffer
      const otherBuffer = other._buffer

      for (let i = 0; i < 3 * this._size; ++i) {
        if (otherBuffer[i] !== thisBuffer[i]) {
          return false
        }
      }

      return true
    } else {
      return false
    }
  }

  /**
  * Clone the current face buffer and return the result.
  *
  * @return {FaceBuffer} A clone of the current face buffer.
  */
  clone () {
    return FaceBuffer.clone(this)
  }

  /**
  * Clear this buffer.
  * @return {FaceBuffer} The current face buffer for chaining purpose.
  */
  clear () {
    this.size = 0
    return this
  }
}
