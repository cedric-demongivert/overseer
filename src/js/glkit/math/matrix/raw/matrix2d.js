/**
* Transform a 2 by 2 double buffered matrix into a string.
*
* @param {Float64Array} matrixBuffer - The buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - The offset to apply when we read the given buffer.
*
* @return {String} A string representation of the given matrix.
*/
export function toString (
  matrixBuffer,
  matrixBufferOffset
) {
  if (matrixBuffer == null) {
    return 'matrix 2 by 2 double null'
  } else {
    return [
      `matrix 2 by 2 double `,
      '[',
        '\n\r\t', matrixBuffer[matrixBufferOffset + 0].toFixed(4), ', ', matrixBuffer[matrixBufferOffset + 1].toFixed(4), ',',
        '\n\r\t', matrixBuffer[matrixBufferOffset + 2].toFixed(4), ', ', matrixBuffer[matrixBufferOffset + 3].toFixed(4),
      '\n\r]'
    ].join('')
  }
}

/**
* Fill a 2 by 2 double buffered matrix with a given value.
*
* @param {Float64Array} matrixBuffer - Buffer that contains the matrix to fill.
* @param {number} matrixBufferOffset - Offset to apply when we write into the given buffer.
* @param {number} value - Value to set in each cell of the given matrix.
*
* @return {Float64Array} The buffer with the updated matrix.
*/
export function fill (
  matrixBuffer,
  matrixBufferOffset,
  value
) {
  matrixBuffer[matrixBufferOffset + 0] = value
  matrixBuffer[matrixBufferOffset + 1] = value
  matrixBuffer[matrixBufferOffset + 2] = value
  matrixBuffer[matrixBufferOffset + 3] = value
  
  return matrixBuffer
}

/**
* Compare two 2 by 2 double buffered matrix and return true if they are both equals.
*
* @param {Float64Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the buffer that contains the left operand matrix.
* @param {Float64Array} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the buffer that contains the right operand matrix.
* @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
*
* @return {boolean} True if both matrices are equals.
*/
export function equals (
  leftBuffer,
  leftBufferOffset,
  rightBuffer,
  rightBufferOffset,
  tolerance = number.EPSILON
) {
  const a00 = leftBuffer[leftBufferOffset + 0]
  const a10 = leftBuffer[leftBufferOffset + 1]
  const a01 = leftBuffer[leftBufferOffset + 2]
  const a11 = leftBuffer[leftBufferOffset + 3]
  
  const b00 = leftBuffer[leftBufferOffset + 0]
  const b10 = leftBuffer[leftBufferOffset + 1]
  const b01 = leftBuffer[leftBufferOffset + 2]
  const b11 = leftBuffer[leftBufferOffset + 3]
  
  return Math.abs(a00 - b00) < tolerance &&
         Math.abs(a10 - b10) < tolerance &&
         Math.abs(a01 - b01) < tolerance &&
         Math.abs(a11 - b11) < tolerance
}

/**
* Set the content of a 2 by 2 double buffered matrix.
*
* @param {Float64Array} buffer - Buffer to mutate.
* @param {number} bufferOffset - Offset to apply when we mutate the buffer.
* @param {...number} content - New content of the 2 by 2 matrix in row-major order.
*
* @return {Float64Array} The buffer, updated with the given data.
*/
export function set (
  buffer,
  bufferOffset,
  a00, a10,
  a01, a11
) {
  buffer[bufferOffset + 0] = a00
  buffer[bufferOffset + 1] = a10
  buffer[bufferOffset + 2] = a01
  buffer[bufferOffset + 3] = a11
  
  return buffer
}

/**
* Copy the content of a 2 by 2 double buffered matrix into another.
*
* @param {Float64Array} sourceBuffer - Buffer to read.
* @param {number} sourceBufferOffset - Offset to apply when we read the source buffer.
* @param {Float64Array} destinationBuffer - Buffer to write.
* @param {number} destinationBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the source data.
*/
export function copy (
  sourceBuffer,
  sourceBufferOffset,
  destinationBuffer,
  destinationBufferOffset
) {
  const a00 = buffer[bufferOffset + 0]
  const a10 = buffer[bufferOffset + 1]
  const a01 = buffer[bufferOffset + 2]
  const a11 = buffer[bufferOffset + 3]
  
  destinationBuffer[destinationBufferOffset + 0] = a00
  destinationBuffer[destinationBufferOffset + 1] = a10
  destinationBuffer[destinationBufferOffset + 2] = a01
  destinationBuffer[destinationBufferOffset + 3] = a11
  
  return destinationBuffer
}

/**
* Transpose a 2 by 2 double buffered matrix and put the result into another buffer.
*
* @param {Float64Array} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the source buffer.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the transposed matrix readed from the source buffer.
*/
export function transpose (
  matrixBuffer,
  matrixBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = buffer[bufferOffset + 0]
  const a10 = buffer[bufferOffset + 1]
  const a01 = buffer[bufferOffset + 2]
  const a11 = buffer[bufferOffset + 3]
  
  destinationBuffer[destinationBufferOffset + 0] = a00
  destinationBuffer[destinationBufferOffset + 1] = a01
  destinationBuffer[destinationBufferOffset + 2] = a10
  destinationBuffer[destinationBufferOffset + 3] = a11
  
  return resultBuffer
}

/**
* Multiply 2 by 2 double buffered matrix with another and put the result into a third buffer.
*
* @param {Float64Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {Float64Array} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the second buffer.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function multiplyWithMatrix (
  leftBuffer,
  leftBufferOffset,
  rightBuffer,
  rightBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = leftBuffer[leftBufferOffset + 0]
  const a10 = leftBuffer[leftBufferOffset + 1]
  const a01 = leftBuffer[leftBufferOffset + 2]
  const a11 = leftBuffer[leftBufferOffset + 3]
  
  const b00 = rightBuffer[rightBufferOffset + 0]
  const b10 = rightBuffer[rightBufferOffset + 1]
  const b01 = rightBuffer[rightBufferOffset + 2]
  const b11 = rightBuffer[rightBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01
  resultBuffer[resultBufferOffset + 1] = a00 * b10 + a10 * b11
  resultBuffer[resultBufferOffset + 2] = a01 * b00 + a11 * b01
  resultBuffer[resultBufferOffset + 3] = a01 * b10 + a11 * b11
  
  return result
}

/**
* Multiply a 2 by 2 double buffered matrix with another static matrix, the buffered matrix will be used as a left operand.
*
* @param {Float64Array} matrixBuffer - Buffer that contains the left operand matrix.
* @param {number} matrixBufferOffset - Offset to apply when we read the first buffer.
* @param {number} b00 - Value of the cell of the column 0 and row 0 of the static matrix.
* @param {number} b10 - Value of the cell of the column 1 and row 0 of the static matrix.
* @param {number} b01 - Value of the cell of the column 0 and row 1 of the static matrix.
* @param {number} b11 - Value of the cell of the column 1 and row 1 of the static matrix.
,
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function multiplyWithStaticMatrixAsLeftOperand (
  leftBuffer,
  leftBufferOffset,
  b00, b10,
  b01, b11
  resultBuffer,
  resultBufferOffset
) {
  const a00 = matrixBuffer[matrixBufferOffset + 0]
  const a10 = matrixBuffer[matrixBufferOffset + 1]
  const a01 = matrixBuffer[matrixBufferOffset + 2]
  const a11 = matrixBuffer[matrixBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01
  resultBuffer[resultBufferOffset + 1] = a00 * b10 + a10 * b11
  resultBuffer[resultBufferOffset + 2] = a01 * b00 + a11 * b01
  resultBuffer[resultBufferOffset + 3] = a01 * b10 + a11 * b11
  
  return result
}

/**
* Multiply a 2 by 2 double buffered matrix with another static matrix, the buffered matrix will be used as a left operand.
*
* @param {Float64Array} matrixBuffer - Buffer that contains the left operand matrix.
* @param {number} matrixBufferOffset - Offset to apply when we read the first buffer.
* @param {number} a00 - Value of the cell of the column 0 and row 0 of the static matrix.
* @param {number} a10 - Value of the cell of the column 1 and row 0 of the static matrix.
* @param {number} a01 - Value of the cell of the column 0 and row 1 of the static matrix.
* @param {number} a11 - Value of the cell of the column 1 and row 1 of the static matrix.
,
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function multiplyWithStaticMatrixAsRightOperand (
  leftBuffer,
  leftBufferOffset,
  a00, a10,
  a01, a11
  resultBuffer,
  resultBufferOffset
) {
  const b00 = matrixBuffer[matrixBufferOffset + 0]
  const b10 = matrixBuffer[matrixBufferOffset + 1]
  const b01 = matrixBuffer[matrixBufferOffset + 2]
  const b11 = matrixBuffer[matrixBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01
  resultBuffer[resultBufferOffset + 1] = a00 * b10 + a10 * b11
  resultBuffer[resultBufferOffset + 2] = a01 * b00 + a11 * b01
  resultBuffer[resultBufferOffset + 3] = a01 * b10 + a11 * b11
  
  return result
}

/**
* Multiply 2 by 2 double buffered matrix with a 2 double buffered vector and put the result into a third buffer.
*
* @param {Float64Array} matrixBuffer - Buffer that contains the left operand matrix.
* @param {number} matrixBufferOffset - Offset to apply when we read the first buffer.
* @param {Float64Array} vectorBuffer - Buffer that contains the right operand vector.
* @param {number} vectorBufferOffset - Offset to apply when we read the second buffer.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function multiplyWithVector (
  matrixBuffer,
  matrixBufferOffset,
  vectorBuffer,
  vectorBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = matrixBuffer[matrixBufferOffset + 0]
  const a10 = matrixBuffer[matrixBufferOffset + 1]
  const a01 = matrixBuffer[matrixBufferOffset + 2]
  const a11 = matrixBuffer[matrixBufferOffset + 3]
  
  const b00 = vectorBuffer[vectorBufferOffset + 0]
  const b01 = vectorBuffer[vectorBufferOffset + 1]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01
  resultBuffer[resultBufferOffset + 1] = a01 * b00 + a11 * b01
  
  return resultBuffer
}

/**
* Multiply a 2 by 2 double buffered matrix with a scalar and put the result into another buffer.
*
* @param {Float64Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {number} scalar - Scalar to use as right operand.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function multiplyWithScalar (
  leftBuffer,
  leftBufferOffset,
  scalar,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = leftBuffer[leftBufferOffset + 0]
  const a10 = leftBuffer[leftBufferOffset + 1]
  const a01 = leftBuffer[leftBufferOffset + 2]
  const a11 = leftBuffer[leftBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a00 * scalar
  resultBuffer[resultBufferOffset + 1] = a10 * scalar
  resultBuffer[resultBufferOffset + 2] = a01 * scalar
  resultBuffer[resultBufferOffset + 3] = a11 * scalar
  
  return resultBuffer
}

/**
* Negate a 2 by 2 double buffered matrix and put the result into another buffer.
*
* @param {Float64Array} matrixBuffer - Buffer that contains the matrix.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function negate (
  matrixBuffer,
  matrixBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = matrixBuffer[matrixBufferOffset + 0]
  const a10 = matrixBuffer[matrixBufferOffset + 1]
  const a01 = matrixBuffer[matrixBufferOffset + 2]
  const a11 = matrixBuffer[matrixBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = -a00
  resultBuffer[resultBufferOffset + 1] = -a10
  resultBuffer[resultBufferOffset + 2] = -a01
  resultBuffer[resultBufferOffset + 3] = -a11
  
  return resultBuffer
}

/**
* Divide a 2 by 2 double buffered matrix with a scalar and put the result into another buffer.
*
* @param {Float64Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {number} scalar - Scalar to use as right operand.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function divideWithScalar (
  leftBuffer,
  leftBufferOffset,
  scalar,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = leftBuffer[leftBufferOffset + 0]
  const a10 = leftBuffer[leftBufferOffset + 1]
  const a01 = leftBuffer[leftBufferOffset + 2]
  const a11 = leftBuffer[leftBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a00 / scalar
  resultBuffer[resultBufferOffset + 1] = a10 / scalar
  resultBuffer[resultBufferOffset + 2] = a01 / scalar
  resultBuffer[resultBufferOffset + 3] = a11 / scalar
  
  return resultBuffer
}

/**
* Apply a 2 dimensional scale to a 2 by 2 double buffered matrix and put the result into another buffer.
*
* @param {Float64Array} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Scale factor of the x axis.
* @param {number} y - Scale factor of the y axis.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function scale (
  matrixBuffer,
  matrixBufferOffset,
  x, y,
  resultBuffer,
  resultBufferOffset
) {
  const b00 = matrixBuffer[matrixBufferOffset + 0]
  const b10 = matrixBuffer[matrixBufferOffset + 1]
  const b01 = matrixBuffer[matrixBufferOffset + 2]
  const b11 = matrixBuffer[matrixBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = x * b00
  resultBuffer[resultBufferOffset + 1] = x * b10
  resultBuffer[resultBufferOffset + 2] = y * b01
  resultBuffer[resultBufferOffset + 3] = y * b11
  
  return resultBuffer
}

/**
* Apply a 2 dimensional rotation to a 2 by 2 double buffered matrix and put the result into another buffer.
*
* @param {Float64Array} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Rotation for the x axis in radians.
* @param {number} y - Rotation for the y axis in radians.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function rotate (
  matrixBuffer,
  matrixBufferOffset,
  x, y,
  resultBuffer,
  resultBufferOffset
) {
  const cosx = Math.cos(x)
  const sinx = Math.sin(x)
  const cosy = Math.cos(y)
  const siny = Math.sin(y)
  
  const a00 = cosX
  const a10 = -sinX
  const a01 = sinX
  const a11 = cosX
  
  const b00 = matrixBuffer[matrixBufferOffset + 0]
  const b10 = matrixBuffer[matrixBufferOffset + 1]
  const b01 = matrixBuffer[matrixBufferOffset + 2]
  const b11 = matrixBuffer[matrixBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01
  resultBuffer[resultBufferOffset + 1] = a00 * b10 + a10 * b11
  resultBuffer[resultBufferOffset + 2] = a01 * b00 + a11 * b01
  resultBuffer[resultBufferOffset + 3] = a01 * b10 + a11 * b11
  
  return resultBuffer
}

/**
* Apply a 1 dimensional translation to a 2 by 2 double buffered matrix and put the result into another buffer.
*
* @param {Float64Array} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Translation to apply to the x axis.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function translate (
  matrixBuffer,
  matrixBufferOffset,
  x,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = 1
  const a10 = x
  const a01 = 0
  const a11 = 1
  
  const b00 = matrixBuffer[matrixBufferOffset + 0]
  const b10 = matrixBuffer[matrixBufferOffset + 1]
  const b01 = matrixBuffer[matrixBufferOffset + 2]
  const b11 = matrixBuffer[matrixBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01
  resultBuffer[resultBufferOffset + 1] = a00 * b10 + a10 * b11
  resultBuffer[resultBufferOffset + 2] = a01 * b00 + a11 * b01
  resultBuffer[resultBufferOffset + 3] = a01 * b10 + a11 * b11
  
  return resultBuffer
}

/**
* Add a 2 by 2 double buffered matrix to another one and put the result into a third buffer.
*
* @param {Float64Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {Float64Array} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the second buffer.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function add (
  leftBuffer,
  leftBufferOffset,
  rightBuffer,
  rightBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = leftBuffer[leftBufferOffset + 0]
  const a10 = leftBuffer[leftBufferOffset + 1]
  const a01 = leftBuffer[leftBufferOffset + 2]
  const a11 = leftBuffer[leftBufferOffset + 3]
  
  const b00 = rightBuffer[rightBufferOffset + 0]
  const b10 = rightBuffer[rightBufferOffset + 1]
  const b01 = rightBuffer[rightBufferOffset + 2]
  const b11 = rightBuffer[rightBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a00 + b00
  resultBuffer[resultBufferOffset + 1] = a10 + b10
  resultBuffer[resultBufferOffset + 2] = a01 + b01
  resultBuffer[resultBufferOffset + 3] = a11 + b11
  
  return resultBuffer
}

/**
* Subtract a 2 by 2 double buffered matrix to one and put the result into a third buffer.
*
* @param {Float64Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {Float64Array} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the second buffer.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float64Array} The destination buffer, updated with the result of the operation.
*/
export function subtract (
  leftBuffer,
  leftBufferOffset,
  rightBuffer,
  rightBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = leftBuffer[leftBufferOffset + 0]
  const a10 = leftBuffer[leftBufferOffset + 1]
  const a01 = leftBuffer[leftBufferOffset + 2]
  const a11 = leftBuffer[leftBufferOffset + 3]
  
  const b00 = rightBuffer[rightBufferOffset + 0]
  const b10 = rightBuffer[rightBufferOffset + 1]
  const b01 = rightBuffer[rightBufferOffset + 2]
  const b11 = rightBuffer[rightBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = a00 - b00
  resultBuffer[resultBufferOffset + 1] = a10 - b10
  resultBuffer[resultBufferOffset + 2] = a01 - b01
  resultBuffer[resultBufferOffset + 3] = a11 - b11
  
  return resultBuffer
}

/**
* Set the content of a 2 by 2 double buffered matrix to the content of an identity matrix.
*
* @param {Float64Array} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
*
* @return {Float64Array} The buffer, updated with content of an identity matrix.
*/
export function toIdentity (
  matrixBuffer,
  matrixBufferOffset
) {
  matrixBuffer[matrixBufferOffset + 0] = 1
  matrixBuffer[matrixBufferOffset + 1] = 0
  matrixBuffer[matrixBufferOffset + 2] = 0
  matrixBuffer[matrixBufferOffset + 3] = 1
  
  return matrixBuffer
}

/**
* Set the content of a 2 by 2 double buffered matrix to the content of a 2 dimensional scale matrix.
*
* @param {Float64Array} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
* @param {number} x - Scale factor of the x axis.
* @param {number} y - Scale factor of the y axis.
*
* @return {Float64Array} The buffer, updated with the content of a 2 dimensional scale matrix.
*/
export function toScale (
  matrixBuffer,
  matrixBufferOffset,
  x, y
) {
  matrixBuffer[matrixBufferOffset + 0] = x
  matrixBuffer[matrixBufferOffset + 1] = 0
  matrixBuffer[matrixBufferOffset + 2] = 0
  matrixBuffer[matrixBufferOffset + 3] = y
  
  return matrixBuffer
}

/**
* Set the content of a 2 by 2 double buffered matrix to a 2 dimensional rotation.
*
* @param {Float64Array} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Rotation for the x axis in radians.
* @param {number} y - Rotation for the y axis in radians.
*
* @return {Float64Array} The buffer, updated with the content of a 2 dimensional rotation.
*/
export function toRotation (
  matrixBuffer,
  matrixBufferOffset,
  x, y
) {
  const cosx = Math.cos(x)
  const sinx = Math.sin(x)
  const cosy = Math.cos(y)
  const siny = Math.sin(y)
  
  matrixBuffer[matrixBufferOffset + 0] = cosX
  matrixBuffer[matrixBufferOffset + 1] = -sinX
  matrixBuffer[matrixBufferOffset + 2] = sinX
  matrixBuffer[matrixBufferOffset + 3] = cosX
  
  return matrixBuffer
}

/**
* Set the content of a 2 by 2 double buffered matrix to the content of a 1 dimensional translation matrix.
*
* @param {Float64Array} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
* @param {number} x - Translation to apply to the x axis.
*
* @return {Float64Array} The buffer, updated with the content of a 1 dimensional translation matrix.
*/
export function toTranslation (
  matrixBuffer,
  matrixBufferOffset,
  x
) {
  matrixBuffer[matrixBufferOffset + 0] = 1
  matrixBuffer[matrixBufferOffset + 1] = x
  matrixBuffer[matrixBufferOffset + 2] = 0
  matrixBuffer[matrixBufferOffset + 3] = 1
  
  return matrixBuffer
}

/**
* Compute and return the determinant of a 2 by 2 double buffered matrix.
*
* @param {Float64Array} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
*
* @return {number} The determinant of the given 2 by 2 double buffered matrix.
*/
export function determinant (
  matrixBuffer,
  matrixBufferOffset
) {
  const a00 = matrixBuffer[matrixBufferOffset + 0]
  const a10 = matrixBuffer[matrixBufferOffset + 1]
  const a01 = matrixBuffer[matrixBufferOffset + 2]
  const a11 = matrixBuffer[matrixBufferOffset + 3]
  
  return a00 * a11 - a10 * a01
}

/**
* Invert a 2 by 2 double buffered matrix and write the result into another buffer.
*
* @param {Float64Array} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the result buffer.
*
* @return {Float64Array} The result buffer updated with the result of this operation.
*/
export function invert (
  matrixBuffer,
  matrixBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = matrixBuffer[matrixBufferOffset + 0]
  const a10 = matrixBuffer[matrixBufferOffset + 1]
  const a01 = matrixBuffer[matrixBufferOffset + 2]
  const a11 = matrixBuffer[matrixBufferOffset + 3]
  
  const determinantValue = determinant(matrixBuffer, matrixBufferOffset)
  
  resultBuffer[resultBufferOffset + 0] = a11 / determinantValue
  resultBuffer[resultBufferOffset + 1] = -a10 / determinantValue
  resultBuffer[resultBufferOffset + 2] = -a01 / determinantValue
  resultBuffer[resultBufferOffset + 3] = a00 / determinantValue
  
  return resultBuffer
}

/**
* Extract a translation from a 2 by 2 double buffered matrix
*
* @param {Float64Array} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the result buffer.
*
* @return {Float64Array} The result buffer updated with the content of the translation vector extracted from the given matrix.
*/
export function extractTranslation (
  matrixBuffer,
  matrixBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  resultBuffer[resultBufferOffset + 0] = matrixBuffer[matrixBufferOffset + 1]
  
  return resultBuffer
}

/**
* Extract a scale from a 2 by 2 double buffered matrix
*
* @param {Float64Array} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
* @param {Float64Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the result buffer.
*
* @return {Float64Array} The result buffer updated with the content of the 2 dimensional scale vector extracted from the given matrix.
*/
export function extractScale (
  matrixBuffer,
  matrixBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = matrixBuffer[matrixBufferOffset + 0]
  const a10 = matrixBuffer[matrixBufferOffset + 1]
  const a01 = matrixBuffer[matrixBufferOffset + 2]
  const a11 = matrixBuffer[matrixBufferOffset + 3]
  
  resultBuffer[resultBufferOffset + 0] = Math.sqrt(a00 * a00 + a10 * a10) * ((a00 < 0) ? -1 : 1)
  resultBuffer[resultBufferOffset + 1] = Math.sqrt(a01 * a01 + a11 * a11) * ((a11 < 0) ? -1 : 1)
  
  return resultBuffer
}

/**
* Extract a 2D rotation from a 2 by 2 double buffered matrix
*
* @param {Float64Array} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
*
* @return {number} The 2D rotation angle in radians extracted from the given matrix.
*/
export function extract2DRotation (
  matrixBuffer,
  matrixBufferOffset
) {
  const a = matrixBuffer[matrixBufferOffset + 0]
  const b = matrixBuffer[matrixBufferOffset + 1]

  return Math.atan(-b / a)
}