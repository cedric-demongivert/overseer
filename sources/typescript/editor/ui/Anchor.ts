export type Anchor = number

export namespace Anchor {
  export const LEFT         : Anchor = 0
  export const RIGHT        : Anchor = 1
  export const TOP          : Anchor = 2
  export const BOTTOM       : Anchor = 3
  export const CENTER       : Anchor = 4
  export const TOP_LEFT     : Anchor = 5
  export const TOP_RIGHT    : Anchor = 6
  export const BOTTOM_LEFT  : Anchor = 7
  export const BOTTOM_RIGHT : Anchor = 8

  export const ALL          : Anchor[] = [
    LEFT,
    RIGHT,
    TOP,
    BOTTOM,
    CENTER,
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
  ]

  /**
  * Stringify the given constant.
  *
  * @param value - A constant.
  *
  * @return A stringified version of the given constant.
  */
  export function toString (value : Anchor) : string {
    switch (value) {
      case LEFT         : return 'LEFT'
      case RIGHT        : return 'RIGHT'
      case TOP          : return 'TOP'
      case BOTTOM       : return 'BOTTOM'
      case CENTER       : return 'CENTER'
      case TOP_LEFT     : return 'TOP_LEFT'
      case TOP_RIGHT    : return 'TOP_RIGHT'
      case BOTTOM_LEFT  : return 'BOTTOM_LEFT'
      case BOTTOM_RIGHT : return 'BOTTOM_RIGHT'
      default           : return undefined
    }
  }
}
