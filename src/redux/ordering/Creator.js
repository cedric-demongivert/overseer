import * as Action from './Action'
import * as Direction from './Direction'

import { Ordering } from './Ordering'


/**
* @param {number} identifier - Identifier of the ordering to create.
* @param {Ordering} [value = Ordering.EMPTY] - Initial state of the ordering to create.
*
* @return {object}
*/
export function create (identifier, value = Ordering.EMPTY) {
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
