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
    throw new Error('Matrix#width is not implemented.')
  }

  /**
  * Return the height of the matrix.
  *
  * @return {number} The height of the matrix.
  */
  get height () {
    throw new Error('Matrix#height is not implemented.')
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
    throw new Error('Matrix#get(column : number, row : number) : number is not implemented.')
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
    throw new Error('Matrix#set(column : number, row : number, value : number) : Matrix is not implemented.')
  }

  /**
  * Add another matrix.
  *
  * @param {Matrix} other - The other matrix to add.
  *
  * @return {Matrix} An updated instance of this matrix.
  */
  add (other) {
    throw new Error('Matrix#add(other : Matrix) : Matrix is not implemented.')
  }

  /**
  * Subtract another matrix.
  *
  * @param {Matrix} other - The other matrix to subtract.
  *
  * @return {Matrix} An updated instance of this matrix.
  */
  sub (other) {
    throw new Error('Matrix#subtract(other : Matrix) : Matrix is not implemented.')
  }

  /**
  * Divide this matrix.
  *
  * @param {number} scalar - The scalar to use for the division.
  *
  * @return {Matrix} An updated instance of this matrix.
  */
  div (scalar) {
    throw new Error('Matrix#div(scalar : number) : Matrix is not implemented.')
  }

  /**
  * Multiply with another matrix, vector, or scalar.
  *
  * @param {Matrix|Vector|number} other - The other matrix, vector or scalar to use.
  *
  * @return {Matrix|Vector} An updated instance of this matrix.
  */
  mul (other) {
    throw new Error('Matrix#mul(other : Matrix|Vector|number) : Matrix|Vector is not implemented.')
  }

  /**
  * @see https://en.wikipedia.org/wiki/Determinant
  *
  * @return {number} The determinant of the matrix.
  */
  get determinant () {
    throw new Error('Matrix#get determinant() : number is not implemented.')
  }

  /**
  * Transpose this matrix.
  *
  * @see https://en.wikipedia.org/wiki/Transpose
  *
  * @return {Matrix} An updated instance of this matrix.
  */
  transpose () {
    throw new Error('Matrix#transpose() : Matrix is not implemented.')
  }

  /**
  * Invert this matrix.
  *
  * @see https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution
  *
  * @return {Matrix} An updated instance of this matrix.
  */
  invert () {
    throw new Error('Matrix#invert() : Matrix is not implemented.')
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
    throw new Error('Matrix#row(row : number, ...values) : Matrix|Vector is not implemented.')
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
    throw new Error('Matrix#column(column : number, ...values) : Matrix|Vector is not implemented.')
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
