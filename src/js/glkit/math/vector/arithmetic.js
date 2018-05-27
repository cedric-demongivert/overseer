// <development>
import { InvalidParameterError } from '@errors'
// </development>

/**
* Transpose the given vector and return the result.
*
* @param {Vector} vector - A vector to transpose.
* @param {Vector} [result = vector] - A vector to use as a result.
*
* @return {Vector} The result vector.
*/
export function transpose (vector, result = vector) {
  // <development>
  if (vector.cells !== result.cells) {
    throw new InvalidParameterError(
      'result', result, [
        'Invalid result vector, the result vector does not have the same ',
        'number of dimensions than the given vector. ', vector.cells,
        ' dimensions expected, ', result.cells, ' dimensions given.'
      ].join('')
    )
  }
  // </development>

  if (vector === result) {
    vector.transpose()
  } else {
    const vectorContent = vector.content
    const resultContent = result.content

    let cell = result.cells

    while (cell--) {
      resultContent[cell] = vectorContent[cell]
    }

    if (vector.transposed == result.transposed) {
      result.transpose()
    }
  }

  return result
}

/**
* Do the dot product of two vectors of the same dimension.
*
* @param {Vector} left - Left operand of the dot product.
* @param {Vector} right - Right operand of the dot product.
*/
export function dot (left, right) {
  // <development>
  if (left.cells !== right.cells) {
    throw new InvalidParameterError(
      'right', right, [
        'Invalid right vector, the right vector does not have the same ',
        'number of dimensions than the left vector. ', left.cells,
        ' dimensions expected, ', right.cells, ' dimensions given.'
      ].join('')
    )
  }
  // </development>

  const leftContent = left.content
  const rightContent = right.content

  let cellIndex = left.cells
  let result = 0

  while (cellIndex--) {
    result += leftContent[cellIndex] * rightContent[cellIndex]
  }

  return result
}

/**
* Return the squared length of the given vector.
*
* @param {Vector} vector - A vector to use for the computation.
*
* @return {number} The squared length of the given vector.
*/
export function squaredLength (vector) {
  const content = vector.content
  let cellIndex = vector.cells
  let result = 0

  while (cellIndex--) {
    result += content[cellIndex] * content[cellIndex]
  }

  return result
}

/**
* Return the length of the given vector.
*
* @param {Vector} vector - A vector to use for the computation.
*
* @return {number} The length of the given vector.
*/
export function realLength (vector) {
  return Math.sqrt(squaredLength(vector))
}

/**
* Negate the given vector.
*
* @param {Vector} vector - A vector to negate.
* @param {Vector} [result = vector] - Vector to use in order to store the result of the negation.
*
* @return {Vector} The result vector.
*/
export function negate (vector, result = vector) {
  // <development>
  if (vector.cells !== result.cells) {
    throw new InvalidParameterError(
      'result', result, [
        'Invalid result vector, the result vector does not have the same ',
        'number of dimensions than the given vector. ', vector.cells,
        ' dimensions expected, ', result.cells, ' dimensions given.'
      ].join('')
    )
  }
  // </development>

  const content = vector.content
  const resultContent = result.content
  let cellIndex = vector.cells

  while (cellIndex--) {
    resultContent[cellIndex] = -content[cellIndex]
  }

  return result
}

/**
* Normalize the given vector.
*
* @param {Vector} vector - A vector to normalize.
* @param {Vector} [result = vector] - Vector to use in order to store the result of the normalization.
*
* @return {Vector} The result vector.
*/
export function normalize (vector, result = vector) {
  // <development>
  if (vector.cells !== result.cells) {
    throw new InvalidParameterError(
      'result', result, [
        'Invalid result vector, the result vector does not have the same ',
        'number of dimensions than the given vector. ', vector.cells,
        ' dimensions expected, ', result.cells, ' dimensions given.'
      ].join('')
    )
  }
  // </development>

  const content = vector.content
  const resultContent = result.content
  const vectorLength = length(content)
  let cellIndex = vector.cells

  while (cellIndex--) {
    resultContent[cellIndex] = content[cellIndex] / vectorLength
  }

  return result
}

/**
* Apply a ceil operation on each component of the given vector.
*
* @param {Vector} vector - A vector to mutate.
* @param {Vector} [result = vector] - Vector to use in order to store the result of the operation.
*
* @return {Vector} The result vector.
*/
export function ceil (vector, result = vector) {
  // <development>
  if (vector.cells !== result.cells) {
    throw new InvalidParameterError(
      'result', result, [
        'Invalid result vector, the result vector does not have the same ',
        'number of dimensions than the given vector. ', vector.cells,
        ' dimensions expected, ', result.cells, ' dimensions given.'
      ].join('')
    )
  }
  // </development>

  const content = vector.content
  const resultContent = result.content
  let cellIndex = vector.cells

  while (cellIndex--) {
    resultContent[cellIndex] = Math.ceil(content[cellIndex])
  }

  return result
}

/**
* Apply a floor operation on each component of the given vector.
*
* @param {Vector} vector - A vector to mutate.
* @param {Vector} [result = vector] - Vector to use in order to store the result of the operation.
*
* @return {Vector} The result vector.
*/
export function floor (vector, result = vector) {
  // <development>
  if (vector.cells !== result.cells) {
    throw new InvalidParameterError(
      'result', result, [
        'Invalid result vector, the result vector does not have the same ',
        'number of dimensions than the given vector. ', vector.cells,
        ' dimensions expected, ', result.cells, ' dimensions given.'
      ].join('')
    )
  }
  // </development>

  const content = vector.content
  const resultContent = result.content
  let cellIndex = vector.cells

  while (cellIndex--) {
    resultContent[cellIndex] = Math.floor(content[cellIndex])
  }

  return result
}

/**
* Apply a round operation on each component of the given vector.
*
* @param {Vector} vector - A vector to mutate.
* @param {Vector} [result = vector] - Vector to use in order to store the result of the operation.
*
* @return {Vector} The result vector.
*/
export function round (vector, result = vector) {
  // <development>
  if (vector.cells !== result.cells) {
    throw new InvalidParameterError(
      'result', result, [
        'Invalid result vector, the result vector does not have the same ',
        'number of dimensions than the given vector. ', vector.cells,
        ' dimensions expected, ', result.cells, ' dimensions given.'
      ].join('')
    )
  }
  // </development>

  const content = vector.content
  const resultContent = result.content
  let cellIndex = vector.cells

  while (cellIndex--) {
    resultContent[cellIndex] = Math.round(content[cellIndex])
  }

  return result
}

/**
* Replace all values of the vector that are less than the given minimum by the given minimum.
*
* @param {Vector} vector - A vector to mutate.
* @param {Vector} minimum - The minimum value allowed.
* @param {Vector} [result = vector] - Vector to use in order to store the result of the operation.
*
* @return {Vector} The result vector.
*/
export function minimum (vector, minimum, result = vector) {
  // <development>
  if (vector.cells !== result.cells) {
    throw new InvalidParameterError(
      'result', result, [
        'Invalid result vector, the result vector does not have the same ',
        'number of dimensions than the given vector. ', vector.cells,
        ' dimensions expected, ', result.cells, ' dimensions given.'
      ].join('')
    )
  }
  // </development>

  const content = vector.content
  const resultContent = result.content
  let cellIndex = vector.cells

  while (cellIndex--) {
    resultContent[cellIndex] = Math.max(content[cellIndex], minimum)
  }

  return result
}

/**
* Replace all values of the vector that are greather than the given maximum by the given maximum.
*
* @param {Vector} vector - A vector to mutate.
* @param {Vector} maximum - The maximum value allowed.
* @param {Vector} [result = vector] - Vector to use in order to store the result of the operation.
*
* @return {Vector} The result vector.
*/
export function maximum (vector, maximum, result = vector) {
  // <development>
  if (vector.cells !== result.cells) {
    throw new InvalidParameterError(
      'result', result, [
        'Invalid result vector, the result vector does not have the same ',
        'number of dimensions than the given vector. ', vector.cells,
        ' dimensions expected, ', result.cells, ' dimensions given.'
      ].join('')
    )
  }
  // </development>

  const content = vector.content
  const resultContent = result.content
  let cellIndex = vector.cells

  while (cellIndex--) {
    resultContent[cellIndex] = Math.min(content[cellIndex], maximum)
  }

  return result
}


/**
* Clamp each component of the vector between two values.
*
* @param {Vector} vector - A vector to mutate.
* @param {Vector} minimum - The minimum value allowed.
* @param {Vector} maximum - The maximum value allowed.
* @param {Vector} [result = vector] - Vector to use in order to store the result of the operation.
*
* @return {Vector} The result vector.
*/
export function clamp (vector, minimum, maximum, result = vector) {
  // <development>
  if (vector.cells !== result.cells) {
    throw new InvalidParameterError(
      'result', result, [
        'Invalid result vector, the result vector does not have the same ',
        'number of dimensions than the given vector. ', vector.cells,
        ' dimensions expected, ', result.cells, ' dimensions given.'
      ].join('')
    )
  }
  // </development>

  const content = vector.content
  const resultContent = result.content
  let cellIndex = vector.cells

  while (cellIndex--) {
    resultContent[cellIndex] = Math.max(
      Math.min(content[cellIndex], maximum),
      minimum
    )
  }

  return result
}
