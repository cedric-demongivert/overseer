// <development>
import { InvalidParameterError } from '@errors'
// </development>

/**
* Perform a multiplication of two 3D matrix.
*
* @param {Matrix} left - Left operand matrix.
* @param {Matrix} right - Right operand matrix.
* @param {Matrix} [result = left] - Result matrix, left operand matrix by default.
*
* @return {Matrix} The given updated result matrix.
*/
export function multiplyWith3DMatrix (left, right, result = left) {
  // <development>
  if (!isMatrix3D(left)) {
    throw new InvalidParameterError(
      'left', left,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  if (!isMatrix3D(right)) {
    throw new InvalidParameterError(
      'right', right,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  if (!isMatrix3D(result)) {
    throw new InvalidParameterError(
      'result', result,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const leftContent = left.content
  const rightContent = right.content

  const resultContent = result.content

  const a11 = leftContent[0]
  const a12 = leftContent[1]
  const a13 = leftContent[2]
  const a21 = leftContent[3]
  const a22 = leftContent[4]
  const a23 = leftContent[5]
  const a31 = leftContent[6]
  const a32 = leftContent[7]
  const a33 = leftContent[8]

  const b11 = rightContent[0]
  const b12 = rightContent[1]
  const b13 = rightContent[2]
  const b21 = rightContent[3]
  const b22 = rightContent[4]
  const b23 = rightContent[5]
  const b31 = rightContent[6]
  const b32 = rightContent[7]
  const b33 = rightContent[8]

  resultContent[0] = a11 * b11 + a12 * b21 + a13 * b31
  resultContent[1] = a11 * b12 + a12 * b22 + a13 * b32
  resultContent[2] = a11 * b13 + a12 * b23 + a13 * b33
  resultContent[3] = a21 * b11 + a22 * b21 + a23 * b31
  resultContent[4] = a21 * b12 + a22 * b22 + a23 * b32
  resultContent[5] = a21 * b13 + a22 * b23 + a23 * b33
  resultContent[6] = a31 * b11 + a32 * b21 + a33 * b31
  resultContent[7] = a31 * b12 + a32 * b22 + a33 * b32
  resultContent[8] = a31 * b13 + a32 * b23 + a33 * b33

  return result
}

/**
* Apply a 2D scale transformation to a 3D matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform.
* @param {number} x - X axis scale operation value.
* @param {number} y - Y axis scale operation value.
* @param {Matrix} [result = matrix] - A matrix to use in order to store the result of the transformation.
*
* @return {Matrix} The result matrix.
*/
export function apply2DScale (matrix, x, y, result = matrix) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  if (!isMatrix3D(result)) {
    throw new InvalidParameterError(
      'result', result,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const rightContent = matrix.content
  const resultContent = result.content

  const a11 = x
  const a12 = 0
  const a13 = 0
  const a21 = 0
  const a22 = y
  const a23 = 0
  const a31 = 0
  const a32 = 0
  const a33 = 1

  const b11 = rightContent[0]
  const b12 = rightContent[1]
  const b13 = rightContent[2]
  const b21 = rightContent[3]
  const b22 = rightContent[4]
  const b23 = rightContent[5]
  const b31 = rightContent[6]
  const b32 = rightContent[7]
  const b33 = rightContent[8]

  resultContent[0] = a11 * b11 + a12 * b21 + a13 * b31
  resultContent[1] = a11 * b12 + a12 * b22 + a13 * b32
  resultContent[2] = a11 * b13 + a12 * b23 + a13 * b33
  resultContent[3] = a21 * b11 + a22 * b21 + a23 * b31
  resultContent[4] = a21 * b12 + a22 * b22 + a23 * b32
  resultContent[5] = a21 * b13 + a22 * b23 + a23 * b33
  resultContent[6] = a31 * b11 + a32 * b21 + a33 * b31
  resultContent[7] = a31 * b12 + a32 * b22 + a33 * b32
  resultContent[8] = a31 * b13 + a32 * b23 + a33 * b33

  return result
}

/**
* Apply a 3D scale transformation to a 3D matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform.
* @param {number} x - X axis scale operation value.
* @param {number} y - Y axis scale operation value.
* @param {number} z - Z axis scale operation value.
* @param {Matrix} [result = matrix] - A matrix to use in order to store the result of the transformation.
*
* @return {Matrix} The result matrix.
*/
export function apply3DScale (matrix, x, y, z, result = matrix) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  if (!isMatrix3D(result)) {
    throw new InvalidParameterError(
      'result', result,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const rightContent = matrix.content
  const resultContent = result.content

  const a11 = x
  const a12 = 0
  const a13 = 0
  const a21 = 0
  const a22 = y
  const a23 = 0
  const a31 = 0
  const a32 = 0
  const a33 = z

  const b11 = rightContent[0]
  const b12 = rightContent[1]
  const b13 = rightContent[2]
  const b21 = rightContent[3]
  const b22 = rightContent[4]
  const b23 = rightContent[5]
  const b31 = rightContent[6]
  const b32 = rightContent[7]
  const b33 = rightContent[8]

  resultContent[0] = a11 * b11 + a12 * b21 + a13 * b31
  resultContent[1] = a11 * b12 + a12 * b22 + a13 * b32
  resultContent[2] = a11 * b13 + a12 * b23 + a13 * b33
  resultContent[3] = a21 * b11 + a22 * b21 + a23 * b31
  resultContent[4] = a21 * b12 + a22 * b22 + a23 * b32
  resultContent[5] = a21 * b13 + a22 * b23 + a23 * b33
  resultContent[6] = a31 * b11 + a32 * b21 + a33 * b31
  resultContent[7] = a31 * b12 + a32 * b22 + a33 * b32
  resultContent[8] = a31 * b13 + a32 * b23 + a33 * b33

  return result
}

/**
* Apply a 2D rotation transformation to a 3D matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform.
* @param {number} theta - The rotation value in radians.
* @param {Matrix} [result = matrix] - A matrix to use in order to store the result of the transformation.
*
* @return {Matrix} The result matrix.
*/
export function apply2DRotation (matrix, theta, result = matrix) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  if (!isMatrix3D(result)) {
    throw new InvalidParameterError(
      'result', result,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const rightContent = matrix.content
  const resultContent = result.content

  const cos = Math.cos(theta)
  const sin = Math.sin(theta)

  const a11 = cos
  const a12 = -sin
  const a13 = 0
  const a21 = sin
  const a22 = cos
  const a23 = 0
  const a31 = 0
  const a32 = 0
  const a33 = 1

  const b11 = rightContent[0]
  const b12 = rightContent[1]
  const b13 = rightContent[2]
  const b21 = rightContent[3]
  const b22 = rightContent[4]
  const b23 = rightContent[5]
  const b31 = rightContent[6]
  const b32 = rightContent[7]
  const b33 = rightContent[8]

  resultContent[0] = a11 * b11 + a12 * b21 + a13 * b31
  resultContent[1] = a11 * b12 + a12 * b22 + a13 * b32
  resultContent[2] = a11 * b13 + a12 * b23 + a13 * b33
  resultContent[3] = a21 * b11 + a22 * b21 + a23 * b31
  resultContent[4] = a21 * b12 + a22 * b22 + a23 * b32
  resultContent[5] = a21 * b13 + a22 * b23 + a23 * b33
  resultContent[6] = a31 * b11 + a32 * b21 + a33 * b31
  resultContent[7] = a31 * b12 + a32 * b22 + a33 * b32
  resultContent[8] = a31 * b13 + a32 * b23 + a33 * b33

  return result
}

/**
* Apply a 3D eulerian rotation transformation to a 3D matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform.
* @param {number} x - X axis rotation angle value (in radians).
* @param {number} y - Y axis rotation angle value (in radians).
* @param {number} z - Z axis rotation angle value (in radians).
* @param {Matrix} [result = matrix] - A matrix to use in order to store the result of the transformation.
*
* @return {Matrix} The result matrix.
*/
export function apply3DEulerianRotation (matrix, x, y, z, result = matrix) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  if (!isMatrix3D(result)) {
    throw new InvalidParameterError(
      'result', result,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const rightContent = matrix.content
  const resultContent = result.content

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

  const b11 = rightContent[0]
  const b12 = rightContent[1]
  const b13 = rightContent[2]
  const b21 = rightContent[3]
  const b22 = rightContent[4]
  const b23 = rightContent[5]
  const b31 = rightContent[6]
  const b32 = rightContent[7]
  const b33 = rightContent[8]

  resultContent[0] = a11 * b11 + a12 * b21 + a13 * b31
  resultContent[1] = a11 * b12 + a12 * b22 + a13 * b32
  resultContent[2] = a11 * b13 + a12 * b23 + a13 * b33
  resultContent[3] = a21 * b11 + a22 * b21 + a23 * b31
  resultContent[4] = a21 * b12 + a22 * b22 + a23 * b32
  resultContent[5] = a21 * b13 + a22 * b23 + a23 * b33
  resultContent[6] = a31 * b11 + a32 * b21 + a33 * b31
  resultContent[7] = a31 * b12 + a32 * b22 + a33 * b32
  resultContent[8] = a31 * b13 + a32 * b23 + a33 * b33

  return result
}

/**
* Apply a 2D translation transformation to a 3D matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform.
* @param {number} x - X axis translation value.
* @param {number} y - Y axis translation value.
* @param {Matrix} [result = matrix] - A matrix to use in order to store the result of the transformation.
*
* @return {Matrix} The result matrix.
*/
export function apply2DTranslation (matrix, x, y, result = matrix) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  if (!isMatrix3D(result)) {
    throw new InvalidParameterError(
      'result', result,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const rightContent = matrix.content
  const resultContent = result.content

  const a11 = 1
  const a12 = 0
  const a13 = x
  const a21 = 0
  const a22 = 1
  const a23 = y
  const a31 = 0
  const a32 = 0
  const a33 = 1

  const b11 = rightContent[0]
  const b12 = rightContent[1]
  const b13 = rightContent[2]
  const b21 = rightContent[3]
  const b22 = rightContent[4]
  const b23 = rightContent[5]
  const b31 = rightContent[6]
  const b32 = rightContent[7]
  const b33 = rightContent[8]

  resultContent[0] = a11 * b11 + a12 * b21 + a13 * b31
  resultContent[1] = a11 * b12 + a12 * b22 + a13 * b32
  resultContent[2] = a11 * b13 + a12 * b23 + a13 * b33
  resultContent[3] = a21 * b11 + a22 * b21 + a23 * b31
  resultContent[4] = a21 * b12 + a22 * b22 + a23 * b32
  resultContent[5] = a21 * b13 + a22 * b23 + a23 * b33
  resultContent[6] = a31 * b11 + a32 * b21 + a33 * b31
  resultContent[7] = a31 * b12 + a32 * b22 + a33 * b32
  resultContent[8] = a31 * b13 + a32 * b23 + a33 * b33

  return result
}
