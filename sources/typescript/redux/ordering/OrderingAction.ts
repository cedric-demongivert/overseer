export type OrderingAction = string

export namespace OrderingAction {
  export const TOGGLE  : OrderingAction = 'ordering:toggle'
  export const ASCEND  : OrderingAction = 'ordering:ascend'
  export const DESCEND : OrderingAction = 'ordering:descend'
  export const UNORDER : OrderingAction = 'ordering:unorder'
  export const ORDER   : OrderingAction = 'ordering:order'
  export const ONLY    : OrderingAction = 'ordering:only'
  export const CLEAR   : OrderingAction = 'ordering:clear'

  export const ALL     : OrderingAction[] = [
    TOGGLE,
    ASCEND,
    DESCEND,
    UNORDER,
    ORDER,
    ONLY,
    CLEAR
  ]
}
