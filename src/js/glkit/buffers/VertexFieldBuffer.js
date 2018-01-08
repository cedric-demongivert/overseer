/**
* A generic vertex field buffer, based on an underlying field vertex buffer.
*/
export class VertexFieldBuffer {
  /**
  * Create a new field field vertex buffer over an existing field vertex buffer.
  *
  * @param {VertexFieldBuffer} buffer - The parent field vertex buffer.
  * @param {string} field - The field to expose.
  */
  constructor (buffer, field) {
    this._buffer = buffer
    this._field = field
  }

  /**
  * @return {VertexFieldBuffer} The parent field vertex buffer.
  */
  get vertexBuffer () {
    return this._buffer
  }

  /**
  * Return the current capacity of the buffer.
  *
  * @return {number} The current capacity of the buffer.
  */
  get capacity () {
    return this._buffer.capacity
  }

  /**
  * @param {number} capacity - The new capacity of the buffer.
  */
  set capacity (capacity) {
    this._buffer.capacity = capacity
  }

  /**
  * Return the number of elements in the buffer.
  *
  * @return {number} The number of elements in the buffer.
  */
  get size () {
    return this._buffer.size
  }

  /**
  * Change the current size of the buffer.
  *
  * @param {number} newSize - The new size of the buffer.
  */
  set size (newSize) {
    this._buffer.size = newSize
  }

  /**
  * Push vertex data into this buffer.
  *
  * @param {...any} data - Vertex data to push into this field vertex buffer.
  *
  * @return {VertexFieldBuffer} This buffer for chaining purpose.
  */
  push (...data) {
    for (let i = 0; i < data.length; ++i) {
      this._buffer.set(this.size, this._field, data[i])
    }
  }

  /**
  * Set data of some vertices of this field vertex buffer.
  *
  * @param {number} index - Index of the first vertex to update.
  * @param {...any} data - Data to set.
  *
  * @return {VertexFieldBuffer} This buffer for chaining purpose.
  */
  set (index, ...data) {
    for (let i = 0; i < data.length; ++i) {
      this._buffer.set(index + i, this._field, data[i])
    }
  }

  /**
  * Concat this buffer with anothers.
  *
  * @param {...VertexFieldBuffer} others - Buffers to concat.
  *
  * @return {VertexFieldBuffer} A new instance with the result of the concatenation.
  */
  concat (...others) {
    for (const other of others) {
      for (const entry of other.entries()) {
        this.push(entry)
      }
    }
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
  * @return {VertexFieldBuffer} The current buffer instance for chaining purpose.
  */
  copyWithin (target, start = 0, end = this._size) {
    let ftarget = target >> 0
    let fstart = start >> 0
    let fend = end >> 0

    const size = this._size
    fstart = (fstart < 0) ? Math.max(fstart + size, 0) : Math.min(fstart, size)
    fend = (fend < 0) ? Math.max(fend + size, 0) : Math.min(fend, size)
    ftarget = (ftarget < 0) ? Math.max(ftarget + size, 0) : Math.min(ftarget, size)

    for (let i = fstart; i < fend; ++i) {
      this.set(i, this.get(ftarget))
    }

    return this
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/entries
  *
  * @return {Iterator<[number, object]>}
  */
  * entries () {
    for (let i = 0; i < this.size; ++i) {
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

    for (let i = rstart; i < rend; ++i) {
      this.set(i, value)
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
    return this._buffer.has(index)
  }

  /**
  * Return field data of a vertex.
  *
  * @param {number} index - Index of the vertex to get.
  *
  * @return {any} Field data of a vertex.
  */
  get (index) {
    return this._buffer.format.get(this._buffer._view, index, this._field)
  }

  /**
  * Apply a map operation on this buffer.
  *
  * @param {function (value : object, index : number, buffer : VertexFieldBuffer)} mapper - Mapper.
  * @param {any} thisArg - Object to use as context of the callback.
  *
  * @return {VertexFieldBuffer} The current buffer for chaining purpose.
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
  * @param {function (aggregator : any, current : object, index : number, buffer : VertexFieldBuffer)} reducer - Reducer.
  * @param {any} initialValue - Initial value to use.
  *
  * @return {VertexFieldBuffer} The current buffer for chaining purpose.
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
  * @return {VertexFieldBuffer} The current buffer for chaining purpose.
  */
  delete (index, count = 1) {
    this._buffer.delete(index, count)
    return this
  }

  /**
  * Check if this buffer is similar to another (have same size, and equal content).
  *
  * @param {VertexFieldBuffer} other - Other buffer to compare.
  *
  * @return {boolean} True if both buffer are similar.
  */
  equals (other) {
    if (other === this) return true
    if (other == null) return false

    if (other.size === this.size) {
      const thisBuffer = this._buffer.buffer
      const otherBuffer = other._buffer.buffer
      const start = this._buffer.format.start(this._field)
      const end = this._buffer.format.end(this._field)
      const entrySize = this._buffer.format.size

      for (let i = 0; i < entrySize * this.size; i += entrySize) {
        for (let j = start; j < end; ++j) {
          if (otherBuffer[i + j] !== thisBuffer[i + j]) {
            return false
          }
        }
      }

      return true
    } else {
      return false
    }
  }

  clone () {
    return new VertexFieldBuffer(this._buffer.clone(), this._field)
  }

  /**
  * Clear this buffer.
  * @return {VertexFieldBuffer} The current buffer for chaining purpose.
  */
  clear () {
    this.size = 0
    return this
  }
}
