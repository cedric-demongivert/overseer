/**
* A generic vertex buffer.
*/
export class VertexBuffer {
  /**
  * Create a new empty vertex buffer with an initial capacity.
  *
  * @param {VertexFormat} format - Format to use for the buffer.
  * @param {number} [capacity = 16] - Initial capacity of the buffer.
  */
  constructor (format, capacity = 16) {
    this._format = format
    this._buffer = new Uint8Array(this._format.size * capacity)
    this._view = new DataView(this._buffer.buffer)
    this._size = 0
  }

  /**
  * Create a new empty vertex buffer with an initial capacity.
  *
  * @param {VertexFormat} format - Format of the vertex buffer to create.
  * @param {number} [capacity = 16] - Initial capacity of the created buffer.
  *
  * @return {VertexBuffer} The created buffer.
  */
  static empty (format, capacity = 16) {
    return new VertexBuffer(format, capacity)
  }

  /**
  * Create a clone of another vertex buffer.
  *
  * @param {VertexBuffer} toClone - The vertex buffer instance to clone.
  *
  * @return {VertexBuffer} A clone of the given instance.
  */
  static clone (toClone) {
    if (toClone == null) {
      throw new Error('Trying to clone a null vertex buffer.')
    }

    const clone = new VertexBuffer(toClone.format, toClone.capacity)
    clone._buffer.set(toClone._buffer, 0)
    clone._size = toClone.size
    return clone
  }

  /**
  * @return {VertexFormat} The format of this buffer.
  */
  get format () {
    return this._format
  }

  /**
  * @return {ArrayBuffer} The raw buffer behind this vertex buffer.
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
    return this._buffer.length / this._format.size
  }

  /**
  * @param {number} capacity - The new capacity of the buffer.
  */
  set capacity (capacity) {
    if (capacity < 0) {
      throw new Error('A VertexBuffer capacity can\'t be negative.')
    }

    const byteCapacity = capacity * this._format.size

    if (byteCapacity > this._buffer.length) {
      const next = new Uint8Array(byteCapacity)
      next.set(this._buffer, 0)
      this._buffer = next
      this._view = new DataView(this._buffer.buffer)
    } else if (byteCapacity < this._buffer.length) {
      const next = new Uint8Array(byteCapacity)
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
      throw new Error('A VertexBuffer size can\'t be negative.')
    }

    if (newSize > this._size) {
      if (newSize > this._buffer.length / this._format.size) {
        const byteCapacity = newSize * this._format.size
        const next = new Uint8Array(byteCapacity)
        next.set(this._buffer, 0)
        this._buffer = next
        this._view = new DataView(this._buffer.buffer)
      }
      this._buffer.fill(
        0, this._size * this._format.size, newSize * this._format.size
      )
    }

    this._size = newSize
  }

  /**
  * Push vertex data into this vertex buffer.
  *
  * @param {...object} data - Vertex data to push into this vertex buffer.
  *
  * @return {VertexBuffer} This vertex buffer for chaining purpose.
  */
  push (...data) {
    this.size += data.length
    for (let index = 0; index < data.length; ++index) {
      this._format.fill(
        this._view,
        this._size - data.length + index,
        data[index]
      )
    }
    return this
  }

  /**
  * Set data of some vertice of this vertex buffer.
  *
  * @param {number} index - Index of the first vertex to update.
  * @param {string} [name] - Name of a field to set.
  * @param {...object|...any} data - Data to set.
  *
  * @return {VertexBuffer} This vertex buffer for chaining purpose.
  */
  set (index, ...data) {
    if (typeof data[0] === 'string') {
      const [field, ...values] = data
      if (index + values.length > this._size) this.size = index + values.length

      for (let i = 0; i < values.length; ++i) {
        this._format.set(this._view, index + i, field, values[i])
      }

      return this
    } else {
      if (index + data.length > this._size) this.size = index + data.length

      for (let i = 0; i < data.length; ++i) {
        this._format.fill(this._view, index + i, data[i])
      }

      return this
    }
  }

  /**
  * Concat this buffer with anothers into a new vertex buffer and return the result.
  *
  * @param {...VertexBuffer} others - Buffers to concat.
  *
  * @return {VertexBuffer} A new instance with the result of the concatenation.
  */
  concat (...others) {
    return this.clone().concatIn(...others)
  }

  /**
  * Same as concat, but instead of creating a new buffer for the concatenation, it prefer to directly change the current buffer.
  *
  * @param {...VertexBuffer} others - Buffers to concat.
  *
  * @return {VertexBuffer} The current instance for chaining purpose.
  */
  concatIn (...others) {
    const nextCapacity = this._size + others.reduce((a, b) => a + b.size, 0)
    if (nextCapacity > this.capacity) this.capacity = nextCapacity
    const entrySize = this._format.size

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
  * @return {VertexBuffer} The current buffer instance for chaining purpose.
  */
  copyWithin (target, start = 0, end = this._size) {
    let ftarget = target >> 0
    let fstart = start >> 0
    let fend = end >> 0

    const size = this._size
    fstart = (fstart < 0) ? Math.max(fstart + size, 0) : Math.min(fstart, size)
    fend = (fend < 0) ? Math.max(fend + size, 0) : Math.min(fend, size)
    ftarget = (ftarget < 0) ? Math.max(ftarget + size, 0) : Math.min(ftarget, size)

    const entrySize = this._format.size
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
  * @return {Iterator<[number, object]>}
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
  * Return all stored data of a vertex, or the value of a field of a vertex.
  *
  * @param {number} index - Index of the vertex to get.
  * @param {string} [name] - Name of the field to get.
  *
  * @return {object|any} All the stored data for the vertex, or the value of the name field.
  */
  get (index, name) {
    return this._format.get(this._view, index, name)
  }

  /**
  * Apply a map operation on this buffer.
  *
  * @param {function (value : object, index : number, buffer : VertexBuffer)} mapper - Mapper.
  * @param {any} thisArg - Object to use as context of the callback.
  *
  * @return {VertexBuffer} The current buffer for chaining purpose.
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
  * @param {function (aggregator : any, current : object, index : number, buffer : VertexBuffer)} reducer - Reducer.
  * @param {any} initialValue - Initial value to use.
  *
  * @return {VertexBuffer} The current buffer for chaining purpose.
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
  * @return {VertexBuffer} The current buffer for chaining purpose.
  */
  delete (index, count = 1) {
    this._buffer.copyWithin(
      index * this._format.size,
      (index + count) * this._format.size,
      this._buffer.length
    )

    this.size -= count

    return this
  }

  /**
  * Check if this buffer is similar to another (have same size, and equal content).
  *
  * @param {VertexBuffer} other - Other buffer to compare.
  *
  * @return {boolean} True if both buffer are similar.
  */
  equals (other) {
    if (other === this) return true
    if (other == null) return false

    if (other.size === this.size && other.format.equals(this.format)) {
      const thisBuffer = this._buffer
      const otherBuffer = other._buffer

      for (let i = 0; i < this._format.size * this._size; ++i) {
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
  * Clone the current vertex buffer and return the result.
  *
  * @return {VertexBuffer} A clone of the current vertex buffer.
  */
  clone () {
    return VertexBuffer.clone(this)
  }

  /**
  * Clear this buffer.
  * @return {VertexBuffer} The current buffer for chaining purpose.
  */
  clear () {
    this.size = 0
    return this
  }
}
