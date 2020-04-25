export type OpenableAction = string

export namespace OpenableAction {
  export const OPEN   : OpenableAction = 'openable:open'
  export const OPENED : OpenableAction = 'openable:opened'
  export const CLOSE  : OpenableAction = 'openable:close'
  export const CLOSED : OpenableAction = 'openable:closed'
  export const TOGGLE : OpenableAction = 'openable:toggle'
  export const SET    : OpenableAction = 'openable:set'

  export const ALL    : OpenableAction[] = [
    OPEN,
    OPENED,
    CLOSE,
    CLOSED,
    TOGGLE,
    SET
  ]
}
