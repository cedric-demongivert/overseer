import { OrderingAction } from './OrderingAction'
import { OrderingDirection } from './OrderingDirection'

const ACTION_CLEAR : OrderingEvent.AtomicEvent = { type: OrderingAction.CLEAR }

export type OrderingEvent = { type: OrderingAction, payload?: any }

export namespace OrderingEvent {
  export type AtomicEvent = { type: OrderingAction }
  export type FieldEvent = { type: OrderingAction, payload: number }
  export type OrderEvent = { type: OrderingAction, payload: { field: number, direction: OrderingDirection } }

  /**
  * Create an event for toggling the ordering state of a given field.
  *
  * @param field - Identifier of the field to toggle.
  *
  * @return An event for toggling the ordering state of the given field.
  */
  export function toggle (field : number) : OrderingEvent {
    return {
      type: OrderingAction.TOGGLE,
      payload: field
    }
  }

  /**
  * Create an event for ordering in an ascending maner a given field.
  *
  * @param field - Identifier of the field to order.
  *
  * @return An event for ordering in an ascending maner the given field.
  */
  export function ascend (field : number) : OrderingEvent {
    return {
      type: OrderingAction.ASCEND,
      payload: field
    }
  }

  /**
  * Create an event for ordering in a descending maner a given field.
  *
  * @param field - Identifier of the field to order.
  *
  * @return An event for ordering in a descending maner the given field.
  */
  export function descend (field : number) : OrderingEvent {
    return {
      type: OrderingAction.DESCEND,
      payload: field
    }
  }

  /**
  * Create an event for unordering a given field.
  *
  * @param field - Identifier of the field to unorder.
  *
  * @return An event for unordering the given field.
  */
  export function unorder (field : number) : OrderingEvent {
    return {
      type: OrderingAction.UNORDER,
      payload: field
    }
  }

  /**
  * Create an event for ordering a given field into a given direction.
  *
  * @param field - Identifier of the field to order.
  * @param direction - Direction of the ordering.
  *
  * @return An event for ordering the given field into the given direction.
  */
  export function order (field : number, direction : OrderingDirection) : OrderingEvent {
    return {
      type: OrderingAction.ORDER,
      payload: { field, direction }
    }
  }

  /**
  * Create an event for keeping only a field in the ordering.
  *
  * @param field - Identifier of the field to keep.
  *
  * @return An event for keeping only the given field in the ordering.
  */
  export function only (field : number) : OrderingEvent {
    return {
      type: OrderingAction.ONLY,
      payload: field
    }
  }

  /**
  * @return An event for clearing all orderings.
  */
  export function clear () : OrderingEvent {
    return ACTION_CLEAR
  }
}
