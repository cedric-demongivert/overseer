import { InvalidParameterError } from '@errors'

import { Identifier } from './Identifier'
import { Index } from './_Index'

/**
* @typedef {{ identifier: Identifier, tags: Set<string>, name: string }} Entity
*/

const DEFAULT_NAME = 'unnamed entity'

export class EntityCollection {
  /**
  * Create a new entity collection.
  *
  * @param {Iterable<Entity>|Iterable<Identifier>} [toCopy] - A collection of entity to copy.
  */
  constructor (toCopy) {
    this._entities = new Map()
    this._entitiesByTag = new Index()
    this._entitiesByName = new Index()

    if (toCopy) {
      for (const entity of toCopy) {
        this.insert(entity)
      }
    }
  }

  /**
  * Create a new entity into this collection.
  *
  * @return {Identifier} The identifier of the created entity.
  */
  create () {
    const identifier = Identifier.create()
    this._create(identifier)
    return identifier
  }

  /**
  * Insert an entity into this collection.
  *
  * @param {Identifier|Entity} entity - An entity to insert into this collection.
  *
  * @return {EntityCollection} The current entity collection instance for chaining purpose.
  */
  insert (entity) {
    if (typeof entity === 'object') {
      this._assertIdentifierIsValidForInsertion(entity.identifier)
      this._create(entity.identifier)

      if (entity.name) this.setNameOf(entity.identifier, entity.name)
      if (entity.tags) this.addTagsTo(entity, entity.tags)
    } else {
      this._assertIdentifierIsValidForInsertion(entity)
      this._create(entity)
    }

    return this
  }

  /**
  * Delete an entity of this collection.
  *
  * @param {Identifier} identifier - The identifier of the entity to delete.
  *
  * @return {EntityCollection} The current entity collection instance for chaining purpose.
  */
  delete (identifier) {
    const entity = this._entities.get(identifier)

    if (entity) {
      this._entities.delete(identifier)
      this._entitiesByName.delete(entity.name, identifier)

      for (const tag of entity.tags) {
        this._entitiesByTag.delete(tag, identifier)
      }
    }

    return this
  }

  /**
  * Assert that an identifier is valid for an entity insertion.
  *
  * @param {Identifier} identifier - An identifier to check.
  */
  _assertIdentifierIsValidForInsertion (identifier) {
    if (!Identifier.is(identifier)) {
      throw new InvalidParameterError(
        'identifier', identifier,
        [
          `Unnable to insert the entity "${identifier}" into this collection `,
          `because "${identifier}" is not a valid identifier.`
        ].join('')
      )
    }
  }

  /**
  * Create a new entity into this collection.
  *
  * @param {Identifier} identifier - The identifier of the entity to create.
  *
  * @return {EntityCollection} The current collection instance for chaining purpose.
  */
  _create (identifier) {
    this._entities.set(identifier, {
      identifier,
      tags: new Set(),
      name: DEFAULT_NAME
    })

    this._entitiesByName.add(DEFAULT_NAME, identifier)

    return this
  }

  /**
  * Return the name of an entity.
  *
  * @param {Identifier} identifier - The identifier of the entity to fetch.
  *
  * @return {string} The given entity name.
  */
  getNameOf (identifier) {
    const entity = this._entities.get(identifier)
    return (entity) ? entity.name : undefined
  }

  /**
  * Return the set of tags of an entity.
  *
  * @param {Identifier} identifier - The identifier of the entity to fetch.
  *
  * @return {Set<string>} A set of tags assigned to the given entity.
  */
  getTagsOf (identifier) {
    const entity = this._entities.get(identifier)
    return (entity) ? new Set(entity.tags) : undefined
  }

  /**
  * Return an iterator over each tags of an entity.
  *
  * @param {Identifier} identifier - The identifier of the entity to fetch.
  *
  * @return {Iterator<string>} An iterator over each tags of the given entity.
  */
  * tags (identifier) {
    const entity = this._entities.get(identifier)

    if (entity) {
      yield * entity.tags
    }
  }

  /**
  * Change the name of an entity.
  *
  * @param {Identifier} identifier - An entity identifier.
  * @param {string} newName - The new name of the given entity.
  *
  * @return {EntityCollection} The current collection instance for chaining purpose.
  */
  setNameOf (identifier, newName) {
    const entity = this._entities.get(identifier)

    if (entity && entity.name !== newName) {
      this._entitiesByName.delete(entity.name, identifier)
      entity.name = newName
      this._entitiesByName.add(entity.name, identifier)
    }

    return this
  }

  /**
  * Add tags to an entity.
  *
  * @param {Identifier} identifier - An entity identifier.
  * @param {Iterable<string>} tags - New tags to add to the given entity.
  *
  * @return {EntityCollection} The current collection instance for chaining purpose.
  */
  addTagsTo (identifier, tags) {
    const entity = this._entities.get(identifier)

    if (entity) {
      for (const tag of tags) {
        entity.tags.add(tag)

        this._entitiesByTag.add(tag, identifier)
      }
    }

    return this
  }

  /**
  * Delete tags of an entity.
  *
  * @param {Identifier} identifier - An entity identifier.
  * @param {Iterable<string>} tags - Tags to delete of the given entity.
  *
  * @return {EntityCollection} The current collection instance for chaining purpose.
  */
  deleteTagsOf (identifier, tags) {
    const entity = this._entities.get(identifier)

    if (entity) {
      for (const tag of tags) {
        entity.tags.delete(tag)

        this._entitiesByTag.delete(tag, identifier)
      }
    }

    return this
  }

  /**
  * Delete all tags of an entity.
  *
  * @param {Identifier} identifier - An entity identifier.
  *
  * @return {EntityCollection} The current collection instance for chaining purpose.
  */
  clearTagsOf (identifier) {
    const entity = this._entities.get(identifier)

    if (entity) {
      for (const tag of entity.tags) {
        this._entitiesByTag.delete(tag, identifier)
      }
      entity.tags.clear()
    }

    return this
  }

  /**
  * Check if an identifier exists in this entity collection.
  *
  * @param {string} identifier
  *
  * @return {boolean}
  */
  has (entity) {

  }

  /**
  * @return {number} The size of this entity collection.
  */
  get size () {
    return this._entities.size
  }

  /**
  * Iterate over all entities of this collection.
  *
  * @return {Iterable<Identifier>}
  */
  * [Symbol.iterator] () {
    yield * this._entities.keys()
  }
}
