import { Record, Map, List } from 'immutable'

import * as Direction from './Direction'

const EMPTY_LIST = new List()
const EMPTY_MAP = new Map()

export class Ordering extends new Record({
  orderings: EMPTY_LIST,
  keys: EMPTY_MAP
}) {
  /**
  * Return a copy of an existing instance.
  *
  * @param {Ordering} toCopy - An ordering instance to copy.
  *
  * @return {Ordering} A new instance that is a copy of the given instance.
  */
  static copy (toCopy) {
    return new Ordering(toCopy)
  }

  /**
  * Create a new ordering.
  *
  * @param {number[]} [ordering = []] - Initial ordering state.
  */
  static create (state = []) {
    if (state == null || state.length <= 1) return new Ordering()

    const orderings = EMPTY_LIST.asMutable()
    const keys = EMPTY_MAP.asMutable()

    let index = 0

    for (let index = 0; index < state.length; index += 2) {
      orderings.push(List.of(state[index], state[index + 1]))
      keys.set(state[index], orderings.size - 1)
    }

    return new Ordering({
      orderings: orderings.asImmutable(),
      keys: keys.asImmutable()
    })
  }

  /**
  * Return the number of fields ordered by this configuration.
  *
  * @return {number} The number of fields ordered by this configuration.
  */
  get size () {
    return this.orderings.size
  }

  /**
  * Return the nth ordered field identifier.
  *
  * @param {number} index - Index of the ordering to search for.
  * @return {number} The identifier of the field ordered at the requested index.
  */
  getField (index) {
    return this.orderings.get(index).get(0)
  }

  /**
  * Return the nth ordering direction.
  *
  * @param {number} index - Index of the ordering to search for..
  *
  * @return {Direction} The direction of the ordering at the requested index.
  */
  getDirection (index) {
    return this.orderings.get(index).get(1)
  }

  getDirectionOfField (field) {
    if (this.isOrdered(field)) {
      return this.getDirection(this.indexOf(field))
    } else {
      return Direction.NONE
    }
  }

  /**
  * Toggle ordering of a given field.
  *
  * If the given field was not ordered, it will be ordered in an descending fashion.
  * If the given field was ordered in a descending fashion, it will be ordered in an ascending fashion.
  * If the given field was ordered in an ascending fashion, it will be not ordered at all.
  *
  * @param {number} field - The identifier of the field to toggle.
  * @return {Ordering} A new updated ordering instance.
  */
  toggle (field) {
    if (this.isOrdered(field)) {
      if (this.getDirection(this.indexOf(field)) === Direction.DESCENDING) {
        return this.ascending(field)
      } else {
        return this.delete(field)
      }
    } else {
      return this.descending(field)
    }
  }

  /**
  * Order a given field.
  *
  * @param {number} field - The identifier of the field to order.
  * @param {Direction} [direction = Direction.ASCENDING] - The ordering direction to use.
  * @return {Ordering} A new updated ordering instance.
  */
  orderBy (field, direction = Direction.ASCENDING) {
    if (direction === Direction.NONE) {
      return this.delete(field)
    } else if (this.isOrdered(field)) {
      const index = this.indexOf(field)

      return new Ordering({
        orderings: this.orderings.set(
          index, this.orderings.get(index).set(1, direction)
        ),
        keys: this.keys
      })
    } else {
      return new Ordering({
        orderings: this.orderings.push(List.of(field, direction)),
        keys: this.keys.set(field, this.orderings.size)
      })
    }
  }

  /**
  * Order a field in an ascending fashion.
  *
  * @param {number} field - The identifier of the field to order.
  * @return {Ordering} An updated instance of this configuration.
  */
  ascending (field) {
    return this.orderBy(field, Direction.ASCENDING)
  }

  /**
  * Order a field in a descending fashion.
  *
  * @param {number} field - The identifier of the field to order.
  * @return {Ordering} An updated instance of this configuration.
  */
  descending (field) {
    return this.orderBy(field, Direction.DESCENDING)
  }

  /**
  * Unordering a given field.
  *
  * @param {number} field - The identifier of the field to unorder.
  * @return {Ordering} An updated instance of this configuration.
  */
  delete (field) {
    if (this.isOrdered(field)) {
      return new Ordering({
        orderings: this.orderings.delete(this.indexOf(field)),
        keys: this.keys.delete(field)
      })
    } else {
      return this
    }
  }

  /**
  * Return the ordering index of the given field.
  *
  * @param {number} field - The identifier of a field to search for.
  * @return {number} The ordering index of the given field.
  */
  indexOf (field) {
    return this.keys.get(field)
  }

  /**
  * Return true if the given field is ordered.
  *
  * @param {number} field - The identifier of the field to search for.
  * @return {boolean} True if the given field is ordered.
  */
  isOrdered (field) {
    return this.keys.has(field)
  }

  /**
  * Clear this ordering configuration.
  *
  * @return {Ordering} A new empty ordering configuration.
  */
  clear () {
    return Ordering.EMPTY
  }
}

Ordering.EMPTY = new Ordering()
