export class Index {
  /**
  * Create a new index.
  *
  * @param {Iterable<[any, Iterable<any>]>} [entries] - Initial entries of this index.
  */
  constructor (entries) {
    this._collection = new Map()

    for (const [key, values] of entries) {
      if (this._collection.has(key)) {
        for (const value of values) {
          this._collection.get(key).add(value)
        }
      } else {
        this._collection.set(key, new Set(values))
      }
    }
  }

  /**
  * Attach a new value to a key in this index.
  *
  * @param {any} key
  * @param {any} value
  *
  * @return {Index} The current index instance for chaining purpose.
  */
  * add (key, value) {
    if (!this._collection.has(key)) {
      this._collection.set(key, new Set())
    }

    if (!this._collection.get(key).has(value)) {
      this._collection.get(key).add(value)
    }

    return this
  }

  /**
  * Delete a value of a key, or all values of a key.
  *
  * @param {any} key
  * @param {any} [value]
  *
  * @return {Index} The current index instance for chaining purpose.
  */
  delete (...params) {
    if (params.length <= 1) {
      const [key] = params
      this._collection.delete(key)
    } else {
      const [key, value] = params
      if (this._collection.has(key) && this._collection.get(key).has(value)) {
        this._collection.get(key).delete(value)

        if (this._collection.get(key).size <= 0) {
          this._collection.delete(key)
        }
      }
    }

    return this
  }

  /**
  * Clear this index.
  *
  * @return {Index} The current index instance for chaining purpose.
  */
  clear () {
    this._collection.clear()
    return this
  }

  /**
  * Iterate over all values assigned to a given key.
  *
  * @param {any} key - The key to fetch.
  *
  * @return {Iterator<any>} An iterator over all values assigned to the given key.
  */
  * values (key) {
    const values = this._collection.get(key)
    if (values) {
      yield * values
    }
  }

  /**
  * Iterate over all keys in this index.
  *
  * @return {Iterator<any>} An iterator over all keys of this index.
  */
  * keys () {
    yield * this._collection.keys()
  }

  /**
  * Iterate over all entries of this index.
  *
  * @return {Iterator<[any, Array<any>]>} An iterator over all entries of this index.
  */
  * entries () {
    for (const [key, values] of this._collection) {
      yield [key, [...values]]
    }
  }

  /**
  *
  */
  * [Symbol.iterator] () {
    yield * this.entries()
  }
}
