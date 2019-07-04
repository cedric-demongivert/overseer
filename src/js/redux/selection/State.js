import { Set, List, Record } from 'immutable'

const StateRecord = new Record({
  elements: new Set(),
  history: new List(),
  updated: null
})

function defaultState () {
  return {
    elements: new Set(),
    history: new List(),
    updated: null
  }
}

/**
* A selection of items.
*/
export class State {
  constructor (state) {
    this._state = state == null ? defaultState() : state
  }

  /**
  * Number of selected items.
  *
  * @return {number} The number of selected items.
  */
  get size () {
    return this._state.elements.size
  }

  /**
  * Check if an element is in the current selection.
  *
  * @param {any} element - An element to find.
  *
  * @return {boolean} True if the given element is in the current selection.
  */
  has (element) {
    return this._state.elements.has(element)
  }

  /**
  * Return an element of this selection in the order of their addition.
  *
  * @param {number} index - Index of the element to get.
  *
  * @return {any} The selected element at the given index.
  */
  get (index) {
    return this._state.history.get(index)
  }

  /**
  * Return the index of the given element if exists, otherwise return -1.
  *
  * @param {any} - An element to find.
  *
  * @return {number} The index of the given element.
  */
  indexOf (element) {
    return this._state.history.indexOf(element)
  }

  /**
  * Return the first element selected if any.
  *
  * @return {any} The first element selected if any.
  */
  first () {
    const history = this._state.history
    return history.size > 0 ? history.first() : undefined
  }

  /**
  * Return the last element selected if any.
  *
  * @return {any} The last element selected if any.
  */
  last () {
    const history = this._state.history
    return history.size > 0 ? history.last() : undefined
  }

  /**
  * Return the last element updated if any.
  *
  * @return {any} The last element updated if any.
  */
  updated () {
    return this._state.updated
  }

  /**
  * Return the last element updated or the given value if no element was updated.
  *
  * @param {any} value - A default value to return if no element was updated.
  *
  * @return {any} The last element updated or the given value if no element was updated.
  */
  updatedOr (value) {
    return this._state.updated == null ? value : this._state.updated
  }

  /**
  * Add an element to this selection.
  *
  * @param {any} element - Element to add.
  *
  * @return {State} An updated selection instance.
  */
  add (element) {
    if (!this._state.elements.has(element)) {
      return new State({
        elements: this._state.elements.add(element),
        history: this._state.history.push(element),
        updated: element
      })
    } else {
      const history = this._state.history
      return new State({
        elements: this._state.elements,
        history: history.splice(history.indexOf(element), 1)
                        .push(element),
        updated: element
      })
    }
  }

  /**
  * Add multiple elements to this selection.
  *
  * @param {Iterable<any>} elements - Elements to add.
  *
  * @return {State} An updated selection instance.
  */
  addAll (elements) {
    if (elements.length <= 0) return this

    const ownElements = this._state.elements.asMutable()
    const history = this._state.history.asMutable()

    for (const element of elements) {
      if (!ownElements.has(element)) {
        ownElements.add(element),
        history.push(element)
      } else {
        history.splice(history.indexOf(element), 1).push(element)
      }
    }

    return new State({
      elements: ownElements.asImmutable(),
      history: history.asImmutable(),
      updated: elements[elements.length - 1]
    })
  }

  /**
  * Remove an element from this selection.
  *
  * @param {any} element - Element to delete.
  *
  * @return {State} An updated selection instance.
  */
  delete (element) {
    if (this._state.elements.has(element)) {
      const history = this._state.history

      return new State({
        elements: this._state.elements.delete(element),
        history: history.splice(history.indexOf(element), 1),
        updated: element
      })
    }

    return this
  }

  /**
  * Remove multiple elements from this selection.
  *
  * @param {any} element - Elements to delete.
  *
  * @return {State} An updated selection instance.
  */
  deleteAll (elements) {
    if (elements.length <= 0) return this

    const ownElements = this._state.elements.asMutable()
    const history = this._state.history.asMutable()

    for (const element of elements) {
      if (ownElements.has(element)) {
        ownElements.delete(element)
        history.splice(history.indexOf(element), 1)
      }
    }

    return new State({
      elements: ownElements.asImmutable(),
      history: history.asImmutable(),
      updated: elements[elements.length -1]
    })
  }

  /**
  * Clear this selection.
  *
  * @return {State} An updated selection instance.
  */
  clear () {
    return State.DEFAULT
  }

  /**
  * Clone this selection.
  *
  * @return {State} A clone of this selection.
  */
  clone () {
    return new State().addAll(this)
  }

  /**
  * Return true if this selection is equal to another.
  *
  * @param {any} other - A value to compare.
  *
  * @return {boolean} True if this selection is equal to the given one, false otherwise.
  */
  equals (other) {
    if (other == null) return false
    if (other == this) return true

    if (other instanceof State) {
      return this._state.history.equals(other.history)
    }

    return false
  }

  /**
  * Return an iterator over each element of this selection in their addition order.
  *
  * @return {Iterator<any>} Return an iterator over each element of this selection in their addition order.
  */
  [Symbol.iterator] () {
    return this._state.history.values()
  }
}

State.DEFAULT = new State()
