import * as openable from '../openable'
import * as selection from '../selection'
import * as State from './State'
import * as Action from './Action'

export function reduce (state, action) {
  let result =  Object.assign(
    {}, state == null ? State.DEFAULT : state
  )

  switch (action.type) {
    case Action.UPDATE_ENTITY_PANEL:
      result.entityPanel = openable.reduce(
        result.entityPanel, action.payload
      )
      return result
    case Action.UPDATE_COMPONENT_PANEL:
      result.componentPanel = openable.reduce(
        result.componentPanel, action.payload
      )
      return result
    case Action.UPDATE_PANELS:
      result.componentPanel = openable.reduce(
        result.componentPanel, action.payload
      )
      result.entityPanel = openable.reduce(
        result.entityPanel, action.payload
      )
      return result
    case Action.UPDATE_ENTITY_SELECTION:
      result.entitySelection = selection.reduce(
        result.entitySelection, action.payload
      )
      return result
  }

  return result
}
