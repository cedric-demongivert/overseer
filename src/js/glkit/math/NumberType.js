import { InvalidParameterError } from '@errors'

const IS_NUMBER_TYPE = Symbol('@glkit/math/NumberType#IS_NUMBER_TYPE')

export const BYTE = {
  allocate (...parameters) { return new Int8Array (...parameters) },
  toString () { return 'byte' },
  [IS_NUMBER_TYPE]: true
}

export const UNSIGNED_BYTE = {
  allocate (...parameters) { return new Uint8Array (...parameters) },
  toString () { return 'unsigned byte' },
  [IS_NUMBER_TYPE]: true
}

export const SHORT = {
  allocate (...parameters) { return new Int16Array (...parameters) },
  toString () { return 'short' },
  [IS_NUMBER_TYPE]: true
}

export const UNSIGNED_SHORT = {
  allocate (...parameters) { return new Uint16Array (...parameters) },
  toString () { return 'unsigned short' },
  [IS_NUMBER_TYPE]: true
}

export const INT = {
  allocate (...parameters) { return new Int32Array (...parameters) },
  toString () { return 'int' },
  [IS_NUMBER_TYPE]: true
}

export const UNSIGNED_INT = {
  allocate (...parameters) { return new Uint32Array (...parameters) },
  toString () { return 'unsigned int' },
  [IS_NUMBER_TYPE]: true
}

export const FLOAT = {
  allocate (...parameters) { return new Float32Array (...parameters) },
  toString () { return 'float' },
  [IS_NUMBER_TYPE]: true
}

export const DOUBLE = {
  allocate (...parameters) { return new Float64Array(...parameters) },
  toString () { return 'double' },
  [IS_NUMBER_TYPE]: true
}

/**
* Return true if the given value is a type instance.
*
* @param {any} value - A value to check.
* @return {boolean} True if the given value is a type instance.
*/
export function is (value) {
  return value == null || (typeof value === 'object' && value[IS_NUMBER_TYPE])
}

/**
* Return the type of a given typed array.
*
* @param {TypedArray} typedArray - A typed array to check.
* @return {Type} The related type of the given typed array.
*/
export function of (typedArray) {
  if (typedArray instanceof Int8Array) {
    return BYTE
  } else if (typedArray instanceof Uint8Array) {
    return UNSIGNED_BYTE
  } else if (typedArray instanceof Int16Array) {
    return SHORT
  } else if (typedArray instanceof Uint16Array) {
    return UNSIGNED_SHORT
  } else if (typedArray instanceof Int32Array) {
    return INT
  } else if (typedArray instanceof Uint32Array) {
    return UNSIGNED_INT
  } else if (typedArray instanceof Float32Array) {
    return FLOAT
  } else if (typedArray instanceof Float64Array) {
    return DOUBLE
  } else {
    throw new InvalidParameterError('typedArray', typedArray,
      'Unnable to guess the type of the given array.'
    )
  }
}
