import { SelectionAction } from './SelectionAction'

export type SelectionEvent = { type: SelectionAction, payload?: any }

export namespace SelectionEvent {
  export type AtomicEvent = { type: SelectionAction }
  export type MutationEvent<T> = { type: SelectionAction, payload: T[] }

  const CLEAR_EVENT : AtomicEvent = { type: SelectionAction.CLEAR }

  /**
  * Create an event for adding the given elements to a selection.
  *
  * @param elements - The elements to add to a selection.
  *
  * @return An event for adding an element to a selection.
  */
  export function select <T> (elements : T[]) : SelectionEvent {
    return {
      type: SelectionAction.ADD,
      payload: elements
    }
  }

  /**
  * Create an event for selecting only the given element.
  *
  * @param elements - Elements to select.
  *
  * @return An event for selecting only the given element.
  */
  export function only <T> (elements : T[]) : SelectionEvent {
    return {
      type: SelectionAction.ONLY,
      payload: elements
    }
  }

  /**
  * Create an event for deleting the given elements from a selection.
  *
  * @param elements - Elements to delete from the selection.
  *
  * @return An event for deleting the given elements from a selection.
  */
  export function deselect <T> (elements : T[]) : SelectionEvent {
    return {
      type: SelectionAction.DELETE,
      payload: elements
    }
  }

  /**
  * @return An event for clearing a selection.
  */
  export function clear () : SelectionEvent {
    return CLEAR_EVENT
  }
}
