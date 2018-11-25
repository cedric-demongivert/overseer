import { InvalidParameterError } from '@errors'
import { Identifier } from './Identifier'

/**
* An entity.
*
* Contains useful helpers in order to retrieve, query and delete entities.
*/
export class Entity {
  /**
  * Return an entity identifier.
  *
  * @param {Entity|Identifier} value - An entity or an entity identifier.
  *
  * @return {Identifier} An entity identifier.
  */
  static identifier (value) {
    if (value instanceof Entity) {
      return value._identifier
    } else if (Identifier.is(value)) {
      return value
    } else {
      throw new InvalidParameterError(
        'value', value,
        [
          `Unnable to fetch the identifier of '${value}', because `,
          `'${value}' is nor a valid identifier nor an entity.`
        ].join('')
      )
    }
  }

  /**
  * Create an entity and register it into a manager.
  *
  * @param {Manager} manager - The entity related manager.
  * @param {Identifier} [identifier=Identifier.create()] - The entity identifier.
  */
  constructor (manager, identifier) {
    this._identifier = identifier || Identifier.create()
    this._manager = manager
    if (!this._manager.hasEntity(this)) {
      this._manager.addEntity(this)
    }
  }

  /**
  * Return the entity identifier.
  *
  * @return {any} The entity identifier.
  */
  get identifier () {
    return this._identifier
  }

  /**
  * Return the related entity manager.
  *
  * @return {Manager} The related entity manager.
  */
  get manager () {
    return this._manager
  }

  /**
  * Check if this entity has a component of a particular type.
  *
  * @param {any} type - A component type.
  *
  * @return {boolean} True if this entity has any component of the given type.
  */
  has (type) {
    return this._manager.hasComponent(this._identifier, type)
  }

  /**
  * Return a component of a particular type.
  *
  * @param {any} type - A component type.
  *
  * @return {Component} The component of the given type, if exists.
  */
  get (type) {
    return this._manager.getComponent(this._identifier, type)
  }

  /**
  * Create a component of a particular type for this entity.
  *
  * @param {function} type - Type of the component to create.
  *
  * @return {Component} The created component.
  */
  create (type) {
    return this._manager.createComponent(this._identifier, type)
  }

  /**
  * Delete a component of a particular type attached to this entity.
  *
  * @param {function} type - Type of the component to delete.
  *
  * @return {Entity} The current entity instance for chaining purpose.
  */
  delete (type) {
    this._manager.deleteComponent(this._identifier, type)
    return this
  }

  /**
  * Iterate over all components of this entity.
  *
  * @return {Iterator<Component>} An iterator over all components of this entity.
  */
  * components () {
    yield * this._manager.componentsOf(this._identifier)
  }

  /**
  * @see Object#toString
  */
  toString () {
    return [
      'Entity {',
      `  identifier: ${this._identifier},`,
      `  manager: ${this._manager},`,
      '}'
    ].join('\n')
  }
}
