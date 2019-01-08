const EMPTY_SET = new Set()

/**
* A base of entity labels.
*/
export class LabelManager {
  /**
  * Create a new empty label manager.
  */
  constructor () {
    this._labels = new Set()
    this._entitiesByLabel = new Map()
    this._labelByEntity = new Map()
  }

  /**
  * Return all registered labels of this manager.
  *
  * @return {Set<string>} All registered labels of this manager.
  */
  get labels () {
    return this._labels
  }

  /**
  * Return all entities with the given label.
  *
  * @param {string} label - A label to search for.
  *
  * @return {Set<number>} A set of entities with the given label.
  */
  getEntitiesWithLabel (label) {
    return this._entitiesByLabel.get(label) || EMPTY_SET
  }

  /**
  * Return the label of a given entity.
  *
  * @param {number} identifier - An entity identifier to search for.
  *
  * @return {string} The label attached to the given entity.
  */
  getLabelOfEntity (identifier) {
    return this._labelByEntity.get(identifier)
  }

  /**
  * Set the label of a given entity.
  *
  * @param {number} identifier - An entity identifier.
  * @param {string} label - A label to attach to the given entity.
  *
  * @return {LabelManager} The current manager instance for chaining purposes.
  */
  setLabelOfEntity (identifier, label) {
    const oldLabel = this.getLabelOfEntity(identifier)

    if (oldLabel !== label) {
      if (oldLabel != null) {
        this._entitiesByLabel.get(oldLabel).delete(identifier)

        if (this._entitiesByLabel.get(oldLabel).size <= 0) {
          this._entitiesByLabel.delete(oldLabel)
          this._labels.delete(oldLabel)
        }
      }

      if (!this._labels.has(label)) {
        this._labels.add(label)
        this._entitiesByLabel.set(label, new Set())
      }

      this._entitiesByLabel.get(label).add(identifier)
      this._labelByEntity.set(identifier, label)
    }

    return this
  }

  /**
  * Remove the label assigned to an entity.
  *
  * @param {number} identifier - Identifier of the entity from which we will remove the label.
  *
  * @return {LabelManager} The current manager instance for chaining purposes.
  */
  deleteLabelOfEntity (identifier) {
    if (this._labelByEntity.has(identifier)) {
      const label = this._labelByEntity.get(identifier)
      this._labelByEntity.delete(identifier)
      this._entitiesByLabel.get(label).delete(identifier)
      if (this._entitiesByLabel.get(label).size <= 0) {
        this._labels.delete(label)
      }
    }

    return this
  }

  /**
  * Compare this instance with another value and return true if they are equals.
  *
  * @param {any} other - Other object to use as a comparison.
  *
  * @return {boolean} True if both objects are equals.
  */
  equals (other) {
    if (other == null) return false
    if (other == this) return true

    if (other instanceof LabelManager) {
      if (other.labels.size !== this._labels.size) return false

      for (const label of this._labels) {
        const thisEntities = this._entitiesByLabel.get(label)
        const otherEntities = other.getEntitiesWithLabel(label)

        if (otherEntities.size !== thisEntities.size) return false

        for (const entity of thisEntities) {
          if (!otherEntities.has(entity)) return false
        }
      }

      return true
    }

    return false
  }

  /**
  * Clone this manager and return the result.
  *
  * @return {LabelManager} A clone of this manager.
  */
  clone () {
    const result = new LabelManager()

    for (const entity of this._labelByEntity.keys()) {
      result.setLabelOfEntity(entity, this._labelByEntity.get(entity))
    }

    return result
  }

  /**
  * Clear this manager of this content.
  *
  * @return {LabelManager} The current manager instance for chaining purposes.
  */
  clear () {
    this._labels.clear()
    this._labelByEntity.clear()
    this._entitiesByLabel.clear()

    return this
  }
}
