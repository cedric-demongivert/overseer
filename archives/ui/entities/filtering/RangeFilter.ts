import * as Redux from '../../../../redux'
import { EntityFilter } from './EntityFilter'

export class RangeFilter implements EntityFilter {
  private _min : number
  private _max : number

  /**
  * Create a new filter that match a given range of identifiers
  *
  * @param a - The first boundary of the range to match.
  * @param b - The second boundary of the range to match.
  */
  public constructor (a : number, b : number) {
    this._max = Math.max(a, b)
    this._min = Math.min(a, b)
  }

  /**
  * @see EntityFilter#matchLabel
  */
  public matchLabel (label : string) : boolean {
    return null
  }

  /**
  * @see EntityFilter#matchLabel
  */
  public matchIdentifier (identifier : number) : boolean {
    return identifier <= this._max && identifier >= this._min
  }

  /**
  * @see EntityFilter#extractLabelMatch
  */
  public extractLabelMatch (label : string, match : Redux.Match = new Redux.Match()) :  Redux.Match {
    return match
  }
}
