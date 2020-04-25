import { OpenableState } from './OpenableState'
import { OpenableAction } from './OpenableAction'
import { OpenableEvent } from './OpenableEvent'

export namespace OpenableReducer {
  /**
  * Return the resulting state after an open action.
  *
  * @param state - Current state.
  *
  * @return The resulting state after an open action.
  */
  function open (state : OpenableState) : OpenableState {
    switch (state) {
      case OpenableState.CLOSING :
      case OpenableState.CLOSED  :
        return OpenableState.OPENING
      default:
        return state
    }
  }

  /**
  * Return the resulting state after a close action.
  *
  * @param state - Current state.
  *
  * @return The resulting state after a close action.
  */
  function close (state : OpenableState) : OpenableState {
    switch (state) {
      case OpenableState.OPENING :
      case OpenableState.OPENED  :
        return OpenableState.CLOSING
      default:
        return state
    }
  }

  /**
  * Return the resulting state after a toggle action.
  *
  * @param state - Current state.
  *
  * @return The resulting state after a toggle action.
  */
  function toggle (state : OpenableState) : OpenableState {
    switch (state) {
      case OpenableState.OPENING :
      case OpenableState.OPENED  :
        return OpenableState.CLOSING
      default:
        return OpenableState.OPENING
    }
  }

  export function reduce (state : OpenableState = OpenableState.CLOSED, action : OpenableEvent) : OpenableState {
    switch (action.type) {
      case OpenableAction.OPEN   : return open(state)
      case OpenableAction.OPENED : return OpenableState.OPENED
      case OpenableAction.CLOSE  : return close(state)
      case OpenableAction.CLOSED : return OpenableState.CLOSED
      case OpenableAction.TOGGLE : return toggle(state)
      case OpenableAction.SET    : return action.payload
      default                    : return state
    }
  }
}
