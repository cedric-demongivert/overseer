import { NotImplementedException } from '@errors'

export class IdentifierGenerator {
  /**
  * Create a new IdentifierGenerator.
  */
  construct () {
    this._last = null
  }

  /**
  * Generate and return a new identifier.
  *
  * @return {any} An identifier.
  */
  next () {
    this._last = this._generate()
    return this._last
  }

  /**
  * Return the last generated identifier.
  *
  * @return {any} The last generated identifier.
  */
  last () {
    return this._last
  }

  /**
  * Generate and return a new identifier.
  *
  * @return {any} An identifier.
  */
  _generate () {
    throw new NotImplementedException(IdentifierGenerator, '_generate')
  }
}
