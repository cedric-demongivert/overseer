import * as Action from './Action'
import * as State from './State'

const OPEN_ACTION = { type: Action.OPEN }
const OPENED_ACTION = { type: Action.OPENED }
const CLOSE_ACTION = { type: Action.CLOSE }
const CLOSED_ACTION = { type: Action.CLOSED }
const TOGGLE_ACTION = { type: Action.TOGGLE }
const SET_CLOSED_ACTION = { type: Action.SET, payload: State.CLOSED }
const SET_OPENED_ACTION = { type: Action.SET, payload: State.OPENED }
const SET_CLOSING_ACTION = { type: Action.SET, payload: State.CLOSING }
const SET_OPENING_ACTION = { type: Action.SET, payload: State.OPENING }

/**
* Create an event for opening an existing openable element.
*
* @return {object} A well formed redux event.
*/
export function open () { return OPEN_ACTION }

/**
* Create an event that notify that a given openable element terminated is opening animation.
*
* @return {object} A well formed redux event.
*/
export function opened () { return OPENED_ACTION }

/**
* Create an event for closing an existing openable element.
*
* @return {object} A well formed redux event.
*/
export function close () { return CLOSE_ACTION }

/**
* Create an event that notify that a given openable element terminated is closing animation.
*
* @return {object} A well formed redux event.
*/
export function closed () { return CLOSED_ACTION }

/**
* Create an event for toggling a given openable element.
*
* @return {object} A well formed redux event.
*/
export function toggle () { return TOGGLE_ACTION }

/**
* Create an event for changing a given openable element state.
*
* @param {State} state - The new state to set.
*
* @return {object} A well formed redux event.
*/
export function set (state) {
  switch (state) {
    case CLOSED: return SET_CLOSED_ACTION
    case CLOSING: return SET_CLOSING_ACTION
    case OPENING: return SET_OPENING_ACTION
    case OPENED: return SET_OPENED_ACTION
  }

  throw new Error(`'${state}' is not a valid openable state constant.`)
}
