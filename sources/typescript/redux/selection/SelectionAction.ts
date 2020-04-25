export type SelectionAction = string

export namespace SelectionAction {
  export const ADD         : SelectionAction = 'selection:add'
  export const DELETE      : SelectionAction = 'selection:delete'
  export const ONLY        : SelectionAction = 'selection:only'
  export const CLEAR       : SelectionAction = 'selection:clear'

  export const ALL         : SelectionAction[] = [
    ADD,
    DELETE,
    ONLY,
    CLEAR
  ]
}
