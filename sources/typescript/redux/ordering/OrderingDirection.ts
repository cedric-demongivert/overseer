export type OrderingDirection = number

export namespace OrderingDirection {
  export const ASCENDING  : OrderingDirection = 0
  export const DESCENDING : OrderingDirection = 1
  export const NONE       : OrderingDirection = 3

  export const ALL        : OrderingDirection[] = [
    ASCENDING,
    DESCENDING,
    NONE
  ]

  /**
  * Stringify the given constant.
  *
  * @param value - A constant to stringify.
  *
  * @return A string that represent the given constant.
  */
  export function toString (value : OrderingDirection) : string {
    switch (value) {
      case ASCENDING  : return 'ASCENDING'
      case DESCENDING : return 'DESCENDING'
      case NONE       : return 'NONE'
      default         : return undefined
    }
  }
}
