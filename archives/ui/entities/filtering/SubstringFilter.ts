import * as Redux from '../../../../redux'
import { EntityFilter } from './EntityFilter'

function escape (token : string) : string {
  return token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export class SubstringFilter implements EntityFilter {
  private _sequence : string
  private _matcher : RegExp

  /**
  * Create a new filter that search for a given string into an entity label.
  *
  * @param sequence - The string to search into an entity label to match it.
  */
  public constructor (sequence : string) {
    this._sequence = sequence
    this._matcher = new RegExp(escape(sequence), 'g')
  }

  /**
  * @see EntityFilter#matchLabel
  */
  public matchLabel (label : string) : boolean {
    return label.indexOf(this._sequence) >= 0
  }

  /**
  * @see EntityFilter#matchLabel
  */
  public matchIdentifier (identifier : number) : boolean {
    return null
  }

  /**
  * @see EntityFilter#extractLabelMatch
  */
  public extractLabelMatch (label : string, match : Redux.Match = new Redux.Match()) : Redux.Match {
    let result : any = null

    while ((result = this._matcher.exec(label)) != null) {
      match.addRange(result.index, result.index + this._sequence.length)
    }

    return match
  }
}
