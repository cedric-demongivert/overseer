import { Entity } from './Entity'
import uuid from 'uuid/v4'

/**
* A universal unique id v4 based entity.
*/
export class UUIDv4Entity extends Entity {
  /**
  * Return a new UUIDv4 entity identifier for a manager.
  *
  * @param {Manager} manager - The Entity-Component-System manager to use in order to create a new entity.
  *
  * @return {string} A new entity identifier for the given manager.
  */
  static next (manager) {
    let next
    while (manager.hasEntity(next = uuid()));
    return next
  }

  /**
  * Create an UUIDv4 entity into a manager and return the new identifier.
  *
  * @param {Manager} manager - The Entity-Component-System manager that will hold the new created entity.
  *
  * @return {string} The new entity identifier.
  */
  static create (manager) {
    const next = UUIDv4Entity.next(manager)
    manager.addEntity(next)
    return next
  }

  /**
  * Construct a new UUIDv4 entity into a manager.
  *
  * @param {Manager} manager - The Entity-Component-System manager that will hold the new created entity.
  */
  constructor (manager) {
    super(manager, UUIDv4Entity.next(manager))
  }
}
