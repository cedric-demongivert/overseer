import { Map } from 'immutable'
import { Ordering } from './Ordering'

const EMPTY_MAP = new Map()

export class OrderingStore {
  /**
  * Instanciate a copy of another ordering store.
  *
  * @param {OrderingStore} toCopy - An ordering store instance to copy.
  *
  * @return {OrderingStore} A copy of the given ordering store.
  */
  static copy (toCopy) {
    return new OrderingStore(toCopy.getState())
  }

  /**
  * Instanciate a new ordering store.
  *
  * @param {Map<number, Ordering>} [state = EMPTY_MAP] - The state of the new ordering store.
  */
  constructor (state = EMPTY_MAP) {
    this._orderings = state
  }

  /**
  * Return the number of orderings into this store.
  *
  * @return {number} The number of orderings into this store.
  */
  get size () {
    return this._orderings.size
  }

  /**
  * Create a new ordering into this store.
  *
  * @param {number} identifier - Identifier of the new ordering to create.
  * @param {Ordering} [ordering = Ordering.EMPTY]
  *
  * @return {OrderingStore} A new updated ordering store instance.
  */
  create (identifier, ordering = Ordering.EMPTY) {
    if (this._orderings.has(identifier)) {
      throw new Error([
        'Unable to create a new ordering with identifier', identifier,
        'into this store because another ordering instance already exists',
        'with the given identifier.'
      ].join(' '))
    } else {
      return this.setOrderings(
        this._orderings.set(identifier, ordering)
      )
    }
  }

  /**
  * Delete an ordering from this store.
  *
  * @param {number} identifier - Identifier of the ordering to delete.
  *
  * @return {OrderingStore} A new updated ordering store instance.
  */
  delete (identifier) {
    if (!this._orderings.has(identifier)) {
      throw new Error([
        'Unable to delete the ordering with identifier', identifier,
        'from this store because no ordering instance exists',
        'with the given identifier.'
      ].join(' '))
    } else {
      return this.setOrderings(this._orderings.delete(identifier))
    }
  }

  /**
  * Return true if an ordering with the given identifier exists into this store.
  *
  * @param {number} identifier - Identifier of the ordering to search for.
  *
  * @return {boolean} True if an ordering with the given identifier exists into this store.
  */
  has (identifier) {
    return this._orderings.has(identifier)
  }

  /**
  * Return the ordering with the given identifier from this store.
  *
  * @param {number} identifier - Identifier of the ordering to search for.
  *
  * @return {Ordering} The requested ordering from this store.
  */
  get (identifier) {
    return this._orderings.get(identifier)
  }

  /**
  * Clear this store.
  *
  * @return {OrderingStore} A new updated ordering store instance.
  */
  clear () {
    return OrderingStore.EMPTY
  }

  /**
  * Update an ordering of this store.
  *
  * @param {number} identifier - Identifier of the ordering to update.
  * @param {Ordering} ordering - New ordering state.
  *
  * @return {OrderingStore} A new updated ordering store instance.
  */
  update (identifier, ordering) {
    if (!this._orderings.has(identifier)) {
      throw new Error([
        'Unable to update the ordering with identifier', identifier,
        'of this store because no ordering exists with the given identifier.'
      ].join(' '))
    }

    return this.setOrderings(this._orderings.set(identifier, ordering))
  }

  /**
  * Return all orderings in this store.
  *
  * @return {Map<number, Ordering>} All orderings in this store.
  */
  getOrderings () {
    return this._orderings
  }

  /**
  * Replace orderings of this store.
  *
  * @param {Map<number, Ordering>} orderings - New orderings of this store.
  */
  setOrderings (orderings) {
    if (state === this._orderings) return this
    return new OrderingStore(state)
  }

  /**
  * Return a hash of this store.
  *
  * @return {number} A hash of this store.
  */
  hashCode () {
    return this._orderings.hashCode()
  }

  /**
  * Compare this store with another object and return true if both are equals.
  *
  * @param {any} other - Other object instance to use as a comparison.
  *
  * @return {boolean} True if this instance and the given one are equals.
  */
  equals (other) {
    if (other == null) return false
    if (other == this) return true

    if (other instanceof OrderingStore) {
      return other.getState().equals(this._orderings)
    }

    return false
  }
}

OrderingStore.EMPTY = new OrderingStore()
