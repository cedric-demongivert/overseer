import { Vector } from './Vector'
import { GLType } from '@glkit/gl/GLType'

const _it_ = Symbol.iterator

export class Vector2f extends Vector {
  /**
  * Create a new vector 2f.
  *
  * @param {number} [x = 0] - X component of the vector.
  * @param {number} [y = 0] - Y component of the vector.
  */
  constructor (x = 0, y = 0) {
    super()

    this._x = x
    this._y = y

    this[GLType.type] = GLType.FLOAT_VEC2
    this[GLType.size] = 1
  }

  /**
  * Create a vector2f from a sequence of scalar.
  *
  * @param {...any} params - The sequence of scalar to use.
  */
  static from (...params) {
    const iterator = params.length > 1 ? params[_it_]() : params[0][_it_]()
    return new Vector2f(iterator.next().value || 0, iterator.next().value || 0)
  }

  /**
  * Create a new vector 2f.
  *
  * @param {number} [x = 0] - X component of the vector.
  * @param {number} [y = 0] - Y component of the vector.
  */
  static create (x = 0, y = 0) {
    return new Vector2f(x, y)
  }

  /**
  * @override
  */
  get dimension () {
    return 2
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
      default:
        throw new RangeError(`Index out of bounds : ${index} not in {0, 1}.`)
    }
  }

  /**
  * @override
  */
  set (index, value) {
    switch (index) {
      case 0:
        return new Vector2f(value, this._y)
      case 1:
        return new Vector2f(this._x, value)
      default:
        throw new RangeError(`Index out of bounds : ${index} not in {0, 1}.`)
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
  * @param {number} value
  * @return {Vector2f} A new updated instance of this vector.
  */
  setX (value) {
    return new Vector2f(value, this._y)
  }

  /**
  * @param {number} value
  * @return {Vector2f} A new updated instance of this vector.
  */
  setY (value) {
    return new Vector2f(this._x, value)
  }

  /**
  * @return {Vector2f}
  */
  get xy () {
    return this
  }

  /**
  * @return {Vector2f}
  */
  get yx () {
    return new Vector2f(this._y, this._x)
  }

  /**
  * @override
  */
  add (...params) {
    const iterator = params.length > 1 ? params[_it_]() : params[0][_it_]()

    return new Vector2f(
      this._x + (iterator.next().value || 0),
      this._y + (iterator.next().value || 0)
    )
  }

  /**
  * @override
  */
  sub (...params) {
    const iterator = params.length > 1 ? params[_it_]() : params[0][_it_]()

    return new Vector2f(
      this._x - (iterator.next().value || 0),
      this._y - (iterator.next().value || 0)
    )
  }

  /**
  * @override
  */
  mul (value) {
    if (typeof value === 'number') {
      return new Vector2f(this._x * value, this._y * value)
    } else {
      // @TODO
    }
  }

  /**
  * @override
  */
  div (value) {
    return new Vector2f(this._x / value, this._y / value)
  }

  /**
  * @override
  */
  dot (...params) {
    const iterator = params.length > 1 ? params[_it_]() : params[0][_it_]()

    return this._x * (iterator.next().value || 0) +
           this._y * (iterator.next().value || 0)
  }

  /**
  * @override
  */
  get squaredLength () {
    return this._x * this._x + this._y * this._y
  }

  /**
  * @override
  */
  equal (...params) {
    const iterator = params.length > 1 ? params[_it_]() : params[0][_it_]()

    return Math.abs(this._x - (iterator.next().value || 0)) <= Number.EPSILON &&
           Math.abs(this._y - (iterator.next().value || 0)) <= Number.EPSILON &&
           iterator.next().done
  }

  /**
  * @override
  */
  map (mapper) {
    const array = [this._x, this._y]
    return new Vector2f(
      mapper(this._x, 0, array),
      mapper(this._y, 1, array)
    )
  }

  /**
  * @override
  */
  reduce (reducer, base) {
    if (base !== undefined) {
      return reducer(reducer(base, this._x), this._y)
    } else {
      return reducer(this._x, this._y)
    }
  }

  /**
  * Return this vector as a string.
  *
  * @return {string} This vector as a string.
  */
  toString () {
    return `Vector2f(${this._x}, ${this._y})`
  }

  /**
  * Return an iterator over this vector.
  *
  * @return {Iterator<number>} An iterator over this vector.
  */
  * [Symbol.iterator] () {
    yield this._x
    yield this._y
  }

  /**
  * Return the GLValue associated to this object.
  *
  * @return {any} The GLValue associated to this object.
  */
  get [GLType.value] () {
    return this
  }
}
