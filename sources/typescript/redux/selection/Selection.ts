import { OrderedSet } from 'immutable'

const EMPTY_SET : OrderedSet<any> = OrderedSet()

/**
* A selection of items.
*/
export class Selection<T> {
  public readonly elements : OrderedSet<T>

  public constructor (elements : OrderedSet<T> = EMPTY_SET) {
    this.elements = elements
  }

  /**
  * Add the given element to the selection.
  *
  * @param element - Element to add.
  *
  * @return An updated selection instance.
  */
  public select (element : T) : Selection<T> {
    const set : OrderedSet<T> = this.elements.asMutable()

    set.delete(element)
    set.add(element)

    return new Selection(set.asImmutable())
  }

  /**
  * Add the given elements to this selection.
  *
  * @param elements - Elements to add.
  *
  * @return An updated selection instance.
  */
  public selectAll (elements : Iterable<T>) : Selection<T> {
    const result : OrderedSet<T> = this.elements.asMutable()

    for (const element of elements) {
      result.delete(element)
      result.add(element)
    }

    return new Selection(result.asImmutable())
  }

  /**
  * Remove an element from this selection.
  *
  * @param element - Element to delete.
  *
  * @return An updated selection instance.
  */
  public deselect (element : T) : Selection<T> {
    return new Selection(this.elements.delete(element))
  }

  /**
  * Remove multiple elements from this selection.
  *
  * @param element - Elements to delete.
  *
  * @return An updated selection instance.
  */
  public deselectAll (elements : Iterable<T>) : Selection<T> {
    const result : OrderedSet<T> = this.elements.asMutable()

    for (const element of elements) {
      result.delete(element)
    }

    return new Selection(result.asImmutable())
  }

  /**
  * Clear this selection.
  *
  * @return An updated selection instance.
  */
  public clear () : Selection<T> {
    return Selection.EMPTY
  }

  /**
  * Return true if this selection is equal to another.
  *
  * @param other - A value to compare.
  *
  * @return True if this selection is equal to the given one, false otherwise.
  */
  public equals (other : any) : boolean {
    if (other == null) return false
    if (other == this) return true

    if (other instanceof Selection) {
      return this.elements.equals(other.elements)
    }

    return false
  }

  /**
  * Return an iterator over each element of this selection in their addition order.
  *
  * @return Return an iterator over each element of this selection in their addition order.
  */
  public [Symbol.iterator] () : Iterator<T> {
    return this.elements.values()
  }
}

export namespace Selection {
  export const EMPTY : Selection<any> = new Selection<any>()

  export function empty <T> () : Selection<T> {
    return EMPTY
  }
}
