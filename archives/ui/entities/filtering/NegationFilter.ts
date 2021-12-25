import * as Redux from '../../../../redux'
import { EntityFilter } from './EntityFilter'

export class NegationFilter implements EntityFilter {
  private _filter : EntityFilter

  /**
  * Create a new filter that is the negation of another one.
  *
  * @param filter - The filter to negate.
  */
  public constructor (filter : EntityFilter) {
    this._filter = filter
  }

  /**
  * @see EntityFilter#matchLabel
  */
  public matchLabel (label : string) : boolean {
    const result : boolean = this._filter.matchLabel(label)
    return result == null ? null : !result
  }

  /**
  * @see EntityFilter#matchIdentifier
  */
  public matchIdentifier (identifier : number) : boolean {
    const result : boolean = this._filter.matchIdentifier(identifier)
    return result == null ? null : !result
  }

  /**
  * @see EntityFilter#extractLabelMatch
  */
  public extractLabelMatch (label : string, match = new Redux.Match()) : Redux.Match {
    this._filter.extractLabelMatch(label, match).invert()
    return match
  }
}
