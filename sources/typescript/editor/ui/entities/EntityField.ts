export type EntityField = number

export namespace EntityField {
  export const LABEL : EntityField = 0
  export const IDENTIFIER : EntityField = 1

  export const ALL : EntityField[] = [
    LABEL,
    IDENTIFIER
  ]

  /**
  * Return the label of the given constant.
  *
  * @param value - A constant.
  * @return The label associated with the given constant.
  */
  export function toString (value : EntityField) : string {
    switch (value) {
      case LABEL: return 'LABEL'
      case IDENTIFIER: return 'IDENTIFIER'
      default: return undefined
    }
  }
}
