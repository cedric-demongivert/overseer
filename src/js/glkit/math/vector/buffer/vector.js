import { of as typeOfBuffer } from '../../NumberType'

/**
* Compute the dot product of two vector from two buffers and return the result.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand.
* @param {boolean} leftBufferOffset - Offset to use when we read the buffer that contains the left operand.
* @param {TypedArray} rightBuffer - Buffer that contains the right operand.
* @param {boolean} rightBufferOffset - Offset to use when we read the buffer that contains the right operand.
* @param {number} dimensions - Dimensions of both vectors to read.
*
* @return {number} The result of the dot product.
*/
export function dot (
  leftBuffer, leftBufferOffset,
  rightBuffer, rightBufferOffset,
  dimensions
) {
  let index = dimensions
  let result = 0

  while (index--) {
    result += leftBuffer[
      leftBufferOffset + index
    ] * rightBuffer[rightBufferOffset + index]
  }

  return result
}

/**
* Return the squared length of a vector from a buffer.
*
* @param {TypedArray} vectorBuffer - Buffer that contains the vector to transform.
* @param {boolean} vectorBufferOffset - Offset to use when we read the buffer that contains the vector to transform.
* @param {number} dimensions - Dimension of the vector to transform.
*
* @return {number} The squared length of the given vector.
*/
export function squaredLength (
  vectorBuffer,
  vectorBufferOffset,
  dimensions
) {
  let index = dimensions
  let result = 0

  while (index--) {
    const value = leftBuffer[leftBufferOffset + index]
    result += value * value
  }

  return result
}

/**
* Return the length of a vector from a buffer.
*
* @param {TypedArray} vectorBuffer - Buffer that contains the vector to transform.
* @param {boolean} vectorBufferOffset - Offset to use when we read the buffer that contains the vector to transform.
* @param {number} dimensions - Dimension of the vector to transform.
*
* @return {number} The length of the given vector.
*/
export function length (
  vectorBuffer,
  vectorBufferOffset,
  dimensions
) {
  return Math.sqrt(squaredLength(
    vectorBuffer,
    vectorBufferOffset,
    dimensions
  ))
}

/**
* Transform a vector from a buffer into a string.
*
* @param {TypedArray} vectorBuffer - Buffer that contains the vector to transform.
* @param {boolean} vectorBufferOffset - Offset to use when we read the buffer that contains the vector to transform.
* @param {number} dimensions - Dimension of the vector to transform.
*
* @return {String} A string representation of the given vector.
*/
export function toString (
  vectorBuffer,
  vectorBufferOffset,
  dimensions
) {
  if (vectorBuffer == null) {
    return 'vector null'
  } else if (dimensions === 0){
    return `vector ${dimensions} ${typeOfBuffer(vectorBuffer)} []`
  } else {
    const components = []
    let index = dimensions

    while (index --) components.push(vectorBuffer[vectorBufferOffset + index])

    return [
      `vector ${dimensions} ${typeOfBuffer(vectorBuffer)} [`,
      components.join(', '),
      ']'
    ].join('')
  }
}

/**
* Test if two vectors from two buffers are equals.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand vector.
* @param {boolean} leftBufferOffset - Offset to use when we read the buffer that contains the left operand vector.
* @param {TypedArray} rightBuffer - Buffer that contains the right operand vector.
* @param {boolean} rightBufferOffset - Offset to use when we read the buffer that contains the right operand vector.
* @param {number} dimensions - Dimension of the vector to transform.
* @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
*
* @return {boolean} True if both vector are equals, false otherwise.
*/
export function equals (
  leftBuffer, leftBufferOffset,
  rightBuffer, rightBufferOffset,
  dimensions,
  tolerance = Number.EPSILON
) {
  let index = dimensions

  while (index --) {
    if (
      Math.abs(
        leftBuffer[
          leftBufferOffset + index
        ] - rightBuffer[rightBufferOffset + index]
      ) > tolerance
    ) { return false }
  }

  return true
}
