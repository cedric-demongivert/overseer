import { MapObject } from './MapObject'

/**
* An group of MapObject.
*/
export class MapGroup extends MapObject {
  /**
  * Create a new empty map.
  *
  * @param {GLContextualised} context - The opengl context of this map object.
  */
  constructor (context) {
    super(context)
    this._children = new Set()
  }

  /**
  * @override
  */
  set unit (newUnit) {
    super.unit = newUnit

    for (const child of this.children) {
      child.rescale()
    }
  }

  /**
  * Return an iterator over all children of this map.
  *
  * @return {Iterator<MapObject>} An iterator over all children of this map.
  */
  * children () {
    yield * this._children
  }

  /**
  * Add a child to this group.
  *
  * @param {MapObject} child - A child to add to this group.
  *
  * @return {MapGroup} This instance for chaining purpose.
  */
  add (child) {
    if (!this.has(child)) {
      this._children.add(child)
      child.parent = this
    }

    return this
  }

  /**
  * Enqueue a computation of the locale to world matrix.
  */
  _updateLocaleToWorld () {
    if (!Object.getOwnPropertyDescriptor(this, 'localeToWorld').get) {
      super._updateLocaleToWorld()

      for (const child of this.children()) {
        child._updateLocaleToWorld()
      }
    }
  }

  /**
  * @see MapObject.render
  */
  render (camera) {
    super(camera)

    for (const child of this._children) {
      child.render(camera)
    }
  }

  /**
  * Check if this group directly contains a child.
  *
  * @param {MapObject} child - A child to fetch.
  *
  * @return {boolean} True if this group directly contains the child, false otherwise.
  */
  has (child) {
    return this._children.has(child)
  }

  /**
  * Delete a child of this group.
  *
  * @param {MapObject} child - The child to delete.
  *
  * @return {MapGroup} This instance for chaining purpose.
  */
  delete (child) {
    if (this.has(child)) {
      this._children.delete(child)
      child.parent = null
    }

    return this
  }
}
