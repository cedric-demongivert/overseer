import { Match } from '@redux'
import { EntityFilter } from './EntityFilter'

function escape (token) {
    return token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export class SubstringFilter extends EntityFilter {
  /**
  * Create a new filter that search for a given string into an entity label.
  *
  * @param {string} sequence - The string to search into an entity label to match it.
  */
  constructor (sequence) {
    super()
    this._sequence = sequence
    this._matcher = new RegExp(escape(sequence), 'g')
  }

  /**
  * @see EntityFilter#matchLabel
  */
  matchLabel (label) {
    return label.indexOf(this._sequence) >= 0
  }

  /**
  * @see EntityFilter#extractLabelMatch
  */
  extractLabelMatch (label, match = new Match()) {
    let result = null

    while ((result = this._matcher.exec(label)) != null) {
      match.addRange(result.index, result.index + this._sequence.length)
    }

    return match
  }
}
