import * as matrix from './matrix'

export function _multiplyWithMatrix3D (
  a11, a12, a13,
  a21, a22, a23,
  a31, a32, a33,
  b11, b12, b13,
  b21, b22, b23,
  b31, b32, b33,
  resultBuffer,
  resultBufferOffset = 0
) {
  resultBuffer[resultBufferOffset + 0] = a11 * b11 + a12 * b21 + a13 * b31
  resultBuffer[resultBufferOffset + 1] = a11 * b12 + a12 * b22 + a13 * b32
  resultBuffer[resultBufferOffset + 2] = a11 * b13 + a12 * b23 + a13 * b33
  resultBuffer[resultBufferOffset + 3] = a21 * b11 + a22 * b21 + a23 * b31
  resultBuffer[resultBufferOffset + 4] = a21 * b12 + a22 * b22 + a23 * b32
  resultBuffer[resultBufferOffset + 5] = a21 * b13 + a22 * b23 + a23 * b33
  resultBuffer[resultBufferOffset + 6] = a31 * b11 + a32 * b21 + a33 * b31
  resultBuffer[resultBufferOffset + 7] = a31 * b12 + a32 * b22 + a33 * b32
  resultBuffer[resultBufferOffset + 8] = a31 * b13 + a32 * b23 + a33 * b33

  return resultBuffer
}

export function _multiplyWithVector3D (
  a11, a12, a13,
  a21, a22, a23,
  a31, a32, a33,
  b11,
  b21,
  b31,
  resultBuffer,
  resultBufferOffset = 0
) {
  resultBuffer[resultBufferOffset + 0] = a11 * b11 + a12 * b21 + a13 * b31
  resultBuffer[resultBufferOffset + 1] = a21 * b11 + a22 * b21 + a23 * b31
  resultBuffer[resultBufferOffset + 2] = a31 * b11 + a32 * b21 + a33 * b31

  return resultBuffer
}

/**
* Transform a 3D matrix of a buffer into a string.
*
* @param {TypedArray} matrixBuffer - The buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - The offset to apply when we read the given buffer.
*
* @return {String} A string representation of the given matrix.
*/
export function toString (
  matrixBuffer, matrixBufferOffset
) { return matrix.toString(matrixBuffer, matrixBufferOffset, 3, 3) }

/**
* Fill a 3D matrix of a buffer with a given value.
*
* @param {TypedArray} leftBuffer - Buffer that contains the matrix to fill.
* @param {number} leftBufferOffset - Offset to apply when we write into the given buffer.
* @param {number} value - Value to set in each cell of the given matrix.
*
* @return {TypedArray} The buffer with the updated matrix.
*/
export function fill (
  leftBuffer, leftBufferOffset, value
) {
  return matrix.fill(leftBuffer, leftBufferOffset, 9, value)
}

/**
* Compare two matrices and return true if they are both equals.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the buffer that contains the left operand matrix.
* @param {TypedArray} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the buffer that contains the right operand matrix.
* @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
*
* @return {boolean} True if both matrices are equals.
*/
export function equals (
  leftBuffer, leftBufferOffset,
  rightBuffer, rightBufferOffset,
  tolerance = number.EPSILON
) {
  return matrix.equals(
    leftBuffer, leftBufferOffset,
    rightBuffer, rightBufferOffset,
    9,
    tolerance
  )
}

/**
* Set the content of a buffer with some matrix data.
*
* @param {TypedArray} buffer - Buffer to mutate.
* @param {number} bufferOffset - Offset to apply when we mutate the buffer.
* @param {...number} content - Content of the 3D matrix to set in row-major order.
*
* @return {TypedArray} The buffer, updated with the given data.
*/
export function set (
  buffer, bufferOffset,
  a11, a12, a13,
  a21, a22, a23,
  a31, a32, a33
) {
  buffer[bufferOffset + 0] = a11
  buffer[bufferOffset + 1] = a12
  buffer[bufferOffset + 2] = a13
  buffer[bufferOffset + 3] = a21
  buffer[bufferOffset + 4] = a22
  buffer[bufferOffset + 5] = a23
  buffer[bufferOffset + 6] = a31
  buffer[bufferOffset + 7] = a32
  buffer[bufferOffset + 8] = a33

  return buffer
}

/**
* Copy the matrix content of a buffer to another buffer.
*
* @param {TypedArray} sourceBuffer - Buffer to read.
* @param {number} sourceBufferOffset - Offset to apply when we read the source buffer.
* @param {TypedArray} destinationBuffer - Buffer to write.
* @param {number} destinationBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the source data.
*/
export function copy (
  sourceBuffer, sourceBufferOffset,
  destinationBuffer, destinationBufferOffset
) {
  const a11 = sourceBuffer[sourceBufferOffset + 0]
  const a12 = sourceBuffer[sourceBufferOffset + 1]
  const a13 = sourceBuffer[sourceBufferOffset + 2]
  const a21 = sourceBuffer[sourceBufferOffset + 3]
  const a22 = sourceBuffer[sourceBufferOffset + 4]
  const a23 = sourceBuffer[sourceBufferOffset + 5]
  const a31 = sourceBuffer[sourceBufferOffset + 6]
  const a32 = sourceBuffer[sourceBufferOffset + 7]
  const a33 = sourceBuffer[sourceBufferOffset + 8]

  return set(
    destinationBuffer,
    destinationBufferOffset,
    a11, a12, a13,
    a21, a22, a23,
    a31, a32, a33
  )
}

/**
* Transpose the matrix of a buffer into another buffer.
*
* @param {TypedArray} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the source buffer.
* @param {TypedArray} [resultBuffer = matrixBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = matrixBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the transposed matrix readed from the source buffer.
*/
export function transpose (
  matrixBuffer, matrixBufferOffset,
  resultBuffer = matrixBuffer, resultBufferOffset = matrixBufferOffset
) {
  const a11 = matrixBuffer[matrixBufferOffset + 0]
  const a12 = matrixBuffer[matrixBufferOffset + 1]
  const a13 = matrixBuffer[matrixBufferOffset + 2]
  const a21 = matrixBuffer[matrixBufferOffset + 3]
  const a22 = matrixBuffer[matrixBufferOffset + 4]
  const a23 = matrixBuffer[matrixBufferOffset + 5]
  const a31 = matrixBuffer[matrixBufferOffset + 6]
  const a32 = matrixBuffer[matrixBufferOffset + 7]
  const a33 = matrixBuffer[matrixBufferOffset + 8]

  return set(
    resultBuffer, resultBufferOffset,
    a11, a21, a31,
    a12, a22, a32,
    a13, a23, a33
  )
}

/**
* Multiply a 3D matrix from a buffer with another 3D matrix from another buffer and put the result into a third buffer.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {TypedArray} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the second buffer.
* @param {TypedArray} [resultBuffer = leftBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = leftBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the result of the operation.
*/
export function multiplyWithMatrix3D (
  leftBuffer, leftBufferOffset,
  rightBuffer, rightBufferOffset,
  resultBuffer = leftBuffer, resultBufferOffset = leftBufferOffset
) {
  const a11 = leftBuffer[leftBufferOffset + 0]
  const a12 = leftBuffer[leftBufferOffset + 1]
  const a13 = leftBuffer[leftBufferOffset + 2]
  const a21 = leftBuffer[leftBufferOffset + 3]
  const a22 = leftBuffer[leftBufferOffset + 4]
  const a23 = leftBuffer[leftBufferOffset + 5]
  const a31 = leftBuffer[leftBufferOffset + 6]
  const a32 = leftBuffer[leftBufferOffset + 7]
  const a33 = leftBuffer[leftBufferOffset + 8]

  const b11 = rightBuffer[rightBufferOffset + 0]
  const b12 = rightBuffer[rightBufferOffset + 1]
  const b13 = rightBuffer[rightBufferOffset + 2]
  const b21 = rightBuffer[rightBufferOffset + 3]
  const b22 = rightBuffer[rightBufferOffset + 4]
  const b23 = rightBuffer[rightBufferOffset + 5]
  const b31 = rightBuffer[rightBufferOffset + 6]
  const b32 = rightBuffer[rightBufferOffset + 7]
  const b33 = rightBuffer[rightBufferOffset + 8]

  return _mutliplyWithMatrix3D(
    a11, a12, a13,
    a21, a22, a23,
    a31, a32, a33,
    b11, b12, b13,
    b21, b22, b23,
    b31, b32, b33,
    resultBuffer,
    resultBufferOffset
  )
}

/**
* Multiply a 3D matrix from a buffer with a 3D vector from another buffer and put the result into a third buffer.
*
* @param {TypedArray} matrixBuffer - Buffer that contains the left operand matrix.
* @param {number} matrixBufferOffset - Offset to apply when we read the first buffer.
* @param {TypedArray} vectorBuffer - Buffer that contains the right operand vector.
* @param {number} vectorBufferOffset - Offset to apply when we read the second buffer.
* @param {TypedArray} [resultBuffer = vectorBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = vectorBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the result of the operation.
*/
export function multiplyWithVector3D (
  matrixBuffer, matrixBufferOffset,
  vectorBuffer, vectorBufferOffset,
  resultBuffer = vectorBuffer, resultBufferOffset = vectorBufferOffset
) {
  const a11 = matrixBuffer[matrixBufferOffset + 0]
  const a12 = matrixBuffer[matrixBufferOffset + 1]
  const a13 = matrixBuffer[matrixBufferOffset + 2]
  const a21 = matrixBuffer[matrixBufferOffset + 3]
  const a22 = matrixBuffer[matrixBufferOffset + 4]
  const a23 = matrixBuffer[matrixBufferOffset + 5]
  const a31 = matrixBuffer[matrixBufferOffset + 6]
  const a32 = matrixBuffer[matrixBufferOffset + 7]
  const a33 = matrixBuffer[matrixBufferOffset + 8]

  const b11 = vectorBuffer[vectorBufferOffset + 0]
  const b21 = vectorBuffer[vectorBufferOffset + 1]
  const b31 = vectorBuffer[vectorBufferOffset + 2]

  return _multiplyWithVector3D(
    a11, a12, a13,
    a21, a22, a23,
    a31, a32, a33,
    b11,
    b21,
    b31,
    resultBuffer, resultBufferOffset
  )
}

/**
* Multiply a 3D matrix from a buffer with a scalar and put the result into another buffer.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {number} scalar - Scalar to use as right operand.
* @param {TypedArray} [resultBuffer = leftBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = leftBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the result of the operation.
*/
export function multiplyWithScalar (
  leftBuffer, leftBufferOffset, scalar,
  resultBuffer = leftBuffer, resultBufferOffset = leftBufferOffset
) {
  const a11 = leftBuffer[leftBufferOffset + 0]
  const a12 = leftBuffer[leftBufferOffset + 1]
  const a13 = leftBuffer[leftBufferOffset + 2]
  const a21 = leftBuffer[leftBufferOffset + 3]
  const a22 = leftBuffer[leftBufferOffset + 4]
  const a23 = leftBuffer[leftBufferOffset + 5]
  const a31 = leftBuffer[leftBufferOffset + 6]
  const a32 = leftBuffer[leftBufferOffset + 7]
  const a33 = leftBuffer[leftBufferOffset + 8]

  return set(
    resultBuffer, resultBufferOffset,
    a11 * scalar, a12 * scalar, a13 * scalar,
    a21 * scalar, a22 * scalar, a23 * scalar,
    a31 * scalar, a32 * scalar, a33 * scalar
  )
}

/**
* Divide a 3D matrix from a buffer with a scalar and put the result into another buffer.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {number} scalar - Scalar to use as right operand.
* @param {TypedArray} [resultBuffer = leftBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = leftBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the result of the operation.
*/
export function divideWithScalar (
  leftBuffer, leftBufferOffset, scalar,
  resultBuffer = leftBuffer, resultBufferOffset = leftBufferOffset
) {
  const a11 = leftBuffer[leftBufferOffset + 0]
  const a12 = leftBuffer[leftBufferOffset + 1]
  const a13 = leftBuffer[leftBufferOffset + 2]
  const a21 = leftBuffer[leftBufferOffset + 3]
  const a22 = leftBuffer[leftBufferOffset + 4]
  const a23 = leftBuffer[leftBufferOffset + 5]
  const a31 = leftBuffer[leftBufferOffset + 6]
  const a32 = leftBuffer[leftBufferOffset + 7]
  const a33 = leftBuffer[leftBufferOffset + 8]

  return set(
    resultBuffer, resultBufferOffset,
    a11 - scalar, a12 - scalar, a13 - scalar,
    a21 - scalar, a22 - scalar, a23 - scalar,
    a31 - scalar, a32 - scalar, a33 - scalar
  )
}

/**
* Apply a 2D scale to a 3D matrix from a buffer and put the result into another buffer.
*
* @param {TypedArray} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Strength of the scale to apply to the horizontal axis.
* @param {number} y - Strength of the scale to apply to the vertical axis.
* @param {TypedArray} [resultBuffer = matrixBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = matrixBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the result of the operation.
*/
export function apply2DScale (
  matrixBuffer,
  matrixBufferOffset,
  x,
  y,
  resultBuffer = matrixBuffer,
  resultBufferOffset = matrixBufferOffset
) {
  const b11 = matrixBuffer[matrixBufferOffset + 0]
  const b12 = matrixBuffer[matrixBufferOffset + 1]
  const b13 = matrixBuffer[matrixBufferOffset + 2]
  const b21 = matrixBuffer[matrixBufferOffset + 3]
  const b22 = matrixBuffer[matrixBufferOffset + 4]
  const b23 = matrixBuffer[matrixBufferOffset + 5]
  const b31 = matrixBuffer[matrixBufferOffset + 6]
  const b32 = matrixBuffer[matrixBufferOffset + 7]
  const b33 = matrixBuffer[matrixBufferOffset + 8]

  return _mutliplyWithMatrix3D(
    x, 0, 0,
    0, y, 0,
    0, 0, 1,
    b11, b12, b13,
    b21, b22, b23,
    b31, b32, b33,
    resultBuffer,
    resultBufferOffset
  )
}

/**
* Apply a 3D scale to a 3D matrix from a buffer and put the result into another buffer.
*
* @param {TypedArray} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Strength of the scale to apply to the horizontal axis.
* @param {number} y - Strength of the scale to apply to the vertical axis.
* @param {number} z - Strength of the scale to apply to the depth axis.
* @param {TypedArray} [resultBuffer = matrixBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = matrixBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the result of the operation.
*/
export function apply3DScale (
  matrixBuffer,
  matrixBufferOffset,
  x, y, z,
  resultBuffer = matrixBuffer,
  resultBufferOffset = matrixBufferOffset
) {
  const b11 = resultBuffer[resultBufferOffset + 0]
  const b12 = resultBuffer[resultBufferOffset + 1]
  const b13 = resultBuffer[resultBufferOffset + 2]
  const b21 = resultBuffer[resultBufferOffset + 3]
  const b22 = resultBuffer[resultBufferOffset + 4]
  const b23 = resultBuffer[resultBufferOffset + 5]
  const b31 = resultBuffer[resultBufferOffset + 6]
  const b32 = resultBuffer[resultBufferOffset + 7]
  const b33 = resultBuffer[resultBufferOffset + 8]

  return _mutliplyWithMatrix3D(
    x, 0, 0,
    0, y, 0,
    0, 0, z,
    b11, b12, b13,
    b21, b22, b23,
    b31, b32, b33,
    resultBuffer,
    resultBufferOffset
  )
}

/**
* Apply a 2D rotation to a 3D matrix from a buffer and put the result into another buffer.
*
* @param {TypedArray} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} theta - Angle of the rotation in radians.
* @param {TypedArray} [resultBuffer = matrixBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = matrixBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the result of the operation.
*/
export function apply2DRotation (
  matrixBuffer,
  matrixBufferOffset,
  theta,
  resultBuffer = matrixBuffer,
  resultBufferOffset = matrixBufferOffset
) {
  const cos = Math.cos(theta)
  const sin = Math.sin(theta)

  const b11 = matrixBuffer[matrixBufferOffset + 0]
  const b12 = matrixBuffer[matrixBufferOffset + 1]
  const b13 = matrixBuffer[matrixBufferOffset + 2]
  const b21 = matrixBuffer[matrixBufferOffset + 3]
  const b22 = matrixBuffer[matrixBufferOffset + 4]
  const b23 = matrixBuffer[matrixBufferOffset + 5]
  const b31 = matrixBuffer[matrixBufferOffset + 6]
  const b32 = matrixBuffer[matrixBufferOffset + 7]
  const b33 = matrixBuffer[matrixBufferOffset + 8]

  return _mutliplyWithMatrix3D(
    cos, -sin, 0,
    sin, cos, 0,
    0, 0, 1,
    b11, b12, b13,
    b21, b22, b23,
    b31, b32, b33,
    resultBuffer,
    resultBufferOffset
  )
}

/**
* Apply a 3D rotation to a 3D matrix from a buffer and put the result into another buffer.
*
* @param {TypedArray} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Angle of the rotation to apply to the horizontal axis in radians.
* @param {number} y - Angle of the rotation to apply to the vertical axis in radians.
* @param {number} z - Angle of the rotation to apply to the depth axis in radians.
* @param {TypedArray} [resultBuffer = matrixBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = matrixBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the result of the operation.
*/
export function apply3DEulerianRotation (
  matrixBuffer,
  matrixBufferOffset,
  x, y, z,
  resultBuffer = matrixBuffer,
  resultBufferOffset = matrixBufferOffset
) {
  const cosX = Math.cos(x)
  const cosY = Math.cos(y)
  const cosZ = Math.cos(z)
  const sinX = Math.sin(x)
  const sinY = Math.sin(y)
  const sinZ = Math.sin(z)

  const a11 = cosY * cosZ
  const a12 = cosY * -sinZ
  const a13 = sinY
  const a21 = (-sinX * -sinY * cosZ + cosX * sinZ)
  const a22 = (-sinX * -sinY * -sinZ + cosX * cosZ)
  const a23 = -sinX * cosY
  const a31 = (cosX * -sinY * cosZ + sinX * sinZ)
  const a32 = (cosX * -sinY * -sinZ + sinX * cosZ)
  const a33 = cosX * cosY

  const b11 = matrixBuffer[matrixBufferOffset + 0]
  const b12 = matrixBuffer[matrixBufferOffset + 1]
  const b13 = matrixBuffer[matrixBufferOffset + 2]
  const b21 = matrixBuffer[matrixBufferOffset + 3]
  const b22 = matrixBuffer[matrixBufferOffset + 4]
  const b23 = matrixBuffer[matrixBufferOffset + 5]
  const b31 = matrixBuffer[matrixBufferOffset + 6]
  const b32 = matrixBuffer[matrixBufferOffset + 7]
  const b33 = matrixBuffer[matrixBufferOffset + 8]

  return _mutliplyWithMatrix3D(
    a11, a12, a13,
    a21, a22, a23,
    a31, a32, a33,
    b11, b12, b13,
    b21, b22, b23,
    b31, b32, b33,
    resultBuffer,
    resultBufferOffset
  )
}

/**
* Apply a 2D translation to a 3D matrix from a buffer and put the result into another buffer.
*
* @param {TypedArray} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Strength of the translation to apply to the horizontal axis.
* @param {number} y - Strength of the translation to apply to the vertical axis.
* @param {TypedArray} [resultBuffer = matrixBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = matrixBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the result of the operation.
*/
export function apply2DTranslation (
  matrixBuffer,
  matrixBufferOffset,
  x, y,
  resultBuffer = matrixBuffer,
  resultBufferOffset = matrixBufferOffset
) {
  const b11 = matrixBuffer[matrixBufferOffset + 0]
  const b12 = matrixBuffer[matrixBufferOffset + 1]
  const b13 = matrixBuffer[matrixBufferOffset + 2]
  const b21 = matrixBuffer[matrixBufferOffset + 3]
  const b22 = matrixBuffer[matrixBufferOffset + 4]
  const b23 = matrixBuffer[matrixBufferOffset + 5]
  const b31 = matrixBuffer[matrixBufferOffset + 6]
  const b32 = matrixBuffer[matrixBufferOffset + 7]
  const b33 = matrixBuffer[matrixBufferOffset + 8]

  return _mutliplyWithMatrix3D(
    1, 0, x,
    0, 1, y,
    0, 0, 1,
    b11, b12, b13,
    b21, b22, b23,
    b31, b32, b33,
    resultBuffer,
    resultBufferOffset
  )
}

/**
* Add a 3D matrix from a buffer to another 3D matrix from another buffer and put the result into a third buffer.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {TypedArray} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the second buffer.
* @param {TypedArray} [resultBuffer = leftBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = leftBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the result of the operation.
*/
export function addMatrix3D (
  leftBuffer, leftBufferOffset,
  rightBuffer, rightBufferOffset,
  resultBuffer = leftBuffer, resultBufferOffset = leftBufferOffset
) {
  const a11 = leftBuffer[leftBufferOffset + 0]
  const a12 = leftBuffer[leftBufferOffset + 1]
  const a13 = leftBuffer[leftBufferOffset + 2]
  const a21 = leftBuffer[leftBufferOffset + 3]
  const a22 = leftBuffer[leftBufferOffset + 4]
  const a23 = leftBuffer[leftBufferOffset + 5]
  const a31 = leftBuffer[leftBufferOffset + 6]
  const a32 = leftBuffer[leftBufferOffset + 7]
  const a33 = leftBuffer[leftBufferOffset + 8]

  const b11 = rightBuffer[rightBufferOffset + 0]
  const b12 = rightBuffer[rightBufferOffset + 1]
  const b13 = rightBuffer[rightBufferOffset + 2]
  const b21 = rightBuffer[rightBufferOffset + 3]
  const b22 = rightBuffer[rightBufferOffset + 4]
  const b23 = rightBuffer[rightBufferOffset + 5]
  const b31 = rightBuffer[rightBufferOffset + 6]
  const b32 = rightBuffer[rightBufferOffset + 7]
  const b33 = rightBuffer[rightBufferOffset + 8]

  return set(
    resultBuffer, resultBufferOffset,
    a11 + b11, a12 + b12, a13 + b13,
    a21 + b21, a22 + b22, a23 + b23,
    a31 + b31, a32 + b32, a33 + b33
  )
}

/**
* Subtract a 3D matrix from a buffer to another 3D matrix from another buffer and put the result into a third buffer.
*
* @param {TypedArray} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {TypedArray} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the second buffer.
* @param {TypedArray} [resultBuffer = leftBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = leftBufferOffset] - Offset to apply when we write into the destination buffer.
*
* @return {TypedArray} The destination buffer, updated with the result of the operation.
*/
export function subtractMatrix3D (
  leftBuffer, leftBufferOffset,
  rightBuffer, rightBufferOffset,
  resultBuffer = leftBuffer, resultBufferOffset = leftBufferOffset
) {
  const a11 = leftBuffer[leftBufferOffset + 0]
  const a12 = leftBuffer[leftBufferOffset + 1]
  const a13 = leftBuffer[leftBufferOffset + 2]
  const a21 = leftBuffer[leftBufferOffset + 3]
  const a22 = leftBuffer[leftBufferOffset + 4]
  const a23 = leftBuffer[leftBufferOffset + 5]
  const a31 = leftBuffer[leftBufferOffset + 6]
  const a32 = leftBuffer[leftBufferOffset + 7]
  const a33 = leftBuffer[leftBufferOffset + 8]

  const b11 = rightBuffer[rightBufferOffset + 0]
  const b12 = rightBuffer[rightBufferOffset + 1]
  const b13 = rightBuffer[rightBufferOffset + 2]
  const b21 = rightBuffer[rightBufferOffset + 3]
  const b22 = rightBuffer[rightBufferOffset + 4]
  const b23 = rightBuffer[rightBufferOffset + 5]
  const b31 = rightBuffer[rightBufferOffset + 6]
  const b32 = rightBuffer[rightBufferOffset + 7]
  const b33 = rightBuffer[rightBufferOffset + 8]

  return set(
    resultBuffer, resultBufferOffset,
    a11 - b11, a12 - b12, a13 - b13,
    a21 - b21, a22 - b22, a23 - b23,
    a31 - b31, a32 - b32, a33 - b33
  )
}

/**
* Set the content of a buffer to the content of a 3D identity matrix in row-major order.
*
* @param {TypedArray} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
*
* @return {TypedArray} The buffer, updated with content of a 3D identity matrix in row-major order.
*/
export function toIdentityMatrix (
  matrixBuffer, matrixBufferOffset
) {
  return set(
    matrixBuffer, matrixBufferOffset,
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  )
}

/**
* Set the content of a buffer to the content of a 3D matrix that contains a 2D scale transformation in row-major order.
*
* @param {TypedArray} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
* @param {number} x - Strength of the scale to apply to the horizontal axis.
* @param {number} y - Strength of the scale to apply to the vertical axis.
*
* @return {TypedArray} The buffer, updated with the content of a 3D matrix that contains a 2D scale transformation in row-major order.
*/
export function to2DScaleMatrix (
  matrixBuffer, matrixBufferOffset,
  x, y
) {
  return set(
    matrixBuffer, matrixBufferOffset,
    x, 0, 0,
    0, y, 0,
    0, 0, 1
  )
}

/**
* Set the content of a buffer to the content of a 3D matrix that contains a 3D scale transformation in row-major order.
*
* @param {TypedArray} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
* @param {number} x - Strength of the scale to apply to the horizontal axis.
* @param {number} y - Strength of the scale to apply to the vertical axis.
* @param {number} z - Strength of the scale to apply to the depth axis.
*
* @return {TypedArray} The buffer, updated with the content of a 3D matrix that contains a 3D scale transformation in row-major order.
*/
export function to3DScaleMatrix (
  matrixBuffer, matrixBufferOffset,
  x, y, z
) {
  return set(
    matrixBuffer, matrixBufferOffset,
    x, 0, 0,
    0, y, 0,
    0, 0, z
  )
}

/**
* Set the content of a buffer to the content of a 3D matrix that contains a 2D rotation transformation in row-major order.
*
* @param {TypedArray} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
* @param {number} theta - Angle of the rotation to apply in radians.
*
* @return {TypedArray} The buffer, updated with the content of a 3D matrix that contains a 2D rotation transformation in row-major order.
*/
export function to2DRotationMatrix (
  matrixBuffer, matrixBufferOffset,
  theta
) {
  const cos = Math.cos(theta)
  const sin = Math.sin(theta)

  return set(
    matrixBuffer, matrixBufferOffset,
    cos, -sin, 0,
    sin, cos, 0,
    0, 0, 1
  )
}

/**
* Set the content of a buffer to the content of a 3D matrix that contains a 3D rotation transformation in row-major order.
*
* @param {TypedArray} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
* @param {number} x - Angle of the rotation to apply to the horizontal axis in radians.
* @param {number} y - Angle of the rotation to apply to the vertical axis in radians.
* @param {number} z - Angle of the rotation to apply to the depth axis in radians.
*
* @return {TypedArray} The buffer, updated with the content of a 3D matrix that contains a 3D rotation transformation in row-major order.
*/
export function to3DEulerianRotation (
  matrixBuffer, matrixBufferOffset,
  x, y, z
) {
  const cosX = Math.cos(x)
  const cosY = Math.cos(y)
  const cosZ = Math.cos(z)
  const sinX = Math.sin(x)
  const sinY = Math.sin(y)
  const sinZ = Math.sin(z)

  return set(
    matrixBuffer, matrixBufferOffset,
    cosY * cosZ,
    cosY * -sinZ,
    sinY,
    (-sinX * -sinY * cosZ + cosX * sinZ),
    (-sinX * -sinY * -sinZ + cosX * cosZ),
    -sinX * cosY,
    (cosX * -sinY * cosZ + sinX * sinZ),
    (cosX * -sinY * -sinZ + sinX * cosZ),
    cosX * cosY
  )
}

/**
* Set the content of a buffer to the content of a 3D matrix that contains a 2D translation transformation in row-major order.
*
* @param {TypedArray} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
* @param {number} x - Strength of the translation to apply to the horizontal axis.
* @param {number} y - Strength of the translation to apply to the vertical axis.
*
* @return {TypedArray} The buffer, updated with the content of a 3D matrix that contains a 2D translation transformation in row-major order.
*/
export function to2DTranslationMatrix (
  matrixBuffer, matrixBufferOffset,
  x, y
) {
  return set(
    matrixBuffer, matrixBufferOffset,
    1, 0, x,
    0, 1, y,
    0, 0, 1
  )
}

/**
* Compute and return the determinant of a 3D matrix.
*
* @param {TypedArray} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
*
* @return {number} The determinant of the given 3D matrix.
*/
export function determinant (matrixBuffer, matrixBufferOffset) {
  const a = matrixBuffer[0 + matrixBufferOffset]
  const b = matrixBuffer[1 + matrixBufferOffset]
  const c = matrixBuffer[2 + matrixBufferOffset]
  const d = matrixBuffer[3 + matrixBufferOffset]
  const e = matrixBuffer[4 + matrixBufferOffset]
  const f = matrixBuffer[5 + matrixBufferOffset]
  const g = matrixBuffer[6 + matrixBufferOffset]
  const h = matrixBuffer[7 + matrixBufferOffset]
  const i = matrixBuffer[8 + matrixBufferOffset]

  return (a * e * i) +
         (b * f * g) +
         (c * d * h) -
         (c * e * g) -
         (b * d * i) -
         (a * f * h)
}

/**
* Invert the given matrix buffer and write the result into another buffer.
*
* @param {TypedArray} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
* @param {TypedArray} [resultBuffer = matrixBuffer] - Buffer to write.
* @param {number} [resultBufferOffset = matrixBufferOffset] - Offset to apply when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the result of this operation.
*/
export function invert (
  matrixBuffer, matrixBufferOffset,
  resultBuffer = matrixBuffer, resultBufferOffset = matrixBufferOffset
) {
  const a = matrixBuffer[matrixBufferOffset + 0]
  const b = matrixBuffer[matrixBufferOffset + 1]
  const c = matrixBuffer[matrixBufferOffset + 2]
  const d = matrixBuffer[matrixBufferOffset + 3]
  const e = matrixBuffer[matrixBufferOffset + 4]
  const f = matrixBuffer[matrixBufferOffset + 5]
  const g = matrixBuffer[matrixBufferOffset + 6]
  const h = matrixBuffer[matrixBufferOffset + 7]
  const i = matrixBuffer[matrixBufferOffset + 8]

  const determinantValue = determinant(matrixBuffer, matrixBufferOffset)

  resultBuffer[resultBufferOffset + 0] = e * i - f * h
  resultBuffer[resultBufferOffset + 1] = f * g - d * i
  resultBuffer[resultBufferOffset + 2] = d * h - e * g
  resultBuffer[resultBufferOffset + 3] = c * h - b * i
  resultBuffer[resultBufferOffset + 4] = a * i - c * g
  resultBuffer[resultBufferOffset + 5] = b * g - a * h
  resultBuffer[resultBufferOffset + 6] = b * f - c * e
  resultBuffer[resultBufferOffset + 7] = c * d - a * f
  resultBuffer[resultBufferOffset + 8] = a * e - b * d

  return divideWithScalar(
    transpose(resultBuffer, resultBufferOffset), resultBufferOffset,
    determinantValue
  )
}

/**
* Extract a 2D translation from a 3D matrix.
*
* @param {TypedArray} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
* @param {TypedArray} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the content of the 2D translation vector extracted from the given matrix.
*/
export function extract2DTranslation (
  matrixBuffer, matrixBufferOffset,
  resultBuffer, resultBufferOffset
) {
  resultBuffer[resultBufferOffset + 0] = matrixBuffer[matrixBufferOffset + 2]
  resultBuffer[resultBufferOffset + 1] = matrixBuffer[matrixBufferOffset + 5]
  return resultBuffer
}

/**
* Extract a 2D scale from a 3D matrix.
*
* @param {TypedArray} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
* @param {TypedArray} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the content of the 2D scale vector extracted from the given matrix.
*/
export function extract2DScale (
  matrixBuffer, matrixBufferOffset,
  resultBuffer, resultBufferOffset
) {
  const ax = matrixBuffer[matrixBufferOffset + 0]
  const ay = matrixBuffer[matrixBufferOffset + 1]
  const bx = matrixBuffer[matrixBufferOffset + 3]
  const by = matrixBuffer[matrixBufferOffset + 4]

  resultBuffer[
    resultBufferOffset + 0
  ] = Math.sqrt(ax * ax + ay * ay) * ((ax < 0) ? -1 : 1)

  resultBuffer[
    resultBufferOffset + 1
  ] = Math.sqrt(bx * bx + by * by) * ((by < 0) ? -1 : 1)

  return resultBuffer
}

/**
* Extract a 3D scale from a 3D matrix.
*
* @param {TypedArray} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
* @param {TypedArray} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the result buffer.
*
* @return {TypedArray} The result buffer updated with the content of the 3D scale vector extracted from the given matrix.
*/
export function extract3DScale (
  matrixBuffer, matrixBufferOffset,
  resultBuffer, resultBufferOffset
) {
  const ax = matrixBuffer[matrixBufferOffset + 0]
  const ay = matrixBuffer[matrixBufferOffset + 1]
  const az = matrixBuffer[matrixBufferOffset + 2]
  const bx = matrixBuffer[matrixBufferOffset + 3]
  const by = matrixBuffer[matrixBufferOffset + 4]
  const bz = matrixBuffer[matrixBufferOffset + 5]
  const cx = matrixBuffer[matrixBufferOffset + 6]
  const cy = matrixBuffer[matrixBufferOffset + 7]
  const cz = matrixBuffer[matrixBufferOffset + 8]

  resultBuffer[
    resultBufferOffset + 0
  ] = Math.sqrt(ax * ax + ay * ay + az * az) * ((ax < 0) ? -1 : 1)

  resultBuffer[
    resultBufferOffset + 1
  ] = Math.sqrt(bx * bx + by * by + bz * bz) * ((by < 0) ? -1 : 1)

  resultBuffer[
    resultBufferOffset + 2
  ] = Math.sqrt(cx * cx + cy * cy + cz * cz) * ((cz < 0) ? -1 : 1)

  return resultBuffer
}

/**
* Extract a 2D rotation from a 3D matrix.
*
* @param {TypedArray} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
*
* @return {number} The 2D rotation angle in radians extracted from
*/
export function extract2DRotation (
  matrixBuffer, matrixBufferOffset
) {
  const a = matrixBuffer[matrixBufferOffset + 0]
  const b = matrixBuffer[matrixBufferOffset + 1]

  return Math.atan(-b / a)
}
