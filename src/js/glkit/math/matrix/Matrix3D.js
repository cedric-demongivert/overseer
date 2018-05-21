import { InvalidParameterError } from '@errors'
import * as NumberType from '@glkit/math/NumberType'

import { BufferedMatrix } from './BufferedMatrix'
import { divide, transpose } from './arithmetic'

export * from './arithmetic'
export * from './common'

/**
* Check if the given matrix is a valid 3D matrix.
*
* @param {Matrix} matrix - A matrix to check.
*
* @return {boolean} True if the given matrix is a 3D matrix.
*/
export function isMatrix3D (matrix) {
  return matrix.lines === matrix.columns && matrix.lines === 3
}

/**
* Create a 3D matrix of the given type with the given content.
*
* @param {Type} type - The type of matrix to create.
* @param {...number} [values] - Content of the matrix to create.
*
* @return {Matrix} A 3D matrix instance filled with the given values.
*/
export function create3D (type, ...values) {
  const result = new BufferedMatrix(type, 3, 3)
  if (values.length > 0) result.setAll(...values)
  return result
}

/**
* Create a 3D float matrix with the given content.
*
* @param {...number} [values] - Content of the matrix to create.
*
* @return {Matrix} A 3D float matrix instance filled with the given values.
*/
export function create3F (...values) {
  const result = new BufferedMatrix(NumberType.FLOAT, 3, 3)
  if (values.length > 0) result.setAll(...values)
  return result
}

/**
* Create a 3D int matrix with the given content.
*
* @param {...number} [values] - Content of the matrix to create.
*
* @return {Matrix} A 3D int matrix instance filled with the given values.
*/
export function create3I (...values) {
  const result = new BufferedMatrix(NumberType.INT, 3, 3)
  if (values.length > 0) result.setAll(...values)
  return result
}

/**
* Transform the given matrix into an identity matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform into an identity matrix.
*
* @return {Matrix} The given updated matrix instance.
*/
export function toIdentityMatrix (matrix) {
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  return matrix.setAll(
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  )
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
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  return matrix.setAll(
    x, 0, 0,
    0, y, 0,
    0, 0, 1
  )
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
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  return matrix.setAll(
    x, 0, 0,
    0, y, 0,
    0, 0, z
  )
}

/**
* Transform a 3D matrix into a 2D rotation transformation matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform into a rotation matrix.
* @param {number} theta - Angle of the rotation (in radians)
*
* @return {Matrix} The given updated matrix instance.
*/
static to2DRotationMatrix (matrix, theta) {
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  const cos = Math.cos(theta)
  const sin = Math.sin(theta)

  return matrix.setAll(
    cos, -sin, 0,
    sin,  cos, 0,
      0,    0, 1
  )
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
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  const cosX = Math.cos(x)
  const cosY = Math.cos(y)
  const cosZ = Math.cos(z)
  const sinX = Math.sin(x)
  const sinY = Math.sin(y)
  const sinZ = Math.sin(z)

  /*
  return matrix.fromValues(
    1, 0, 0,
    0, cosX, -sinX,
    0, sinX, cosX
  ).mul(Matrix3f.fromValues(
    cosY, 0, sinY,
    0, 1, 0,
    -sinY, 0, cosY
  )).mul(Matrix3f.fromValues(
    cosZ, -sinZ, 0,
    sinZ, cosZ, 0,
    0, 0, 1
  ))*/

  return matrix.setAll(
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
* Transform a 3D matrix into a 2D translation transformation matrix.
*
* @param {Matrix} matrix - A 3D matrix to transform into a translation matrix.
* @param {number} x - X axis translation value.
* @param {number} y - Y axis translation value.
*
* @return {Matrix} The given updated matrix instance.
*/
export function to2DTranslationMatrix (matrix, x, y) {
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  return matrix.setAll(
    1, 0, x,
    0, 1, y,
    0, 0, 1
  )
}

/**
* Return the determinant of a 3D matrix.
*
* @param {Matrix} matrix - A matrix to use for the computation.
*
* @return {number} The determinant of the given matrix.
*/
export function determinant (matrix) {
  if (!isMatrix3D(matrix)) {
    throw new InvalidParameterError(
      'matrix', matrix,
      'The given parameter is not a valid 3D matrix.'
    )
  }

  const [
    a, b, c,
    d, e, f,
    g, h, i
  ] = matrix

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

  const [
    a, b, c,
    d, e, f,
    g, h, i
  ] = matrix

  const determinantValue = determinant(matrix)

  result.setAll(
    e * i - f * h,
    f * g - d * i,
    d * h - e * g,
    c * h - b * i,
    a * i - c * g,
    b * g - a * h,
    b * f - c * e,
    c * d - a * f,
    a * e - b * d
  )

  return divide(transpose(result), determinantValue)
}

/**
* Extract a 2D translation from this matrix.
*
* @return {Vector2f} A 2D translation.
*/
export function extract2DTranslation (matrix, result) {
  return new Vector2f(this._data[2], this._data[5])
}

/**
* Extract a 2D scale from this matrix.
*
* @return {Vector2f} A 2D scale.
*/
export function extract2DScale (matrix, result) {
  const [
    ax, ay, ,
    bx, by, ,
    , ,
  ] = this

  return new Vector2f(
    Math.sqrt(ax * ax + ay * ay) * ((ax < 0) ? -1 : 1),
    Math.sqrt(bx * bx + by * by) * ((by < 0) ? -1 : 1),
  )
}

/**
* Extract a 3D scale from this matrix.
*
* @return {Vector3f} A 3D scale.
*/
export function extract3DScale (matrix, result) {
  const [
    ax, ay, az,
    bx, by, bz,
    cx, cy, cz
  ] = this

  return new Vector3f(
    Math.sqrt(ax * ax + ay * ay + az * az) * ((ax < 0) ? -1 : 1),
    Math.sqrt(bx * bx + by * by + bz * bz) * ((by < 0) ? -1 : 1),
    Math.sqrt(cx * cx + cy * cy + cz * cz) * ((cz < 0) ? -1 : 1),
  )
}

/**
* Extract a rotation from this matrix.
*
* @return {number} The 2d rotation applied to this object.
*/
export function extract2DRotation (matrix) {
  const [
    a, b, ,
    , , ,
    , ,
  ] = this

  return Math.atan(-b / a)
}
