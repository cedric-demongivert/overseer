import uuid from 'uuid/v4'

/**
* A regexp that test for a universally unique identifier format.
*/
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export class Identifier {
  /**
  * @param {any} value - Value to check.
  *
  * @return {boolean} True if the given value is an identifier.
  */
  static is (value) {
    return typeof value === 'string' && UUID.test(value)
  }

  /**
  * @return {Identifier} A new valid identifier.
  */
  static create () {
    return uuid()
  }
}
