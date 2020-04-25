import { Match } from '@redux'
import { EntityFilter } from './EntityFilter'

export class RangeFilter extends EntityFilter {
  /**
  * Create a new filter that match a given range of identifiers
  *
  * @param {number} a - The first boundary of the range to match.
  * @param {number} b - The second boundary of the range to match.
  */
  constructor (a, b) {
    super()
    this._max = Math.max(a, b)
    this._min = Math.min(a, b)
  }

  /**
  * @see EntityFilter#matchLabel
  */
  matchIdentifier (identifier) {
    return identifier <= this._max && identifier >= this._min
  }
}
