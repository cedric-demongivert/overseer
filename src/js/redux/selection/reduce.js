import * as Action from './Action'

import { State } from './State'

export function reduce (state, action) {
  let result = state == null ? State.DEFAULT : state

  switch (action.type) {
    case Action.ADD:
      return result.add(action.payload)
    case Action.ADD_MANY:
      return result.addAll(action.payload)
    case Action.DELETE:
      return result.delete(action.payload)
    case Action.DELETE_MANY:
      return result.deleteAll(action.payload)
    case Action.ONLY:
      return State.DEFAULT.add(action.payload)
    case Action.CLEAR:
      return result.clear()
  }

  return result
}
