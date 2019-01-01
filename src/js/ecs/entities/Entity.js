/**
* An entity.
*
* Contains useful helpers in order to retrieve, query and delete entities.
*/
export class Entity {
  /**
  * Create an entity and register it into a manager.
  *
  * @param {EntityComponentSystem} manager - The entity related manager.
  * @param {number} identifier - The entity identifier.
  */
  constructor (manager, identifier) {
    this._identifier = identifier
    this._manager = manager

    if (!this._manager.hasEntity(identifier)) {
      this._manager.addEntity(identifier)
    }
  }

  /**
  * Return the entity identifier.
  *
  * @return {number} The entity identifier.
  */
  get identifier () {
    return this._identifier
  }

  /**
  * Return the related entity manager.
  *
  * @return {EntityComponentSystem} The related entity manager.
  */
  get manager () {
    return this._manager
  }

  /**
  * Check if this entity has a component of a particular type.
  *
  * @param {function} type - A component type.
  *
  * @return {boolean} True if this entity has any component of the given type.
  */
  has (type) {
    return this._manager.hasComponent(this._identifier, type)
  }

  /**
  * Return a component of a particular type.
  *
  * @param {function} type - A component type.
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
  create (type, ...parameters) {
    this._manager.createComponent(this._identifier, type, ...parameters)
    return this._manager.getComponent(this._identifier, type)
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

  tag (tag) {
    this._manager.tagEntity(this._identifier, tag)
  }

  untag (tag) {
    this._manager.untagEntity(this._identifier, tag)
  }

  get tags () {
    return this._manager.getTagsOfEntity(this._identifier)
  }

  /**
  * Return all components of this entity.
  *
  * @return {Set<Component>} All components of this entity.
  */
  get components () {
    return this._manager.componentsOf(this._identifier)
  }

  /**
  * @see Object#toString
  */
  toString () {
    return `Entity ${this._identifier}`
  }
}
