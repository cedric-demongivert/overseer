import { ManagerError } from './ManagerError'

/**
* An error throwed when you duplicate a component identifier into a manager.
*/
export class DuplicatedComponentError extends ManagerError {
  /**
  * Create a new DuplicatedComponentError.
  *
  * @param {Manager} manager - The Entity-Component-System (ECS) manager that throwed the error.
  * @param {Component} component - The duplicated component.
  */
  constructor (manager, component) {
    super(manager, [
      `Unnable to add the component "${component}" into the manager `,
      `${manager.identifier} because the manager ${manager.identifier} `,
      `already have a component with the identifier "${component.identifier}".`
    ].join(''))
    this._component = component
  }

  /**
  * Return the duplicated component.
  *
  * @return {any} The duplicated component.
  */
  get component () {
    return this._component
  }
}
