import { IdentifierGenerator } from './IdentifierGenerator'
import uuid from 'uuid/v4'

/**
* A uuidv4 identifier generator.
*/
export class UUIDv4Generator extends IdentifierGenerator {
  /**
  * @see IdentifierGenerator#_generate
  */
  _generate () {
    return uuid()
  }
}
