import * as Redux from '../../../../redux'

export interface EntityFilter {
  /**
  * Return true if this filter match the given label.
  *
  * If this filter accept the given label a call to this method will return
  * true. In some cases, if this filter does not apply to entity labels this
  * method will return null. Finally if this filter reject the given label a
  * call to this method will return false.
  *
  * @param label - An entity label to test.
  *
  * @return True, false or null as described above.
  */
  matchLabel (label : string) : boolean

  /**
  * Return true if this filter match the given identifier.
  *
  * If this filter accept the given identifier a call to this method will return
  * true. In some cases, if this filter does not apply to entity identifiers
  * this method will return null. Finally if this filter reject the given
  * identifier a call to this method will return false.
  *
  * @param identifier - An entity identifier to test.
  *
  * @return True, false or null as described above.
  */
  matchIdentifier (identifier : number) : boolean

  /**
  * Extract this filter's exact character match for the given label.
  *
  * If this filter does not match the given label, or if this filter does not
  * apply to labels this method will return an empty match.
  *
  * @param label - An entity label to test.
  * @param match - A Match object to use for storing the result.
  *
  * @return This filter's exact character match for the given label.
  */
  extractLabelMatch (label : string, match? : Redux.Match) : Redux.Match
}
