import { ECSAction } from './ECSAction'

export type ECSEvent = { type: ECSAction, payload?: any }

export namespace ECSEvent {
  export function deleteEntity (identifier : number) {
    return {
      type: ECSAction.DELETE_ENTITY,
      payload: [ identifier ]
    }
  }

  export function deleteEntities (identifiers : number[]) {
    return {
      type: ECSAction.DELETE_ENTITY,
      payload: identifiers
    }
  }

  export function updateComponent (component : number, mutator) {
    return {
      type: ECSAction.UPDATE_COMPONENT,
      payload: { component, mutator }
    }
  }
}
