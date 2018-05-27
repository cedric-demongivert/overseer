// <development>
import { InvalidParameterError } from '@errors'
// </development>

import * as matrixCommon from '@glkit/math/matrix/common'
import * as matrixArithmetic from '@glkit/math/matrix/arithmetic'
import * as vectorCommon from './common'
import * as vectorArithmetic from './arithmetic'

import { Vector } from './Vector'

export class Vector2D extends Vector {
  /**
  * Create a new empty 2D vector with base data.
  *
  * @param {NumberType} type - Type of the vector to create.
  * @param {...number} data - Initial content of the vector.
  *
  * @return {Vector2D} The created vector instance.
  */
  static ['of'] (type, ...data) {
    return Vector2D.create(type).setAll(...data)
  }

  /**
  * Create a new empty 2D vector full of zeroes of a given type.
  *
  * @param {NumberType} type - Type of the vector to create.
  *
  * @return {Vector2D} The created vector instance.
  */
  static create (
    type,
    result = Object.create(Vector2D.prototype)
  ) {
    return Vector.create(type, 2, result)
  }

  /**
  * Wrap a typed array as a 2D vector.
  *
  * @param {TypedArray} array - A typed array to wrap.
  *
  * @return {Vector2D} The created vector instance.
  */
  static wrap (
    array,
    result = Object.create(Vector2D.prototype)
  ) {
    // <development>
    if (array.length !== 2) {
      throw new InvalidParameterError(array, 'array', [
        'Unnable to wrap the given array into a Vector2D instance, because ',
        'the given array length is invalid : ', array.length, ' != 2'
      ].join(''))
    }
    // </development>

    return Vector.wrap(array, result)
  }

  /**
  * Clone a Vector and return the result.
  *
  * @param {Vector} vector - A vector to clone.
  *
  * @return {Vector2D} The cloned vector.
  */
  static clone (
    vector,
    result = Object.create(Vector2D.prototype)
  ) {
    // <development>
    if (vector.cells !== 2) {
      throw new InvalidParameterError(vector, 'vector', [
        'Unnable to clone the given vector as a Vector2D instance, because ',
        'the given vector dimension is invalid : ', vector.dimensions, ' != 2'
      ].join(''))
    }
    // </development>

    return Vector.clone(vector, result)
  }

  /**
  * Create a new 2D vector.
  *
  * Delegate the construction to Vector2D.clone, Vector2D.create or
  * Vector2D.wrap, by identifying the compatibility of theses methods with the
  * given parameters of the constructor.
  *
  * @param {...any} params - Parameters for the construction.
  */
  constructor (...params) {
    if (params.length === 1 && params[0] instanceof Vector) {
      super(...params, 2)
    } else if (params.length === 1 && NumberType.is(params[0])) {
      super(...params, 2)
    } else if (params.length === 1) {
      super(...params)
    } else if (params.length > 1) {
      const [type, ...data] = params
      super(type, 2)
      this.setAll(...data)
    } else {
      throw new InvalidParameterError('params', params, [
        'The given parameters can\'t be passed to Vector2D.clone, ',
        'Vector2D.create or Vector2D.wrap. Take a look to the documentation ',
        'for more information.'
      ].join(''))
    }
  }

  /**
  * @return {number}
  */
  get x () {
    return this._content[0]
  }

  /**
  * @param {number} value
  */
  set x (value) {
    this._content[0] = value
  }

  /**
  * @return {number}
  */
  get y () {
    return this._content[1]
  }

  /**
  * @param {number} value
  */
  set y (value) {
    this._content[1] = value
  }

  /**
  * @return {Vector2D}
  */
  get xy () {
    return Vector2D.clone(this)
  }

  /**
  * @return {Vector2D}
  */
  get yx () {
    return Vector2D.clone(this).setAll(this._content[1], this._content[0])
  }
}

Object.assign(Vector2D, matrixCommon)
Object.assign(Vector2D, vectorCommon)
Object.assign(Vector2D, matrixArithmetic)
Object.assign(Vector2D, vectorArithmetic)
