export const ASCENDING = 0
export const ASC = 0
export const DESCENDING = 1
export const DESC = 1
export const NONE = 2

/**
* Return the label of the given constant.
*
* @param {number} value - A constant.
* @return {string} The label associated with the given constant.
*/
export function toString (value) {
  switch (value) {
    case ASCENDING: return 'ASCENDING'
    case DESCENDING: return 'DESCENDING'
    case NONE: return 'NONE'
  }

  throw new Error(`'${value}' is not a valid ordering direction constant.`)
}
