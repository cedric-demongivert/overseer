import { Match } from '@redux'
import { EntityFilter } from './EntityFilter'

export class NegationFilter extends EntityFilter {
  /**
  * Create a new filter that is the negation of another one.
  *
  * @param {EntityFilter} filter - The filter to negate.
  */
  constructor (filter) {
    super()
    this._filter = filter
  }

  /**
  * @see EntityFilter#matchLabel
  */
  matchLabel (label) {
    const result = this._filter.matchLabel(label)
    return result == null ? null : !result
  }

  /**
  * @see EntityFilter#matchIdentifier
  */
  matchIdentifier (identifier) {
    const result = this._filter.matchIdentifier(identifier)
    return result == null ? null : !result
  }

  /**
  * @see EntityFilter#extractLabelMatch
  */
  extractLabelMatch (label, match = new Match()) {
    this._filter.extractLabelMatch(label, match).invert()
    return match
  }
}
