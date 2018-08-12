import vector2s from './raw/vector2s'

export class Vector2s {
  /**
  * Create a new 2 short vector with initial data.
  *
  * @param x - x component of the new vector
  * @param y - y component of the new vector
  *
  * @return {Vector2s} The new vector instance.
  */
  static create (
    x,
    y
  ) {
    return new Vector2s().set(x, y)
  }

  /**
  * Wrap a Int16Array as a 2 short vector.
  *
  * @param {Int16Array} buffer - A buffer to wrap.
  *
  * @return {Vector2s} The new vector instance.
  */
  static wrap (buffer) {
    return new Vector2s(buffer)
  }

  /**
  * Clone another 2 short vector and return the result.
  *
  * @param {Vector2s} vector - A 2 short vector to clone.
  *
  * @return {Vector2s} The cloned vector instance.
  */
  static clone (vector) {
    const result = new Vector2s()
    result.x = vector.x
    result.y = vector.y
    
    return result
  }

  /**
  * Create a new 2 short vector.
  *
  * @param {Int16Array} [buffer = new Int16Array(2)] - A buffer to wrap.
  */
  constructor (buffer = new Int16Array(2)) {
    this._buffer = buffer
  }

  /**
  * @return {number}
  */
  get x () {
      return this._content[0]
  }

  /**
  * @return {number}
  */
  get y () {
      return this._content[1]
  }

  /**
  * Set the value of the x component of this vector.
  *
  * @param {number} value - New value of the x component.
  */
  set x (value) {
    this._content[0] = value
  }

  /**
  * Set the value of the y component of this vector.
  *
  * @param {number} value - New value of the y component.
  */
  set y (value) {
    this._content[1] = value
  }

  /**
  * Return the underlying buffer of this vector.
  *
  * @return {Int16Array} The underlying buffer of this vector.
  */
  get buffer () {
    return this._buffer
  }

  /**
  * Return the dimension of this vector.
  *
  * @return {number} The dimension of this vector.
  */
  get dimension () {
    return 2
  }

  /**
  * Return the squared length of this vector.
  *
  * @return {number} The squared length of this vector.
  */
  get squaredLength () {
    return vector2s.squaredLength(this._buffer, 0)
  }

  /**
  * Return the length of this vector.
  *
  * @return {number} The length of this vector.
  */
  get length () {
    return vector2s.length(this._buffer, 0)
  }

  /**
  * Set all components of this vector.
  *
  * @param x - x component of the new vector
  * @param y - y component of the new vector
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  set (
    x,
    y
  ) {
    vector2s.set(this._buffer, 0, x, y)
    return this
  }

  /**
  * Add another vector to this vector.
  *
  * @param {Vector2s} left - Left operand vector.
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  add (left, result = this) {
    vector2s.add(
      this._buffer, 0, left.buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Subtract another vector to this vector.
  *
  * @param {Vector2s} left - Left operand vector.
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  subtract (left, result = this) {
    vector2s.subtract(
      this._buffer, 0, left.buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Multiply this vector with a scalar.
  *
  * @param {number} scalar
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  multiplyWithScalar (scalar, result = this) {
    vector2s.multiplyWithScalar(
      this._buffer, 0, scalar, result.buffer, 0
    )

    return this
  }

  /**
  * Mix this vector with another.
  *
  * @param {Vector2s} left - Left operand vector.
  * @param {number} scalar - A value between 0 and 1.
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  mix (left, scalar, result = this) {
    vector2s.mix(
      this._buffer, 0, left.buffer, 0, scalar, result.buffer, 0
    )

    return this
  }

  /**
  * Divide this vector by a scalar.
  *
  * @param {number} scalar
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  divideWithScalar (scalar, result = this) {
    vector2s.divideWithScalar(
      this._buffer, 0, scalar, result.buffer, 0
    )

    return this
  }

  /**
  * Negate this vector.
  *
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  negate (result = this) {
    vector2s.negate(
      this._buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Normalize this vector.
  *
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  normalize (result = this) {
    vector2s.normalize(
      this._buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Ceil each component of this vector.
  *
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  ceil (result = this) {
    vector2s.ceil(
      this._buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Floor each component of this vector.
  *
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  floor (result = this) {
    vector2s.floor(
      this._buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Round each component of this vector.
  *
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  round (result = this) {
    vector2s.round(
      this._buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Update each component of this vector less than the given minimum to the given minimum.
  *
  * @param {number} minimum - Minimum value allowed for each components of this vector.
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  minimum (minimum, result = this) {
    vector2s.minimum(
      this._buffer, 0, minimum, result.buffer, 0
    )

    return this
  }

  /**
  * Update each component of this vector greather than the given maximum to the given maximum.
  *
  * @param {number} maximum - Maximum value allowed for each components of this vector.
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  maximum (maximum, result = this) {
    vector2s.maximum(
      this._buffer, 0, maximum, result.buffer, 0
    )

    return this
  }

  /**
  * Clamp each component of this vector between a minimum and a amaximum value.
  *
  * @param {number} minimum - Minimum value allowed for each components of this vector.
  * @param {number} maximum - Maximum value allowed for each components of this vector.
  * @param {Vector2s} [result = this] - The result vector.
  *
  * @return {Vector2s} This vector instance for chaining purpose.
  */
  clamp (minimum, maximum, result = this) {
    vector2s.clamp(
      this._buffer, 0, minimum, maximum, result.buffer, 0
    )

    return this
  }

  /**
  * Return the dot product of this vector with another one.
  *
  * @param {Vector2s} left - Left operand vector.
  *
  * @return {number} The result of the dot product.
  */
  dot (left, tolerance = Number.EPSILON) {
    return vector2s.dot(this._buffer, 0, left.buffer, 0)
  }

  /**
  * Iterate over each components of this vector.
  *
  * @return {Iterator<number>} An iterator over each components of this vector.
  */
  * [Symbol.iterator] () {
    yield vectorBuffer[0]
    yield vectorBuffer[1]
  }

  /**
  * Return true if this vector is equal to another.
  *
  * @param {Vector2s} left - Left operand vector.
  * @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
  *
  * @return {boolean} True if this vector is equal to the given vector, false otherwise.
  */
  equals (left, tolerance = Number.EPSILON) {
    return vector2s.equals(this._buffer, 0, left.buffer, 0, tolerance)
  }

  /**
  * Return a string representation of this vector.
  *
  * @return {String} A string representation of this vector.
  */
  toString () {
    return vector2s.toString(this._buffer, 0)
  }
}