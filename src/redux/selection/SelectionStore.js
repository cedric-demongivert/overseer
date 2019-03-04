import { Map } from 'immutable'
import { Selection } from './Selection'

const EMPTY_MAP = new Map()

export class SelectionStore {
  /**
  * Instanciate a copy of another selection store.
  *
  * @param {SelectionStore} toCopy - A selection store instance to copy.
  *
  * @return {SelectionStore} A copy of the given selection store.
  */
  static copy (toCopy) {
    return new SelectionStore(toCopy.getState())
  }

  /**
  * Instanciate a new selection store.
  *
  * @param {Map<number, Selection>} [state = EMPTY_MAP] - The state of the new selection store.
  */
  constructor (state = EMPTY_MAP) {
    this._selections = state
  }

  /**
  * Return the number of selections into this store.
  *
  * @return {number} The number of selections into this store.
  */
  get size () {
    return this._selections.size
  }

  /**
  * Create a new selection into this store.
  *
  * @param {number} identifier - Identifier of the new selection to create.
  *
  * @return {SelectionStore} A new updated selection store instance.
  */
  create (identifier) {
    if (this._selections.has(identifier)) {
      throw new Error([
        'Unable to create a new selection with identifier', identifier,
        'into this store because another selection instance already exists',
        'with the given identifier.'
      ].join(' '))
    } else {
      return this.setSelections(
        this._selections.set(identifier, Selection.EMPTY)
      )
    }
  }

  /**
  * Delete a selection from this store.
  *
  * @param {number} identifier - Identifier of the selection to delete.
  *
  * @return {SelectionStore} A new updated selection store instance.
  */
  delete (identifier) {
    if (!this._selections.has(identifier)) {
      throw new Error([
        'Unable to delete the selection with identifier', identifier,
        'from this store because no selection instance exists',
        'with the given identifier.'
      ].join(' '))
    } else {
      return this.setSelections(this._selections.delete(identifier))
    }
  }

  /**
  * Return true if a selection with the given identifier exists into this store.
  *
  * @param {number} identifier - Identifier of the selection to search for.
  *
  * @return {boolean} True if a selection with the given identifier exists into this store.
  */
  has (identifier) {
    return this._selections.has(identifier)
  }

  /**
  * Return the selection with the given identifier from this store.
  *
  * @param {number} identifier - Identifier of the selection to search for.
  *
  * @return {Selection} The requested selection from this store.
  */
  get (identifier) {
    return this._selections.get(identifier)
  }

  /**
  * Clear this store.
  *
  * @return {SelectionStore} A new updated ordering store instance.
  */
  clear () {
    return SelectionStore.EMPTY
  }

  /**
  * Update a selection of this store.
  *
  * @param {number} identifier - Identifiant of the selection to update.
  * @param {Selection} selection - The selection to set.
  *
  * @return {SelectionStore} A new updated selection store instance.
  */
  update (identifier, selection) {
    if (!this._selections.has(identifier)) {
      throw new Error([
        'Unable to update the selection with identifier', identifier,
        'of this store because no selection exists with the given identifier.'
      ].join(' '))
    }

    return this.setSelections(this._selections.set(identifier, selection))
  }

  /**
  * Return all selections in this store.
  *
  * @return {Map<number, Selection>} All selections in this store.
  */
  getSelections () {
    return this._selections
  }

  /**
  * Replace selections of this store.
  *
  * @param {Map<number, Ordering>} selections - New selections of this store.
  *
  * @return {SelectionStore} A new updated selection store instance.
  */
  setSelections (selections) {
    if (selections === this._selections) return this
    return new SelectionStore(selections)
  }

  /**
  * Return a hash of this store.
  *
  * @return {number} A hash of this store.
  */
  hashCode () {
    return this._selections.hashCode()
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

    if (other instanceof SelectionStore) {
      return other.getState().equals(this._selections)
    }

    return false
  }
}

SelectionStore.EMPTY = new SelectionStore()
