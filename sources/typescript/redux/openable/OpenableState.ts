export type OpenableState = number

export namespace OpenableState {
  export const OPENING : OpenableState = 0
  export const OPENED  : OpenableState = 1
  export const CLOSING : OpenableState = 2
  export const CLOSED  : OpenableState = 3

  export const ALL     : OpenableState[] = [
    OPENING,
    OPENED,
    CLOSING,
    CLOSED
  ]

  /**
  * Return true if the given openable is opening, closing or open.
  *
  * @param value - An openable state.
  *
  * @return True if the given openable is opening, closing or opened.
  */
  export function isVisible (value : OpenableState) : boolean {
    switch (value) {
      case OPENING:
      case CLOSING:
      case OPENED:
        return true
      default:
        return false
    }
  }

  /**
  * Return true if the given openable is closed.
  *
  * @param value - An openable state.
  *
  * @return True if the given openable is closed.
  */
  export function isHidden (value : OpenableState) : boolean {
    return value === CLOSED
  }

  /**
  * Stringify the given constant.
  *
  * @param value - A constant.
  *
  * @return A stringified version of the given constant.
  */
  export function toString (value : OpenableState) : string {
    switch (value) {
      case OPENING : return 'OPENING'
      case OPENED  : return 'OPENED'
      case CLOSING : return 'CLOSING'
      case CLOSED  : return 'CLOSED'
      default      : return undefined
    }
  }
}
