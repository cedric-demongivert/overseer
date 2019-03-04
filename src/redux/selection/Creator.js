import * as Action from './Action'

import { Selection } from './Selection'

/**
* @param {number} identifier - Identifier of the ordering to create.
* @param {Ordering} [value = Selection.EMPTY] - Initial state of the selection to create.
*
* @return {object}
*/
export function create (identifier, value = Selection.EMPTY) {
  return {
    type: Action.CREATE,
    payload: {
      identifier,
      value
    }
  }
}

export function update (identifier, value) {
  return {
    type: Action.UPDATE,
    payload: {
      identifier,
      value
    }
  }
}

export function remove (identifier) {
  return {
    type: Action.DELETE,
    payload: identifier
  }
}
