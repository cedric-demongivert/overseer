const EMPTY_SET = new Set()

/**
* An object that allows to manage entity tagging.
*/
export class TagManager {
  /**
  * Create a new empty tag manager.
  */
  constructor () {
    this._tags = new Set()
    this._entitiesByTag = new Map()
    this._tagsByEntity = new Map()
  }

  /**
  * Return all existing tags.
  *
  * @return {Set<string>} A collection of all existing tags.
  */
  get tags () {
    return this._tags
  }

  /**
  * Return true if the given entity has the given tag.
  *
  * @param {number} identifier - An entity identifier.
  * @param {string} tag - A tag to search for.
  *
  * @return {boolean} True if the given entity has the given tag.
  */
  doesEntityHasTag (identifier, tag) {
    return this._tags.has(tag) && this._entitiesByTag.get(tag).has(identifier)
  }

  /**
  * Add a tag to a given entity.
  *
  * @param {number} identifier - An entity identifier.
  * @param {string} tag - A tag to add to the given entity.
  *
  * @return {TagManager} The current manager instance for chaining purposes.
  */
  addTagToEntity (identifier, tag) {
    if (!this._tags.has(tag)) {
      this._tags.add(tag)
      this._entitiesByTag.set(tag, new Set())
    }

    if (!this._tagsByEntity.has(identifier)) {
      this._tagsByEntity.set(identifier, new Set())
    }

    this._entitiesByTag.get(tag).add(identifier)
    this._tagsByEntity.get(identifier).add(tag)

    return this
  }

  /**
  * Delete a tag from an entity.
  *
  * @param {number} identifier - An entity identifier.
  * @param {string} tag - A tag to delete from the given entity.
  *
  * @return {TagManager} The current manager instance for chaining purposes.
  */
  deleteTagOfEntity (identifier, tag) {
    if (this._tags.has(tag) && this._tagsByEntity.has(identifier)) {
      const relatedEntities = this._entitiesByTag.get(tag)
      const relatedTags = this._tagsByEntity.get(identifier)

      relatedEntities.delete(identifier)
      relatedTags.delete(tag)

      if (relatedEntities.size <= 0) {
        this._entitiesByTag.delete(tag)
        this._tags.delete(tag)
      }

      if (relatedTags.size <= 0) {
        this._tagsByEntity.delete(identifier)
      }
    }

    return this
  }

  /**
  * Return all entities with the given tag.
  *
  * @param {string} tag - A tag to search for.
  *
  * @return {Set<number>} A collection with all entities with the given tag.
  */
  getEntitiesWithTag (tag) {
    return this._entitiesByTag.get(tag) || EMPTY_SET
  }

  /**
  * Return all tags of a given entity.
  *
  * @param {number} identifier - An entity identifier to search for.
  *
  * @return {Set<string>} All tags of the given entity.
  */
  getTagsOfEntity (identifier) {
    return this._tagsByEntity.get(identifier) || EMPTY_SET
  }

  /**
  * Clone this manager.
  *
  * @return {TagManager} The instanciated clone.
  */
  clone () {
    const copy = new TagManager()

    for (const tag of this._tags) {
      for (const identifier of this.getEntitiesWithTag(tag)) {
        copy.addTagToEntity(identifier, tag)
      }
    }

    return copy
  }

  /**
  * Check if this manager is equal to another object instance.
  *
  * @param {any} other - Another object instance.
  *
  * @return {boolean} True if the given object instance is equal to this one.
  */
  equals (other) {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof TagManager) {
      if (other.tags.size !== this._tags.size) return false

      for (const tag of this._tags) {
        const thisEntities = this._entitiesByTag.get(tag)
        const otherEntities = other.getEntitiesWithTag(tag)

        if (thisEntities.size !== otherEntities.size) {
          return false
        }

        for (const entity of thisEntities) {
          if (!otherEntities.has(entity)) {
            return false
          }
        }
      }

      return true
    }

    return false
  }

  /**
  * Clear all tags attached to the given entity.
  *
  * @param {number} identifier - An entity identifier to search for.
  *
  * @return {TagManager} The current manager instance for chaining purposes.
  */
  clearTagsOfEntity (identifier) {
    if (this._tagsByEntity.has(identifier)) {
      for (const tag of this._tagsByEntity.get(identifier)) {
        this.deleteTagOfEntity(identifier, tag)
      }
    }

    return this
  }

  /**
  * Clear this manager of all of its content.
  *
  * @return {TagManager} The current manager instance for chaining purposes.
  */
  clear () {
    this._tags.clear()
    this._entitiesByTag.clear()
    this._tagsByEntity.clear()
  }
}
