import { ManagerError } from './ManagerError'

/**
* An error throwed when you duplicate an entity into a manager.
*/
export class DuplicatedEntityError extends ManagerError {
  /**
  * Create a new DuplicatedEntityError.
  *
  * @param {Manager} manager - The Entity-Component-System (ECS) manager that throwed the error.
  * @param {any} entity - The duplicated entity.
  */
  constructor (manager, entity) {
    super(manager, [
      `Unnable to add the entity "${entity}" into the manager `,
      `${manager.identifier} because the manager ${manager.identifier} `,
      `already have an entity "${entity}".`
    ].join(''))
    this._entity = entity
  }

  /**
  * Return the duplicated entity.
  *
  * @return {any} The duplicated entity.
  */
  get entity () {
    return this._entity
  }
}
