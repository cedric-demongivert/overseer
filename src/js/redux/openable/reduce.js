import * as State from './State'
import * as Action from './Action'

function open (state) {
  return (
    state === State.CLOSING ||
    state === State.CLOSED
  ) ? State.OPENING : state
}

function close (state) {
  return (
    state === State.OPENING ||
    state === State.OPENED
  ) ? State.CLOSING : state
}

function toggle (state) {
  return (
    state === State.OPENING ||
    state === State.OPENED
  ) ? State.CLOSING : State.OPENING
}

export function reduce (state, action) {
  let result = state == null ? State.DEFAULT : state

  switch (action.type) {
    case Action.OPEN: return open(result)
    case Action.OPENED: return State.OPENED
    case Action.CLOSE: return close(result)
    case Action.CLOSED: return State.CLOSED
    case Action.TOGGLE: return toggle(result)
    case Action.SET: return action.payload
  }

  return result
}
