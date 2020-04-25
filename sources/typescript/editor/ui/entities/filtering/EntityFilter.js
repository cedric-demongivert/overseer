import { Match } from '@redux'

export class EntityFilter {
  /**
  * Return true if this filter match the given label.
  *
  * If this filter accept the given label a call to this method will return
  * true. In some cases, if this filter does not apply to entity labels this
  * method will return null. Finally if this filter reject the given label a
  * call to this method will return false.
  *
  * @param {string} label - An entity label to test.
  *
  * @return {boolean} True, false or null as described above.
  */
  matchLabel (label) {
    return null
  }

  /**
  * Return true if this filter match the given identifier.
  *
  * If this filter accept the given identifier a call to this method will return
  * true. In some cases, if this filter does not apply to entity identifiers
  * this method will return null. Finally if this filter reject the given
  * identifier a call to this method will return false.
  *
  * @param {number} identifier - An entity identifier to test.
  *
  * @return {boolean} True, false or null as described above.
  */
  matchIdentifier (identifier) {
    return null
  }

  /**
  * Extract this filter's exact character match for the given label.
  *
  * If this filter does not match the given label, or if this filter does not
  * apply to labels this method will return an empty match.
  *
  * @param {string} label - An entity label to test.
  * @param {Match} [match = new Match()] - A Match object to use for storing the result.
  *
  * @return {Match} This filter's exact character match for the given label.
  */
  extractLabelMatch (label, match = new Match()) {
    return match
  }
}
