export class Match {
  /**
  * Compare an index to a range.
  *
  * @param {number} start - Start of the range (inclusive), or null for including all indexes that are before the end of this range.
  * @param {number} end - End of the range (exclusive), or null for including all indexes that are after the start of this range.
  * @param {number} index - An index.
  *
  * @return {number} -1 if the given index is before the range, 0 if the given index is in the range, 1 if the given index is after the range.
  */
  static compare (start, end, index) {
    if (start === null && end == null) {
      return 0
    } else if (start === null) {
      return index >= end ? 1 : 0
    } else if (end === null) {
      return index < start ? -1 : 0
    } else {
      return index >= end ? 1 : (index < start ? -1 : 0)
    }
  }

  /**
  * Create a new empty index match.
  */
  constructor () {
    this._boundaries = []
  }

  /**
  * @return {number} The number of ranges required to define this match.
  */
  get ranges () {
    return this._boundaries.length >>> 1
  }

  /**
  * @return {number} The number of boundaries of this match.
  */
  get size () {
    return this._boundaries.length
  }

  /**
  * Return the nth boundary of this match.
  *
  * @param {number} index - Index of the boundary to get.
  *
  * @return {number} The requested boundary.
  */
  get (index) {
    return this._boundaries[index]
  }

  /**
  * Return the start (inclusive) of the nth range of this match.
  *
  * @param {number} index - Index of range to get.
  *
  * @return {number} The start (inclusive) of the requested range.
  */
  start (index) {
    return this._boundaries[index * 2]
  }

  /**
  * Return the end (exclusive) of the nth range of this match.
  *
  * @param {number} index - Index of range to get.
  *
  * @return {number} The end (exclusive) of the requested range.
  */
  end (index) {
    return this._boundaries[index * 2 + 1]
  }

  /**
  * Return the index of the range that contains the given value.
  *
  * @param {number} value - A value to search for.
  *
  * @return {number} The index of the range that contains the given value.
  */
  range (value) {
    let left = 0
    let right = this._boundaries.length / 2

    while (left !== right) {
      const cursor = left + ((right - left) >>> 1)
      const location = Match.compare(
        this._boundaries[cursor * 2],
        this._boundaries[cursor * 2 + 1],
        value
      )

      if (location === 0) {
        return cursor
      } else if (location === 1) {
        left = cursor + 1
      } else {
        right = cursor
      }
    }

    return undefined
  }

  /**
  * Return the boundary index just before the given value.
  *
  * @param {number} value - A value to search for.
  *
  * @return {number} The index of the boundary just before the given value.
  */
  boundary (value) {
    let left = 0
    let right = this._boundaries.length

    while (left !== right) {
      const cursor = left + ((right - left) >>> 1)
      const boundary = this._boundaries[cursor]

      if (boundary == null) {
        if (cursor === 0) {
          return cursor
        } else {
          right = cursor
        }
      } else if (boundary > value) {
        right = cursor
      } else {
        const next = this._boundaries[cursor + 1]

        if (next == null || next > value) {
          return cursor
        }

        left = cursor + 1
      }
    }

    return left === 0 ? left - 1 : left
  }

  /**
  * Return true if the given index is match.
  *
  * @param {number} index - An index to search for.
  *
  * @return {boolean} True if the given index is match.
  */
  match (index) {
    return this.range(index) != null
  }

  isEndBoundary (index) {
    return index % 2 === 1
  }

  isStartBoundary (index) {
    return index % 2 === 0
  }

  /**
  * Add a value to this match.
  *
  * @param {number} value - The value to add to this match.
  */
  add (value) {
    this.addRange(value, value + 1)
  }

  /**
  * Add a given range of values to this match.
  *
  * @param {number} start - Start of the range (inclusive) to add, or null for including all indexes before the end of the range.
  * @param {number} end - End of the range (exclusive) to add, or null for including all indexes after the start of the range.
  */
  addRange (start, end) {
    let left = 0
    let leftValue = null
    let right = Math.max(this._boundaries.length - 1, 0)
    let rightValue = null

    if (end != null) {
      const boundaryBeforeEnd = this.boundary(end)

      if (boundaryBeforeEnd === -1) {
        right = 0
        rightValue = end
      } else if (boundaryBeforeEnd === this._boundaries.length) {
        right = this._boundaries.length
        rightValue = end
      } else if (this.isEndBoundary(boundaryBeforeEnd)) {
        right = boundaryBeforeEnd
        rightValue = end
      } else {
        right = boundaryBeforeEnd + 1
        rightValue = this._boundaries[boundaryBeforeEnd + 1]
      }
    }

    if (start != null) {
      const boundaryBeforeStart = this.boundary(start)

      if (boundaryBeforeStart === -1) {
        left = 0
        leftValue = start
      } else if (boundaryBeforeStart === this._boundaries.length) {
        left = this._boundaries.length
        leftValue = start
      } else if (this.isEndBoundary(boundaryBeforeStart)) {
        if (this._boundaries[boundaryBeforeStart] === start) {
          left = boundaryBeforeStart - 1
          leftValue = this._boundaries[boundaryBeforeStart - 1]
        } else {
          left = boundaryBeforeStart + 1
          leftValue = start
        }
      } else {
        left = boundaryBeforeStart
        leftValue = this._boundaries[boundaryBeforeStart]
      }
    }

    this._boundaries.splice(
      left < 0 ? 0 : left,
      right === left ? 0 : right - left + 1,
      leftValue,
      rightValue
    )
  }

  /**
  * Invert current matches.
  */
  invert () {
    if (this._boundaries.length == 0) {
      this._boundaries.push(null, null)
    } else {
      if (this._boundaries[0] === null) {
        this._boundaries.shift()
      } else {
        this._boundaries.unshift(null)
      }

      if (this._boundaries[this._boundaries.length - 1] === null) {
        this._boundaries.pop()
      } else {
        this._boundaries.push(null)
      }
    }
  }

  /**
  * Return this match as an array.
  *
  * @return {number[]} An array with each ranges of index matched by this match object.
  */
  toArray () {
    return [...this._boundaries]
  }

  /**
  * Clear this match object.
  */
  clear () {
    this._boundaries.length = 0
  }

  /**
  * Return true if both object instances are equals.
  *
  * @param {any} other - Another object instance to compare to this one.
  *
  * @return {boolean} True if both object instances are equals.
  */
  equals (other) {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Match) {
      if (other.ranges !== this.ranges) return false

      for (let index = 0, size = other.ranges; index < size; ++index) {
        if (other.start(index) !== this.start(index)) return false
        if (other.end(index) !== this.end(index)) return false
      }

      return true
    }

    return false
  }
}
