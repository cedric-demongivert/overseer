import { ManagerError } from './ManagerError'

/**
* An error throwed when you try to add a component instanciated for another manager.
*/
export class InvalidComponentManagerError extends ManagerError {
  /**
  * Create a new InvalidComponentManagerError.
  *
  * @param {Manager} manager - The Entity-Component-System (ECS) manager that throwed the error.
  * @param {Component} component - The component in error.
  */
  constructor (manager, component) {
    super(manager, [
      `Unnable to add the component "${component}" to the manager `,
      `${manager.identifier} because the manager component ${component} `,
      `was instanciated for the manager ${component.manager.identifier}.`
    ].join(''))
    this._component = component
  }

  /**
  * Return the invalid component.
  *
  * @return {any} The invalid component.
  */
  get component () {
    return this._component
  }
}
