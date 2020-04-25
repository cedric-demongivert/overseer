import { firstBy } from 'thenBy'

import * as Direction from './Direction'

export class ComparatorBuilder {
  /**
  * Create a new comparator builder.
  *
  * @param {any[]} [configuration] - Builder initial configuration.
  */
  constructor (configuration) {
    this._comparators = new Map()

    if (configuration && configuration.length > 1) {
      for (let index = 0; index < configuration; index += 2) {
        this._comparators.set(configuration[index], configuration[index + 1])
      }
    }
  }

  /**
  * Create and return a comparison function that match the given ordering.
  *
  * @param {Ordering} ordering - An ordering to match.
  *
  * @return {function} An comparison function in accordance with the given ordering.
  */
  orderBy (ordering) {
    let result = undefined

    for (let index = 0; index < ordering.size; ++index) {
      const field = ordering.getField(index)
      const direction = ordering.getDirection(index)

      if (this._comparators.has(field)) {
        if (result == null) {
          result = firstBy(
            this._comparators.get(field),
            direction === Direction.ASCENDING ? 1 : -1
          )
        } else {
          result = result.thenBy(
            this._comparators.get(field),
            direction === Direction.ASCENDING ? 1 : -1
          )
        }
      }
    }

    return result
  }

  fields () {
    return this._comparators.keys()
  }

  hasComparaotor (field) {
    return this._comparators.has(field)
  }

  setComparator (field, comperator) {
    this._comparators.set(field, comperator)
    return this
  }

  deleteComparator (field) {
    this._comparators.delete(field)
    return this
  }

  clear () {
    this._comparators.clear()
    return this
  }
}
