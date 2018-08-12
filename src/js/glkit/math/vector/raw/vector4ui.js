/**
* Transform a 4 unsigned integer buffered vector into a string.
*
* @param {Uint32Array} vectorBuffer - Buffer that contains the vector to transform.
* @param {number} vectorBufferOffset - Offset to use when we read the buffer that contains the vector to transform.
*
* @return {String} A string representation of the given vector.
*/
export function toString (vectorBuffer, vectorBufferOffset) {
  if (vectorBuffer == null) {
    return 'vector 4 unsigned integer null'
  } else {
    const a0 = vectorBuffer[vectorBufferOffset + 0]
    const a1 = vectorBuffer[vectorBufferOffset + 1]
    const a2 = vectorBuffer[vectorBufferOffset + 2]
    const a3 = vectorBuffer[vectorBufferOffset + 3]
    
    return [
      `vector 4 unsigned integer [`,
        a0, ',', a1, ',', a2, ',', a3,
      ']'
    ].join('')
  }
}

/**
* Test if two 2D vectors from two buffers are equals.
*
* @param {Uint32Array} leftBuffer - Buffer that contains the left operand vector.
* @param {boolean} leftBufferOffset - Offset to use when we read the buffer that contains the left operand vector.
* @param {Uint32Array} rightBuffer - Buffer that contains the right operand vector.
* @param {boolean} rightBufferOffset - Offset to use when we read the buffer that contains the right operand vector.
* @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
*
* @return {boolean} True if both vector are equals, false otherwise.
*/
export function equals (
  leftBuffer,
  leftBufferOffset,
  rightBuffer,
  rightBufferOffset,
  tolerance = Number.EPSILON
) {
  const a0 = leftBuffer[leftBufferOffset + 0]
  const a1 = leftBuffer[leftBufferOffset + 1]
  const a2 = leftBuffer[leftBufferOffset + 2]
  const a3 = leftBuffer[leftBufferOffset + 3]
  
  const b0 = rightBuffer[rightBufferOffset + 0]
  const b1 = rightBuffer[rightBufferOffset + 1]
  const b2 = rightBuffer[rightBufferOffset + 2]
  const b3 = rightBuffer[rightBufferOffset + 3]
  
  return Math.abs(a0 - b0) < tolerance &&
         Math.abs(a1 - b1) < tolerance &&
         Math.abs(a2 - b2) < tolerance &&
         Math.abs(a3 - b3) < tolerance
}

/**
* Compute the addition of two 4 unsigned integer buffered vectors and put the result into another buffer.
*
* @param {Uint32Array} leftBuffer - Buffer that contains the left operand.
* @param {number} leftBufferOffset - Offset to use when we read the buffer that contains the left operand.
* @param {Uint32Array} rightBuffer - Buffer that contains the right operand.
* @param {number} rightBufferOffset - Offset to use when we read the buffer that contains the right operand.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The updated result buffer.
*/
export function add (
  leftBuffer,
  leftBufferOffset,
  rightBuffer,
  rightBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = leftBuffer[leftBufferOffset + 0]
  const a1 = leftBuffer[leftBufferOffset + 1]
  const a2 = leftBuffer[leftBufferOffset + 2]
  const a3 = leftBuffer[leftBufferOffset + 3]
  
  const b0 = rightBuffer[rightBufferOffset + 0]
  const b1 = rightBuffer[rightBufferOffset + 1]
  const b2 = rightBuffer[rightBufferOffset + 2]
  const b3 = rightBuffer[rightBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a0 + b0
  resultBuffer[resultBufferOffset + 1] = a1 + b1
  resultBuffer[resultBufferOffset + 2] = a2 + b2
  resultBuffer[resultBufferOffset + 3] = a3 + b3
  
  return resultBuffer
}
/**
* Compute the subtraction of two 4 unsigned integer buffered vectors and put the result into another buffer.
*
* @param {Uint32Array} leftBuffer - Buffer that contains the left operand.
* @param {number} leftBufferOffset - Offset to use when we read the buffer that contains the left operand.
* @param {Uint32Array} rightBuffer - Buffer that contains the right operand.
* @param {number} rightBufferOffset - Offset to use when we read the buffer that contains the right operand.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The result buffer updated with the result of this operation.
*/
export function subtract (
  leftBuffer,
  leftBufferOffset,
  rightBuffer,
  rightBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = leftBuffer[leftBufferOffset + 0]
  const a1 = leftBuffer[leftBufferOffset + 1]
  const a2 = leftBuffer[leftBufferOffset + 2]
  const a3 = leftBuffer[leftBufferOffset + 3]
  
  const b0 = rightBuffer[rightBufferOffset + 0]
  const b1 = rightBuffer[rightBufferOffset + 1]
  const b2 = rightBuffer[rightBufferOffset + 2]
  const b3 = rightBuffer[rightBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a0 - b0
  resultBuffer[resultBufferOffset + 1] = a1 - b1
  resultBuffer[resultBufferOffset + 2] = a2 - b2
  resultBuffer[resultBufferOffset + 3] = a3 - b3
  
  return resultBuffer
}

/**
* Compute the dot product of two 4 unsigned integer buffered vectors and return the result.
*
* @param {Uint32Array} leftBuffer - Buffer that contains the left operand.
* @param {boolean} leftBufferOffset - Offset to use when we read the buffer that contains the left operand.
* @param {Uint32Array} rightBuffer - Buffer that contains the right operand.
* @param {boolean} rightBufferOffset - Offset to use when we read the buffer that contains the right operand.
*
* @return {number} The result of the dot product.
*/
export function dot (
  leftBuffer,
  leftBufferOffset,
  rightBuffer,
  rightBufferOffset
) {
  const a0 = leftBuffer[leftBufferOffset + 0]
  const a1 = leftBuffer[leftBufferOffset + 1]
  const a2 = leftBuffer[leftBufferOffset + 2]
  const a3 = leftBuffer[leftBufferOffset + 3]
  
  const b0 = rightBuffer[rightBufferOffset + 0]
  const b1 = rightBuffer[rightBufferOffset + 1]
  const b2 = rightBuffer[rightBufferOffset + 2]
  const b3 = rightBuffer[rightBufferOffset + 3]
  
  return a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3
}

/**
* Return the squared length of a 4 unsigned integer buffered vector.
*
* @param {Uint32Array} vectorBuffer - Buffer that contains the vector to transform.
* @param {number} vectorBufferOffset - Offset to use when we read the buffer that contains the vector to transform.
*
* @return {number} The squared length of the given vector.
*/
export function squaredLength (
  vectorBuffer,
  vectorBufferOffset
) {
  const a0 = vectorBuffer[vectorBufferOffset + 0]
  const a1 = vectorBuffer[vectorBufferOffset + 1]
  const a2 = vectorBuffer[vectorBufferOffset + 2]
  const a3 = vectorBuffer[vectorBufferOffset + 3]
  
  return a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3
}

/**
* Return the length of a 4 unsigned integer buffered vector.
*
* @param {Uint32Array} vectorBuffer - Buffer that contains the vector to transform.
* @param {number} vectorBufferOffset - Offset to use when we read the buffer that contains the vector to transform.
*
* @return {number} The length of the given vector.
*/
export function length (
  vectorBuffer,
  vectorBufferOffset
) {
  return Math.sqrt(squaredLength(vectorBuffer, vectorBufferOffset))
}

/**
* Set the content of a 4 unsigned integer buffered vector.
*
* @param {Uint32Array} vectorBuffer - Buffer to write.
* @param {number} vectorBufferOffset - Offset to use when we write the result into the given buffer.
* @param {...number} values - Values to set.
*
* @return {Uint32Array} The given buffer updated with the new values.
*/
export function set (
  vectorBuffer,
  vectorBufferOffset,
  a0,
  a1,
  a2,
  a3
) {
  vectorBuffer[vectorBufferOffset + 0] = a0
  vectorBuffer[vectorBufferOffset + 1] = a1
  vectorBuffer[vectorBufferOffset + 2] = a2
  vectorBuffer[vectorBufferOffset + 3] = a3
  
  return vectorBuffer
}

/**
* Multiply a 4 unsigned integer buffered vector with a scalar and put the result in another buffer.
*
* @param {Uint32Array} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {number} scalar - Scalar to use for the multiplication.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The result buffer updated with the result of this operation.
*/
export function multiplyWithScalar (
  vectorBuffer,
  vectorBufferOffset,
  scalar,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = vectorBuffer[vectorBufferOffset + 0]
  const a1 = vectorBuffer[vectorBufferOffset + 1]
  const a2 = vectorBuffer[vectorBufferOffset + 2]
  const a3 = vectorBuffer[vectorBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a0 * scalar
  resultBuffer[resultBufferOffset + 1] = a1 * scalar
  resultBuffer[resultBufferOffset + 2] = a2 * scalar
  resultBuffer[resultBufferOffset + 3] = a3 * scalar
  
  return resultBuffer
}

/**
* Divide a 4 unsigned integer buffered vector with a scalar and put the result in another buffer.
*
* @param {Uint32Array} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {number} scalar - Scalar to use for the division.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The result buffer updated with the result of this operation.
*/
export function divideWithScalar (
  vectorBuffer,
  vectorBufferOffset,
  scalar,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = vectorBuffer[vectorBufferOffset + 0]
  const a1 = vectorBuffer[vectorBufferOffset + 1]
  const a2 = vectorBuffer[vectorBufferOffset + 2]
  const a3 = vectorBuffer[vectorBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a0 / scalar
  resultBuffer[resultBufferOffset + 1] = a1 / scalar
  resultBuffer[resultBufferOffset + 2] = a2 / scalar
  resultBuffer[resultBufferOffset + 3] = a3 / scalar
  
  return resultBuffer
}

/**
* Negate a 4 unsigned integer buffered vector and put the result in another buffer.
*
* @param {Uint32Array} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The result buffer updated with the result of this operation.
*/
export function negate (
  vectorBuffer,
  vectorBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = vectorBuffer[vectorBufferOffset + 0]
  const a1 = vectorBuffer[vectorBufferOffset + 1]
  const a2 = vectorBuffer[vectorBufferOffset + 2]
  const a3 = vectorBuffer[vectorBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = -a0
  resultBuffer[resultBufferOffset + 1] = -a1
  resultBuffer[resultBufferOffset + 2] = -a2
  resultBuffer[resultBufferOffset + 3] = -a3
  
  return resultBuffer
}

/**
* Normalize a 4 unsigned integer buffered vector and set the result into another buffer.
*
* @param {Uint32Array} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The result buffer updated with the result of this operation.
*/
export function normalize (
  vectorBuffer,
  vectorBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const scalar = length(vectorBuffer, vectorBufferOffset)

  const a0 = vectorBuffer[vectorBufferOffset + 0]
  const a1 = vectorBuffer[vectorBufferOffset + 1]
  const a2 = vectorBuffer[vectorBufferOffset + 2]
  const a3 = vectorBuffer[vectorBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a0 / scalar
  resultBuffer[resultBufferOffset + 1] = a1 / scalar
  resultBuffer[resultBufferOffset + 2] = a2 / scalar
  resultBuffer[resultBufferOffset + 3] = a3 / scalar
  
  return resultBuffer
}

/**
* Ceil each component of a 4 unsigned integer buffered vector and put the result into another buffer.
*
* @param {Uint32Array} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The result buffer updated with the result of this operation.
*/
export function ceil (
  vectorBuffer,
  vectorBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = vectorBuffer[vectorBufferOffset + 0]
  const a1 = vectorBuffer[vectorBufferOffset + 1]
  const a2 = vectorBuffer[vectorBufferOffset + 2]
  const a3 = vectorBuffer[vectorBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = Math.ceil(a0)
  resultBuffer[resultBufferOffset + 1] = Math.ceil(a1)
  resultBuffer[resultBufferOffset + 2] = Math.ceil(a2)
  resultBuffer[resultBufferOffset + 3] = Math.ceil(a3)
  
  return resultBuffer
}

/**
* Floor each component of a 4 unsigned integer buffered vector and put the result into another buffer.
*
* @param {Uint32Array} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The result buffer updated with the result of this operation.
*/
export function floor (
  vectorBuffer,
  vectorBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = vectorBuffer[vectorBufferOffset + 0]
  const a1 = vectorBuffer[vectorBufferOffset + 1]
  const a2 = vectorBuffer[vectorBufferOffset + 2]
  const a3 = vectorBuffer[vectorBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = Math.floor(a0)
  resultBuffer[resultBufferOffset + 1] = Math.floor(a1)
  resultBuffer[resultBufferOffset + 2] = Math.floor(a2)
  resultBuffer[resultBufferOffset + 3] = Math.floor(a3)
  
  return resultBuffer
}

/**
* Round each component of a 4 unsigned integer buffered vector and put the result into another buffer.
*
* @param {Uint32Array} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The result buffer updated with the result of this operation.
*/
export function round (
  vectorBuffer,
  vectorBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = vectorBuffer[vectorBufferOffset + 0]
  const a1 = vectorBuffer[vectorBufferOffset + 1]
  const a2 = vectorBuffer[vectorBufferOffset + 2]
  const a3 = vectorBuffer[vectorBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = Math.round(a0)
  resultBuffer[resultBufferOffset + 1] = Math.round(a1)
  resultBuffer[resultBufferOffset + 2] = Math.round(a2)
  resultBuffer[resultBufferOffset + 3] = Math.round(a3)
  
  return resultBuffer
}

/**
* Update each component of a 4 unsigned integer buffered vector less than the given minimum, and put the result into another buffer.
*
* @param {Uint32Array} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {number} minimum - Minimum value allowed.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The result buffer updated with the result of this operation.
*/
export function minimum (
  vectorBuffer,
  vectorBufferOffset,
  minimum,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = vectorBuffer[vectorBufferOffset + 0]
  const a1 = vectorBuffer[vectorBufferOffset + 1]
  const a2 = vectorBuffer[vectorBufferOffset + 2]
  const a3 = vectorBuffer[vectorBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = Math.max(a0, minimum)
  resultBuffer[resultBufferOffset + 1] = Math.max(a1, minimum)
  resultBuffer[resultBufferOffset + 2] = Math.max(a2, minimum)
  resultBuffer[resultBufferOffset + 3] = Math.max(a3, minimum)
  
  return resultBuffer
}

/**
* Update each component of a 4 unsigned integer buffered vector greather than the given maximum, and put the result into another buffer.
*
* @param {Uint32Array} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {number} maximum - Maximum value allowed.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The result buffer updated with the result of this operation.
*/
export function maximum (
  vectorBuffer,
  vectorBufferOffset,
  maximum,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = vectorBuffer[vectorBufferOffset + 0]
  const a1 = vectorBuffer[vectorBufferOffset + 1]
  const a2 = vectorBuffer[vectorBufferOffset + 2]
  const a3 = vectorBuffer[vectorBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = Math.min(a0, maximum)
  resultBuffer[resultBufferOffset + 1] = Math.min(a1, maximum)
  resultBuffer[resultBufferOffset + 2] = Math.min(a2, maximum)
  resultBuffer[resultBufferOffset + 3] = Math.min(a3, maximum)
  
  return resultBuffer
}


/**
* Clamp each component of 4 unsigned integer buffered vector between two values, and put the result into another buffer.
*
* @param {Uint32Array} vectorBuffer - Buffer to read.
* @param {number} vectorBufferOffset - Offset to use when we read the given buffer.
* @param {number} minimum - Minimum value allowed.
* @param {number} maximum - Maximum value allowed.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The result buffer updated with the result of this operation.
*/
export function clamp (
  vectorBuffer,
  vectorBufferOffset,
  minimum,
  maximum,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = vectorBuffer[vectorBufferOffset + 0]
  const a1 = vectorBuffer[vectorBufferOffset + 1]
  const a2 = vectorBuffer[vectorBufferOffset + 2]
  const a3 = vectorBuffer[vectorBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = Math.max(Math.min(a0, maximum), minimum)
  resultBuffer[resultBufferOffset + 1] = Math.max(Math.min(a1, maximum), minimum)
  resultBuffer[resultBufferOffset + 2] = Math.max(Math.min(a2, maximum), minimum)
  resultBuffer[resultBufferOffset + 3] = Math.max(Math.min(a3, maximum), minimum)
  
  return resultBuffer
}

/**
* Compute the a vector that is a mix of two 4 unsigned integer buffered vectors and put the result into another buffer.
*
* @param {Uint32Array} leftBuffer - Buffer that contains the left operand.
* @param {number} leftBufferOffset - Offset to use when we read the buffer that contains the left operand.
* @param {Uint32Array} rightBuffer - Buffer that contains the right operand.
* @param {number} rightBufferOffset - Offset to use when we read the buffer that contains the right operand.
* @param {number} scalar - A float number between 0 and 1.
* @param {Uint32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to use when we write into the result buffer.
*
* @return {Uint32Array} The updated result buffer.
*/
export function mix (
  leftBuffer,
  leftBufferOffset,
  rightBuffer,
  rightBufferOffset,
  scalar,
  resultBuffer,
  resultBufferOffset
) {
  const a0 = leftBuffer[leftBufferOffset + 0]
  const a1 = leftBuffer[leftBufferOffset + 1]
  const a2 = leftBuffer[leftBufferOffset + 2]
  const a3 = leftBuffer[leftBufferOffset + 3]
  
  const b0 = rightBuffer[rightBufferOffset + 0]
  const b1 = rightBuffer[rightBufferOffset + 1]
  const b2 = rightBuffer[rightBufferOffset + 2]
  const b3 = rightBuffer[rightBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a0 + (b0 - a0) * scalar
  resultBuffer[resultBufferOffset + 1] = a1 + (b1 - a1) * scalar
  resultBuffer[resultBufferOffset + 2] = a2 + (b2 - a2) * scalar
  resultBuffer[resultBufferOffset + 3] = a3 + (b3 - a3) * scalar
  
  return resultBuffer
}