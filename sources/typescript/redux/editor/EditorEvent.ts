import { EditorAction } from './EditorAction'
import { SelectionEvent } from '../selection/SelectionEvent'

export type EditorEvent = { type: EditorAction, payload?: any }

/**
* Update the entity selection state.
*
* @param event - A selection event to propagate.
*
* @return A well formed redux event.
*/
export function updateEntitySelection (event : SelectionEvent) : EditorEvent {
  return {
    type: EditorAction.SELECT_ENTITIES,
    payload: event
  }
}
