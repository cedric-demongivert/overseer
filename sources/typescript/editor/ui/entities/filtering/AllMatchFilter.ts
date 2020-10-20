import * as Redux from '../../../../redux'

import { EntityFilter } from './EntityFilter'

export class AllMatchFilter implements EntityFilter {
  /**
  * @see EntityFilter#matchLabel
  */
  public matchLabel (label : string) : boolean {
    return true
  }

  /**
  * @see EntityFilter#matchIdentifier
  */
  public matchIdentifier (identifier : number) : boolean {
    return true
  }

  /**
  * @see EntityFilter#extractLabelMatch
  */
  public extractLabelMatch (label : string, match : Redux.Match = new Redux.Match()) : Redux.Match {
    match.addRange(0, label.length)
    return match
  }
}
