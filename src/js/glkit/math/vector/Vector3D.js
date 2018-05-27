import * as matrixCommon from '@glkit/math/matrix/common'
import * as matrixArithmetic from '@glkit/math/matrix/arithmetic'
import * as vectorCommon from './common'
import * as vectorArithmetic from './arithmetic'

import { Vector } from './Vector'
import { Vector2D } from './Vector2D'

export class Vector3D extends Vector {
  /**
  * Create a new empty 3D vector with base data.
  *
  * @param {NumberType} type - Type of the vector to create.
  * @param {...number} data - Initial content of the vector.
  *
  * @return {Vector3D} The created vector instance.
  */
  static ['of'] (type, ...data) {
    return Vector3D.create(type).setAll(...data)
  }

  /**
  * Create a new empty 3D vector full of zeroes of a given type.
  *
  * @param {NumberType} type - Type of the vector to create.
  *
  * @return {Vector3D} The created vector instance.
  */
  static create (
    type,
    result = Object.create(Vector3D.prototype)
  ) {
    return Vector.create(type, 3, result)
  }

  /**
  * Wrap a typed array as a 3D vector.
  *
  * @param {TypedArray} array - A typed array to wrap.
  *
  * @return {Vector3D} The created vector instance.
  */
  static wrap (
    array,
    result = Object.create(Vector3D.prototype)
  ) {
    // <development>
    if (array.length !== 3) {
      throw new InvalidParameterError(array, 'array', [
        'Unnable to wrap the given array into a Vector3D instance, because ',
        'the given array length is invalid : ', array.length, ' != 3'
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
  * @return {Vector3D} The cloned vector.
  */
  static clone (
    vector,
    result = Object.create(Vector3D.prototype)
  ) {
    // <development>
    if (vector.cells !== 3) {
      throw new InvalidParameterError(vector, 'vector', [
        'Unnable to clone the given vector as a Vector3D instance, because ',
        'the given vector dimension is invalid : ', vector.dimensions, ' != 2'
      ].join(''))
    }
    // </development>

    return Vector.clone(vector, result)
  }

  /**
  * Create a new 3D vector.
  *
  * Delegate the construction to Vector3D.clone, Vector3D.create or
  * Vector3D.wrap, by identifying the compatibility of theses methods with the
  * given parameters of the constructor.
  *
  * @param {...any} params - Parameters for the construction.
  */
  constructor (...params) {
    if (params.length === 1 && params[0] instanceof Vector) {
      super(...params)
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
        'The given parameters can\'t be passed to Vector3D.clone, ',
        'Vector3D.create or Vector3D.wrap. Take a look to the documentation ',
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
  * @return {number}
  */
  get z () {
    return this._content[2]
  }

  /**
  * @param {number} value
  */
  set z (value) {
    this._content[2] = value
  }

  /**
  * @return {Vector2D}
  */
  get xy () { return Vector2D.of(this._type, this.x, this.y) }

  /**
  * @return {Vector2D}
  */
  get yx () { return Vector2D.of(this._type, this.y, this.x) }

  /**
  * @return {Vector2D}
  */
  get yz () { return Vector2D.of(this._type, this.y, this.z) }

  /**
  * @return {Vector2D}
  */
  get zy () { return Vector2D.of(this._type, this.z, this.y) }

  /**
  * @return {Vector2D}
  */
  get xz () { return Vector2D.of(this._type, this.x, this.z) }

  /**
  * @return {Vector2D}
  */
  get zx () { return Vector2D.of(this._type, this.z, this.x) }

  /**
  * @return {Vector2D}
  */
  get xx () { return Vector2D.of(this._type, this.x, this.x) }

  /**
  * @return {Vector2D}
  */
  get yy () { return Vector2D.of(this._type, this.y, this.y) }

  /**
  * @return {Vector2D}
  */
  get zz () { return Vector2D.of(this._type, this.z, this.z) }

  /**
  * @return {Vector3D}
  */
  get xxx () { return Vector3D.of(this._type, this.x, this.x, this.x) }

  /**
  * @return {Vector3D}
  */
  get xxy () { return Vector3D.of(this._type, this.x, this.x, this.y) }

  /**
  * @return {Vector3D}
  */
  get xxz () { return Vector3D.of(this._type, this.x, this.x, this.z) }

  /**
  * @return {Vector3D}
  */
  get xyx () { return Vector3D.of(this._type, this.x, this.y, this.x) }

  /**
  * @return {Vector3D}
  */
  get xyy () { return Vector3D.of(this._type, this.x, this.y, this.y) }

  /**
  * @return {Vector3D}
  */
  get xyz () { return Vector3D.clone(this) }

  /**
  * @return {Vector3D}
  */
  get xzx () { return Vector3D.of(this._type, this.x, this.z, this.x) }

  /**
  * @return {Vector3D}
  */
  get xzy () { return Vector3D.of(this._type, this.x, this.z, this.y) }

  /**
  * @return {Vector3D}
  */
  get xzz () { return Vector3D.of(this._type, this.x, this.z, this.z) }

  /**
  * @return {Vector3D}
  */
  get yxx () { return Vector3D.of(this._type, this.y, this.x, this.x) }

  /**
  * @return {Vector3D}
  */
  get yxy () { return Vector3D.of(this._type, this.y, this.x, this.y) }

  /**
  * @return {Vector3D}
  */
  get yxz () { return Vector3D.of(this._type, this.y, this.x, this.z) }

  /**
  * @return {Vector3D}
  */
  get yyx () { return Vector3D.of(this._type, this.y, this.y, this.x) }

  /**
  * @return {Vector3D}
  */
  get yyy () { return Vector3D.of(this._type, this.y, this.y, this.y) }

  /**
  * @return {Vector3D}
  */
  get yyz () { return Vector3D.of(this._type, this.y, this.y, this.z) }

  /**
  * @return {Vector3D}
  */
  get yzx () { return Vector3D.of(this._type, this.y, this.z, this.x) }

  /**
  * @return {Vector3D}
  */
  get yzy () { return Vector3D.of(this._type, this.y, this.z, this.y) }

  /**
  * @return {Vector3D}
  */
  get yzz () { return Vector3D.of(this._type, this.y, this.z, this.z) }

  /**
  * @return {Vector3D}
  */
  get zxx () { return Vector3D.of(this._type, this.z, this.x, this.x) }

  /**
  * @return {Vector3D}
  */
  get zxy () { return Vector3D.of(this._type, this.z, this.x, this.y) }

  /**
  * @return {Vector3D}
  */
  get zxz () { return Vector3D.of(this._type, this.z, this.x, this.z) }

  /**
  * @return {Vector3D}
  */
  get zyx () { return Vector3D.of(this._type, this.z, this.y, this.x) }

  /**
  * @return {Vector3D}
  */
  get zyy () { return Vector3D.of(this._type, this.z, this.y, this.y) }

  /**
  * @return {Vector3D}
  */
  get zyz () { return Vector3D.of(this._type, this.z, this.y, this.z) }

  /**
  * @return {Vector3D}
  */
  get zzx () { return Vector3D.of(this._type, this.z, this.z, this.x) }

  /**
  * @return {Vector3D}
  */
  get zzy () { return Vector3D.of(this._type, this.z, this.z, this.y) }

  /**
  * @return {Vector3D}
  */
  get zzz () { return Vector3D.of(this._type, this.z, this.z, this.z) }
}

Object.assign(Vector3D, matrixCommon)
Object.assign(Vector3D, vectorCommon)
Object.assign(Vector3D, matrixArithmetic)
Object.assign(Vector3D, vectorArithmetic)
