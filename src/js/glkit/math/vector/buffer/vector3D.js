import * as vector from './vector'

/**
* Transform a 3D vector from a buffer into a string.
*
* @param {TypedArray} vectorBuffer - Buffer that contains the vector to transform.
* @param {boolean} vectorBufferOffset - Offset to use when we read the buffer that contains the vector to transform.
*
* @return {String} A string representation of the given vector.
*/
export function toString (vectorBuffer, vectorBufferOffset) {
  return vector.toString(vectorBuffer, vectorBufferOffset, 3)
}

/**
* Test if two 3D vectors from two buffers are equals.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand vector.
* @param {boolean} leftBufferOffset - Offset to use when we read the buffer that contains the left operand vector.
* @param {TypedArray} rightBuffer - Buffer that contains the right operand vector.
* @param {boolean} rightBufferOffset - Offset to use when we read the buffer that contains the right operand vector.
* @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
*
* @return {boolean} True if both vector are equals, false otherwise.
*/
export function equals (
  leftBuffer, leftBufferOffset,
  rightBuffer, rightBufferOffset,
  tolerance = Number.EPSILON
) {
  return vector.equals(
    leftBuffer, leftBufferOffset,
    rightBuffer, rightBufferOffset,
    3, tolerance
  )
}

/**
* Compute the addition of two 3D vector from two buffers and put the result into another buffer.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand.
* @param {boolean} leftBufferOffset - Offset to use when we read the buffer that contains the left operand.
* @param {TypedArray} rightBuffer - Buffer that contains the right operand.
* @param {boolean} rightBufferOffset - Offset to use when we read the buffer that contains the right operand.
* @param {TypedArray} [resultBuffer = leftBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = leftBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function addVector3D (
  leftBuffer,
  leftBufferOffset,
  rightBuffer,
  rightBufferOffset,
  resultBuffer = leftBuffer,
  resultBufferOffset = leftBufferOffset
) {
  const a1 = leftBuffer[leftBufferOffset + 0]
  const a2 = leftBuffer[leftBufferOffset + 1]
  const a3 = leftBuffer[leftBufferOffset + 2]

  const b1 = rightBuffer[rightBufferOffset + 0]
  const b2 = rightBuffer[rightBufferOffset + 1]
  const b3 = rightBuffer[rightBufferOffset + 2]

  return set(
    resultBuffer, resultBufferOffset,
    a1 + b1, a2 + b2, a3 + b3
  )
}
/**
* Compute the subtraction of two 3D vector from two buffers and put the result into another buffer.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand.
* @param {boolean} leftBufferOffset - Offset to use when we read the buffer that contains the left operand.
* @param {TypedArray} rightBuffer - Buffer that contains the right operand.
* @param {boolean} rightBufferOffset - Offset to use when we read the buffer that contains the right operand.
* @param {TypedArray} [resultBuffer = leftBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = leftBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function subtractVector3D (
  leftBuffer,
  leftBufferOffset,
  rightBuffer,
  rightBufferOffset,
  resultBuffer = leftBuffer,
  resultBufferOffset = leftBufferOffset
) {
  const a1 = leftBuffer[leftBufferOffset + 0]
  const a2 = leftBuffer[leftBufferOffset + 1]
  const a3 = leftBuffer[leftBufferOffset + 2]

  const b1 = rightBuffer[rightBufferOffset + 0]
  const b2 = rightBuffer[rightBufferOffset + 1]
  const b3 = rightBuffer[rightBufferOffset + 2]

  return set(
    resultBuffer, resultBufferOffset,
    a1 - b1, a2 - b2, a3 - b3
  )
}

/**
* Compute the dot product of two 3D vector from two buffers and return the result.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand.
* @param {boolean} leftBufferOffset - Offset to use when we read the buffer that contains the left operand.
* @param {TypedArray} rightBuffer - Buffer that contains the right operand.
* @param {boolean} rightBufferOffset - Offset to use when we read the buffer that contains the right operand.
*
* @return {number} The result of the dot product.
*/
export function dot (
  leftBuffer, leftBufferOffset,
  rightBuffer, rightBufferOffset
) {
  return vector.dot(
    leftBuffer, leftBufferOffset,
    rightBuffer, rightBufferOffset,
    3
  )
}

/**
* Return the squared length of a 3D vector from a buffer.
*
* @param {TypedArray} vectorBuffer - Buffer that contains the vector to transform.
* @param {boolean} vectorBufferOffset - Offset to use when we read the buffer that contains the vector to transform.
*
* @return {number} The squared length of the given vector.
*/
export function squaredLength (
  vectorBuffer,
  vectorBufferOffset
) {
  return vector.squaredLength(
    vectorBuffer,
    vectorBufferOffset,
    3
  )
}

/**
* Return the length of a 3D vector from a buffer.
*
* @param {TypedArray} vectorBuffer - Buffer that contains the vector to transform.
* @param {boolean} vectorBufferOffset - Offset to use when we read the buffer that contains the vector to transform.
*
* @return {number} The length of the given vector.
*/
export function length (
  vectorBuffer,
  vectorBufferOffset,
  dimensions
) {
  return vector.length(
    vectorBuffer,
    vectorBufferOffset,
    3
  )
}

/**
* Set the content of a 3D vector in a buffer.
*
* @param {TypedArray} vectorBuffer - Buffer to write.
* @param {number} vectorBufferOffset - Offset to use when we write the result into the given buffer.
* @param {...number} values - Values to set.
*
* @return {TypedArray} The given buffer updated with the new values.
*/
export function set (
  vectorBuffer, vectorBufferOffset,
  a1, a2, a3
) {
  vectorBuffer[vectorBufferOffset + 0] = a1
  vectorBuffer[vectorBufferOffset + 1] = a2
  vectorBuffer[vectorBufferOffset + 2] = a3

  return vectorBuffer
}

/**
* Multiply a 3D vector of a buffer with a scalar and put the result in another buffer.
*
* @param {TypedArray} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {number} scalar - Scalar to use for the multiplication.
* @param {TypedArray} [resultBuffer = vectorBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = vectorBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function multiplyWithScalar (
  vectorBuffer, vectorBufferOffset,
  scalar,
  resultBuffer = vectorBuffer,
  resultBufferOffset = vectorBufferOffset
) {
  const a1 = vectorBuffer[vectorBufferOffset + 0]
  const a2 = vectorBuffer[vectorBufferOffset + 1]
  const a3 = vectorBuffer[vectorBufferOffset + 2]

  return set(
    resultBuffer, resultBufferOffset,
    a1 * scalar, a2 * scalar, a3 * scalar
  )
}

/**
* Divide a 3D vector of a buffer with a scalar and put the result in another buffer.
*
* @param {TypedArray} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {number} scalar - Scalar to use for the division.
* @param {TypedArray} [resultBuffer = vectorBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = vectorBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function divideWithScalar (
  vectorBuffer, vectorBufferOffset,
  scalar,
  resultBuffer = vectorBuffer,
  resultBufferOffset = vectorBufferOffset
) {
  const a1 = vectorBuffer[vectorBufferOffset + 0]
  const a2 = vectorBuffer[vectorBufferOffset + 1]
  const a3 = vectorBuffer[vectorBufferOffset + 2]

  return set(
    resultBuffer, resultBufferOffset,
    a1 / scalar, a2 / scalar, a3 / scalar
  )
}

/**
* Negate a 3D vector of a buffer and put the result in another buffer.
*
* @param {TypedArray} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {TypedArray} [resultBuffer = vectorBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = vectorBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function negate (
  vectorBuffer, vectorBufferOffset,
  resultBuffer = vectorBuffer,
  resultBufferOffset = vectorBufferOffset
) {
  const a1 = vectorBuffer[vectorBufferOffset + 0]
  const a2 = vectorBuffer[vectorBufferOffset + 1]
  const a3 = vectorBuffer[vectorBufferOffset + 2]

  return set(
    resultBuffer, resultBufferOffset,
    -a1, -a2, -a3
  )
}

/**
* Normalize a vector of a buffer and set the result into another buffer.
*
* @param {TypedArray} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {TypedArray} [resultBuffer = vectorBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = vectorBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function normalize (
  vectorBuffer, vectorBufferOffset,
  resultBuffer = vectorBuffer,
  resultBufferOffset = vectorBufferOffset
) {
  return divideWithScalar(
    vectorBuffer, vectorBufferOffset,
    length(vectorBuffer, vectorBufferOffset),
    resultBuffer, resultBufferOffset
  )
}

/**
* Ceil each component of a vector in a buffer and put the result into another buffer.
*
* @param {TypedArray} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {TypedArray} [resultBuffer = vectorBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = vectorBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function ceil (
  vectorBuffer, vectorBufferOffset,
  resultBuffer = vectorBuffer,
  resultBufferOffset = vectorBufferOffset
) {
  const a1 = vectorBuffer[vectorBufferOffset + 0]
  const a2 = vectorBuffer[vectorBufferOffset + 1]
  const a3 = vectorBuffer[vectorBufferOffset + 2]

  return set(
    resultBuffer, resultBufferOffset,
    Math.ceil(a1), Math.ceil(a2), Math.ceil(a3)
  )
}

/**
* Floor each component of a vector in a buffer and put the result into another buffer.
*
* @param {TypedArray} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {TypedArray} [resultBuffer = vectorBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = vectorBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function floor (
  vectorBuffer, vectorBufferOffset,
  resultBuffer = vectorBuffer,
  resultBufferOffset = vectorBufferOffset
) {
  const a1 = vectorBuffer[vectorBufferOffset + 0]
  const a2 = vectorBuffer[vectorBufferOffset + 1]
  const a3 = vectorBuffer[vectorBufferOffset + 2]

  return set(
    resultBuffer, resultBufferOffset,
    Math.floor(a1), Math.floor(a2), Math.floor(a3)
  )
}

/**
* Round each component of a vector in a buffer and put the result into another buffer.
*
* @param {TypedArray} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {TypedArray} [resultBuffer = vectorBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = vectorBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function round (
  vectorBuffer, vectorBufferOffset,
  resultBuffer = vectorBuffer,
  resultBufferOffset = vectorBufferOffset
) {
  const a1 = vectorBuffer[vectorBufferOffset + 0]
  const a2 = vectorBuffer[vectorBufferOffset + 1]
  const a3 = vectorBuffer[vectorBufferOffset + 2]

  return set(
    resultBuffer, resultBufferOffset,
    Math.round(a1), Math.round(a2), Math.round(a3)
  )
}

/**
* Update each component of a vector less than the given minimum from a buffer, and put the result into another buffer.
*
* @param {TypedArray} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {number} minimum - Minimum value allowed.
* @param {TypedArray} [resultBuffer = vectorBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = vectorBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function minimum (
  vectorBuffer, vectorBufferOffset, minimum,
  resultBuffer = vectorBuffer,
  resultBufferOffset = vectorBufferOffset
) {
  const a1 = vectorBuffer[vectorBufferOffset + 0]
  const a2 = vectorBuffer[vectorBufferOffset + 1]
  const a3 = vectorBuffer[vectorBufferOffset + 2]

  return set(
    resultBuffer, resultBufferOffset,
    Math.max(a1, minimum), Math.max(a2, minimum), Math.max(a2, minimum)
  )
}

/**
* Update each component of a vector greather than the given maximum from a buffer, and put the result into another buffer.
*
* @param {TypedArray} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {number} maximum - Maximum value allowed.
* @param {TypedArray} [resultBuffer = vectorBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = vectorBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function maximum (
  vectorBuffer, vectorBufferOffset,
  maximum,
  resultBuffer = vectorBuffer,
  resultBufferOffset = vectorBufferOffset
) {
  const a1 = vectorBuffer[vectorBufferOffset + 0]
  const a2 = vectorBuffer[vectorBufferOffset + 1]
  const a3 = vectorBuffer[vectorBufferOffset + 2]

  return set(
    resultBuffer, resultBufferOffset,
    Math.min(a1, maximum), Math.min(a2, maximum), Math.min(a3, maximum)
  )
}

/**
* Clamp each component of a vector from a buffer between two values, and put the result into another buffer.
*
* @param {TypedArray} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {number} minimum - Minimum value allowed.
* @param {number} maximum - Maximum value allowed.
* @param {TypedArray} [resultBuffer = vectorBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = vectorBufferOffset] - Offset to use when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function clamp (
  vectorBuffer, vectorBufferOffset,
  minimum, maximum,
  resultBuffer = vectorBuffer,
  resultBufferOffset = vectorBufferOffset
) {
  const a1 = vectorBuffer[vectorBufferOffset + 0]
  const a2 = vectorBuffer[vectorBufferOffset + 1]
  const a3 = vectorBuffer[vectorBufferOffset + 2]

  return set(
    resultBuffer, resultBufferOffset,
    Math.max(Math.min(a1, maximum), minimum),
    Math.max(Math.min(a2, maximum), minimum),
    Math.max(Math.min(a3, maximum), minimum)
  )
}
