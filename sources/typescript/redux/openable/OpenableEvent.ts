import { OpenableAction } from './OpenableAction'
import { OpenableState } from './OpenableState'

export type OpenableEvent = { type: OpenableAction, payload?: any }

const OPEN_ACTION        : OpenableEvent.AtomicEvent = { type: OpenableAction.OPEN }
const OPENED_ACTION      : OpenableEvent.AtomicEvent = { type: OpenableAction.OPENED }
const CLOSE_ACTION       : OpenableEvent.AtomicEvent = { type: OpenableAction.CLOSE }
const CLOSED_ACTION      : OpenableEvent.AtomicEvent = { type: OpenableAction.CLOSED }
const TOGGLE_ACTION      : OpenableEvent.AtomicEvent = { type: OpenableAction.TOGGLE }
const SET_CLOSED_ACTION  : OpenableEvent.SetEvent    = { type: OpenableAction.SET, payload: OpenableState.CLOSED }
const SET_OPENED_ACTION  : OpenableEvent.SetEvent    = { type: OpenableAction.SET, payload: OpenableState.OPENED }
const SET_CLOSING_ACTION : OpenableEvent.SetEvent    = { type: OpenableAction.SET, payload: OpenableState.CLOSING }
const SET_OPENING_ACTION : OpenableEvent.SetEvent    = { type: OpenableAction.SET, payload: OpenableState.OPENING }

export namespace OpenableEvent {
  export type AtomicEvent = { type: OpenableAction }
  export type SetEvent = { type: OpenableAction, payload: OpenableState }
  
  /**
  * Create an event for opening an existing openable element.
  *
  * @return A well formed redux event.
  */
  export function open () : OpenableEvent.AtomicEvent { return OPEN_ACTION }

  /**
  * Create an event that notify that a given openable element terminated is opening animation.
  *
  * @return A well formed redux event.
  */
  export function opened () : OpenableEvent.AtomicEvent { return OPENED_ACTION }

  /**
  * Create an event for closing an existing openable element.
  *
  * @return A well formed redux event.
  */
  export function close () : OpenableEvent.AtomicEvent { return CLOSE_ACTION }

  /**
  * Create an event that notify that a given openable element terminated is closing animation.
  *
  * @return A well formed redux event.
  */
  export function closed () : OpenableEvent.AtomicEvent { return CLOSED_ACTION }

  /**
  * Create an event for toggling a given openable element.
  *
  * @return A well formed redux event.
  */
  export function toggle () : OpenableEvent.AtomicEvent { return TOGGLE_ACTION }

  /**
  * Create an event for changing a given openable element state.
  *
  * @param state - The new state to set.
  *
  * @return A well formed redux event.
  */
  export function set (state : OpenableState) : OpenableEvent.SetEvent {
    switch (state) {
      case OpenableState.CLOSED  : return SET_CLOSED_ACTION
      case OpenableState.CLOSING : return SET_CLOSING_ACTION
      case OpenableState.OPENING : return SET_OPENING_ACTION
      case OpenableState.OPENED  : return SET_OPENED_ACTION
      default      :
        throw new Error(`'${state}' is not a valid openable state constant.`)
    }
  }
}
