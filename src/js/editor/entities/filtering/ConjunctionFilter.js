import { Match } from '@redux'
import { EntityFilter } from './EntityFilter'

export class ConjunctionFilter extends EntityFilter {
  /**
  * Create a new filter that is a conjunction of existing filters.
  *
  * @param {EntityFilter[]} filters - Filters of the conjunction.
  */
  constructor (filters) {
    super()
    this._filters = filters
  }

  /**
  * @see EntityFilter#matchLabel
  */
  matchLabel (label) {
    let result = null

    for (let index = 0, size = this._filters.length; index < size; ++index) {
      const doesMatch = this._filters[index].matchLabel(label)

      if (doesMatch === false) {
        return false
      } else if (doesMatch === true) {
        result = true
      }
    }

    return result
  }

  /**
  * @see EntityFilter#matchIdentifier
  */
  matchIdentifier (identifier) {
    let result = null

    for (let index = 0, size = this._filters.length; index < size; ++index) {
      const doesMatch = this._filters[index].matchIdentifier(identifier)

      if (doesMatch === false) {
        return false
      } else if (doesMatch === true) {
        result = true
      }
    }

    return result
  }

  /**
  * @see EntityFilter#extractLabelMatch
  */
  extractLabelMatch (label, match = new Match()) {
    for (let index = 0, size = this._filters.length; index < size; ++index) {
      this._filters[index].extractLabelMatch(label, match)
    }

    return match
  }
}
