import uuid from 'uuid/v4'
import { Component } from './Component'

/**
* An universal unique id v4 based component.
*/
export class UUIDv4Component extends Component {
  /**
  * Return a new UUIDv4 component identifier for a manager.
  *
  * @param {Manager} manager - The Entity-Component-System manager to use in order to create a new component.
  *
  * @return {string} A new component identifier for the given manager.
  */
  static next (manager) {
    let next
    while (manager.hasComponent(next = uuid()));
    return next
  }

  /**
  * Construct a new UUIDv4 component into a manager.
  *
  * @param {Manager} manager - The manager that will hold the new created component.
  * @param {any} entity - The parent entity identifier for this component.
  * @param {function} clazz - The current component implementation.
  */
  constructor (manager, entity, clazz) {
    super(
      manager,
      entity,
      UUIDv4Component.next(manager),
      clazz
    )
  }
}
