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
}
