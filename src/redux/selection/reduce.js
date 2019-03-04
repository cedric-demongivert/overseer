import { SelectionStore } from './SelectionStore'
import * as Action from './Action'

export function reduce (state, action) {
  let result = state == null ? SelectionStore.EMPTY : state

  switch (action.type) {
    case Action.CREATE:
      result = result.create(action.payload.identifier, action.payload.value)
      break
    case Action.UPDATE:
      result = result.update(action.payload.identifier, action.payload.value)
      break
    case Action.DELETE:
      result = result.delete(action.payload)
      break
  }

  return result
}
