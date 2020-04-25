import { OrderingEvent } from './OrderingEvent'
import { OrderingAction } from './OrderingAction'
import { Ordering } from './Ordering'

export namespace OrderingReducer {
  export function reduce (state : Ordering = Ordering.EMPTY, action : OrderingEvent) : Ordering {
    switch (action.type) {
      case OrderingAction.TOGGLE:
        return state.toggle(action.payload)
      case OrderingAction.ASCEND:
        return state.ascending(action.payload)
      case OrderingAction.DESCEND:
        return state.descending(action.payload)
      case OrderingAction.UNORDER:
        return state.delete(action.payload)
      case OrderingAction.ORDER:
        return state.orderBy(action.payload.field, action.payload.direction)
      case OrderingAction.ONLY:
        return state.only(action.payload)
      case OrderingAction.CLEAR:
        return Ordering.EMPTY
      default:
        return state
    }
  }
}
