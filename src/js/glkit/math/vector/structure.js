import { FLOAT } from '@glkit/math/types'

const IS_VECTOR = Symbol('glkit.math.vector.Vector#IS_VECTOR')
const TYPE = Symbol('glkit.math.vector.Vector#TYPE')
const DIMENSION = Symbol('glkit.math.vector.Vector#DIMENSION')
const READ = Symbol('glkit.math.vector.Vector#READ')
const WRITE = Symbol('glkit.math.vector.Vector#WRITE')


/**
* Create a new vector from a configuration.
*
* The configuration must be a plain object with the following parameters :
*   - type : Type of the vector to create. See vector types.
*   - dimension : The size of the vector to create, must be a positive integer.
*   - buffer : Buffer to user as a source of the vector.
*   - offset : Offset of the vector into the source buffer.
*
* @param {Object} configuration - A valid creation configuration as a plain object.
* @return {Vector} A vector object in accordance with the given configuration.
*/
export function create (configuration) {
  const { type, dimension, buffer, offset } = Object.assign({
    type: FLOAT,
    dimension: 3,
    buffer: (configuration.buffer) ? FLOAT.allocate(dimension) : null,
    offset: 0
  }, configuration)

  const result = {
    IS_VECTOR: true,
    TYPE: type,
    DIMENSION: dimension,
    BUFFER: buffer,
    OFFSET: offset,
    [Symbol.iterator]: iterate.bind(result),
    toString: toString.bind(result)
  }

  return result
}

/**
* Return true if the given element is an instance of vector.
*
* @param {any} element - Element to check.
* @return {boolean} True if the given element is an instance of vector.
*/
export function is (element) {
  if (element != null && typeof element !== 'object') return false
  return element == null || element[IS_VECTOR]
}

/**
* Iterate over the components of the given vector instance.
*
* @param {Vector} vector - A vector to iterate.
* @return {Iterator<any>} Return an iterator over the given vector components.
*/
export function * iterate (vector) {
  if (!is(vector)) {
    throw new InvalidParameterError (
      'vector', vector, [
        'Unnable to iterate over the given parameter : ',
        'the given parameter is not a valid vector instance.'
      ].join('')
    )
  }

  if (vector != null) {
    for (let index = 0; index < dimension(vector); ++index) {
      yield get(vector, index)
    }
  }
}

export function dimension (vector) {
  return vector[DIMENSION]
}

function offset (vector) {
  return vector[OFFSET]
}

export function get (vector, index) {
  return vector[BUFFER][index + offset(vector)]
}

export function set (vector, index, value) {
  vector[BUFFER][index + offset(vector)] = value
  return vector
}

/**
* Transform the given vector into an javascript array of values.
*
* @param {Vector} vector - A vector to transform into an array.
* @return {Array<number>} Return the given vector as an array of values.
*/
export function toArray (vector) {
  if (!is(vector)) {
    throw new InvalidParameterError (
      'vector', vector, [
        'Unnable to convert the given vector into an array : ',
        'the given instance is not a valid vector instance.'
      ].join('')
    )
  }

  return [...vector]
}

/**
* Transform a vector into a string.
*
* @param {Vector} vector - A vector to transform.
* @return {String} Return a string representation of the given vector.
*/
export function toString (vector) {
  if (!is(vector)) {
    throw new InvalidParameterError (
      'vector', vector, [
        'Unnable to transform the given vector into a string : ',
        'the given instance is not a valid vector instance.'
      ].join('')
    )
  }

  if (vector == null) {
    return 'vector []'
  } else {
    return `vector [${[...vector].join(', ')}]`
  }
}

/**
* Check if the given element is an instance of vector.
*
* @param {any} element - An element to check.
* @return {boolean} True if the given element is an instance of vector.
*/
export function [Symbol.hasInstance] (element) {
  return is(element)
}
