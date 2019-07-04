export const LABEL = 0
export const IDENTIFIER = 1

/**
* Return the label of the given constant.
*
* @param {number} value - A constant.
* @return {string} The label associated with the given constant.
*/
export function toString (value) {
  switch (value) {
    case LABEL: return 'LABEL'
    case IDENTIFIER: return 'IDENTIFIER'
  }

  throw new Error(`'${value}' is not a valid entity field constant.`)
}
