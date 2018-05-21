// <development>
import { InvalidParameterError } from '@errors'

import { haveSameDimensions } from './common'
// </development>

/**
* Perform an addition of two matrix of arbitrary size.
*
* @param {Matrix} left - Left operand matrix.
* @param {Matrix} right - Right operand matrix.
* @param {Matrix} [result = left] - Result matrix, by default the left operand.
*
* @return {Matrix} The given updated result matrix.
*/
export function add (left, right, result = left) {
  // <development>
  if (!haveSameDimensions(left, right)) {
    throw new InvalidParameterError ("right", right, [
      "Invalid right operand : the right operand matrix must have the same ",
      "dimensions as the left operand. ", right.columns, "x", right.rows,
      " given, ", left.columns, "x", left.rows, " expected."
    ].join(''))
  }

  if (!haveSameDimensions(left, result)) {
    throw new InvalidParameterError ("result", result, [
      "Invalid result matrix : the result matrix must have the same ",
      "dimensions as the left operand. ", result.columns, "x", result.rows,
      " given, ", left.columns, "x", left.rows, " expected."
    ].join(''))
  }
  // </development>

  const leftContent = left.content
  const rightContent = right.content
  const resultContent = result.content

  let index = left.cells

  while (index --) {
    resultContent[index] = leftContent[index] + rightContent[index]
  }

  return result
}

/**
* Perform a subtraction of two matrix of arbitrary size.
*
* @param {Matrix} left - Left operand matrix.
* @param {Matrix} right - Right operand matrix.
* @param {Matrix} [result = left] - Result matrix, by default the left operand.
*
* @return {Matrix} The given updated result matrix.
*/
export function subtract (left, right, result = left) {
  // <development>
  if (!haveSameDimensions(left, right)) {
    throw new InvalidParameterError ("right", right, [
      "Invalid right operand : the right operand matrix must have the same ",
      "dimensions as the left operand. ", right.columns, "x", right.rows,
      " given, ", left.columns, "x", left.rows, " expected."
    ].join(''))
  }

  if (!haveSameDimensions(left, result)) {
    throw new InvalidParameterError ("result", result, [
      "Invalid result matrix : the result matrix must has have same ",
      "dimensions as the left operand. ", result.columns, "x", result.rows,
      " given, ", left.columns, "x", left.rows, " expected."
    ].join(''))
  }
  // </development>

  const leftContent = left.content
  const rightContent = right.content
  const resultContent = result.content

  let index = left.cells

  while (index --) {
    resultContent[index] = leftContent[index] - rightContent[index]
  }

  return result
}

/**
* Perform a multiplication of a matrix and a valid right operand.
*
* @param {Matrix} left - Left operand matrix.
* @param {Matrix|number} right - Right operand.
* @param {Matrix} [result = left] - Result matrix.
*
* @return {Matrix} The updated result matrix.
*/
export function multiply (left, right, result) {
  if (typeof right === 'number') {
    return multiplyWithScalar(left, right, result)
  } else {
    return multiplyWithMatrix(left, right, result)
  }
}

/**
* Perform a multiplication of two matrix of arbitrary size.
*
* @param {Matrix} left - Left operand matrix.
* @param {Matrix} right - Right operand matrix.
* @param {Matrix} result - Result matrix, must be a valid third matrix.
*
* @return {Matrix} The given updated result matrix.
*/
export function multiplyWithMatrix (left, right, result) {
  // <development>
  if (left.columns !== right.rows) {
    throw new InvalidParameterError ("right", right, [
      "Invalid right operand : the right operand matrix must have the same ",
      "number of rows as the number of columns of the left operand matrix",
      right.columns, "x", right.rows, " given, ", right.columns, "x",
      left.rows, " expected."
    ].join(''))
  }

  if (result.columns !== right.columns || result.rows !== left.rows) {
    throw new InvalidParameterError ("result", result, [
      "Invalid result matrix : the result matrix must has the same ",
      "number of columns as the right matrix and the same number of rows as ",
      "the left matrix : ", result.columns, "x", result.rows,
      " given, ", right.columns, "x", left.rows, " expected."
    ].join(''))
  }

  if (result === left || result === right) {
    throw new InvalidParameterError("result", result, [
      "Invalid result matrix : the result matrix must nor be the left ",
      "operand matrix, nor the right operand matrix, a multiplication of ",
      "matrices can't be done on the fly on one of the operand of the ",
      "multiplication."
    ])
  }
  // </development>

  const leftContent = left.content
  const leftColumns = left.columns

  const rightContent = right.content
  const rightColumns = right.columns

  const resultContent = result.content
  const resultRows = result.rows
  const resultColumns = result.columns

  const iterations = leftColumns

  let resultColumn = result.columns

  while (resultColumn--) {
    let resultRow = resultRows
    while (resultRow--) {
      let cellResult = 0
      let iteration = iterations

      while (iteration--) {
        cellResult += leftContent[
          iteration + resultRow * leftColumns
        ] * rightContent[
          resultColumn + iteration * rightColumns
        ]
      }

      resultContent[resultColumn + resultRow * resultColumns] = cellResult
    }
  }

  return result
}

/**
* Perform a multiplication of a matrix of arbitrary size by a scalar.
*
* @param {Matrix} left - Left operand matrix.
* @param {number} scalar - Right operand scalar.
* @param {Matrix} [result = left] - Result matrix, the left matrix by default.
*
* @return {Matrix} The given updated result matrix.
*/
export function multiplyWithScalar (left, scalar, result) {
  // <development>
  if (!haveSameDimensions(left, result)) {
    throw new InvalidParameterError ("result", result, [
      "Invalid result matrix : the result matrix must have the same ",
      "dimensions as the left operand. ", result.columns, "x", result.rows,
      " given, ", left.columns, "x", left.rows, " expected."
    ].join(''))
  }
  // </development>

  const leftContent = left.content
  const resultContent = result.content

  let index = left.cells

  while (index --) {
    resultContent[index] = leftContent[index] * scalar
  }

  return result
}


/**
* Divide a matrix by a scalar.
*
* @param {Matrix} left - Matrix to divide.
* @param {number} right - Scalar used as a denominator
* @param {Matrix} [result = left] - Result matrix, by default the left operand matrix.
*
* @return {Matrix} The given updated result matrix.
*/
export function divide (left, right, result = left) {
  // <development>
  if (!haveSameDimensions(left, result)) {
    throw new InvalidParameterError ("result", result, [
      "Invalid result matrix : the result matrix must have the same ",
      "dimensions as the left operand. ", result.columns, "x", result.rows,
      " given, ", left.columns, "x", left.rows, " expected."
    ].join(''))
  }
  // </development>

  const leftContent = left.content
  const resultContent = result.content

  let index = left.cells

  while (index --) {
    resultContent[index] = leftContent[index] / right
  }

  return result
}

/**
* Transpose a given matrix.
*
* @param {Matrix} matrix - Matrix to transpose.
* @param {Matrix} [result = matrix] - Result matrix, by default the given matrix.
*
* @return {Matrix} The given updated result matrix.
*/
export function transpose (matrix, result = matrix) {
  // <development>
  if (matrix.columns !== result.rows || matrix.rows !== result.columns) {
    throw new InvalidParameterError ("result", result, [
      "Invalid result matrix : the result matrix must have the same ",
      "number of rows as the number of columns of the transposed matrix and ",
      "the same number of columns as the number of rows of the transposed ",
      "matrix", result.columns, "x", result.rows, " given, ", matrix.rows, "x",
      matrix.columns, " expected."
    ].join(''))
  }
  // </development>
  const matrixContent = matrix.content
  const resultContent = result.content

  if (matrix.rows === matrix.columns) {
    const rows = matrix.rows

    let column = rows

    while (column--) {
      let row = column
      while (row--) {
        const tmp = matrixContent[column + row * rows]
        resultContent[column + row * rows] = matrixContent[column * rows + row]
        resultContent[column * rows + row] = tmp
      }
    }
  } else {
    const matrixRows = matrix.rows
    const matrixColumns = matrix.columns

    const resultColumns = result.columns
    const resultRows = result.rows

    let column = resultColumns

    while (column--) {
      let row = resultRows
      while (row--) {
        resultContent[column + row * resultColumns] = matrixContent[
          row + column * matrixColumns
        ]
      }
    }
  }

  return result
}
