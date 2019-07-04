import { State } from './State'
import * as Action from './Action'

export function reduce (state, action) {
  let result = state == null ? State.DEFAULT : state

  switch (action.type) {
    case Action.TOGGLE:
      return result.toggle(action.payload)
    case Action.ASCEND:
      return result.ascending(action.payload)
    case Action.DESCEND:
      return result.descending(action.payload)
    case Action.UNORDER:
      return result.delete(action.payload)
    case Action.ORDER:
      return result.orderBy(action.payload.field, action.payload.direction)
    case Action.ONLY:
      return result.only(action.payload)
    case Action.CLEAR:
      return result.clear()
    default: break
  }

  return result
}
