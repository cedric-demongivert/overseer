import * as Action from './Action'

export function deleteEntity (identifier) {
  return {
    type: Action.DELETE_ENTITY,
    payload: [identifier]
  }
}

export function deleteEntities (identifiers) {
  return {
    type: Action.DELETE_ENTITY,
    payload: identifiers
  }
}

export function updateComponent (component, mutator) {
  return {
    type: Action.UPDATE_COMPONENT,
    payload: { component, mutator }
  }
}
