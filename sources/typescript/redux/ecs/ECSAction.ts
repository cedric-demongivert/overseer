export type ECSAction = string

export namespace ECSAction {
  export const DELETE_ENTITY    : ECSAction = 'entity-component-system:entities:delete'
  export const UPDATE_COMPONENT : ECSAction = 'entity-component-system:components:update'
}
