export const CLOSED = 0
export const OPENED = 1
export const CLOSING = 2
export const OPENING = 3

export const DEFAULT = CLOSED

/**
* Return the label of the given constant.
*
* @param {number} value - A constant.
* @return {string} The label associated with the given constant.
*/
export function toString (value) {
  switch (value) {
    case CLOSED: return 'CLOSED'
    case CLOSING: return 'CLOSING'
    case OPENING: return 'OPENING'
    case OPENED: return 'OPENED'
  }

  throw new Error(`'${value}' is not a valid openable state constant.`)
}

/**
* Return true if the given openable is open.
*
* @param {number} value - The openable state.
*
* @return {boolean} True if the given openable is open.
*/
export function isOpen (value) {
  return value === OPENED
}

/**
* Return true if the given openable is opening.
*
* @param {number} value - The openable state.
*
* @return {boolean} True if the given openable is opening.
*/
export function isOpening (value) {
  return value === OPENING
}

/**
* Return true if the given openable is closed.
*
* @param {number} value - The openable state.
*
* @return {boolean} True if the given openable is closed.
*/
export function isClosed (value) {
  return value === CLOSED
}

/**
* Return true if the given openable is closing.
*
* @param {number} value - The openable state.
*
* @return {boolean} True if the given openable is closing.
*/
export function isClosing (value) {
  return value === CLOSING
}

/**
* Return true if the given openable is opening, closing or open.
*
* @param {number} value - The openable state.
*
* @return {boolean} True if the given openable is opening, closing or open.
*/
export function isVisible (value) {
  return isOpen(value) || isOpening(value) || isClosing(value)
}

/**
* Return true if the given openable is closed.
*
* @param {number} value - The openable state.
*
* @return {boolean} True if the given openable is closed.
*/
export function isHidden (value) {
  return isClosed(value)
}

/**
* A list of each existing state of an openable object.
*/
export const ALL = [
  CLOSED,
  OPENED,
  CLOSING,
  OPENING
]
