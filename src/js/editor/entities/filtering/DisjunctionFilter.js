import { Match } from '@redux'
import { EntityFilter } from './EntityFilter'

export class DisjunctionFilter extends EntityFilter {
  /**
  * Create a new filter that is a disjunction of existing filters.
  *
  * @param {EntityFilter[]} filters - Filters of the disjunction.
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
  matchIdentifier (identifier) {
    let result = null

    for (let index = 0, size = this._filters.length; index < size; ++index) {
      const doesMatch = this._filters[index].matchIdentifier(identifier)

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
  extractLabelMatch (label, match = new Match()) {
    for (let index = 0, size = this._filters.length; index < size; ++index) {
      this._filters[index].extractLabelMatch(label, match)
    }

    return match
  }
}
