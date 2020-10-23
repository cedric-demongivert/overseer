export type Cursor = number

export namespace Cursor {
  export const AUTO                         : Cursor = 0
  export const DEFAULT                      : Cursor = 1
  export const NONE                         : Cursor = 2
  export const CONTEXT_MENU                 : Cursor = 3
  export const HELP                         : Cursor = 4
  export const POINTER                      : Cursor = 5
  export const PROGRESS                     : Cursor = 6
  export const WAIT                         : Cursor = 7
  export const CELL                         : Cursor = 8
  export const CROSSHAIR                    : Cursor = 9
  export const TEXT                         : Cursor = 10
  export const VERTICAL_TEXT                : Cursor = 11
  export const ALIAS                        : Cursor = 12
  export const COPY                         : Cursor = 13
  export const MOVE                         : Cursor = 14
  export const NO_DROP                      : Cursor = 15
  export const GRAB                         : Cursor = 16
  export const GRABBING                     : Cursor = 17
  export const NOT_ALLOWED                  : Cursor = 18
  export const ALL_SCROLL                   : Cursor = 19
  export const COLUMN_RESIZE                : Cursor = 20
  export const ROW_RESIZE                   : Cursor = 21
  export const NORTH_RESIZE                 : Cursor = 22
  export const EAST_RESIZE                  : Cursor = 23
  export const SOUTH_RESIZE                 : Cursor = 34
  export const WEST_RESIZE                  : Cursor = 25
  export const NORTH_EAST_RESIZE            : Cursor = 26
  export const NORTH_WEST_RESIZE            : Cursor = 27
  export const SOUTH_WEST_RESIZE            : Cursor = 28
  export const SOUTH_EAST_RESIZE            : Cursor = 29
  export const EAST_WEST_RESIZE             : Cursor = 30
  export const NORTH_SOUTH_RESIZE           : Cursor = 31
  export const NORTH_EAST_SOUTH_WEST_RESIZE : Cursor = 32
  export const NORTH_WEST_SOUTH_EAST_RESIZE : Cursor = 33
  export const ZOOM_IN                      : Cursor = 34
  export const ZOOM_OUT                     : Cursor = 35

  export const ALL : Cursor[] = [
    AUTO,
    DEFAULT,
    NONE,
    CONTEXT_MENU,
    HELP,
    POINTER,
    PROGRESS,
    WAIT,
    CELL,
    CROSSHAIR,
    TEXT,
    VERTICAL_TEXT,
    ALIAS,
    COPY,
    MOVE,
    NO_DROP,
    GRAB,
    GRABBING,
    NOT_ALLOWED,
    ALL_SCROLL,
    COLUMN_RESIZE,
    ROW_RESIZE,
    NORTH_RESIZE,
    EAST_RESIZE,
    SOUTH_RESIZE,
    WEST_RESIZE,
    NORTH_EAST_RESIZE,
    NORTH_WEST_RESIZE,
    SOUTH_WEST_RESIZE,
    SOUTH_EAST_RESIZE,
    EAST_WEST_RESIZE,
    NORTH_SOUTH_RESIZE,
    NORTH_EAST_SOUTH_WEST_RESIZE,
    NORTH_WEST_SOUTH_EAST_RESIZE,
    ZOOM_IN,
    ZOOM_OUT
  ]

  export function toString (value : Cursor) : string {
    switch (value) {
      case AUTO                         : return 'AUTO'
      case DEFAULT                      : return 'DEFAULT'
      case NONE                         : return 'NONE'
      case CONTEXT_MENU                 : return 'CONTEXT_MENU'
      case HELP                         : return 'HELP'
      case POINTER                      : return 'POINTER'
      case PROGRESS                     : return 'PROGRESS'
      case WAIT                         : return 'WAIT'
      case CELL                         : return 'CELL'
      case CROSSHAIR                    : return 'CROSSHAIR'
      case TEXT                         : return 'TEXT'
      case VERTICAL_TEXT                : return 'VERTICAL_TEXT'
      case ALIAS                        : return 'ALIAS'
      case COPY                         : return 'COPY'
      case MOVE                         : return 'MOVE'
      case NO_DROP                      : return 'NO_DROP'
      case GRAB                         : return 'GRAB'
      case GRABBING                     : return 'GRABBING'
      case NOT_ALLOWED                  : return 'NOT_ALLOWED'
      case ALL_SCROLL                   : return 'ALL_SCROLL'
      case COLUMN_RESIZE                : return 'COLUMN_RESIZE'
      case ROW_RESIZE                   : return 'ROW_RESIZE'
      case NORTH_RESIZE                 : return 'NORTH_RESIZE'
      case EAST_RESIZE                  : return 'EAST_RESIZE'
      case SOUTH_RESIZE                 : return 'SOUTH_RESIZE'
      case WEST_RESIZE                  : return 'WEST_RESIZE'
      case NORTH_EAST_RESIZE            : return 'NORTH_EAST_RESIZE'
      case NORTH_WEST_RESIZE            : return 'NORTH_WEST_RESIZE'
      case SOUTH_WEST_RESIZE            : return 'SOUTH_WEST_RESIZE'
      case SOUTH_EAST_RESIZE            : return 'SOUTH_EAST_RESIZE'
      case EAST_WEST_RESIZE             : return 'EAST_WEST_RESIZE'
      case NORTH_SOUTH_RESIZE           : return 'NORTH_SOUTH_RESIZE'
      case NORTH_EAST_SOUTH_WEST_RESIZE : return 'NORTH_EAST_SOUTH_WEST_RESIZE'
      case NORTH_WEST_SOUTH_EAST_RESIZE : return 'NORTH_WEST_SOUTH_EAST_RESIZE'
      case ZOOM_IN                      : return 'ZOOM_IN'
      case ZOOM_OUT                     : return 'ZOOM_OUT'
      default                           : undefined
    }
  }

  export function toCss (value : Cursor) : string {
    switch (value) {
      case AUTO                         : return 'auto'
      case DEFAULT                      : return 'default'
      case NONE                         : return 'none'
      case CONTEXT_MENU                 : return 'context-menu'
      case HELP                         : return 'help'
      case POINTER                      : return 'pointer'
      case PROGRESS                     : return 'progress'
      case WAIT                         : return 'wait'
      case CELL                         : return 'cell'
      case CROSSHAIR                    : return 'crosshair'
      case TEXT                         : return 'text'
      case VERTICAL_TEXT                : return 'vertical-text'
      case ALIAS                        : return 'alias'
      case COPY                         : return 'copy'
      case MOVE                         : return 'move'
      case NO_DROP                      : return 'no-drop'
      case GRAB                         : return 'grab'
      case GRABBING                     : return 'grabbing'
      case NOT_ALLOWED                  : return 'not-allowed'
      case ALL_SCROLL                   : return 'all-scroll'
      case COLUMN_RESIZE                : return 'col-resize'
      case ROW_RESIZE                   : return 'row-resize'
      case NORTH_RESIZE                 : return 'n-resize'
      case EAST_RESIZE                  : return 'e-resize'
      case SOUTH_RESIZE                 : return 's-resize'
      case WEST_RESIZE                  : return 'w-resize'
      case NORTH_EAST_RESIZE            : return 'ne-resize'
      case NORTH_WEST_RESIZE            : return 'nw-resize'
      case SOUTH_WEST_RESIZE            : return 'sw-resize'
      case SOUTH_EAST_RESIZE            : return 'se-resize'
      case EAST_WEST_RESIZE             : return 'ew-resize'
      case NORTH_SOUTH_RESIZE           : return 'ns-resize'
      case NORTH_EAST_SOUTH_WEST_RESIZE : return 'nesw-resize'
      case NORTH_WEST_SOUTH_EAST_RESIZE : return 'nwse-resize'
      case ZOOM_IN                      : return 'zoom-in'
      case ZOOM_OUT                     : return 'zoom-out'
      default                           : return undefined
    }
  }

  export function fromCss (value : string) : Cursor {
    switch (value) {
      case 'auto'          : return AUTO
      case 'default'       : return DEFAULT
      case 'none'          : return NONE
      case 'context-menu'  : return CONTEXT_MENU
      case 'help'          : return HELP
      case 'pointer'       : return POINTER
      case 'progress'      : return PROGRESS
      case 'wait'          : return WAIT
      case 'cell'          : return CELL
      case 'crosshair'     : return CROSSHAIR
      case 'text'          : return TEXT
      case 'vertical-text' : return VERTICAL_TEXT
      case 'alias'         : return ALIAS
      case 'copy'          : return COPY
      case 'move'          : return MOVE
      case 'no-drop'       : return NO_DROP
      case 'grab'          : return GRAB
      case 'grabbing'      : return GRABBING
      case 'not-allowed'   : return NOT_ALLOWED
      case 'all-scroll'    : return ALL_SCROLL
      case 'col-resize'    : return COLUMN_RESIZE
      case 'row-resize'    : return ROW_RESIZE
      case 'n-resize'      : return NORTH_RESIZE
      case 'e-resize'      : return EAST_RESIZE
      case 's-resize'      : return SOUTH_RESIZE
      case 'w-resize'      : return WEST_RESIZE
      case 'ne-resize'     : return NORTH_EAST_RESIZE
      case 'nw-resize'     : return NORTH_WEST_RESIZE
      case 'sw-resize'     : return SOUTH_WEST_RESIZE
      case 'se-resize'     : return SOUTH_EAST_RESIZE
      case 'ew-resize'     : return EAST_WEST_RESIZE
      case 'ns-resize'     : return NORTH_SOUTH_RESIZE
      case 'nesw-resize'   : return NORTH_EAST_SOUTH_WEST_RESIZE
      case 'nwse-resize'   : return NORTH_WEST_SOUTH_EAST_RESIZE
      case 'zoom-in'       : return ZOOM_IN
      case 'zoom-out'      : return ZOOM_OUT
      default              : return undefined
    }
  }

  /**
  * Return the list of cursors defined by a given dom element.
  *
  * @param element - An element from witch getting the cursors.
  *
  * @return A list of cursors used by the given element.
  */
  export function getFromElement (element : HTMLElement) : Cursor[] {
    if (element.style.cursor.trim() === '') {
      return [DEFAULT]
    } else {
      const cursors = []

      const tokens = element.style.cursor.split(',').map(x => x.trim())

      for (const token of tokens) {
        if (token.startsWith('url')) {
          console.warn('URL cursors are not handled yet.')
        } else {
          cursors.push(fromCss(token.toLowerCase()))
        }
      }

      return cursors
    }
  }

  export function setToElement (cursors : Cursor[], element : HTMLElement) : void {
    if (cursors == null || cursors.length <= 0) {
      element.style.cursor = toCss(DEFAULT)
    } else {
      element.style.cursor = cursors.map(toCss).join(', ')
    }
  }
}
