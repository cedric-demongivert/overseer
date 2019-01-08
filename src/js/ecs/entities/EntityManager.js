import { TagManager } from './TagManager'
import { LabelManager } from './LabelManager'

/**
* A collection of entities.
*/
export class EntityManager {
  /**
  * Create an empty collection of entities.
  */
  constructor () {
    this._entities = new Set()
    this._tags = new TagManager()
    this._labels = new LabelManager()
  }

  /**
  * @return {Set<number>} All managed entities as a set.
  */
  get entities () {
    return this._entities
  }

  /**
  * @return {Set<string>} All registered tags as a set.
  */
  get tags () {
    return this._tags.tags
  }

  /**
  * @return {Set<string>} All registered labels.
  */
  get labels () {
    return this._labels.labels
  }

  /**
  * Register a new entity.
  *
  * @throws {Error} If the given entity was already registered.
  *
  * @param {number} entity - An entity to register.
  *
  * @return {EntityManager} The current instance for chaining purpose.
  */
  registerEntity (entity) {
    if (this._entities.has(entity)) {
      throw new Error([
        `Unable to register the entity : ${entity}, because this entity was `,
        'already registered.'
      ].join(''))
    }

    this._entities.add(entity)

    return this
  }

  /**
  * Check if an entity was registered.
  *
  * @param {number} entity - An entity to search.
  *
  * @return {boolean} True if the given entity was registered.
  */
  hasEntity (entity) {
    return this._entities.has(entity)
  }

  /**
  * Delete a managed entity.
  *
  * @param {number} entity - An entity to delete.
  *
  * @return {EntityManager} The current instance for chaining purpose.
  */
  deleteEntity (entity) {
    this.assertThatEntityWasRegistered(entity, `Unable to delete the entity ${entity}`)

    this._entities.delete(entity)
    this._tags.clearTagsOfEntity(entity)
    this._labels.deleteLabelOfEntity(entity)

    return this
  }

  /**
  * Assert that the given entity was registered into this manager.
  *
  * This method will check if the given entity was already registered by a
  * previous call of the register method. If the given entity was not registered
  * yet, this method will throw an error with the given message followed by
  * the sentance 'because the entity ${entity} does not exists.'
  *
  * @param {number} entity - The identifier of the entity to search.
  * @param {string} message - A message to return if the given entity was not registered into this manager.
  *
  * @throws {Error} If the given entity was not registered into this manager.
  */
  assertThatEntityWasRegistered (entity, message) {
    if (!this._entities.has(entity)) {
      throw new Error(
        `${message} because the entity ${entity} was not registered.`
      )
    }
  }

  /**
  * Check if a given entity has a given tag.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} entity - An entity identifier.
  * @param {string} tag - A tag to search for.
  *
  * @return {boolean} True if the given entity has the given tag.
  */
  doesEntityHasTag (entity, tag) {
    this.assertThatEntityWasRegistered(entity, `Unable to check if the entity ${entity} has the tag "${tag}"`)
    return this._tags.doesEntityHasTag(entity, tag)
  }

  /**
  * Add a Tag to a given entity.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} entity - An entity to tag.
  * @param {string} tag - A tag.
  *
  * @return {EntityManager} The current instance for chaining purpose.
  */
  addTagToEntity (entity, tag) {
    this.assertThatEntityWasRegistered(entity, `Unable to tag the entity ${entity} with "${tag}"`)

    this._tags.addTagToEntity(entity, tag)

    return this
  }

  /**
  * Delete a tag from a given entity.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} entity - An entity from wich we will delete a tag.
  * @param {string} tag - A tag.
  *
  * @return {EntityManager} The current instance for chaining purpose.
  */
  deleteTagOfEntity (entity, tag) {
    this.assertThatEntityWasRegistered(entity, `Unable to remove the tag "${tag}" from entity ${entity}`)

    this._tags.deleteTagOfEntity(entity, tag)

    return this
  }

  /**
  * Return all entities with the given tag.
  *
  * @param {string} tag - A tag to search for.
  *
  * @return {Set<number>} All registered entities with the given tag.
  */
  getEntitiesWithTag (tag) {
    return this._tags.getEntitiesWithTag(tag)
  }

  /**
  * Return all tags of a given entity.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} identifier - An entity identifier to search for.
  *
  * @return {Set<string>} All tags of the given entity.
  */
  getTagsOfEntity (identifier) {
    this.assertThatEntityWasRegistered(entity, `Unable to fetch tags of entity ${identifier}`)

    return this._tags.getTagsOfEntity(identifier)
  }

  /**
  * Delete all tags of a given entity.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} identifier - The identifier of an entity from wich we will delete all attached tag.
  *
  * @return {EntityManager} The current instance for chaining purpose.
  */
  clearTagsOfEntity (identifier) {
    this.assertThatEntityWasRegistered(entity, `Unable to clear tags of entity ${identifier}`)

    this._tags.clearTagsOfEntity(identifier)

    return this
  }

  /**
  * Clear all tags of the manager.
  *
  * @return {EntityManager} The current instance for chaining purpose.
  */
  clearTags () {
    this._tags.clear()

    return this
  }

  /**
  * Change the label of an entity.
  *
  *
  * @param {number} entity - An entity to rename.
  * @param {string} label - The new name of the given entity.
  *
  * @return {EntityManager} The current manager instance for chaining purposes.
  */
  setLabelOfEntity (entity, label) {
    this.assertThatEntityWasRegistered(entity, `Unable to rename the entity ${entity} to "${label}"`)

    this._labels.setLabelOfEntity(entity, label)

    return this
  }

  /**
  * Return the label of a given entity.
  *
  * @param {number} entity - An entity to find.
  *
  * @return {string} The label of the given entity.
  */
  getLabelOfEntity (entity) {
    this.assertThatEntityWasRegistered(entity, `Unable to get the label of the entity ${entity}`)

    return this._labels.getLabelOfEntity(entity)
  }

  /**
  * Return all entities with a given label.
  *
  * @param {string} label - A label to search for.
  *
  * @return {Set<number>} All registered entities with the given label.
  */
  getEntitiesWithLabel (label) {
    return this._labels.getEntitiesWithLabel(label)
  }

  /**
  * Compare this object instance with another value and return true if they are both equals.
  *
  * @param {any} other - Another object instance to use as a comparison.
  *
  * @return {boolean} True if this object is equal to the other one.
  */
  equals (other) {
    if (other == null) return false
    if (other == this) return true

    if (other instanceof EntityManager) {
      if (other.entities.size !== this._entities.size) return false

      for (const entity of this._entities) {
        if (!other.hasEntity(entity)) return false
      }

      if (!other._labels.equals(this._labels)) return false
      if (!other._tags.equals(this._tags)) return false

      return true
    }

    return false
  }

  /**
  * Clear this entity manager of its content.
  *
  * @return {EntityManager} This manager instance for chaining purposes.
  */
  clear () {
    this._entities.clear()
    this._tags.clear()
    this._labels.clear()

    return this
  }
}
