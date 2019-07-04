export const LEFT = 0
export const RIGHT = 1
export const TOP = 2
export const BOTTOM = 3
export const CENTER = 4
export const TOP_LEFT = 5
export const TOP_RIGHT = 6
export const BOTTOM_LEFT = 7
export const BOTTOM_RIGHT = 8

/**
* Return the label of the given constant.
*
* @param {number} value - A constant.
* @return {string} The label associated with the given constant.
*/
export function toString (value) {
  switch (value) {
    case LEFT : return 'LEFT'
    case RIGHT : return 'RIGHT'
    case TOP : return 'TOP'
    case BOTTOM : return 'BOTTOM'
    case CENTER : return 'CENTER'
    case TOP_LEFT : return 'TOP_LEFT'
    case TOP_RIGHT : return 'TOP_RIGHT'
    case BOTTOM_LEFT : return 'BOTTOM_LEFT'
    case BOTTOM_RIGHT : return 'BOTTOM_RIGHT'
  }

  throw new Error(`'${value}' is not a valid anchor constant.`)
}
