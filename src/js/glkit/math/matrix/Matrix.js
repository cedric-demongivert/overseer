import { NotImplementedError } from '@errors'

function fillup (str, length) {
  if (str.length >= length) {
    return str
  } else {
    let result = str
    for (let i = str.length; i < length; ++i) {
      result = ' ' + result
    }
    return result
  }
}

/**
* A matrix.
*/
export class Matrix {
  /**
  * Return the width of the matrix.
  *
  * @return {number} The width of the matrix.
  */
  get width () {
    throw new NotImplementedError(Matrix, 'get width')
  }

  /**
  * Return the height of the matrix.
  *
  * @return {number} The height of the matrix.
  */
  get height () {
    throw new NotImplementedError(Matrix, 'get height')
  }

  /**
  * Return a value of the matrix.
  *
  * @param {number} column - The column index, between 0 and width.
  * @param {number} row - The row index, between 0 and height.
  *
  * @return {number} The value of the cell (column, row)
  */
  get (column, row) {
    throw new NotImplementedError(Matrix, 'get')
  }

  /**
  * Set a value of the matrix.
  *
  * @param {number} column - The column index, between 0 and width.
  * @param {number} row - The row index, between 0 and height.
  * @param {number} value - The new value to set.
  *
  * @return {Matrix} An updated instance of this matrix.
  */
  set (column, row, value) {
    throw new NotImplementedError(Matrix, 'set')
  }

  /**
  * Add another matrix.
  *
  * @param {Matrix} other - The other matrix to add.
  *
  * @return {Matrix} An updated instance of this matrix.
  */
  add (other) {
    throw new NotImplementedError(Matrix, 'add')
  }

  /**
  * Subtract another matrix.
  *
  * @param {Matrix} other - The other matrix to subtract.
  *
  * @return {Matrix} An updated instance of this matrix.
  */
  sub (other) {
    throw new NotImplementedError(Matrix, 'other')
  }

  /**
  * Divide this matrix.
  *
  * @param {number} scalar - The scalar to use for the division.
  *
  * @return {Matrix} An updated instance of this matrix.
  */
  div (scalar) {
    throw new NotImplementedError(Matrix, 'div')
  }

  /**
  * Multiply with another matrix, vector, or scalar.
  *
  * @param {Matrix|Vector|number} other - The other matrix, vector or scalar to use.
  *
  * @return {Matrix|Vector} An updated instance of this matrix.
  */
  mul (other) {
    throw new NotImplementedError(Matrix, 'mul')
  }

  /**
  * @see https://en.wikipedia.org/wiki/Determinant
  *
  * @return {number} The determinant of the matrix.
  */
  get determinant () {
    throw new NotImplementedError(Matrix, 'get determinant')
  }

  /**
  * Transpose this matrix.
  *
  * @see https://en.wikipedia.org/wiki/Transpose
  *
  * @return {Matrix} An updated instance of this matrix.
  */
  transpose () {
    throw new NotImplementedError(Matrix, 'transpose')
  }

  /**
  * Invert this matrix.
  *
  * @see https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution
  *
  * @return {Matrix} An updated instance of this matrix.
  */
  invert () {
    throw new NotImplementedError(Matrix, 'invert')
  }

  /**
  * Set or get a row of this matrix.
  *
  * @param {number} row - Index of the row to get, or set.
  * @param {...any} [values] - Values to set, if no values are passed, this method will act as a getter.
  *
  * @return {Matrix|Vector} An updated instance of this matrix or the vector that represent the row.
  */
  row (row, ...values) {
    throw new NotImplementedError(Matrix, 'row')
  }

  /**
  * Set or get a column of this matrix.
  *
  * @param {number} column - Index of the column.
  * @param {...any} [values] - Values to set, if no values are passed, this method will act as a getter.
  *
  * @return {Matrix|Vector} An updated instance of this matrix or the vector that represent the column.
  */
  column (column, ...values) {
    throw new NotImplementedError(Matrix, 'column')
  }

  /**
  * Return an iterator other a row of this matrix.
  *
  * @param {number} row - Index of the row.
  *
  * @return {Iterator<number>} An iterator over a row of the matrix.
  */
  * itrow (row) {
    for (let column = 0; column < this.width; ++column) {
      yield this.get(column, row)
    }
  }

  /**
  * Return an iterator other a column of the matrix.
  *
  * @param {number} column - Index of the column.
  *
  * @return {Iterator<number>} An iterator over a column of the matrix.
  */
  * itcolumn (column) {
    for (let row = 0; row < this.height; ++row) {
      yield this.get(column, row)
    }
  }

  /**
  * Iterate over each row of this matrix.
  *
  * @return {Iterator<Vector>} An iteror over each row of this matrix.
  */
  * rows () {
    for (let i = 0; i < this.height; ++i) {
      yield this.row(i)
    }
  }

  /**
  * Iterate over each column of this matrix.
  *
  * @return {Iterator<Vector>} An iteror over each column of this matrix.
  */
  * columns (...values) {
    for (let i = 0; i < this.width; ++i) {
      yield this.column(i)
    }
  }

  /**
  * @override
  */
  toString () {
    const tokens = this.rows().map(x => x.map(x => x.toFixed(3)))
    const max = tokens.map(
      x => x.reduce((a, b) => Math.max(b.length, a), 0)
    ).reduce((a, b) => Math.max(b, a), 0)

    return `Matrix [${this.width} x ${this.height}] {\n${
      tokens.map(x => x.map(x => fillup(x, max)).join(', ')).join('\n')
    }\n}`
  }

  /**
  * Return an iterator over each cell of this matrix, row by row.
  *
  * @return {Iterator<number>} An iterator over each cell of this matrix, row by row.
  */
  * [Symbol.iterator] () {
    for (let row = 0; row < this.height; ++row) {
      for (let col = 0; col < this.width; ++col) {
        yield this.get(col, row)
      }
    }
  }

  /**
  * @return
  */
  [Symbol.valueOf] () {
    return [...this.rows()]
  }
}

Matrix.valueOf = Symbol('Matrix.valueOf')
