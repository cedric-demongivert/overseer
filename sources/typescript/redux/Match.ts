export class Match {
  private _boundaries : number[]

  /**
  * Create a new empty index match.
  */
  public constructor () {
    this._boundaries = []
  }

  /**
  * @return The number of ranges required to define this match.
  */
  public get ranges () : number {
    return this._boundaries.length >>> 1
  }

  /**
  * @return The number of boundaries of this match.
  */
  public get size () : number {
    return this._boundaries.length
  }

  /**
  * Return the nth boundary of this match.
  *
  * @param index - Index of the boundary to get.
  *
  * @return The requested boundary.
  */
  public get (index : number) : number {
    return this._boundaries[index]
  }

  /**
  * Return the start (inclusive) of the nth range of this match.
  *
  * @param index - Index of range to get.
  *
  * @return The start (inclusive) of the requested range.
  */
  public start (index : number) : number {
    return this._boundaries[index * 2]
  }

  /**
  * Return the end (exclusive) of the nth range of this match.
  *
  * @param index - Index of range to get.
  *
  * @return The end (exclusive) of the requested range.
  */
  public end (index : number) : number {
    return this._boundaries[index * 2 + 1]
  }

  /**
  * Return the index of the range that contains the given value.
  *
  * @param value - A value to search for.
  *
  * @return The index of the range that contains the given value.
  */
  public range (value : number) : number {
    let left : number = 0
    let right : number = this._boundaries.length / 2

    while (left !== right) {
      const cursor : number = left + ((right - left) >>> 1)
      const location : number = Match.compare(
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
  * @param value - A value to search for.
  *
  * @return The index of the boundary just before the given value.
  */
  public boundary (value : number) : number {
    let left : number = 0
    let right : number = this._boundaries.length

    while (left !== right) {
      const cursor : number = left + ((right - left) >>> 1)
      const boundary : number = this._boundaries[cursor]

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
  * @param index - An index to search for.
  *
  * @return True if the given index is match.
  */
  public match (index : number) : boolean {
    return this.range(index) != null
  }

  public isEndBoundary (index : number) {
    return index % 2 === 1
  }

  public isStartBoundary (index : number) : boolean {
    return index % 2 === 0
  }

  /**
  * Add a value to this match.
  *
  * @param value - The value to add to this match.
  */
  public add (value : number) : void {
    this.addRange(value, value + 1)
  }

  /**
  * Add a given range of values to this match.
  *
  * @param start - Start of the range (inclusive) to add, or null for including all indexes before the end of the range.
  * @param end - End of the range (exclusive) to add, or null for including all indexes after the start of the range.
  */
  public addRange (start : number, end : number) : void {
    let left : number = 0
    let leftValue : number = null
    let right : number = Math.max(this._boundaries.length - 1, 0)
    let rightValue : number = null

    if (end != null) {
      const boundaryBeforeEnd : number = this.boundary(end)

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
      const boundaryBeforeStart : number = this.boundary(start)

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
  public invert () : void {
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
  * @return An array with each ranges of index matched by this match object.
  */
  public toArray () : number[] {
    return [...this._boundaries]
  }

  /**
  * Clear this match object.
  */
  public clear () : void {
    this._boundaries.length = 0
  }

  /**
  * Return true if both object instances are equals.
  *
  * @param other - Another object instance to compare to this one.
  *
  * @return True if both object instances are equals.
  */
  public equals (other : any) : boolean {
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

export namespace Match {
  /**
  * Compare an index to a range.
  *
  * @param start - Start of the range (inclusive), or null for including all indexes that are before the end of this range.
  * @param end - End of the range (exclusive), or null for including all indexes that are after the start of this range.
  * @param index - An index.
  *
  * @return -1 if the given index is before the range, 0 if the given index is in the range, 1 if the given index is after the range.
  */
  export function compare (start : number, end : number, index : number) : number {
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
}
