/**
* An Entity-Component-System (ECS) entity.
*
* Contains useful helpers in order to retrieve, query and delete entities.
*/
export class Entity {
  /**
  * Return an entity identifier.
  *
  * @param {Entity|any} entity - An entity or an entity identifier.
  *
  * @return {any} An entity identifier.
  */
  static identifier (entity) {
    return (entity instanceof Entity) ? entity.identifier : entity
  }

  /**
  * Create an entity and register it into a manager.
  *
  * @param {Manager} manager - The entity related manager.
  * @param {any} identifier - The entity identifier.
  */
  constructor (manager, identifier) {
    this._identifier = identifier
    this._manager = manager
    this._manager.addEntity(this)
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
}
