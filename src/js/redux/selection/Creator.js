import * as Action from './Action'

const CLEAR_ACTION = { type: Action.CLEAR }

/**
* Create an event for adding an element to a selection.
*
* @param {any} value - The element to add to a selection.
*
* @return An event for adding an element to a selection.
*/
export function add (value) {
  return {
    type: Action.ADD,
    payload: value
  }
}

/**
* Create an event for selecting only the given element.
*
* @param {any} value - The element to select.
*
* @return An event for selecting only the given element.
*/
export function only (value) {
  return {
    type: Action.ONLY,
    payload: value
  }
}

/**
* Create an event for adding multiple elements to a selection.
*
* @param {[any]} values - Elements to add to a selection.
*
* @return An event for adding multiple elements to a selection.
*/
export function addMany (values) {
  return {
    type: Action.ADD_MANY,
    payload: values
  }
}

/**
* Create an event for deleting an element from a selection.
*
* @param {any} value - The element to delete of the selection.
*
* @return An event for deleting an element from a selection.
*/
function remove (value) {
  return {
    type: Action.DELETE,
    payload: value
  }
}

export { remove as delete }

/**
* Create an event for deleting multiple elements from a selection.
*
* @param {[any]} values - Elements to delete from the selection.
*
* @return An event for deleting multiple elements from a selection.
*/
export function deleteMany (values) {
  return {
    type: Action.DELETE_MANY,
    payload: values
  }
}

/**
* @return An event for clearing a selection.
*/
export function clear () {
  return CLEAR_ACTION
}
