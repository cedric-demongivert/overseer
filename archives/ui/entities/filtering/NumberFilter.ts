import * as Redux from '../../../../redux'
import { EntityFilter } from './EntityFilter'

export class NumberFilter implements EntityFilter {
  private _value : number

  /**
  * Create a new filter that match a given identifier
  *
  * @param value - The identifier to match.
  */
  public constructor (value : number) {
    this._value = value
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
    return identifier === this._value
  }

  /**
  * @see EntityFilter#extractLabelMatch
  */
  public extractLabelMatch (label : string, match : Redux.Match = new Redux.Match()) :  Redux.Match {
    return match
  }
}
