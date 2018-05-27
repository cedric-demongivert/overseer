// <development>
import { InvalidParameterError } from '@errors'
// </development>

import { isArrayLike } from 'lodash'
import * as NumberType from '@glkit/math/NumberType'

import * as common from './common'
import * as arithmetic from './arithmetic'

import { GLType } from '@glkit/gl/GLType'

export class Matrix {
  /**
  * Create a new empty matrix full of zeroes of a given type with a given number of columns and a given number of rows.
  *
  * @param {NumberType} type - Type of the matrix to create.
  * @param {number} columns - Number of columns of the new matrix.
  * @param {number} rows - Number of rows of the new matrix.
  * @param {...number} data - Initial content of the matrix in a row-major presentation.
  *
  * @return {Matrix} The created matrix instance.
  */
  static ['of'] (type, columns, rows, ...data) {
    return Matrix.create(type, columns, rows).setAll(...data)
  }

  /**
  * Create a new empty matrix full of zeroes of a given type with a given number of columns and a given number of rows.
  *
  * @param {NumberType} type - Type of the matrix to create.
  * @param {number} columns - Number of columns of the new matrix.
  * @param {number} rows - Number of rows of the new matrix.
  *
  * @return {Matrix} The created matrix instance.
  */
  static create (
    type,
    columns,
    rows,
    result = Object.create(Matrix.prototype)
  ) {
    result._columns = columns
    result._rows = rows
    result._content = type.allocate(columns * rows)
    result._type = type

    return result
  }

  /**
  * Wrap a typed array as a matrix.
  *
  * @param {TypedArray} array - A typed array to wrap.
  * @param {number} columns - The number of columns of the new matrix.
  * @param {number} rows - The number of rows of the new matrix.
  *
  * @return {Matrix} The created matrix instance.
  */
  static wrap (
    array,
    columns,
    rows,
    result = Object.create(Matrix.prototype)
  ) {
    // <development>
    if (columns * rows !== array.length) {
      throw new InvalidParameterError ("array", array, [
        "Invalid wrapped array, the length of the given array does not equal ",
        "the number of cells of the requested matrix : ", array.length,
        " given ", columns * rows, " expected."
      ].join(''))
    }
    // </development>

    result._columns = columns
    result._rows = rows
    result._content = array
    result._type = NumberType.of(array)

    return result
  }

  /**
  * Clone a matrix and return the result.
  *
  * @param {Matrix} matrix - A matrix to clone.
  *
  * @return {Matrix} The cloned matrix.
  */
  static clone (
    matrix,
    result = Object.create(Matrix.prototype)
  ) {
    result._columns = matrix.columns
    result._rows = matrix.rows
    result._content = matrix.type.allocate(matrix.cells)
    result._type = matrix.type

    const content = matrix.content
    const resultContent = result._content
    let cell = matrix.cells

    while (cell--) resultContent[cell] = content[cell]

    return result
  }

  /**
  * Create a new matrix.
  *
  * Delegate the construction to Matrix.clone, Matrix.create or Matrix.wrap, by
  * identifying the compatibility of theses methods with the given parameters of
  * the constructor.
  *
  * @param {...any} params - Parameters for the construction.
  */
  constructor (...params) {
    if (params.length === 1) {
      Matrix.clone(...params, this)
    } else if (params.length === 3 && NumberType.is(params[0])) {
      Matrix.create(...params, this)
    } else if (params.length === 3) {
      Matrix.wrap(...params, this)
    } else if (params.length > 3) {
      const [type, columns, rows, ...data] = params
      Matrix.create(type, columns, rows, this).setAll(...data)
    } else {
      throw new InvalidParameterError('params', params, [
        'The given parameters can\'t be passed to Matrix.clone, Matrix.create ',
        'or Matrix.wrap. Take a look to the documentation for more ',
        'information.'
      ].join(''))
    }
  }

  /**
  * @return {TypedArray} The underlying array.
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
    if (this._columns === 1) {
      return _getVectorType(this._rows)
    } else if (this._rows === 1) {
      return _getVectorType(this._columns)
    } else if (this._columns === this._rows) {
      return _getMatrixType(this._columns)
    } else {
      return undefined
    }
  }

  _getMatrixType (dimension) {
    if (this._type === NumberType.FLOAT) {
      switch (dimension) {
        case 1: return GLType.FLOAT
        case 2: return GLType.FLOAT_MAT2
        case 3: return GLType.FLOAT_MAT3
        case 4: return GLType.FLOAT_MAT4
        default: return undefined
      }
    } else if (this._type === NumberType.INT) {
      switch (dimension) {
        case 1: return GLType.INT
        case 2: return GLType.INT_MAT2
        case 3: return GLType.INT_MAT3
        case 4: return GLType.INT_MAT4
        default: return undefined
      }
    } else {
      return undefined
    }
  }

  _getVectorType (dimension) {
    if (this._type === NumberType.FLOAT) {
      switch (dimension) {
        case 1: return GLType.FLOAT
        case 2: return GLType.FLOAT_VEC2
        case 3: return GLType.FLOAT_VEC3
        case 4: return GLType.FLOAT_VEC4
        default: return undefined
      }
    } else if (this._type === NumberType.INT) {
      switch (dimension) {
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
  * @return {Type} The type of this matrix.
  */
  get type () {
    return this._type
  }

  /**
  * @return {number} The number of rows in this matrix.
  */
  get rows () {
    return this._rows
  }

  /**
  * @return {number} The number of columns in this matrix.
  */
  get columns () {
    return this._columns
  }

  /**
  * @return {number} The number of cells in this matrix.
  */
  get cells () {
    return this._rows * this._columns
  }

  /**
  * @return {ArrayBuffer} The underlying buffer that store this matrix data.
  */
  get buffer () {
    return this._content.buffer
  }

  /**
  * @return {TypedArray} The content of this matrix as a typed array.
  */
  get content () {
    return this._content
  }

  /**
  * @param {Iterable<number>} content - New content of this matrix.
  */
  set content (value) {
    const content = this._content

    if (isArrayLike(value)) {
      let cellIndex = this.cells
      while (cellIndex--) content[cellIndex] = value[cellIndex] || 0
    } else {
      const cells = this.cells
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
  * Return a value of the matrix in accordance with the given parameters.
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
  * Return the content of a cell of the linearized representation of this matrix.
  *
  * @param {number} index - Index of the cell to get.
  *
  * @return {number} The content of the requested cell.
  */
  getLinear (index) {
    return this._content[index]
  }

  /**
  * Return the content of a cell of this matrix.
  *
  * @param {number} column - The column index of the cell to return.
  * @param {number} line - The line index of the cell to return.
  *
  * @return {number} The content of the requested cell.
  */
  getCell (column, line) {
    return this._content[column + line * this._columns]
  }

  /**
  * Mutate the content of this matrix in accordance with the given parameters.
  *
  * This method will delegate the computation to setLinear, setAll and setCell
  * in accordance with the given parameters.
  *
  * @param {...any} params
  *
  * @return {Matrix} This updated matrix instance.
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
  * Mutate the content of a cell of the linear representation of this matrix.
  *
  * @param {number} index - Index of the cell to mutate.
  * @param {number} value - The new value of the cell to mutate.
  *
  * @return {Matrix} This updated matrix instance.
  */
  setLinear (index, value) {
    this._content[index] = value
    return this
  }

  /**
  * Mutate the content of a cell of this matrix.
  *
  * @param {number} column - Column index of the cell to mutate.
  * @param {number} line - Line index of the cell to mutate.
  * @param {number} value - The new value of the cell to mutate.
  *
  * @return {Matrix} This updated matrix instance.
  */
  setCell (column, line, value) {
    this._content[column + line * this._columns] = value
    return this
  }

  /**
  * Mutate the entire content of this matrix.
  *
  * @param {...number} values - Values to set for each cell of the linearized representation of this matrix.
  *
  * @return {Matrix} This updated matrix instance.
  */
  setAll (...values) {
    this.content = values
    return this
  }

  /**
  * Iterate over a column of this matrix.
  *
  * @param {number} columnIndex - Index of the column to iterate.
  *
  * @return {Iterator<number>} An iterator over the values of the given column.
  */
  * column (columnIndex) {
    const rows = this._rows
    const columns = this._columns

    let rowIndex = rows

    while (rowIndex--) {
      yield this._content[columnIndex + (rows - rowIndex - 1) * columns]
    }
  }

  /**
  * Iterate over a row of this matrix.
  *
  * @param {number} rowIndex - Index of the row to iterate.
  *
  * @return {Iterator<number>} An iterator over the values of the given row.
  */
  * row (rowIndex) {
    const columns = this._columns
    let columnIndex = columns

    while (columnIndex--) {
      yield this._content[(columns - columnIndex - 1) + rowIndex * columns]
    }
  }

  /**
  * Update the content of a particular column of the matrix.
  *
  * @param {number} columnIndex - Index of the column to update.
  * @param {...number} content - New content of the column.
  *
  * @return {Matrix} The current matrix instance.
  */
  setColumn (columnIndex, ...content) {
    const columns = this._columns
    let rowIndex = this._rows

    while (rowIndex--) {
      this._content[columnIndex + rowIndex * columns] = content[rowIndex]
    }

    return this
  }

  /**
  * Update the content of a particular row of the matrix.
  *
  * @param {number} rowIndex - Index of the row to update.
  * @param {...number} content - New content of the row.
  *
  * @return {Matrix} The current matrix instance.
  */
  setRow (rowIndex, ...content) {
    const columns = this._columns
    let columnIndex = this._columns

    while (columnIndex--) {
      this._content[columnIndex + rowIndex * columns] = content[columnIndex]
    }

    return this
  }

  /**
  * Return a clone instance of this matrix.
  *
  * @return {Matrix} A clone instance of this matrix.
  */
  clone () {
    return Matrix.clone(this)
  }

  /**
  * Return an iterator over the content of the linearized representation of this matrix.
  *
  * @return {Iterator<number>} An iterator over the content of the linearized representation of this matrix.
  */
  * [Symbol.iterator] () {
    yield * this._content
  }

  /**
  * Return a string representation of this matrix.
  *
  * @return {string} A string representation of this matrix.
  */
  toString () {
    return Matrix.toString(this)
  }
}

Object.assign(Matrix, arithmetic)
Object.assign(Matrix, common)
