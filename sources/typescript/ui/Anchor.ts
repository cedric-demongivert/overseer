/**
 * 
 */
export type Anchor = (
  Anchor.LEFT |
  Anchor.RIGHT |
  Anchor.TOP |
  Anchor.BOTTOM |
  Anchor.CENTER |
  Anchor.TOP_LEFT |
  Anchor.TOP_RIGHT |
  Anchor.BOTTOM_LEFT |
  Anchor.BOTTOM_RIGHT
)

/**
 * 
 */
export namespace Anchor {
  /**
   * 
   */
  export type CENTER = 0b0

  /**
   * 
   */
  export const CENTER: CENTER = 0b0

  /**
   * 
   */
  export type LEFT = 0b10

  /**
   * 
   */
  export const LEFT: LEFT = 0b10

  /**
   * 
   */
  export type RIGHT = 0b11

  /**
   * 
   */
  export const RIGHT: RIGHT = 0b11

  /**
   * 
   */
  export type TOP = 0b0010

  /**
   * 
   */
  export const TOP: TOP = 0b0010

  /**
   * 
   */
  export type BOTTOM = 0b0011

  /**
   * 
   */
  export const BOTTOM: BOTTOM = 0b0011

  /**
   * 
   */
  export type TOP_LEFT = 0b1010 // TOP | LEFT

  /**
   * 
   */
  export const TOP_LEFT: TOP_LEFT = 0b1010 // TOP | LEFT

  /**
   * 
   */
  export type TOP_RIGHT = 0b1110

  /**
   * 
   */
  export const TOP_RIGHT: TOP_RIGHT = 0b1110

  /**
   * 
   */
  export type BOTTOM_LEFT = 0b1011

  /**
   * 
   */
  export const BOTTOM_LEFT: BOTTOM_LEFT = 0b1011

  /**
   * 
   */
  export type BOTTOM_RIGHT = 0b1111

  /**
   * 
   */
  export const BOTTOM_RIGHT: BOTTOM_RIGHT = 0b1111

  /**
   * 
   */
  export const ALL: Anchor[] = [
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
  export function toString(value: Anchor): string {
    switch (value) {
      case CENTER: return 'CENTER'
      case LEFT: return 'LEFT'
      case RIGHT: return 'RIGHT'
      case TOP: return 'TOP'
      case BOTTOM: return 'BOTTOM'
      case TOP_LEFT: return 'TOP_LEFT'
      case TOP_RIGHT: return 'TOP_RIGHT'
      case BOTTOM_LEFT: return 'BOTTOM_LEFT'
      case BOTTOM_RIGHT: return 'BOTTOM_RIGHT'
      default: return undefined
    }
  }

  /**
  * Stringify the given constant.
  *
  * @param value - A constant.
  *
  * @return A stringified version of the given constant.
  */
  export function toDebugString(value: Anchor): string {
    return 'Anchor #' + value + ' (' + (toString(value) || 'undefined') + ')'
  }
}
