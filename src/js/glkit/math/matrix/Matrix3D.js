import { InvalidParameterError } from '@errors'
import * as NumberType from '@glkit/math/NumberType'

import { Matrix } from './Matrix'

import * as arithmetic from './arithmetic'
import * as common from './common'
import * as common3D from './common3D'

export class Matrix3D extends Matrix {
  /**
  * Create a new empty 3D matrix full of zeroes of a given type.
  *
  * @param {NumberType} type - Type of the matrix to create.
  * @param {...number} data - Initial content of the matrix in a row-major presentation.
  *
  * @return {Matrix} The created matrix instance.
  */
  static ['of'] (type, ...data) {
    return Matrix3D.create(type).setAll(...data)
  }

  /**
  * Create a new empty 3D matrix full of zeroes of a given type.
  *
  * @param {NumberType} type - Type of the matrix to create.
  *
  * @return {Matrix} The created matrix instance.
  */
  static create (
    type,
    result = Object.create(Matrix3D.prototype)
  ) {
     return Matrix.create(type, 3, 3, result)
  }

  /**
  * Wrap a typed array as a 3D matrix.
  *
  * @param {TypedArray} array - A typed array to wrap.
  *
  * @return {Matrix} The created matrix instance.
  */
  static wrap (
    array,
    result = Object.create(Matrix3D.prototype)
  ) {
    return Matrix.wrap(array, 3, 3, result)
  }

  /**
  * Clone a 3D matrix and return the result.
  *
  * @param {Matrix} matrix - A matrix to clone.
  *
  * @return {Matrix} The cloned matrix.
  */
  static clone (
    matrix,
    result = Object.create(Matrix3D.prototype)
  ) {
    return Matrix.clone(matrix, result)
  }

  /**
  * Create a new 3D matrix.
  *
  * Delegate the construction to Matrix3D.clone, Matrix3D.create or
  * Matrix3D.wrap, by identifying the compatibility of theses methods with the
  * given parameters of the constructor.
  *
  * @param {...any} params - Parameters for the construction.
  */
  constructor (...params) {
    if (params.length === 1 && params[0] instanceof Matrix) {
      super(...params)
    } else if (params.length === 1 && NumberType.is(params[0])) {
      super(...params, 3, 3,)
    } else if (params.length === 1) {
      super(...params, 3, 3)
    } else if (params.length > 1) {
      const [type, ...data] = params
      super(type, 3, 3, ...data)
    } else {
      throw new InvalidParameterError('params', params, [
        'The given parameters can\'t be passed to Matrix3D.clone, ',
        'Matrix3D.create or Matrix3D.wrap. Take a look to the documentation ',
        'for more information.'
      ].join(''))
    }
  }
}

Object.assign(Matrix3D, arithmetic)
Object.assign(Matrix3D, common)
Object.assign(Matrix3D, common3D)
