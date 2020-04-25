import { Match } from '@redux'
import { EntityFilter } from './EntityFilter'

export class NumberFilter extends EntityFilter {
  /**
  * Create a new filter that match a given identifier
  *
  * @param {number} value - The identifier to match.
  */
  constructor (value) {
    super()
    this._value = value
  }

  /**
  * @see EntityFilter#matchLabel
  */
  matchIdentifier (identifier) {
    return identifier === this._value
  }
}
