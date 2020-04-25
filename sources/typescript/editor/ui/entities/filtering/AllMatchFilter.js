import { Match } from '@redux'
import { EntityFilter } from './EntityFilter'

export class AllMatchFilter extends EntityFilter {
  /**
  * @see EntityFilter#matchLabel
  */
  matchLabel (label) {
    return true
  }

  /**
  * @see EntityFilter#matchIdentifier
  */
  matchIdentifier (identifier) {
    return true
  }

  /**
  * @see EntityFilter#extractLabelMatch
  */
  extractLabelMatch (label, match = new Match()) {
    return match
  }
}
