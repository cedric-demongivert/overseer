import { SelectionAction } from './SelectionAction'
import { SelectionEvent } from './SelectionEvent'
import { Selection } from './Selection'

export namespace SelectionReducer{
  export function reduce <T> (state : Selection<T> = Selection.empty(), action : SelectionEvent) : Selection<T> {
    switch (action.type) {
      case SelectionAction.ADD:
        return state.selectAll(action.payload)
      case SelectionAction.DELETE:
        return state.deselectAll(action.payload)
      case SelectionAction.ONLY:
        return Selection.empty<T>().selectAll(action.payload)
      case SelectionAction.CLEAR:
        return state.clear()
      default:
        return state
    }
  }
}
