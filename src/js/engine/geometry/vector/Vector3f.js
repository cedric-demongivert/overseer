import { Vector } from './Vector'
import { Vector2f } from './Vector2f'
import { GLType } from '../../gl'

const _it_ = Symbol.iterator

export class Vector3f extends Vector {
  /**
  * Create a new vector3f.
  *
  * @param {number} [x = 0] - X component of the vector.
  * @param {number} [y = 0] - Y component of the vector.
  * @param {number} [z = 0] - Z component of the vector.
  */
  constructor (x = 0, y = 0, z = 0) {
    super()

    this._x = x
    this._y = y
    this._z = z

    this[GLType.type] = GLType.FLOAT_VEC3
    this[GLType.size] = 1
  }

  /**
  * Create a vector3f from a sequence of scalar.
  *
  * @param {...any} params - The sequence of scalar to use.
  */
  static from (...params) {
    const iterator = params.length > 1 ? params[_it_]() : params[0][_it_]()
    return new Vector3f(
      iterator.next().value || 0,
      iterator.next().value || 0,
      iterator.next().value || 0
    )
  }

  /**
  * Create a new vector3f.
  *
  * @param {number} [x = 0] - X component of the vector.
  * @param {number} [y = 0] - Y component of the vector.
  * @param {number} [z = 0] - Z component of the vector.
  */
  static create (x = 0, y = 0, z = 0) {
    return new Vector3f(x, y, z)
  }

  /**
  * @override
  */
  get dimension () {
    return 3
  }

  /**
  * @override
  */
  get (index) {
    switch (index) {
      case 0:
        return this._x
      case 1:
        return this._y
      case 2:
        return this._z
      default:
        throw new Error(`Index out of bounds : ${index}.`)
    }
  }

  /**
  * @override
  */
  set (index, value) {
    switch (index) {
      case 0:
        return new Vector3f(value, this._y, this._z)
      case 1:
        return new Vector3f(this._x, value, this._z)
      case 2:
        return new Vector3f(this._x, this._y, value)
      default:
        throw new RangeError(`Index out of bounds : ${index} not in {0, 1, 2}.`)
    }
  }

  /**
  * @return {number}
  */
  get x () {
    return this._x
  }

  /**
  * @return {number}
  */
  get y () {
    return this._y
  }

  /**
  * @return {number}
  */
  get z () {
    return this._z
  }

  /**
  * @param {number} value
  * @return {Vector3f} A new updated instance of this vector.
  */
  setX (value) {
    return new Vector3f(value, this._y, this._z)
  }

  /**
  * @param {number} value
  * @return {Vector3f} A new updated instance of this vector.
  */
  setY (value) {
    return new Vector3f(this._x, value, this._z)
  }

  /**
  * @param {number} value
  * @return {Vector3f} A new updated instance of this vector.
  */
  setZ (value) {
    return new Vector3f(this._x, this._y, value)
  }

  /**
  * @return {Vector2f}
  */
  get xy () { return Vector2f.create(this._x, this._y) }

  /**
  * @return {Vector2f}
  */
  get yx () { return Vector2f.create(this._y, this._x) }

  /**
  * @return {Vector2f}
  */
  get yz () { return Vector2f.create(this._y, this._z) }

  /**
  * @return {Vector2f}
  */
  get zy () { return Vector2f.create(this._z, this._y) }

  /**
  * @return {Vector2f}
  */
  get xz () { return Vector2f.create(this._x, this._z) }

  /**
  * @return {Vector2f}
  */
  get zx () { return Vector2f.create(this._z, this._x) }

  /**
  * @return {Vector2f}
  */
  get xx () { return Vector2f.create(this._x, this._x) }

  /**
  * @return {Vector2f}
  */
  get yy () { return Vector2f.create(this._y, this._y) }

  /**
  * @return {Vector2f}
  */
  get zz () { return Vector2f.create(this._z, this._z) }

  /**
  * @return {Vector3f}
  */
  get xxx () { return Vector3f.create(this._x, this._x, this._x) }

  /**
  * @return {Vector3f}
  */
  get xxy () { return Vector3f.create(this._x, this._x, this._y) }

  /**
  * @return {Vector3f}
  */
  get xxz () { return Vector3f.create(this._x, this._x, this._z) }

  /**
  * @return {Vector3f}
  */
  get xyx () { return Vector3f.create(this._x, this._y, this._x) }

  /**
  * @return {Vector3f}
  */
  get xyy () { return Vector3f.create(this._x, this._y, this._y) }

  /**
  * @return {Vector3f}
  */
  get xyz () { return this }

  /**
  * @return {Vector3f}
  */
  get xzx () { return Vector3f.create(this._x, this._z, this._x) }

  /**
  * @return {Vector3f}
  */
  get xzy () { return Vector3f.create(this._x, this._z, this._y) }

  /**
  * @return {Vector3f}
  */
  get xzz () { return Vector3f.create(this._x, this._z, this._z) }

  /**
  * @return {Vector3f}
  */
  get yxx () { return Vector3f.create(this._y, this._x, this._x) }

  /**
  * @return {Vector3f}
  */
  get yxy () { return Vector3f.create(this._y, this._x, this._y) }

  /**
  * @return {Vector3f}
  */
  get yxz () { return Vector3f.create(this._y, this._x, this._z) }

  /**
  * @return {Vector3f}
  */
  get yyx () { return Vector3f.create(this._y, this._y, this._x) }

  /**
  * @return {Vector3f}
  */
  get yyy () { return Vector3f.create(this._y, this._y, this._y) }

  /**
  * @return {Vector3f}
  */
  get yyz () { return Vector3f.create(this._y, this._y, this._z) }

  /**
  * @return {Vector3f}
  */
  get yzx () { return Vector3f.create(this._y, this._z, this._x) }

  /**
  * @return {Vector3f}
  */
  get yzy () { return Vector3f.create(this._y, this._z, this._y) }

  /**
  * @return {Vector3f}
  */
  get yzz () { return Vector3f.create(this._y, this._z, this._z) }

  /**
  * @return {Vector3f}
  */
  get zxx () { return Vector3f.create(this._z, this._x, this._x) }

  /**
  * @return {Vector3f}
  */
  get zxy () { return Vector3f.create(this._z, this._x, this._y) }

  /**
  * @return {Vector3f}
  */
  get zxz () { return Vector3f.create(this._z, this._x, this._z) }

  /**
  * @return {Vector3f}
  */
  get zyx () { return Vector3f.create(this._z, this._y, this._x) }

  /**
  * @return {Vector3f}
  */
  get zyy () { return Vector3f.create(this._z, this._y, this._y) }

  /**
  * @return {Vector3f}
  */
  get zyz () { return Vector3f.create(this._z, this._y, this._z) }

  /**
  * @return {Vector3f}
  */
  get zzx () { return Vector3f.create(this._z, this._z, this._x) }

  /**
  * @return {Vector3f}
  */
  get zzy () { return Vector3f.create(this._z, this._z, this._y) }

  /**
  * @return {Vector3f}
  */
  get zzz () { return Vector3f.create(this._z, this._z, this._z) }

  /**
  * @override
  */
  add (...params) {
    const iterator = params.length > 1 ? params[_it_]() : params[0][_it_]()

    return new Vector3f(
      this._x + (iterator.next().value || 0),
      this._y + (iterator.next().value || 0),
      this._z + (iterator.next().value || 0)
    )
  }

  /**
  * @override
  */
  sub (...params) {
    const iterator = params.length > 1 ? params[_it_]() : params[0][_it_]()

    return new Vector3f(
      this._x - (iterator.next().value || 0),
      this._y - (iterator.next().value || 0),
      this._z - (iterator.next().value || 0)
    )
  }

  /**
  * @override
  */
  mul (value) {
    if (typeof value === 'number') {
      return new Vector3f(this._x * value, this._y * value, this._z * value)
    } else {
      // @TODO
    }
  }

  /**
  * @override
  */
  div (value) {
    return new Vector3f(this._x / value, this._y / value, this._z / value)
  }

  /**
  * @override
  */
  dot (...params) {
    const iterator = params.length > 1 ? params[_it_]() : params[0][_it_]()

    return this._x * (iterator.next().value || 0) +
           this._y * (iterator.next().value || 0) +
           this._z * (iterator.next().value || 0)
  }

  /**
  * @override
  */
  get squaredLength () {
    return this._x * this._x + this._y * this._y + this._z * this._z
  }

  /**
  * @override
  */
  equal (...params) {
    const iterator = params.length > 1 ? params[_it_]() : params[0][_it_]()

    return Math.abs(this._x - (iterator.next().value || 0)) <= Number.EPSILON &&
           Math.abs(this._y - (iterator.next().value || 0)) <= Number.EPSILON &&
           Math.abs(this._z - (iterator.next().value || 0)) <= Number.EPSILON &&
           iterator.next().done
  }

  /**
  * @override
  */
  map (mapper) {
    const array = [this._x, this._y, this._z]
    return new Vector3f(
      mapper(this._x, 0, array),
      mapper(this._y, 1, array),
      mapper(this._z, 2, array)
    )
  }

  /**
  * @override
  */
  reduce (reducer, base) {
    if (base !== undefined) {
      return reducer(reducer(reducer(base, this._x), this._y), this._z)
    } else {
      return reducer(reducer(this._x, this._y), this._z)
    }
  }

  /**
  * Return this vector as a string.
  *
  * @return {string} This vector as a string.
  */
  toString () {
    return `Vector3f(${this._x}, ${this._y}, ${this._z})`
  }

  /**
  * Return an iterator over this vector.
  *
  * @return {Iterator<number>} An iterator over this vector.
  */
  * [Symbol.iterator] () {
    yield this._x
    yield this._y
    yield this._z
  }

  /**
  * Return the GLValue associated to this object.
  *
  * @return {GLValue} The GLValue associated to this object.
  */
  get [GLType.value] () {
    return this
  }
}
