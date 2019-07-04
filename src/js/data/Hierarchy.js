export class Hierarchy {
  /**
  * Create a new hierarchy.
  */
  constructor () {
    this._parent = null
    this._children = new Set()
  }

  /**
  * Reset this component to its initial state.
  */
  reset () {
    while (this._children.size > 0) {
      this.deleteChild(this._children.values().next.value)
    }

    this.parent = null
  }

  /**
  * Return the root hierarchy of this hierarchy.
  *
  * @return {Hierarchy} The root hierarchy.
  */
  get root () {
    let root = this
    while (root.parent) { root = root.parent }
    return root
  }

  /**
  * Return the parent hierarchy.
  *
  * @return {Hierarchy} The parent hierarchy if exists.
  */
  get parent () {
    return this._parent
  }

  /**
  * Change the parent hierarchy.
  *
  * @param {Hierarchy} newParent - The new parent hierarchy.
  */
  set parent (newParent) {
    this.setParent(newParent)
  }

  /**
  * Change the parent hierarchy.
  *
  * @param {Hierarchy} newParent - The new parent hierarchy.
  */
  setParent (newParent) {
    if (newParent !== this._parent) {
      if (this._parent) {
        const oldParent = this._parent
        this._parent = null
        oldParent.deleteChild(this)
      }

      this._parent = newParent

      if (newParent != null) newParent.addChild(this)
    }
  }

  /**
  * Add a child hierarchy.
  *
  * @param {Hierarchy} child - The child hierarchy to add.
  */
  addChild (child) {
    if (!this._children.has(child)) {
      this._children.add(child)
      child.parent = this
    }
  }

  /**
  * Iterate over all children of this hierarchy.
  *
  * @return {Iterator<Hierarchy>} An iterator over all children of this hierarchy.
  */
  children () {
    return this._children
  }

  /**
  * Remove a child hierarchy.
  *
  * @param {Hierarchy} child - The child hierarchy to delete.
  */
  deleteChild (child) {
    if (this._children.has(child)) {
      this._children.delete(child)
      child.parent = null
    }
  }

  /**
  * Remove all children hierarchy of this hierarchy.
  */
  clear () {
    for (const child of this._children) {
      this.deleteChild(child)
    }
  }
}
