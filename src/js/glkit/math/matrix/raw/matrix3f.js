/**
* Transform a 3 by 3 float buffered matrix into a string.
*
* @param {Float32Array} matrixBuffer - The buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - The offset to apply when we read the given buffer.
*
* @return {String} A string representation of the given matrix.
*/
export function toString (
  matrixBuffer,
  matrixBufferOffset
) {
  if (matrixBuffer == null) {
    return 'matrix 3 by 3 float null'
  } else {
    return [
      `matrix 3 by 3 float `,
      '[',
        '\n\r\t', matrixBuffer[matrixBufferOffset + 0].toFixed(4), ', ', matrixBuffer[matrixBufferOffset + 1].toFixed(4), ', ', matrixBuffer[matrixBufferOffset + 2].toFixed(4), ',',
        '\n\r\t', matrixBuffer[matrixBufferOffset + 3].toFixed(4), ', ', matrixBuffer[matrixBufferOffset + 4].toFixed(4), ', ', matrixBuffer[matrixBufferOffset + 5].toFixed(4), ',',
        '\n\r\t', matrixBuffer[matrixBufferOffset + 6].toFixed(4), ', ', matrixBuffer[matrixBufferOffset + 7].toFixed(4), ', ', matrixBuffer[matrixBufferOffset + 8].toFixed(4),
      '\n\r]'
    ].join('')
  }
}

/**
* Fill a 3 by 3 float buffered matrix with a given value.
*
* @param {Float32Array} matrixBuffer - Buffer that contains the matrix to fill.
* @param {number} matrixBufferOffset - Offset to apply when we write into the given buffer.
* @param {number} value - Value to set in each cell of the given matrix.
*
* @return {Float32Array} The buffer with the updated matrix.
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
  matrixBuffer[matrixBufferOffset + 4] = value
  matrixBuffer[matrixBufferOffset + 5] = value
  matrixBuffer[matrixBufferOffset + 6] = value
  matrixBuffer[matrixBufferOffset + 7] = value
  matrixBuffer[matrixBufferOffset + 8] = value
  
  return matrixBuffer
}

/**
* Compare two 3 by 3 float buffered matrix and return true if they are both equals.
*
* @param {Float32Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the buffer that contains the left operand matrix.
* @param {Float32Array} rightBuffer - Buffer that contains the right operand matrix.
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
  const a20 = leftBuffer[leftBufferOffset + 2]
  const a01 = leftBuffer[leftBufferOffset + 3]
  const a11 = leftBuffer[leftBufferOffset + 4]
  const a21 = leftBuffer[leftBufferOffset + 5]
  const a02 = leftBuffer[leftBufferOffset + 6]
  const a12 = leftBuffer[leftBufferOffset + 7]
  const a22 = leftBuffer[leftBufferOffset + 8]
  
  const b00 = leftBuffer[leftBufferOffset + 0]
  const b10 = leftBuffer[leftBufferOffset + 1]
  const b20 = leftBuffer[leftBufferOffset + 2]
  const b01 = leftBuffer[leftBufferOffset + 3]
  const b11 = leftBuffer[leftBufferOffset + 4]
  const b21 = leftBuffer[leftBufferOffset + 5]
  const b02 = leftBuffer[leftBufferOffset + 6]
  const b12 = leftBuffer[leftBufferOffset + 7]
  const b22 = leftBuffer[leftBufferOffset + 8]
  
  return Math.abs(a00 - b00) < tolerance &&
         Math.abs(a10 - b10) < tolerance &&
         Math.abs(a20 - b20) < tolerance &&
         Math.abs(a01 - b01) < tolerance &&
         Math.abs(a11 - b11) < tolerance &&
         Math.abs(a21 - b21) < tolerance &&
         Math.abs(a02 - b02) < tolerance &&
         Math.abs(a12 - b12) < tolerance &&
         Math.abs(a22 - b22) < tolerance
}

/**
* Set the content of a 3 by 3 float buffered matrix.
*
* @param {Float32Array} buffer - Buffer to mutate.
* @param {number} bufferOffset - Offset to apply when we mutate the buffer.
* @param {...number} content - New content of the 3 by 3 matrix in row-major order.
*
* @return {Float32Array} The buffer, updated with the given data.
*/
export function set (
  buffer,
  bufferOffset,
  a00, a10, a20,
  a01, a11, a21,
  a02, a12, a22
) {
  buffer[bufferOffset + 0] = a00
  buffer[bufferOffset + 1] = a10
  buffer[bufferOffset + 2] = a20
  buffer[bufferOffset + 3] = a01
  buffer[bufferOffset + 4] = a11
  buffer[bufferOffset + 5] = a21
  buffer[bufferOffset + 6] = a02
  buffer[bufferOffset + 7] = a12
  buffer[bufferOffset + 8] = a22
  
  return buffer
}

/**
* Copy the content of a 3 by 3 float buffered matrix into another.
*
* @param {Float32Array} sourceBuffer - Buffer to read.
* @param {number} sourceBufferOffset - Offset to apply when we read the source buffer.
* @param {Float32Array} destinationBuffer - Buffer to write.
* @param {number} destinationBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the source data.
*/
export function copy (
  sourceBuffer,
  sourceBufferOffset,
  destinationBuffer,
  destinationBufferOffset
) {
  const a00 = buffer[bufferOffset + 0]
  const a10 = buffer[bufferOffset + 1]
  const a20 = buffer[bufferOffset + 2]
  const a01 = buffer[bufferOffset + 3]
  const a11 = buffer[bufferOffset + 4]
  const a21 = buffer[bufferOffset + 5]
  const a02 = buffer[bufferOffset + 6]
  const a12 = buffer[bufferOffset + 7]
  const a22 = buffer[bufferOffset + 8]
  
  destinationBuffer[destinationBufferOffset + 0] = a00
  destinationBuffer[destinationBufferOffset + 1] = a10
  destinationBuffer[destinationBufferOffset + 2] = a20
  destinationBuffer[destinationBufferOffset + 3] = a01
  destinationBuffer[destinationBufferOffset + 4] = a11
  destinationBuffer[destinationBufferOffset + 5] = a21
  destinationBuffer[destinationBufferOffset + 6] = a02
  destinationBuffer[destinationBufferOffset + 7] = a12
  destinationBuffer[destinationBufferOffset + 8] = a22
  
  return destinationBuffer
}

/**
* Transpose a 3 by 3 float buffered matrix and put the result into another buffer.
*
* @param {Float32Array} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the source buffer.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the transposed matrix readed from the source buffer.
*/
export function transpose (
  matrixBuffer,
  matrixBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = buffer[bufferOffset + 0]
  const a10 = buffer[bufferOffset + 1]
  const a20 = buffer[bufferOffset + 2]
  const a01 = buffer[bufferOffset + 3]
  const a11 = buffer[bufferOffset + 4]
  const a21 = buffer[bufferOffset + 5]
  const a02 = buffer[bufferOffset + 6]
  const a12 = buffer[bufferOffset + 7]
  const a22 = buffer[bufferOffset + 8]
  
  destinationBuffer[destinationBufferOffset + 0] = a00
  destinationBuffer[destinationBufferOffset + 1] = a01
  destinationBuffer[destinationBufferOffset + 2] = a02
  destinationBuffer[destinationBufferOffset + 3] = a10
  destinationBuffer[destinationBufferOffset + 4] = a11
  destinationBuffer[destinationBufferOffset + 5] = a12
  destinationBuffer[destinationBufferOffset + 6] = a20
  destinationBuffer[destinationBufferOffset + 7] = a21
  destinationBuffer[destinationBufferOffset + 8] = a22
  
  return resultBuffer
}

/**
* Multiply 3 by 3 float buffered matrix with another and put the result into a third buffer.
*
* @param {Float32Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {Float32Array} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the second buffer.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
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
  const a20 = leftBuffer[leftBufferOffset + 2]
  const a01 = leftBuffer[leftBufferOffset + 3]
  const a11 = leftBuffer[leftBufferOffset + 4]
  const a21 = leftBuffer[leftBufferOffset + 5]
  const a02 = leftBuffer[leftBufferOffset + 6]
  const a12 = leftBuffer[leftBufferOffset + 7]
  const a22 = leftBuffer[leftBufferOffset + 8]
  
  const b00 = rightBuffer[rightBufferOffset + 0]
  const b10 = rightBuffer[rightBufferOffset + 1]
  const b20 = rightBuffer[rightBufferOffset + 2]
  const b01 = rightBuffer[rightBufferOffset + 3]
  const b11 = rightBuffer[rightBufferOffset + 4]
  const b21 = rightBuffer[rightBufferOffset + 5]
  const b02 = rightBuffer[rightBufferOffset + 6]
  const b12 = rightBuffer[rightBufferOffset + 7]
  const b22 = rightBuffer[rightBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01 + a20 * b02
  resultBuffer[resultBufferOffset + 1] = a00 * b10 + a10 * b11 + a20 * b12
  resultBuffer[resultBufferOffset + 2] = a00 * b20 + a10 * b21 + a20 * b22
  resultBuffer[resultBufferOffset + 3] = a01 * b00 + a11 * b01 + a21 * b02
  resultBuffer[resultBufferOffset + 4] = a01 * b10 + a11 * b11 + a21 * b12
  resultBuffer[resultBufferOffset + 5] = a01 * b20 + a11 * b21 + a21 * b22
  resultBuffer[resultBufferOffset + 6] = a02 * b00 + a12 * b01 + a22 * b02
  resultBuffer[resultBufferOffset + 7] = a02 * b10 + a12 * b11 + a22 * b12
  resultBuffer[resultBufferOffset + 8] = a02 * b20 + a12 * b21 + a22 * b22
  
  return result
}

/**
* Multiply a 3 by 3 float buffered matrix with another static matrix, the buffered matrix will be used as a left operand.
*
* @param {Float32Array} matrixBuffer - Buffer that contains the left operand matrix.
* @param {number} matrixBufferOffset - Offset to apply when we read the first buffer.
* @param {number} b00 - Value of the cell of the column 0 and row 0 of the static matrix.
* @param {number} b10 - Value of the cell of the column 1 and row 0 of the static matrix.
* @param {number} b20 - Value of the cell of the column 2 and row 0 of the static matrix.
* @param {number} b01 - Value of the cell of the column 0 and row 1 of the static matrix.
* @param {number} b11 - Value of the cell of the column 1 and row 1 of the static matrix.
* @param {number} b21 - Value of the cell of the column 2 and row 1 of the static matrix.
* @param {number} b02 - Value of the cell of the column 0 and row 2 of the static matrix.
* @param {number} b12 - Value of the cell of the column 1 and row 2 of the static matrix.
* @param {number} b22 - Value of the cell of the column 2 and row 2 of the static matrix.
,
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
*/
export function multiplyWithStaticMatrixAsLeftOperand (
  leftBuffer,
  leftBufferOffset,
  b00, b10, b20,
  b01, b11, b21,
  b02, b12, b22
  resultBuffer,
  resultBufferOffset
) {
  const a00 = matrixBuffer[matrixBufferOffset + 0]
  const a10 = matrixBuffer[matrixBufferOffset + 1]
  const a20 = matrixBuffer[matrixBufferOffset + 2]
  const a01 = matrixBuffer[matrixBufferOffset + 3]
  const a11 = matrixBuffer[matrixBufferOffset + 4]
  const a21 = matrixBuffer[matrixBufferOffset + 5]
  const a02 = matrixBuffer[matrixBufferOffset + 6]
  const a12 = matrixBuffer[matrixBufferOffset + 7]
  const a22 = matrixBuffer[matrixBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01 + a20 * b02
  resultBuffer[resultBufferOffset + 1] = a00 * b10 + a10 * b11 + a20 * b12
  resultBuffer[resultBufferOffset + 2] = a00 * b20 + a10 * b21 + a20 * b22
  resultBuffer[resultBufferOffset + 3] = a01 * b00 + a11 * b01 + a21 * b02
  resultBuffer[resultBufferOffset + 4] = a01 * b10 + a11 * b11 + a21 * b12
  resultBuffer[resultBufferOffset + 5] = a01 * b20 + a11 * b21 + a21 * b22
  resultBuffer[resultBufferOffset + 6] = a02 * b00 + a12 * b01 + a22 * b02
  resultBuffer[resultBufferOffset + 7] = a02 * b10 + a12 * b11 + a22 * b12
  resultBuffer[resultBufferOffset + 8] = a02 * b20 + a12 * b21 + a22 * b22
  
  return result
}

/**
* Multiply a 3 by 3 float buffered matrix with another static matrix, the buffered matrix will be used as a left operand.
*
* @param {Float32Array} matrixBuffer - Buffer that contains the left operand matrix.
* @param {number} matrixBufferOffset - Offset to apply when we read the first buffer.
* @param {number} a00 - Value of the cell of the column 0 and row 0 of the static matrix.
* @param {number} a10 - Value of the cell of the column 1 and row 0 of the static matrix.
* @param {number} a20 - Value of the cell of the column 2 and row 0 of the static matrix.
* @param {number} a01 - Value of the cell of the column 0 and row 1 of the static matrix.
* @param {number} a11 - Value of the cell of the column 1 and row 1 of the static matrix.
* @param {number} a21 - Value of the cell of the column 2 and row 1 of the static matrix.
* @param {number} a02 - Value of the cell of the column 0 and row 2 of the static matrix.
* @param {number} a12 - Value of the cell of the column 1 and row 2 of the static matrix.
* @param {number} a22 - Value of the cell of the column 2 and row 2 of the static matrix.
,
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
*/
export function multiplyWithStaticMatrixAsRightOperand (
  leftBuffer,
  leftBufferOffset,
  a00, a10, a20,
  a01, a11, a21,
  a02, a12, a22
  resultBuffer,
  resultBufferOffset
) {
  const b00 = matrixBuffer[matrixBufferOffset + 0]
  const b10 = matrixBuffer[matrixBufferOffset + 1]
  const b20 = matrixBuffer[matrixBufferOffset + 2]
  const b01 = matrixBuffer[matrixBufferOffset + 3]
  const b11 = matrixBuffer[matrixBufferOffset + 4]
  const b21 = matrixBuffer[matrixBufferOffset + 5]
  const b02 = matrixBuffer[matrixBufferOffset + 6]
  const b12 = matrixBuffer[matrixBufferOffset + 7]
  const b22 = matrixBuffer[matrixBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01 + a20 * b02
  resultBuffer[resultBufferOffset + 1] = a00 * b10 + a10 * b11 + a20 * b12
  resultBuffer[resultBufferOffset + 2] = a00 * b20 + a10 * b21 + a20 * b22
  resultBuffer[resultBufferOffset + 3] = a01 * b00 + a11 * b01 + a21 * b02
  resultBuffer[resultBufferOffset + 4] = a01 * b10 + a11 * b11 + a21 * b12
  resultBuffer[resultBufferOffset + 5] = a01 * b20 + a11 * b21 + a21 * b22
  resultBuffer[resultBufferOffset + 6] = a02 * b00 + a12 * b01 + a22 * b02
  resultBuffer[resultBufferOffset + 7] = a02 * b10 + a12 * b11 + a22 * b12
  resultBuffer[resultBufferOffset + 8] = a02 * b20 + a12 * b21 + a22 * b22
  
  return result
}

/**
* Multiply 3 by 3 float buffered matrix with a 3 float buffered vector and put the result into a third buffer.
*
* @param {Float32Array} matrixBuffer - Buffer that contains the left operand matrix.
* @param {number} matrixBufferOffset - Offset to apply when we read the first buffer.
* @param {Float32Array} vectorBuffer - Buffer that contains the right operand vector.
* @param {number} vectorBufferOffset - Offset to apply when we read the second buffer.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
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
  const a20 = matrixBuffer[matrixBufferOffset + 2]
  const a01 = matrixBuffer[matrixBufferOffset + 3]
  const a11 = matrixBuffer[matrixBufferOffset + 4]
  const a21 = matrixBuffer[matrixBufferOffset + 5]
  const a02 = matrixBuffer[matrixBufferOffset + 6]
  const a12 = matrixBuffer[matrixBufferOffset + 7]
  const a22 = matrixBuffer[matrixBufferOffset + 8]
  
  const b00 = vectorBuffer[vectorBufferOffset + 0]
  const b01 = vectorBuffer[vectorBufferOffset + 1]
  const b02 = vectorBuffer[vectorBufferOffset + 2]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01 + a20 * b02
  resultBuffer[resultBufferOffset + 1] = a01 * b00 + a11 * b01 + a21 * b02
  resultBuffer[resultBufferOffset + 2] = a02 * b00 + a12 * b01 + a22 * b02
  
  return resultBuffer
}

/**
* Multiply a 3 by 3 float buffered matrix with a scalar and put the result into another buffer.
*
* @param {Float32Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {number} scalar - Scalar to use as right operand.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
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
  const a20 = leftBuffer[leftBufferOffset + 2]
  const a01 = leftBuffer[leftBufferOffset + 3]
  const a11 = leftBuffer[leftBufferOffset + 4]
  const a21 = leftBuffer[leftBufferOffset + 5]
  const a02 = leftBuffer[leftBufferOffset + 6]
  const a12 = leftBuffer[leftBufferOffset + 7]
  const a22 = leftBuffer[leftBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = a00 * scalar
  resultBuffer[resultBufferOffset + 1] = a10 * scalar
  resultBuffer[resultBufferOffset + 2] = a20 * scalar
  resultBuffer[resultBufferOffset + 3] = a01 * scalar
  resultBuffer[resultBufferOffset + 4] = a11 * scalar
  resultBuffer[resultBufferOffset + 5] = a21 * scalar
  resultBuffer[resultBufferOffset + 6] = a02 * scalar
  resultBuffer[resultBufferOffset + 7] = a12 * scalar
  resultBuffer[resultBufferOffset + 8] = a22 * scalar
  
  return resultBuffer
}

/**
* Negate a 3 by 3 float buffered matrix and put the result into another buffer.
*
* @param {Float32Array} matrixBuffer - Buffer that contains the matrix.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
*/
export function negate (
  matrixBuffer,
  matrixBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = matrixBuffer[matrixBufferOffset + 0]
  const a10 = matrixBuffer[matrixBufferOffset + 1]
  const a20 = matrixBuffer[matrixBufferOffset + 2]
  const a01 = matrixBuffer[matrixBufferOffset + 3]
  const a11 = matrixBuffer[matrixBufferOffset + 4]
  const a21 = matrixBuffer[matrixBufferOffset + 5]
  const a02 = matrixBuffer[matrixBufferOffset + 6]
  const a12 = matrixBuffer[matrixBufferOffset + 7]
  const a22 = matrixBuffer[matrixBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = -a00
  resultBuffer[resultBufferOffset + 1] = -a10
  resultBuffer[resultBufferOffset + 2] = -a20
  resultBuffer[resultBufferOffset + 3] = -a01
  resultBuffer[resultBufferOffset + 4] = -a11
  resultBuffer[resultBufferOffset + 5] = -a21
  resultBuffer[resultBufferOffset + 6] = -a02
  resultBuffer[resultBufferOffset + 7] = -a12
  resultBuffer[resultBufferOffset + 8] = -a22
  
  return resultBuffer
}

/**
* Divide a 3 by 3 float buffered matrix with a scalar and put the result into another buffer.
*
* @param {Float32Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {number} scalar - Scalar to use as right operand.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
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
  const a20 = leftBuffer[leftBufferOffset + 2]
  const a01 = leftBuffer[leftBufferOffset + 3]
  const a11 = leftBuffer[leftBufferOffset + 4]
  const a21 = leftBuffer[leftBufferOffset + 5]
  const a02 = leftBuffer[leftBufferOffset + 6]
  const a12 = leftBuffer[leftBufferOffset + 7]
  const a22 = leftBuffer[leftBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = a00 / scalar
  resultBuffer[resultBufferOffset + 1] = a10 / scalar
  resultBuffer[resultBufferOffset + 2] = a20 / scalar
  resultBuffer[resultBufferOffset + 3] = a01 / scalar
  resultBuffer[resultBufferOffset + 4] = a11 / scalar
  resultBuffer[resultBufferOffset + 5] = a21 / scalar
  resultBuffer[resultBufferOffset + 6] = a02 / scalar
  resultBuffer[resultBufferOffset + 7] = a12 / scalar
  resultBuffer[resultBufferOffset + 8] = a22 / scalar
  
  return resultBuffer
}

/**
* Apply a 3 dimensional scale to a 3 by 3 float buffered matrix and put the result into another buffer.
*
* @param {Float32Array} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Scale factor of the x axis.
* @param {number} y - Scale factor of the y axis.
* @param {number} z - Scale factor of the z axis.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
*/
export function scale (
  matrixBuffer,
  matrixBufferOffset,
  x, y, z,
  resultBuffer,
  resultBufferOffset
) {
  const b00 = matrixBuffer[matrixBufferOffset + 0]
  const b10 = matrixBuffer[matrixBufferOffset + 1]
  const b20 = matrixBuffer[matrixBufferOffset + 2]
  const b01 = matrixBuffer[matrixBufferOffset + 3]
  const b11 = matrixBuffer[matrixBufferOffset + 4]
  const b21 = matrixBuffer[matrixBufferOffset + 5]
  const b02 = matrixBuffer[matrixBufferOffset + 6]
  const b12 = matrixBuffer[matrixBufferOffset + 7]
  const b22 = matrixBuffer[matrixBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = x * b00
  resultBuffer[resultBufferOffset + 1] = x * b10
  resultBuffer[resultBufferOffset + 2] = x * b20
  resultBuffer[resultBufferOffset + 3] = y * b01
  resultBuffer[resultBufferOffset + 4] = y * b11
  resultBuffer[resultBufferOffset + 5] = y * b21
  resultBuffer[resultBufferOffset + 6] = z * b02
  resultBuffer[resultBufferOffset + 7] = z * b12
  resultBuffer[resultBufferOffset + 8] = z * b22
  
  return resultBuffer
}

/**
* Apply a 3 dimensional rotation to a 3 by 3 float buffered matrix and put the result into another buffer.
*
* @param {Float32Array} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Rotation for the x axis in radians.
* @param {number} y - Rotation for the y axis in radians.
* @param {number} z - Rotation for the z axis in radians.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
*/
export function rotate (
  matrixBuffer,
  matrixBufferOffset,
  x, y, z,
  resultBuffer,
  resultBufferOffset
) {
  const cosx = Math.cos(x)
  const sinx = Math.sin(x)
  const cosy = Math.cos(y)
  const siny = Math.sin(y)
  const cosz = Math.cos(z)
  const sinz = Math.sin(z)
  
  const a00 = cosY * cosZ
  const a10 = cosY * -sinZ
  const a20 = sinY
  const a01 = (-sinX * -sinY * cosZ + cosX * sinZ)
  const a11 = (-sinX * -sinY * -sinZ + cosX * cosZ)
  const a21 = -sinX * cosY
  const a02 = (cosX * -sinY * cosZ + sinX * sinZ)
  const a12 = (cosX * -sinY * -sinZ + sinX * cosZ)
  const a22 = cosX * cosY
  
  const b00 = matrixBuffer[matrixBufferOffset + 0]
  const b10 = matrixBuffer[matrixBufferOffset + 1]
  const b20 = matrixBuffer[matrixBufferOffset + 2]
  const b01 = matrixBuffer[matrixBufferOffset + 3]
  const b11 = matrixBuffer[matrixBufferOffset + 4]
  const b21 = matrixBuffer[matrixBufferOffset + 5]
  const b02 = matrixBuffer[matrixBufferOffset + 6]
  const b12 = matrixBuffer[matrixBufferOffset + 7]
  const b22 = matrixBuffer[matrixBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01 + a20 * b02
  resultBuffer[resultBufferOffset + 1] = a00 * b10 + a10 * b11 + a20 * b12
  resultBuffer[resultBufferOffset + 2] = a00 * b20 + a10 * b21 + a20 * b22
  resultBuffer[resultBufferOffset + 3] = a01 * b00 + a11 * b01 + a21 * b02
  resultBuffer[resultBufferOffset + 4] = a01 * b10 + a11 * b11 + a21 * b12
  resultBuffer[resultBufferOffset + 5] = a01 * b20 + a11 * b21 + a21 * b22
  resultBuffer[resultBufferOffset + 6] = a02 * b00 + a12 * b01 + a22 * b02
  resultBuffer[resultBufferOffset + 7] = a02 * b10 + a12 * b11 + a22 * b12
  resultBuffer[resultBufferOffset + 8] = a02 * b20 + a12 * b21 + a22 * b22
  
  return resultBuffer
}

/**
* Apply a 2 dimensional translation to a 3 by 3 float buffered matrix and put the result into another buffer.
*
* @param {Float32Array} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Translation to apply to the x axis.
* @param {number} y - Translation to apply to the y axis.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
*/
export function translate (
  matrixBuffer,
  matrixBufferOffset,
  x, y,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = 1
  const a10 = 0
  const a20 = x
  const a01 = 0
  const a11 = 1
  const a21 = y
  const a02 = 0
  const a12 = 0
  const a22 = 1
  
  const b00 = matrixBuffer[matrixBufferOffset + 0]
  const b10 = matrixBuffer[matrixBufferOffset + 1]
  const b20 = matrixBuffer[matrixBufferOffset + 2]
  const b01 = matrixBuffer[matrixBufferOffset + 3]
  const b11 = matrixBuffer[matrixBufferOffset + 4]
  const b21 = matrixBuffer[matrixBufferOffset + 5]
  const b02 = matrixBuffer[matrixBufferOffset + 6]
  const b12 = matrixBuffer[matrixBufferOffset + 7]
  const b22 = matrixBuffer[matrixBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = a00 * b00 + a10 * b01 + a20 * b02
  resultBuffer[resultBufferOffset + 1] = a00 * b10 + a10 * b11 + a20 * b12
  resultBuffer[resultBufferOffset + 2] = a00 * b20 + a10 * b21 + a20 * b22
  resultBuffer[resultBufferOffset + 3] = a01 * b00 + a11 * b01 + a21 * b02
  resultBuffer[resultBufferOffset + 4] = a01 * b10 + a11 * b11 + a21 * b12
  resultBuffer[resultBufferOffset + 5] = a01 * b20 + a11 * b21 + a21 * b22
  resultBuffer[resultBufferOffset + 6] = a02 * b00 + a12 * b01 + a22 * b02
  resultBuffer[resultBufferOffset + 7] = a02 * b10 + a12 * b11 + a22 * b12
  resultBuffer[resultBufferOffset + 8] = a02 * b20 + a12 * b21 + a22 * b22
  
  return resultBuffer
}

/**
* Add a 3 by 3 float buffered matrix to another one and put the result into a third buffer.
*
* @param {Float32Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {Float32Array} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the second buffer.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
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
  const a20 = leftBuffer[leftBufferOffset + 2]
  const a01 = leftBuffer[leftBufferOffset + 3]
  const a11 = leftBuffer[leftBufferOffset + 4]
  const a21 = leftBuffer[leftBufferOffset + 5]
  const a02 = leftBuffer[leftBufferOffset + 6]
  const a12 = leftBuffer[leftBufferOffset + 7]
  const a22 = leftBuffer[leftBufferOffset + 8]
  
  const b00 = rightBuffer[rightBufferOffset + 0]
  const b10 = rightBuffer[rightBufferOffset + 1]
  const b20 = rightBuffer[rightBufferOffset + 2]
  const b01 = rightBuffer[rightBufferOffset + 3]
  const b11 = rightBuffer[rightBufferOffset + 4]
  const b21 = rightBuffer[rightBufferOffset + 5]
  const b02 = rightBuffer[rightBufferOffset + 6]
  const b12 = rightBuffer[rightBufferOffset + 7]
  const b22 = rightBuffer[rightBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = a00 + b00
  resultBuffer[resultBufferOffset + 1] = a10 + b10
  resultBuffer[resultBufferOffset + 2] = a20 + b20
  resultBuffer[resultBufferOffset + 3] = a01 + b01
  resultBuffer[resultBufferOffset + 4] = a11 + b11
  resultBuffer[resultBufferOffset + 5] = a21 + b21
  resultBuffer[resultBufferOffset + 6] = a02 + b02
  resultBuffer[resultBufferOffset + 7] = a12 + b12
  resultBuffer[resultBufferOffset + 8] = a22 + b22
  
  return resultBuffer
}

/**
* Subtract a 3 by 3 float buffered matrix to one and put the result into a third buffer.
*
* @param {Float32Array} leftBuffer - Buffer that contains the left operand matrix.
* @param {number} leftBufferOffset - Offset to apply when we read the first buffer.
* @param {Float32Array} rightBuffer - Buffer that contains the right operand matrix.
* @param {number} rightBufferOffset - Offset to apply when we read the second buffer.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the destination buffer.
*
* @return {Float32Array} The destination buffer, updated with the result of the operation.
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
  const a20 = leftBuffer[leftBufferOffset + 2]
  const a01 = leftBuffer[leftBufferOffset + 3]
  const a11 = leftBuffer[leftBufferOffset + 4]
  const a21 = leftBuffer[leftBufferOffset + 5]
  const a02 = leftBuffer[leftBufferOffset + 6]
  const a12 = leftBuffer[leftBufferOffset + 7]
  const a22 = leftBuffer[leftBufferOffset + 8]
  
  const b00 = rightBuffer[rightBufferOffset + 0]
  const b10 = rightBuffer[rightBufferOffset + 1]
  const b20 = rightBuffer[rightBufferOffset + 2]
  const b01 = rightBuffer[rightBufferOffset + 3]
  const b11 = rightBuffer[rightBufferOffset + 4]
  const b21 = rightBuffer[rightBufferOffset + 5]
  const b02 = rightBuffer[rightBufferOffset + 6]
  const b12 = rightBuffer[rightBufferOffset + 7]
  const b22 = rightBuffer[rightBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = a00 - b00
  resultBuffer[resultBufferOffset + 1] = a10 - b10
  resultBuffer[resultBufferOffset + 2] = a20 - b20
  resultBuffer[resultBufferOffset + 3] = a01 - b01
  resultBuffer[resultBufferOffset + 4] = a11 - b11
  resultBuffer[resultBufferOffset + 5] = a21 - b21
  resultBuffer[resultBufferOffset + 6] = a02 - b02
  resultBuffer[resultBufferOffset + 7] = a12 - b12
  resultBuffer[resultBufferOffset + 8] = a22 - b22
  
  return resultBuffer
}

/**
* Set the content of a 3 by 3 float buffered matrix to the content of an identity matrix.
*
* @param {Float32Array} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
*
* @return {Float32Array} The buffer, updated with content of an identity matrix.
*/
export function toIdentity (
  matrixBuffer,
  matrixBufferOffset
) {
  matrixBuffer[matrixBufferOffset + 0] = 1
  matrixBuffer[matrixBufferOffset + 1] = 0
  matrixBuffer[matrixBufferOffset + 2] = 0
  matrixBuffer[matrixBufferOffset + 3] = 0
  matrixBuffer[matrixBufferOffset + 4] = 1
  matrixBuffer[matrixBufferOffset + 5] = 0
  matrixBuffer[matrixBufferOffset + 6] = 0
  matrixBuffer[matrixBufferOffset + 7] = 0
  matrixBuffer[matrixBufferOffset + 8] = 1
  
  return matrixBuffer
}

/**
* Set the content of a 3 by 3 float buffered matrix to the content of a 3 dimensional scale matrix.
*
* @param {Float32Array} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
* @param {number} x - Scale factor of the x axis.
* @param {number} y - Scale factor of the y axis.
* @param {number} z - Scale factor of the z axis.
*
* @return {Float32Array} The buffer, updated with the content of a 3 dimensional scale matrix.
*/
export function toScale (
  matrixBuffer,
  matrixBufferOffset,
  x, y, z
) {
  matrixBuffer[matrixBufferOffset + 0] = x
  matrixBuffer[matrixBufferOffset + 1] = 0
  matrixBuffer[matrixBufferOffset + 2] = 0
  matrixBuffer[matrixBufferOffset + 3] = 0
  matrixBuffer[matrixBufferOffset + 4] = y
  matrixBuffer[matrixBufferOffset + 5] = 0
  matrixBuffer[matrixBufferOffset + 6] = 0
  matrixBuffer[matrixBufferOffset + 7] = 0
  matrixBuffer[matrixBufferOffset + 8] = z
  
  return matrixBuffer
}

/**
* Set the content of a 3 by 3 float buffered matrix to a 3 dimensional rotation.
*
* @param {Float32Array} matrixBuffer - Buffer that contains the matrix to transform.
* @param {number} matrixBufferOffset - Offset to apply when we read the matrix buffer.
* @param {number} x - Rotation for the x axis in radians.
* @param {number} y - Rotation for the y axis in radians.
* @param {number} z - Rotation for the z axis in radians.
*
* @return {Float32Array} The buffer, updated with the content of a 3 dimensional rotation.
*/
export function toRotation (
  matrixBuffer,
  matrixBufferOffset,
  x, y, z
) {
  const cosx = Math.cos(x)
  const sinx = Math.sin(x)
  const cosy = Math.cos(y)
  const siny = Math.sin(y)
  const cosz = Math.cos(z)
  const sinz = Math.sin(z)
  
  matrixBuffer[matrixBufferOffset + 0] = cosY * cosZ
  matrixBuffer[matrixBufferOffset + 1] = cosY * -sinZ
  matrixBuffer[matrixBufferOffset + 2] = sinY
  matrixBuffer[matrixBufferOffset + 3] = (-sinX * -sinY * cosZ + cosX * sinZ)
  matrixBuffer[matrixBufferOffset + 4] = (-sinX * -sinY * -sinZ + cosX * cosZ)
  matrixBuffer[matrixBufferOffset + 5] = -sinX * cosY
  matrixBuffer[matrixBufferOffset + 6] = (cosX * -sinY * cosZ + sinX * sinZ)
  matrixBuffer[matrixBufferOffset + 7] = (cosX * -sinY * -sinZ + sinX * cosZ)
  matrixBuffer[matrixBufferOffset + 8] = cosX * cosY
  
  return matrixBuffer
}

/**
* Set the content of a 3 by 3 float buffered matrix to the content of a 2 dimensional translation matrix.
*
* @param {Float32Array} matrixBuffer - Buffer to write.
* @param {number} matrixBufferOffset - Offset to apply when we write into the buffer.
* @param {number} x - Translation to apply to the x axis.
* @param {number} y - Translation to apply to the y axis.
*
* @return {Float32Array} The buffer, updated with the content of a 2 dimensional translation matrix.
*/
export function toTranslation (
  matrixBuffer,
  matrixBufferOffset,
  x, y
) {
  matrixBuffer[matrixBufferOffset + 0] = 1
  matrixBuffer[matrixBufferOffset + 1] = 0
  matrixBuffer[matrixBufferOffset + 2] = x
  matrixBuffer[matrixBufferOffset + 3] = 0
  matrixBuffer[matrixBufferOffset + 4] = 1
  matrixBuffer[matrixBufferOffset + 5] = y
  matrixBuffer[matrixBufferOffset + 6] = 0
  matrixBuffer[matrixBufferOffset + 7] = 0
  matrixBuffer[matrixBufferOffset + 8] = 1
  
  return matrixBuffer
}

/**
* Compute and return the determinant of a 3 by 3 float buffered matrix.
*
* @param {Float32Array} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
*
* @return {number} The determinant of the given 3 by 3 float buffered matrix.
*/
export function determinant (
  matrixBuffer,
  matrixBufferOffset
) {
  const a00 = matrixBuffer[matrixBufferOffset + 0]
  const a10 = matrixBuffer[matrixBufferOffset + 1]
  const a20 = matrixBuffer[matrixBufferOffset + 2]
  const a01 = matrixBuffer[matrixBufferOffset + 3]
  const a11 = matrixBuffer[matrixBufferOffset + 4]
  const a21 = matrixBuffer[matrixBufferOffset + 5]
  const a02 = matrixBuffer[matrixBufferOffset + 6]
  const a12 = matrixBuffer[matrixBufferOffset + 7]
  const a22 = matrixBuffer[matrixBufferOffset + 8]
  
  return a00 * (a11 * a22 - a21 * a12) - a10 * (a01 * a22 - a21 * a02) + a20 * (a01 * a12 - a11 * a02)
}

/**
* Invert a 3 by 3 float buffered matrix and write the result into another buffer.
*
* @param {Float32Array} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the result buffer.
*
* @return {Float32Array} The result buffer updated with the result of this operation.
*/
export function invert (
  matrixBuffer,
  matrixBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = matrixBuffer[matrixBufferOffset + 0]
  const a10 = matrixBuffer[matrixBufferOffset + 1]
  const a20 = matrixBuffer[matrixBufferOffset + 2]
  const a01 = matrixBuffer[matrixBufferOffset + 3]
  const a11 = matrixBuffer[matrixBufferOffset + 4]
  const a21 = matrixBuffer[matrixBufferOffset + 5]
  const a02 = matrixBuffer[matrixBufferOffset + 6]
  const a12 = matrixBuffer[matrixBufferOffset + 7]
  const a22 = matrixBuffer[matrixBufferOffset + 8]
  
  const determinantValue = determinant(matrixBuffer, matrixBufferOffset)
  
  resultBuffer[resultBufferOffset + 0] = a11 * a22 - a21 * a12 / determinantValue
  resultBuffer[resultBufferOffset + 1] = a10 * a22 - a20 * a12 / determinantValue
  resultBuffer[resultBufferOffset + 2] = a10 * a21 - a20 * a11 / determinantValue
  resultBuffer[resultBufferOffset + 3] = a01 * a22 - a21 * a02 / determinantValue
  resultBuffer[resultBufferOffset + 4] = a00 * a22 - a20 * a02 / determinantValue
  resultBuffer[resultBufferOffset + 5] = a00 * a21 - a20 * a01 / determinantValue
  resultBuffer[resultBufferOffset + 6] = a01 * a12 - a11 * a02 / determinantValue
  resultBuffer[resultBufferOffset + 7] = a00 * a12 - a10 * a02 / determinantValue
  resultBuffer[resultBufferOffset + 8] = a00 * a11 - a10 * a01 / determinantValue
  
  return resultBuffer
}

/**
* Extract a translation from a 3 by 3 float buffered matrix
*
* @param {Float32Array} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the result buffer.
*
* @return {Float32Array} The result buffer updated with the content of the translation vector extracted from the given matrix.
*/
export function extractTranslation (
  matrixBuffer,
  matrixBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  resultBuffer[resultBufferOffset + 0] = matrixBuffer[matrixBufferOffset + 2]
  resultBuffer[resultBufferOffset + 1] = matrixBuffer[matrixBufferOffset + 5]
  
  return resultBuffer
}

/**
* Extract a scale from a 3 by 3 float buffered matrix
*
* @param {Float32Array} matrixBuffer - Buffer to read.
* @param {number} matrixBufferOffset - Offset to apply when we read the buffer.
* @param {Float32Array} resultBuffer - Buffer to write.
* @param {number} resultBufferOffset - Offset to apply when we write into the result buffer.
*
* @return {Float32Array} The result buffer updated with the content of the 3 dimensional scale vector extracted from the given matrix.
*/
export function extractScale (
  matrixBuffer,
  matrixBufferOffset,
  resultBuffer,
  resultBufferOffset
) {
  const a00 = matrixBuffer[matrixBufferOffset + 0]
  const a10 = matrixBuffer[matrixBufferOffset + 1]
  const a20 = matrixBuffer[matrixBufferOffset + 2]
  const a01 = matrixBuffer[matrixBufferOffset + 3]
  const a11 = matrixBuffer[matrixBufferOffset + 4]
  const a21 = matrixBuffer[matrixBufferOffset + 5]
  const a02 = matrixBuffer[matrixBufferOffset + 6]
  const a12 = matrixBuffer[matrixBufferOffset + 7]
  const a22 = matrixBuffer[matrixBufferOffset + 8]
  
  resultBuffer[resultBufferOffset + 0] = Math.sqrt(a00 * a00 + a10 * a10 + a20 * a20) * ((a00 < 0) ? -1 : 1)
  resultBuffer[resultBufferOffset + 1] = Math.sqrt(a01 * a01 + a11 * a11 + a21 * a21) * ((a11 < 0) ? -1 : 1)
  resultBuffer[resultBufferOffset + 2] = Math.sqrt(a02 * a02 + a12 * a12 + a22 * a22) * ((a22 < 0) ? -1 : 1)
  
  return resultBuffer
}

/**
* Extract a 2D rotation from a 3 by 3 float buffered matrix
*
* @param {Float32Array} matrixBuffer - Buffer to read.
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