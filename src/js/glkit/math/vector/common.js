/**
* Transform the given vector into a string.
*
* @param {Vector} vector - A vector to transform.
*
* @return {String} A string representation of the given vector.
*/
export function toString (vector) {
  if (vector == null) {
    return 'vector null'
  } else if (vector.dimension === 0){
    return `vector ${vector.dimension} ${vector.type} []`
  } else {
    return [
      `vector ${vector.dimension} ${vector.type} [`,
      [...vector].join(', '),
      ']'
    ].join('')
  }
}

/**
* Test if two vectors are equals.
*
* @param {Vector} right - Right operand vector.
* @param {Vector} left - Left operand vector.
* @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
*
* @return {boolean} True if both vector are equals, false otherwise.
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
