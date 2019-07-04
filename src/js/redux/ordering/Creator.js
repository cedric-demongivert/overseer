import * as Action from './Action'

const ACTION_CLEAR = { type: Action.CLEAR }

/**
* Create an event for toggling the ordering state of a given field.
*
* @param {number} field - Identifier of the field to toggle.
*
* @return {object} An event for toggling the ordering state of the given field.
*/
export function toggle (field) {
  return {
    type: Action.TOGGLE,
    payload: field
  }
}

/**
* Create an event for ordering in an ascending maner a given field.
*
* @param {number} field - Identifier of the field to order.
*
* @return {object} An event for ordering in an ascending maner the given field.
*/
export function ascend (field) {
  return {
    type: Action.ASCEND,
    payload: field
  }
}

/**
* Create an event for ordering in a descending maner a given field.
*
* @param {number} field - Identifier of the field to order.
*
* @return {object} An event for ordering in a descending maner the given field.
*/
export function descend (field) {
  return {
    type: Action.DESCEND,
    payload: field
  }
}

/**
* Create an event for unordering a given field.
*
* @param {number} field - Identifier of the field to unorder.
*
* @return {object} An event for unordering the given field.
*/
export function unorder (field) {
  return {
    type: Action.UNORDER,
    payload: field
  }
}

/**
* Create an event for ordering a given field into a given direction.
*
* @param {number} field - Identifier of the field to order.
* @param {Direction} direction - Direction of the ordering.
*
* @return {object} An event for ordering the given field into the given direction.
*/
export function order (field, direction) {
  return {
    type: Action.ORDER,
    payload: { field, direction }
  }
}

/**
* Create an event for keeping only a field in the ordering.
*
* @param {number} field - Identifier of the field to keep.
*
* @return {object} An event for keeping only the given field in the ordering.
*/
export function only (field) {
  return {
    type: Action.ONLY,
    payload: field
  }
}

/**
* @return {object} An event for clearing all orderings.
*/
export function clear () {
  return ACTION_CLEAR
}
