import { Map } from 'immutable'

import { ECSAction } from './ECSAction'

export namespace ECSReducer {
  function deleteEntities (state, entities) {
    for (let index = 0, size = entities.length; index < size; ++index) {
      state.deleteEntity(entities[index])
    }

    return state
  }

  function updateComponent (state, payload) {
    payload.mutator(state, state.getInstanceOfComponent(payload.component))

    return state
  }

  export function reduce (state, action) {
    let result = state == null ? null : state

    switch (action.type) {
      case ECSAction.DELETE_ENTITY:
        return deleteEntities(result, action.payload)
      case ECSAction.UPDATE_COMPONENT:
        return updateComponent(result, action.payload)
    }

    return result
  }
}
