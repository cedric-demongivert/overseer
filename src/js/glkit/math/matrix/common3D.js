import { Vector2D, Vector3D } from '@glkit/math/vector'
import { divide, transpose } from './arithmetic'

/**
* Check if the given matrix is a valid 3D matrix.
*
* @param {Matrix} matrix - A matrix to check.
*
* @return {boolean} True if the given matrix is a 3D matrix.
*/
export function isMatrix3D (matrix) {
  return matrix.rows === matrix.columns && matrix.rows === 3
}

/**
* Transform the given matrix into an identity matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform into an identity matrix.
*
* @return {Matrix} The given updated matrix instance.
*/
export function toIdentityMatrix (matrix) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const content = matrix.content

  content[0] = 1
  content[1] = 0
  content[2] = 0
  content[3] = 0
  content[4] = 1
  content[5] = 0
  content[6] = 0
  content[7] = 0
  content[8] = 1

  return matrix
}

/**
* Transform a 3D matrix into a 2D scale transformation matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform into a 2D scale transformation matrix.
* @param {number} x - X axis scale operation value.
* @param {number} y - Y axis scale operation value.
*
* @return {Matrix} The given updated matrix instance.
*/
export function to2DScaleMatrix (matrix, x, y) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const content = matrix.content

  content[0] = x
  content[1] = 0
  content[2] = 0
  content[3] = 0
  content[4] = y
  content[5] = 0
  content[6] = 0
  content[7] = 0
  content[8] = 1

  return matrix
}

/**
* Transform a given matrix into a 3D scale transformation matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform into a 3D scale transformation matrix.
* @param {number} x - X axis scale operation value.
* @param {number} y - Y axis scale operation value.
* @param {number} z - Z axis scale operation value.
*
* @return {Matrix} The given updated matrix instance.
*/
export function to3DScaleMatrix (matrix, x, y, z) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const content = matrix.content

  content[0] = x
  content[1] = 0
  content[2] = 0
  content[3] = 0
  content[4] = y
  content[5] = 0
  content[6] = 0
  content[7] = 0
  content[8] = z

  return matrix
}

/**
* Transform a 3D matrix into a 2D rotation transformation matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform into a rotation matrix.
* @param {number} theta - Angle of the rotation (in radians)
*
* @return {Matrix} The given updated matrix instance.
*/
export function to2DRotationMatrix (matrix, theta) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const cos = Math.cos(theta)
  const sin = Math.sin(theta)

  const content = matrix.content

  content[0] = cos
  content[1] = -sin
  content[2] = 0
  content[3] = sin
  content[4] = cos
  content[5] = 0
  content[6] = 0
  content[7] = 0
  content[8] = 1

  return matrix
}

/**
* Transform a 3D matrix into an eulerian rotation transformation matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform into a 3D eulerian rotation transformation matrix.
* @param {number} x - X axis rotation angle value (in radians).
* @param {number} y - Y axis rotation angle value (in radians).
* @param {number} z - Z axis rotation angle value (in radians).
*
* @return {Matrix3f} A 3D eulerian rotation matrix.
*/
export function to3DEulerianRotation (matrix, x, y, z) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const cosX = Math.cos(x)
  const cosY = Math.cos(y)
  const cosZ = Math.cos(z)
  const sinX = Math.sin(x)
  const sinY = Math.sin(y)
  const sinZ = Math.sin(z)

  const content = matrix.content

  content[0] = cosY * cosZ
  content[1] = cosY * -sinZ
  content[2] = sinY
  content[3] = (-sinX * -sinY * cosZ + cosX * sinZ)
  content[4] = (-sinX * -sinY * -sinZ + cosX * cosZ)
  content[5] = -sinX * cosY
  content[6] = (cosX * -sinY * cosZ + sinX * sinZ)
  content[7] = (cosX * -sinY * -sinZ + sinX * cosZ)
  content[8] = cosX * cosY

  return matrix
}

/**
* Transform a 3D matrix into a 2D translation transformation matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform into a translation matrix.
* @param {number} x - X axis translation value.
* @param {number} y - Y axis translation value.
*
* @return {Matrix} The given updated matrix instance.
*/
export function to2DTranslationMatrix (matrix, x, y) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const content = matrix.content

  content[0] = 1
  content[1] = 0
  content[2] = x
  content[3] = 0
  content[4] = 1
  content[5] = y
  content[6] = 0
  content[7] = 0
  content[8] = 1

  return matrix
}

/**
* Return the determinant of a 3D matrix.
*
* @param {Matrix} matrix - A matrix to use for the computation.
*
* @return {number} The determinant of the given matrix.
*/
export function determinant (matrix) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const content = matrix.content

  const a = content[0]
  const b = content[1]
  const c = content[2]
  const d = content[3]
  const e = content[4]
  const f = content[5]
  const g = content[6]
  const h = content[7]
  const i = content[8]

  return (a * e * i) +
         (b * f * g) +
         (c * d * h) -
         (c * e * g) -
         (b * d * i) -
         (a * f * h)
}


/**
* Invert a 3D matrix.
*
* @param {Matrix} matrix - A matrix to invert.
* @param {Matrix} [result = matrix] - A matrix to use in order to store the result of the operation, by default the given matrix.
*
* @return {Matrix} The updated result matrix.
*/
export function invert (matrix, result = matrix) {
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

  const content = matrix.content
  const resultContent = result.content

  const a = content[0]
  const b = content[1]
  const c = content[2]
  const d = content[3]
  const e = content[4]
  const f = content[5]
  const g = content[6]
  const h = content[7]
  const i = content[8]

  const determinantValue = determinant(matrix)

  resultContent[0] = e * i - f * h
  resultContent[1] = f * g - d * i
  resultContent[2] = d * h - e * g
  resultContent[3] = c * h - b * i
  resultContent[4] = a * i - c * g
  resultContent[5] = b * g - a * h
  resultContent[6] = b * f - c * e
  resultContent[7] = c * d - a * f
  resultContent[8] = a * e - b * d

  return divide(transpose(result), determinantValue)
}

/**
* Extract a 2D translation from this matrix.
*
* @param {Matrix3D} matrix - A 3D matrix.
* @param {Vector2D} [result = Vector2D.create(matrix.type)] - A result vector.
*
* @return {Vector2D} A 2D translation.
*/
export function extract2DTranslation (
  matrix,
  result = Vector2D.create(matrix.type)
) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  return result.setAll(matrix.content[2], matrix.content[5])
}

/**
* Extract a 2D scale transformation from this matrix.
*
* @param {Matrix3D} matrix - A 3D matrix.
* @param {Vector2D} [result = Vector2D.create(matrix.type)] - A result vector.
*
* @return {Vector2D} A 2D scale.
*/
export function extract2DScale (
  matrix,
  result = Vector2D.create(matrix.type)
) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const content = matrix.content

  const ax = content[0]
  const ay = content[1]
  const bx = content[3]
  const by = content[4]

  return result.setAll(
    Math.sqrt(ax * ax + ay * ay) * ((ax < 0) ? -1 : 1),
    Math.sqrt(bx * bx + by * by) * ((by < 0) ? -1 : 1)
  )
}

/**
* Extract a 3D scale transformation from this matrix.
*
* @param {Matrix3D} matrix - A 3D matrix.
* @param {Vector3D} [result = Vector3D.create(matrix.type)] - A result vector.
*
* @return {Vector3D} A 3D scale.
*/
export function extract3DScale (
  matrix,
  result = Vector3D.create(matrix.type)
) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const content = matrix.content

  const ax = content[0]
  const ay = content[1]
  const az = content[2]
  const bx = content[3]
  const by = content[4]
  const bz = content[5]
  const cx = content[6]
  const cy = content[7]
  const cz = content[8]

  return result.setAll(
    Math.sqrt(ax * ax + ay * ay + az * az) * ((ax < 0) ? -1 : 1),
    Math.sqrt(bx * bx + by * by + bz * bz) * ((by < 0) ? -1 : 1),
    Math.sqrt(cx * cx + cy * cy + cz * cz) * ((cz < 0) ? -1 : 1)
  )
}

/**
* Extract a rotation from a matrix.
*
* @return {number} The 2D rotation of the given matrix.
*/
export function extract2DRotation (matrix) {
  // <development>
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }
  // </development>

  const content = matrix.content

  const a = content[0]
  const b = content[1]

  return Math.atan(-b / a)
}
