import vector4i from './raw/vector4i'

export class Vector4i {
  /**
  * Create a new 4 integer vector with initial data.
  *
  * @param x - x component of the new vector
  * @param y - y component of the new vector
  * @param z - z component of the new vector
  * @param w - w component of the new vector
  *
  * @return {Vector4i} The new vector instance.
  */
  static create (
    x,
    y,
    z,
    w
  ) {
    return new Vector4i().set(x, y, z, w)
  }

  /**
  * Wrap a Int32Array as a 4 integer vector.
  *
  * @param {Int32Array} buffer - A buffer to wrap.
  *
  * @return {Vector4i} The new vector instance.
  */
  static wrap (buffer) {
    return new Vector4i(buffer)
  }

  /**
  * Clone another 4 integer vector and return the result.
  *
  * @param {Vector4i} vector - A 4 integer vector to clone.
  *
  * @return {Vector4i} The cloned vector instance.
  */
  static clone (vector) {
    const result = new Vector4i()
    result.x = vector.x
    result.y = vector.y
    result.z = vector.z
    result.w = vector.w
    
    return result
  }

  /**
  * Create a new 4 integer vector.
  *
  * @param {Int32Array} [buffer = new Int32Array(4)] - A buffer to wrap.
  */
  constructor (buffer = new Int32Array(4)) {
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
  * @return {number}
  */
  get z () {
      return this._content[2]
  }

  /**
  * @return {number}
  */
  get w () {
      return this._content[3]
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
  * Set the value of the z component of this vector.
  *
  * @param {number} value - New value of the z component.
  */
  set z (value) {
    this._content[2] = value
  }

  /**
  * Set the value of the w component of this vector.
  *
  * @param {number} value - New value of the w component.
  */
  set w (value) {
    this._content[3] = value
  }

  /**
  * @return {number}
  */
  get r () {
      return this._content[0]
  }

  /**
  * @return {number}
  */
  get g () {
      return this._content[1]
  }

  /**
  * @return {number}
  */
  get b () {
      return this._content[2]
  }

  /**
  * @return {number}
  */
  get a () {
      return this._content[3]
  }

  /**
  * Set the value of the x component of this vector.
  *
  * @param {number} value - New value of the x component.
  */
  set r (value) {
    this._content[0] = value
  }

  /**
  * Set the value of the y component of this vector.
  *
  * @param {number} value - New value of the y component.
  */
  set g (value) {
    this._content[1] = value
  }

  /**
  * Set the value of the z component of this vector.
  *
  * @param {number} value - New value of the z component.
  */
  set b (value) {
    this._content[2] = value
  }

  /**
  * Set the value of the w component of this vector.
  *
  * @param {number} value - New value of the w component.
  */
  set a (value) {
    this._content[3] = value
  }

  /**
  * Return the underlying buffer of this vector.
  *
  * @return {Int32Array} The underlying buffer of this vector.
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
    return 4
  }

  /**
  * Return the squared length of this vector.
  *
  * @return {number} The squared length of this vector.
  */
  get squaredLength () {
    return vector4i.squaredLength(this._buffer, 0)
  }

  /**
  * Return the length of this vector.
  *
  * @return {number} The length of this vector.
  */
  get length () {
    return vector4i.length(this._buffer, 0)
  }

  /**
  * Set all components of this vector.
  *
  * @param x - x component of the new vector
  * @param y - y component of the new vector
  * @param z - z component of the new vector
  * @param w - w component of the new vector
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  set (
    x,
    y,
    z,
    w
  ) {
    vector4i.set(this._buffer, 0, x, y, z, w)
    return this
  }

  /**
  * Add another vector to this vector.
  *
  * @param {Vector4i} left - Left operand vector.
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  add (left, result = this) {
    vector4i.add(
      this._buffer, 0, left.buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Subtract another vector to this vector.
  *
  * @param {Vector4i} left - Left operand vector.
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  subtract (left, result = this) {
    vector4i.subtract(
      this._buffer, 0, left.buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Multiply this vector with a scalar.
  *
  * @param {number} scalar
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  multiplyWithScalar (scalar, result = this) {
    vector4i.multiplyWithScalar(
      this._buffer, 0, scalar, result.buffer, 0
    )

    return this
  }

  /**
  * Mix this vector with another.
  *
  * @param {Vector4i} left - Left operand vector.
  * @param {number} scalar - A value between 0 and 1.
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  mix (left, scalar, result = this) {
    vector4i.mix(
      this._buffer, 0, left.buffer, 0, scalar, result.buffer, 0
    )

    return this
  }

  /**
  * Divide this vector by a scalar.
  *
  * @param {number} scalar
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  divideWithScalar (scalar, result = this) {
    vector4i.divideWithScalar(
      this._buffer, 0, scalar, result.buffer, 0
    )

    return this
  }

  /**
  * Negate this vector.
  *
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  negate (result = this) {
    vector4i.negate(
      this._buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Normalize this vector.
  *
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  normalize (result = this) {
    vector4i.normalize(
      this._buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Ceil each component of this vector.
  *
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  ceil (result = this) {
    vector4i.ceil(
      this._buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Floor each component of this vector.
  *
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  floor (result = this) {
    vector4i.floor(
      this._buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Round each component of this vector.
  *
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  round (result = this) {
    vector4i.round(
      this._buffer, 0, result.buffer, 0
    )

    return this
  }

  /**
  * Update each component of this vector less than the given minimum to the given minimum.
  *
  * @param {number} minimum - Minimum value allowed for each components of this vector.
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  minimum (minimum, result = this) {
    vector4i.minimum(
      this._buffer, 0, minimum, result.buffer, 0
    )

    return this
  }

  /**
  * Update each component of this vector greather than the given maximum to the given maximum.
  *
  * @param {number} maximum - Maximum value allowed for each components of this vector.
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  maximum (maximum, result = this) {
    vector4i.maximum(
      this._buffer, 0, maximum, result.buffer, 0
    )

    return this
  }

  /**
  * Clamp each component of this vector between a minimum and a amaximum value.
  *
  * @param {number} minimum - Minimum value allowed for each components of this vector.
  * @param {number} maximum - Maximum value allowed for each components of this vector.
  * @param {Vector4i} [result = this] - The result vector.
  *
  * @return {Vector4i} This vector instance for chaining purpose.
  */
  clamp (minimum, maximum, result = this) {
    vector4i.clamp(
      this._buffer, 0, minimum, maximum, result.buffer, 0
    )

    return this
  }

  /**
  * Return the dot product of this vector with another one.
  *
  * @param {Vector4i} left - Left operand vector.
  *
  * @return {number} The result of the dot product.
  */
  dot (left, tolerance = Number.EPSILON) {
    return vector4i.dot(this._buffer, 0, left.buffer, 0)
  }

  /**
  * Iterate over each components of this vector.
  *
  * @return {Iterator<number>} An iterator over each components of this vector.
  */
  * [Symbol.iterator] () {
    yield vectorBuffer[0]
    yield vectorBuffer[1]
    yield vectorBuffer[2]
    yield vectorBuffer[3]
  }

  /**
  * Return true if this vector is equal to another.
  *
  * @param {Vector4i} left - Left operand vector.
  * @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
  *
  * @return {boolean} True if this vector is equal to the given vector, false otherwise.
  */
  equals (left, tolerance = Number.EPSILON) {
    return vector4i.equals(this._buffer, 0, left.buffer, 0, tolerance)
  }

  /**
  * Return a string representation of this vector.
  *
  * @return {String} A string representation of this vector.
  */
  toString () {
    return vector4i.toString(this._buffer, 0)
  }
}