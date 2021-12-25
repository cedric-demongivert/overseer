import * as Redux from '../../../../redux'
import { EntityFilter } from './EntityFilter'

export class DisjunctionFilter implements EntityFilter {
  private _filters : EntityFilter[]

  /**
  * Create a new filter that is a disjunction of existing filters.
  *
  * @param filters - Filters of the disjunction.
  */
  public constructor (filters : Iterable<EntityFilter>) {
    this._filters = [...filters]
  }

  /**
  * @see EntityFilter#matchLabel
  */
  public matchLabel (label : string) : boolean {
    let result : boolean = null

    for (let index = 0, size = this._filters.length; index < size; ++index) {
      const doesMatch : boolean = this._filters[index].matchLabel(label)

      if (doesMatch === true) {
        return true
      } else if (doesMatch === false) {
        result = false
      }
    }

    return result
  }

  /**
  * @see EntityFilter#matchIdentifier
  */
  public matchIdentifier (identifier : number) : boolean {
    let result : boolean = null

    for (let index = 0, size = this._filters.length; index < size; ++index) {
      const doesMatch : boolean = this._filters[index].matchIdentifier(identifier)

      if (doesMatch === true) {
        return true
      } else if (doesMatch === false) {
        result = false
      }
    }

    return result
  }

  /**
  * @see EntityFilter#extractLabelMatch
  */
  public extractLabelMatch (label : string, match : Redux.Match = new Redux.Match()) :  Redux.Match {
    for (let index = 0, size = this._filters.length; index < size; ++index) {
      this._filters[index].extractLabelMatch(label, match)
    }

    return match
  }
}
