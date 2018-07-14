import { of as typeOfBuffer } from '../../NumberType'

/**
* Transform a matrix of a buffer into a string.
*
* @param {TypedArray} matrixBuffer - The buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - The offset to apply when we read the given buffer.
* @param {number} matrixColumns - Columns of the matrix to print.
* @param {number} matrixRows - Rows of the matrix to print.
*
* @return {String} A string representation of the given matrix.
*/
export function toString (
  matrixBuffer, matrixBufferOffset,
  matrixColumns, matrixRows
) {
  if (matrixBuffer == null) {
    return 'matrix null'
  } else if (matrixColumns === 0 || matrixRows === 0){
    return 'matrix ' +
           `${matrixColumns}x${matrixRows} ${typeOfBuffer(matrixBuffer)} ` +
           '[]'
  } else {
    const cellTokens = []
    const columns = matrixColumns
    const cells = matrixColumns * matrixRows

    let cell = cells

    while (cell--) {
      if (cell < cells - 1) {
        if (cell != 0 && (cell + 1) % columns == 0) {
          cellTokens.unshift(',')
        } else {
          cellTokens.unshift(', ')
        }
      }
      cellTokens.unshift(matrixBuffer[matrixBufferOffset + cell].toFixed(4))
      if (cell != 0 && cell % columns == 0) cellTokens.unshift('\n\r')
    }

    return [
      `matrix ${matrixColumns}x${matrixRows} ${typeOfBuffer(matrixBuffer)} `,
      '[\n\r', cellTokens.join(''), '\n\r]'
    ].join('')
  }
}

/**
* Fill a matrix of a buffer with a given value.
*
* @param {TypedArray} leftBuffer - Buffer that contains the matrix to fill.
* @param {number} leftBufferOffset - Offset to apply when we write into the given buffer.
* @param {number} cells - Cells of the matrix to update.
* @param {number} value - Value to set in each cell of the given matrix.
*
* @return {TypedArray} The buffer with the updated matrix.
*/
export function fill (
  leftBuffer, leftBufferOffset,
  cells, value
) {
  let index = cells

  while (index --) {
    leftBuffer[leftBufferOffset + index] = value
  }

  return leftBuffer
}

/**
* Compare two matrices and return true if they are both equals.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the buffer that contains the left operand matrix.
* @param {TypedArray} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the buffer that contains the right operand matrix.
* @param {number} cells - Cells of each matrices to compare.
* @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
*
* @return {boolean} True if both matrices are equals.
*/
export function equals (
  leftBuffer, leftBufferOffset,
  rightBuffer, rightBufferOffset,
  cells, tolerance = number.EPSILON
) {
  let index = cells

  while (index --) {
    if (
      Math.abs(
        leftBuffer[
          leftBufferOffset + index
        ] - rightBuffer[
          rightBufferOffset + index
        ]
      ) > tolerance
    ) {
      return false
    }
  }

  return true
}
