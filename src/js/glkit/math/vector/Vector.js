export class Vector {
  /**
  * Get the dimension of this vector.
  *
  * @return {number} The dimension of this vector.
  */
  get dimension () {
    throw new Error('Vector[get dimension] : number is not implemented.')
  }

  /**
  * Get the value of a component of this vector.
  *
  * @param {number} index - Index of the component.
  *
  * @return {number} The value of the component.
  */
  get (index) {
    throw new Error('Vector.get(index : number) : number is not implemented')
  }

  /**
  * Set the value of a component of this vector.
  *
  * @param {number} index - Index of the component.
  * @param {number} value - New value of the component.
  *
  * @return {Vector} An updated instance of this vector.
  */
  set (index, value) {
    throw new Error('Vector.set(index : number, value : number) : Vector is not implemented')
  }

  /**
  * Return this vector as an array.
  *
  * @return {Array<number>} This vector as an array.
  */
  toArray () {
    return [...this]
  }

  /**
  * Perform an addition on this vector.
  *
  * This method can be used by passing the numbers to add or by passing any
  * number-iterable object like an array or a vector.
  *
  * @param {...any} params - Values to add.
  *
  * @return {Vector} A new updated instance of this vector.
  */
  add (...params) {
    throw new Error('Vector.add(...params) : Vector is not implemented')
  }

  /**
  * Perform a subtraction on this vector.
  *
  * This method can be used by passing the numbers to subtract or by passing any
  * number-iterable object like an array or a vector.
  *
  * @param {...any} params - Values to subtract.
  *
  * @return {Vector} A new updated instance of this vector.
  */
  sub (...params) {
    throw new Error('Vector.sub(...params) : Vector is not implemented')
  }

  /**
  * Multiply this vector by a scalar or a matrix.
  *
  * @param {number|Matrix} value - Value to use for the multiplication.
  *
  * @return {Vector} This instance for chaining purpose.
  */
  mul (value) {
    throw new Error('Vector.mul(value : number|Matrix) : Vector is not implemented')
  }

  /**
  * Divide this vector by a scalar.
  *
  * @param {number} scalar - Value to use for the division.
  *
  * @return {Vector} This instance for chaining purpose.
  */
  div (scalar) {
    throw new Error('Vector.div(value : number) : Vector is not implemented')
  }

  /**
  * Compute the dot product of two vectors.
  *
  * This method can be used by passing the numbers to use or by passing any
  * number-iterable object like an array or a vector.
  *
  * @param {...any} params - Values to use.
  *
  * @return {number} The result of the dot product.
  */
  dot (...params) {
    throw new Error('Vector.dot(...params) : number is not implemented')
  }

  /**
  * Return the length of this vector.
  *
  * @return {number} The length of this vector.
  */
  get length () {
    return Math.sqrt(this.squaredLength)
  }

  /**
  * Return the squared length of this vector.
  *
  * @return {number} The squared length of this vector.
  */
  get squaredLength () {
    throw new Error('Vector[get squaredLength] : number is not implemented')
  }

  /**
  * @return A negated version of this vector.
  */
  negate () {
    return this.multiply(-1)
  }

  /**
  * @return A normalized version of this vector.
  */
  normalize () {
    return this.divide(this.length)
  }

  /**
  * Round up all components of this vector.
  *
  * @return {Vector} An updated instance of this vector.
  */
  ceil () {
    return this.map(Math.ceil)
  }

  /**
  * Round down all components of this vector.
  *
  * @return {Vector} An updated instance of this vector.
  */
  floor () {
    return this.map(Math.floor)
  }

  /**
  * Round all components of this vector to their nearest integer.
  *
  * @return {Vector} An updated instance of this vector.
  */
  round () {
    return this.map(Math.round)
  }

  /**
  * Replace all components of this vector that are superior to ceil by ceil.
  *
  * @param {number} ceil - The maximum value allowed.
  *
  * @return {Vector} An updated instance of this vector.
  */
  max (ceil) {
    return this.map(x => Math.min(x, ceil))
  }

  /**
  * Replace all components of this vector that are inferior to floor by floor.
  *
  * @param {number} floor - The minimum value allowed.
  *
  * @return {Vector} An updated instance of this vector.
  */
  min (floor) {
    return this.map(x => Math.max(x, floor))
  }

  /**
  * Clamp all components of this vector between two values.
  *
  * @param {number} floor - The minimum value allowed.
  * @param {number} ceil - The maximum value allowed.
  *
  * @return {Vector} An updated instance of this vector.
  */
  clamp (floor, ceil) {
    return this.map(x => Math.min(Math.max(x, floor), ceil))
  }

  /**
  * Return true if this vector is equal to another vector.
  *
  * This method can be used by passing the numbers to compare or by passing any
  * number-iterable object like an array or a vector.
  *
  * @param {...any} params - Values to compare.
  *
  * @return {boolean} True if this vector is equal to the other vector.
  */
  equal (...params) {
    throw new Error('Vector.equal(...params) : boolean is not implemented')
  }

  /**
  * Apply a map operation on each component of this vector.
  *
  * @param {function (value : number, index : number, array : Array<number>) : number} mapper - The map operation to apply.
  *
  * @return {Vector} An updated instance of this vector.
  */
  map (mapper) {
    throw new Error('Vector.map(mapper : function (value : number, index : number, array : Array<number>) : number) : Vector is not implemented')
  }

  /**
  * Apply a reduction operation on each component of this vector.
  *
  * @param {function (a : any, b : any) : any} reducer - The reduction operation to apply.
  * @param {any} [base] - Base value to use for reduction.
  *
  * @return {any} The result of the reduction.
  */
  reduce (...params) {
    throw new Error('Vector.reduce(reducer : function (a : any, b : any) : any, base : any) : any is not implemented')
  }
}