/**
* A selection of items.
*/
export class Selection {
  /**
  * Create a new empty selection.
  */
  constructor () {
    this._elements = new Set()
    this._history = new Array()
  }

  /**
  * Number of selected items.
  *
  * @return {number} The number of selected items.
  */
  get size () {
    return this._elements.size
  }

  /**
  * Return all selected elements in the order of their selection.
  *
  * @return {Iterable<any>} An iterable over all selected elements in the order of their selection.
  */
  elements () {
    return this._history
  }

  /**
  * Check if an element is in the current selection.
  *
  * @param {any} element - An element to find.
  *
  * @return {boolean} True if the given element is in the current selection.
  */
  has (element) {
    return this._elements.has(element)
  }

  /**
  * Return an element of this selection in the order of their addition.
  *
  * @param {number} index - Index of the element to get.
  * @return {any} The selected element at the given index.
  */
  get (index) {
    return this._history[index]
  }

  /**
  * Return the index of the given element if exists, otherwise return -1.
  *
  * @param {any} - An element to find.
  *
  * @return {number} The index of the given element.
  */
  indexOf (element) {
    return this._history.indexOf(element)
  }

  /**
  * Return the first element selected if any.
  *
  * @return {any} The first element selected if any.
  */
  first () {
    return this._history.size > 0 ? this._history[0] : undefined
  }

  /**
  * Return the last element selected if any.
  *
  * @return {any} The last element selected if any.
  */
  last () {
    return this._history.size > 0 ? this._history[this._history.length - 1] : undefined
  }

  /**
  * Add an element to this selection.
  *
  * @param {any} element - Element to add.
  *
  * @return {Selection} The current selection instance for chaining purposes.
  */
  add (element) {
    if (!this._elements.has(element)) {
      this._elements.add(element)
      this._history.push(element)
    } else {
      this._history.splice(this._history.indexOf(element), 1)
      this._history.push(element)
    }

    return this
  }

  /**
  * Add multiple elements to this selection.
  *
  * @param {Iterable<any>} elements - Elements to add.
  *
  * @return {Selection} The current selection instance for chaining purposes.
  */
  addAll (elements) {
    for (const element of elements) {
      this.select(element)
    }

    return this
  }

  /**
  * Remove an element from this selection.
  *
  * @param {any} element - Element to delete.
  *
  * @return {Selection} The current selection instance for chaining purposes.
  */
  delete (element) {
    if (this._elements.has(element)) {
      this._elements.delete(element)
      this._history.splice(this._history.indexOf(element), 1)
    }

    return this
  }

  /**
  * Remove multiple elements from this selection.
  *
  * @param {any} element - Elements to delete.
  *
  * @return {Selection} The current selection instance for chaining purposes.
  */
  deleteAll (elements) {
    for (const element of elements) {
      this.unselect(element)
    }

    return this
  }

  /**
  * Clear this selection.
  *
  * @return {Selection} The current selection instance for chaining purposes.
  */
  clear () {
    this._elements.clear()
    this._history.length = 0
    return this
  }

  /**
  * Clone this selection.
  *
  * @return {Selection} A clone of this selection.
  */
  clone () {
    return new Selection().selectAll(this)
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

    if (other instanceof Selection) {
      for (let index = 0; index < this._history.size; ++index) {
        if (
          (other.equals && !this.get(index).equals(other.get(index))) ||
          (this.get(index) !== other.get(index))
        ) return false
      }

      return true
    }

    return false
  }

  /**
  * Return an iterator over each element of this selection in their addition order.
  *
  * @return {Iterator<any>} Return an iterator over each element of this selection in their addition order.
  */
  [Symbol.iterator] () {
    return this._history[Symbol.iterator]()
  }
}
