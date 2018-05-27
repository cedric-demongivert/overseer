import { isArrayLike } from 'lodash'

import * as NumberType from '@glkit/math/NumberType'

import * as matrixCommon from '@glkit/math/matrix/common'
import * as matrixArithmetic from '@glkit/math/matrix/arithmetic'
import * as vectorCommon from './common'
import * as vectorArithmetic from './arithmetic'

import { GLType } from '@glkit/gl/GLType'

export class Vector {
  /**
  * Create a new empty vector full of zeroes of a given type with a given number of dimensions.
  *
  * @param {NumberType} type - Type of the vector to create.
  * @param {number} dimensions - Number of components of this vector.
  * @param {...number} data - Initial content of the vector.
  *
  * @return {Vector} The created vector instance.
  */
  static ['of'] (type, ...data) {
    return Vector.create(type, data.length).setAll(...data)
  }

  /**
  * Create a new empty vector full of zeroes of a given type with a given number of dimensions.
  *
  * @param {NumberType} type - Type of the vector to create.
  * @param {number} dimensions - Number of dimensions of the vector to create.
  *
  * @return {Vector} The created vector instance.
  */
  static create (
    type,
    dimensions,
    result = Object.create(Vector.prototype)
  ) {
    result._dimensions = dimensions
    result._content = type.allocate(dimensions)
    result._type = type
    result._transposed = false

    return result
  }

  /**
  * Wrap a typed array as a vector.
  *
  * @param {TypedArray} array - A typed array to wrap.
  *
  * @return {Vector} The created vector instance.
  */
  static wrap (
    array,
    result = Object.create(Vector.prototype)
  ) {
    result._dimensions = array.length
    result._content = array
    result._type = NumberType.of(array)
    result._transposed = false

    return result
  }

  /**
  * Clone a Vector and return the result.
  *
  * @param {Vector} vector - A vector to clone.
  *
  * @return {Vector} The cloned vector.
  */
  static clone (
    vector,
    result = Object.create(Vector.prototype)
  ) {
    result._dimensions = vector.dimensions
    result._content = vector.type.allocate(vector.dimensions)
    result._type = vector.type
    result._transposed = vector.transposed

    const content = vector.content
    const resultContent = result._content
    let cell = vector.dimensions

    while (cell--) resultContent[cell] = content[cell]

    return result
  }

  /**
  * Create a new vector.
  *
  * Delegate the construction to Vector.clone, Vector.create or Vector.wrap, by
  * identifying the compatibility of theses methods with the given parameters of
  * the constructor.
  *
  * @param {...any} params - Parameters for the construction.
  */
  constructor (...params) {
    if (params.length === 1 && params[0] instanceof Vector) {
      Vector.clone(...params, this)
    } else if (params.length === 1) {
      Vector.wrap(...params, this)
    } else if (params.length === 2 && NumberType.is(params[0])) {
      Vector.create(...params, this)
    } else if (params.length >= 3) {
      const [type, ...data] = params
      Vector.create(type, data.length, this).setAll(...data)
    } else {
      throw new InvalidParameterError('params', params, [
        'The given parameters can\'t be passed to Vector.clone, Vector.create ',
        'or Vector.wrap. Take a look to the documentation for more ',
        'information.'
      ].join(''))
    }
  }

  /**
  * @return {TypedArray} The underlying buffer.
  */
  get [GLType.value] () {
    return this._content
  }

  /**
  * @return {number} The number of GLtype stored by this obbject.
  */
  get [GLType.size] () {
    return 1
  }

  /**
  * @return {GLType} The related GL type of this matrix.
  */
  get [GLType.type] () {
    if (this._type === NumberType.FLOAT) {
      switch (this._dimensions) {
        case 1: return GLType.FLOAT
        case 2: return GLType.FLOAT_VEC2
        case 3: return GLType.FLOAT_VEC3
        case 4: return GLType.FLOAT_VEC4
        default: return undefined
      }
    } else if (this._type === NumberType.INT) {
      switch (this._dimensions) {
        case 1: return GLType.INT
        case 2: return GLType.INT_VEC2
        case 3: return GLType.INT_VEC3
        case 4: return GLType.INT_VEC4
        default: return undefined
      }
    } else {
      return undefined
    }
  }

  /**
  * @return {Type} The type of this vector.
  */
  get type () {
    return this._type
  }

  /**
  * @return {number} The number of rows in this vector. (Matrix compatibility)
  */
  get rows () {
    return (this._transposed) ? 1 : this._dimensions
  }

  /**
  * @return {number} The number of columns in this vector. (Matrix compatibility)
  */
  get columns () {
    return (this._transposed) ? this._dimensions : 1
  }

  /**
  * @return {number} The number of cells in this vector. (Matrix compatibility)
  */
  get cells () {
    return this._dimensions
  }

  /**
  * @return {ArrayBuffer} The underlying buffer that store this vector data.
  */
  get buffer () {
    return this._content.buffer
  }

  /**
  * @return {TypedArray} The content of this vector as a typed array.
  */
  get content () {
    return this._content
  }

  /**
  * @return {number} The number of dimensions of this vector.
  */
  get dimensions () {
    return this._dimensions
  }

  /**
  * @param {Iterable<number>} content - New content of this vector.
  */
  set content (value) {
    const content = this._content

    if (isArrayLike(value)) {
      let cellIndex = this._dimensions
      while (cellIndex--) content[cellIndex] = value[cellIndex] || 0
    } else {
      const cells = this._dimensions
      let cellIndex = cells
      let iterator = value[Symbol.iterator]()
      let iteration = iterator.next()

      while (cellIndex--) {
        content[cells - cellIndex - 1] = iteration.done ? 0 : iteration.value
        iteration = iteration.done ? iteration : iterator.next()
      }
    }
  }

  /**
  * Return the squared length of this vector.
  *
  * @return {number} The squared length of this vector.
  */
  get squaredLength () {
    return Vector.squaredLength(this)
  }

  /**
  * Return the length of this vector.
  *
  * @return {number} The length of this vector.
  */
  get length () {
    return Vector.realLength(this)
  }

  /**
  * Return a value of the vector in accordance with the given parameters.
  *
  * This method will delegate the computation to getLinear, getCell or
  * get content, in accordance with the given parameters.
  *
  * @param {...any} parameters
  *
  * @return {number|TypedArray} The requested content.
  */
  get (...params) {
    if (params.length <= 0) {
      return this._content
    } else if (params.length == 1) {
      return this.getLinear(...params)
    } else {
      return this.getCell(...params)
    }
  }

  /**
  * Return the content of a cell of this vector.
  *
  * @param {number} index - Index of the cell to get.
  *
  * @return {number} The content of the requested cell.
  */
  getLinear (index) {
    return this._content[index]
  }

  /**
  * Return the content of a cell of this vector.
  *
  * @param {number} column - The column index of the cell to return.
  * @param {number} line - The line index of the cell to return.
  *
  * @return {number} The content of the requested cell.
  */
  getCell (column, line) {
    return this._content[column + line * this.columns]
  }

  /**
  * Mutate the content of this vector in accordance with the given parameters.
  *
  * This method will delegate the computation to setLinear, setAll and setCell
  * in accordance with the given parameters.
  *
  * @param {...any} params
  *
  * @return {Vector} This updated vector instance.
  */
  set (...params) {
    if (params.length == 2) {
      return this.setLinear(...params)
    } else if (params.length == 3) {
      return this.setCell(...params)
    } else {
      this.content = params
      return this
    }
  }

  /**
  * Mutate the content of a cell of this vector.
  *
  * @param {number} index - Index of the cell to mutate.
  * @param {number} value - The new value of the cell to mutate.
  *
  * @return {Vector} This updated vector instance.
  */
  setLinear (index, value) {
    this._content[index] = value
    return this
  }

  /**
  * Mutate the content of a cell of this vector.
  *
  * @param {number} column - Column index of the cell to mutate.
  * @param {number} line - Line index of the cell to mutate.
  * @param {number} value - The new value of the cell to mutate.
  *
  * @return {Vector} This updated vector instance.
  */
  setCell (column, line, value) {
    this._content[column + line * this.columns] = value
    return this
  }

  /**
  * Mutate the entire content of this vector.
  *
  * @param {...number} values - Values to set for each cell of the linearized representation of this vector.
  *
  * @return {Vector} This updated vector instance.
  */
  setAll (...values) {
    this.content = values
    return this
  }

  /**
  * Iterate over a column of this vector.
  *
  * @param {number} columnIndex - Index of the column to iterate.
  *
  * @return {Iterator<number>} An iterator over the values of the given column.
  */
  * column (columnIndex) {
    const rows = this.rows
    const columns = this.columns

    let rowIndex = rows

    while (rowIndex--) {
      yield this._content[columnIndex + (rows - rowIndex - 1) * columns]
    }
  }

  /**
  * Iterate over a row of this vector.
  *
  * @param {number} rowIndex - Index of the row to iterate.
  *
  * @return {Iterator<number>} An iterator over the values of the given row.
  */
  * row (rowIndex) {
    const columns = this.columns
    let columnIndex = columns

    while (columnIndex--) {
      yield this._content[(columns - columnIndex - 1) + rowIndex * columns]
    }
  }

  /**
  * Update the content of a particular column of the vector.
  *
  * @param {number} columnIndex - Index of the column to update.
  * @param {...number} content - New content of the column.
  *
  * @return {Vector} The current vector instance.
  */
  setColumn (columnIndex, ...content) {
    const columns = this.columns
    let rowIndex = this.rows

    while (rowIndex--) {
      this._content[columnIndex + rowIndex * columns] = content[rowIndex]
    }

    return this
  }

  /**
  * Update the content of a particular row of this vector.
  *
  * @param {number} rowIndex - Index of the row to update.
  * @param {...number} content - New content of the row.
  *
  * @return {Vector} The current vector instance.
  */
  setRow (rowIndex, ...content) {
    const columns = this.columns
    let columnIndex = this.columns

    while (columnIndex--) {
      this._content[columnIndex + rowIndex * columns] = content[columnIndex]
    }

    return this
  }

  /**
  * Return a clone instance of this vector.
  *
  * @return {Vector} A clone instance of this vector.
  */
  clone () {
    return Vector.clone(this)
  }

  /**
  * Negate this vector.
  *
  * @return {Vector} The current vector instance.
  */
  negate () {
    return Vector.negate(this)
  }

  /**
  * Normalize this vector.
  *
  * @return {Vector} The current vector instance.
  */
  normalize () {
    return Vector.normalize(this)
  }

  /**
  * Apply a maximum operation to this vector.
  *
  * @param {number} maximum - Maximum value allowed.
  *
  * @return {Vector} The current vector instance.
  */
  maximum (maximum) {
    return Vector.maximum(this, maximum)
  }

  /**
  * Apply a minimum operation to this vector.
  *
  * @param {number} minimum - Minimum value allowed.
  *
  * @return {Vector} The current vector instance.
  */
  minimum (minimum) {
    return Vector.minimum(this, minimum)
  }

  /**
  * Apply a clamp operation to this vector.
  *
  * @param {number} minimum - Minimum value allowed.
  * @param {number} maximum - Maximum value allowed.
  *
  * @return {Vector} The current vector instance.
  */
  clamp (minimum, maximum) {
    return Vector.clamp(this, minimum, maximum)
  }

  /**
  * Floor each component of this vector.
  *
  * @return {Vector} The current vector instance.
  */
  floor () {
    return Vector.floor(this)
  }

  /**
  * Ceil each component of this vector.
  *
  * @return {Vector} The current vector instance.
  */
  ceil () {
    return Vector.ceil(this)
  }

  /**
  * Round each component of this vector.
  *
  * @return {Vector} The current vector instance.
  */
  round () {
    return Vector.round(this)
  }

  /**
  * Test if the vector is equal to another vector.
  *
  * @param {Vector} other - Vector to use for the comparison.
  * @param {Number} [tolerance = Number.EPSILON] - Tolerance to use for the comparison.
  *
  * @return {boolean} True if this vector is equal to the other one.
  */
  equals (other, tolerance = Number.EPSILON) {
    return Vector.equals(this, other, tolerance)
  }

  /**
  * Return an iterator over the content of this vector.
  *
  * @return {Iterator<number>} An iterator over the content of this vector.
  */
  * [Symbol.iterator] () {
    yield * this._content
  }

  /**
  * Return a string representation of this vector.
  *
  * @return {string} A string representation of this vector.
  */
  toString () {
    return Vector.toString(this)
  }
}

Object.assign(Vector, matrixCommon)
Object.assign(Vector, vectorCommon)
Object.assign(Vector, matrixArithmetic)
Object.assign(Vector, vectorArithmetic)
