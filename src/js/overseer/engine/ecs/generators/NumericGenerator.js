import { IdentifierGenerator } from './IdentifierGenerator'

/**
* A numeric identifier generator.
*/
export class NumericGenerator extends IdentifierGenerator {
  /**
  * Create a new NumericGenerator.
  */
  constructor () {
    super()
    this._next = 0
  }

  /**
  * @see IdentifierGenerator#_generate
  */
  _generate () {
    const next = this._next
    this._next += 1
    return next
  }
}
