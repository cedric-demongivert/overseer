/**
* A collection of entities.
*/
export class EntityManager {
  /**
  * Create an empty collection of entities.
  */
  constructor () {
    this._entities = new Set()
    this._tags = new Set()
    this._entitiesByTag = new Map()
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
    return this._tags
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
  register (entity) {
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
  * Tag a given entity.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} entity - An entity to tag.
  * @param {string} tag - A tag.
  *
  * @return {EntityManager} The current instance for chaining purpose.
  */
  tag (entity, tag) {
    if (!this._entities.has(entity)) {
      throw new Error([
        `Unable to tag the entity : ${entity} because the given entity was `,
        'not registered.'
      ].join(''))
    }

    if (!this._tags.has(tag)) {
      this._entitiesByTag.set(tag, new Set())
      this._tags.add(tag)
    }

    this._entitiesByTag.get(tag).add(entity)

    return this
  }

  /**
  * Remove a tag from a given entity.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} entity - An entity to untag.
  * @param {string} tag - A tag.
  *
  * @return {EntityManager} The current instance for chaining purpose.
  */
  untag (entity, value) {
    if (!this._entities.has(entity)) {
      throw new Error([
        `Unable to untag the entity : ${entity} because the given entity was `,
        'not registered.'
      ].join(''))
    }

    this._entitiesByTag.get(tag).delete(entity)

    if (this._entitiesByTag.get(tag).size < 0) {
      this._entitiesByTag.delete(tag)
      this._tags.delete(tag)
    }

    return this
  }

  /**
  * Check if an entity was registered.
  *
  * @param {number} entity - An entity to search.
  *
  * @return {boolean} True if the given entity was registered.
  */
  has (entity) {
    return this._entities.has(entity)
  }

  /**
  * Delete a managed entity.
  *
  * @param {number} entity - An entity to delete.
  *
  * @return {EntityManager} The current instance for chaining purpose.
  */
  delete (entity) {
    if (!this._entities.has(entity)) {
      throw new Error([
        `Unable to delete the entity : ${entity}, because this entity was not `,
        'registered.'
      ].join(''))
    }

    this._entities.delete(entity)

    for (const tag of this._tags) {
      this._entitiesByTag.get(tag).delete(entity)
      if (this._entitiesByTag.get(tag).size < 0) {
        this._entitiesByTag.delete(tag)
      }
    }

    return this
  }
}
