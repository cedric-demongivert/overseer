// <development>
import { InvalidParameterError } from '@errors'
// </development>

/**
* Return true if the given matrix is a square matrix.
*
* @param {Matrix} matrix - A matrix to check.
*
* @return {boolean} True if the given matrix is a square matrix.
*/
export function isSquareMatrix (matrix) {
  return matrix.columns === matrix.rows
}

/**
* Return true if the given matrices have the same dimensions.
*
* @param {Matrix} left - Left operand matrix.
* @param {Matrix} right - Right operand matrix.
*
* @return {boolean} True if the left matrix has the same dimensions as the second matrix.
*/
export function haveSameDimensions (left, right) {
  return left.columns === right.columns &&
         left.rows === right.rows
}

/**
* Set all cell of a matrix to a given value.
*
* @param {Matrix} target - Matrix to fill.
* @param {number} value - Value to set into all cells of the target matrix.
*
* @return {Matrix} The given matrix filled with the given value.
*/
export function fill (matrix, value) {
  const matrixContent = matrix.content
  let cellIndex = matrix.cells

  while (cellIndex--) {
    matrixContent[cellIndex] = value
  }

  return matrix
}

/**
* Transform the given matrix into a string.
*
* @param {Matrix} matrix - A matrix to transform.
*
* @return {String} A string representation of the given matrix.
*/
export function toString (matrix) {
  if (matrix == null) {
    return 'matrix null'
  } else if (matrix.columns === 0 || matrix.rows === 0){
    return `matrix ${matrix.columns}x${matrix.rows} ${matrix.type} []`
  } else {
    const cellTokens = []
    const content = matrix.content
    const columns = matrix.columns
    const cells = matrix.cells

    let cell = cells

    while (cell--) {
      if (cell < cells - 1) {
        if (cell != 0 && (cell + 1) % columns == 0) {
          cellTokens.unshift(',')
        } else {
          cellTokens.unshift(', ')
        }
      }
      cellTokens.unshift(content[cell].toFixed(4))
      if (cell != 0 && cell % columns == 0) cellTokens.unshift('\n\r')
    }

    return [
      `matrix ${matrix.columns}x${matrix.rows} ${matrix.type} [\n\r`,
      cellTokens.join(''),
      '\n\r]'
    ].join('')
  }
}

/**
* Copy the content of a matrix into another.
*
* @param {Matrix} source - The source matrix of the copy.
* @param {Matrix} destination - The destination of the copy.
*
* @return {Matrix} The updated destination matrix.
*/
export function fullCopy (source, destination) {
  // <development>
  if (!haveSameDimensions(source, destination)) {
    throw new InvalidParameterError('destination', destination, [
      'Invalid destination matrix : the given destination matrix does not ',
      'have the same dimensions as the source matrix. ', destination.columns,
      'x', destination.rows, ' received, ', source.columns, 'x', source.rows,
      ' expected.'
    ].join(''))
  }
  // </development>

  const sourceContent = source.content
  const destinationContent = destination.content

  let cellIndex = source.cells

  while (cellIndex--) {
    destinationContent[cellIndex] = sourceContent[cellIndex]
  }

  return destination
}

/**
* Partially copy the content of a matrix into another.
*
* @param {object} configuration - Configuration of the copy.
*
* @return {Matrix} The destination matrix.
*/
export function partialCopy ({
  source,
  destination,
  sourceColumnsOffset = 0,
  sourceRowsOffset = 0,
  destinationColumnsOffset = 0,
  destinationRowsOffset = 0,
  columnsToCopy = Math.min(
    source.columns - sourceColumnsOffset,
    destination.columns - destinationColumnsOffset
  ),
  rowsToCopy = Math.min(
    source.rows - sourceRowsOffset,
    destination.rows - destinationRowsOffset
  )
}) {
  // <development>
  if (sourceColumnsOffset + columnsToCopy > source.columns) {
    throw new InvalidParameterError(
      'sourceColumnsOffset', sourceColumnsOffset, [
        'Invalid source column offset : the sum of the given source column ',
        'offset and the given columns count to copy are greather than the ',
        'source matrix columns count.'
      ].join('')
    )
  }

  if (sourceRowsOffset + rowsToCopy > source.rows) {
    throw new InvalidParameterError(
      'sourceRowsOffset', sourceRowsOffset, [
        'Invalid source row offset : the sum of the given source row ',
        'offset and the given rows count to copy are greather than the ',
        'source matrix rows count.'
      ].join('')
    )
  }

  if (destinationColumnsOffset + columnsToCopy > destination.columns) {
    throw new InvalidParameterError(
      'destinationColumnsOffset', destinationColumnsOffset, [
        'Invalid destination column offset : the sum of the given destination ',
        'column offset and the given columns count to copy are greather ',
        'than the destination matrix columns count.'
      ].join('')
    )
  }

  if (destinationRowsOffset + rowsToCopy > destination.rows) {
    throw new InvalidParameterError(
      'destinationRowsOffset', destinationRowsOffset, [
        'Invalid destination row offset : the sum of the given destination ',
        'row offset and the given rows count to copy are greather than the ',
        'destination matrix rows count.'
      ].join('')
    )
  }
  // </development>

  const destinationContent = destination.content
  const sourceContent = source.content
  const destinationColumns = destination.columns
  const sourceColumns = source.columns

  let column = columnsToCopy

  while (column--) {
    let row = rowsToCopy
    while (row--) {
      destinationContent[
        destinationColumnsOffset + column +
        (destinationRowsOffset + row) * destinationColumns
      ] = sourceContent[
        sourceColumnsOffset + column +
        (sourceRowsOffset + row) * sourceColumns
      ]
    }
  }

  return destination
}

/**
* Execute a copy in accordance with the given parameters.
*
* @see fullCopy
* @see partialCopy
*
* @param {...any} parameters - The copy parameters.
*
* @return {Matrix} The updated destination matrix.
*/
export function copy (...params) {
  if (params.length == 1) {
    return partialCopy(...params)
  } else {
    return fullCopy(...params)
  }
}

/**
* Test if two matrix are equals.
*
* @param {Vector} right - Right operand matrix.
* @param {Vector} left - Left operand matrix.
* @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
*
* @return {boolean} True if both matrices are equals, false otherwise.
*/
export function equals (left, right, tolerance = Number.EPSILON) {
  if (left.cells !== right.cells) return false

  const leftContent = left.content
  const rightContent = right.content

  let cellIndex = left.cells

  while (cellIndex--) {
    if (
      Math.abs(leftContent[cellIndex] - rightContent[cellIndex]) > tolerance
    ) { return false }
  }

  return true
}
