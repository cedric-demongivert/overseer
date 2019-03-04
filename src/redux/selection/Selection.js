import { Set, List, Record } from 'immutable'

/**
* A selection of items.
*/
export class Selection extends new Record({
  elements: new Set(),
  history: new List()
}) {
  /**
  * Number of selected items.
  *
  * @return {number} The number of selected items.
  */
  get size () {
    return this.elements.size
  }

  /**
  * Check if an element is in the current selection.
  *
  * @param {any} element - An element to find.
  *
  * @return {boolean} True if the given element is in the current selection.
  */
  has (element) {
    return this.elements.has(element)
  }

  /**
  * Return an element of this selection in the order of their addition.
  *
  * @param {number} index - Index of the element to get.
  *
  * @return {any} The selected element at the given index.
  */
  get (index) {
    return this.history.get(index)
  }

  /**
  * Return the index of the given element if exists, otherwise return -1.
  *
  * @param {any} - An element to find.
  *
  * @return {number} The index of the given element.
  */
  indexOf (element) {
    return this.history.indexOf(element)
  }

  /**
  * Return the first element selected if any.
  *
  * @return {any} The first element selected if any.
  */
  first () {
    return this.history.size > 0 ? this.history.first() : undefined
  }

  /**
  * Return the last element selected if any.
  *
  * @return {any} The last element selected if any.
  */
  last () {
    return this.history.size > 0 ? this.history.last() : undefined
  }

  /**
  * Add an element to this selection.
  *
  * @param {any} element - Element to add.
  *
  * @return {Selection} An updated selection instance.
  */
  add (element) {
    if (!this.elements.has(element)) {
      return new Selection({
        elements: this.elements.add(element),
        history: this.history.push(element)
      })
    } else {
      return new Selection({
        elements: this.elements,
        history: this.history.splice(this.history.indexOf(element), 1)
                             .push(element)
      })
    }
  }

  /**
  * Add multiple elements to this selection.
  *
  * @param {Iterable<any>} elements - Elements to add.
  *
  * @return {Selection} An updated selection instance.
  */
  addAll (elements) {
    const elements = this.elements.asMutable()
    const history = this.history.asMutable()

    for (const element of elements) {
      if (!elements.has(element)) {
        elements.add(element),
        history.push(element)
      } else {
        history.splice(history.indexOf(element), 1).push(element)
      }
    }

    return new Selection({
      elements.asImmutable(),
      history.asImmutable()
    })
  }

  /**
  * Remove an element from this selection.
  *
  * @param {any} element - Element to delete.
  *
  * @return {Selection} An updated selection instance.
  */
  delete (element) {
    if (this.elements.has(element)) {
      return new Selection({
        elements: this.elements.delete(element),
        history: this.history.splice(this.history.indexOf(element), 1)
      })
    }

    return this
  }

  /**
  * Remove multiple elements from this selection.
  *
  * @param {any} element - Elements to delete.
  *
  * @return {Selection} An updated selection instance.
  */
  deleteAll (elements) {
    const elements = this.elements.asMutable()
    const history = this.history.asMutable()

    for (const element of elements) {
      if (elements.has(element)) {
        elements.delete(element)
        history.splice(history.indexOf(element), 1)
      }
    }

    return new Selection({
      elements,
      history
    })
  }

  /**
  * Clear this selection.
  *
  * @return {Selection} An updated selection instance.
  */
  clear () {
    return Selection.EMPTY
  }

  /**
  * Clone this selection.
  *
  * @return {Selection} A clone of this selection.
  */
  clone () {
    return new Selection().addAll(this)
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
      return this.history.equals(other.history)
    }

    return false
  }

  /**
  * Return an iterator over each element of this selection in their addition order.
  *
  * @return {Iterator<any>} Return an iterator over each element of this selection in their addition order.
  */
  [Symbol.iterator] () {
    return this.history.values()
  }
}

Selection.EMPTY = new Selection()
