/**
* A generic Entity-Component-System (ECS) manager error.
*/
export class ManagerError extends Error {
  /**
  * Create a new generic Entity-Component-System (ECS) manager error.
  *
  * @param {Manager} manager - The Entity-Component-System (ECS) manager that throwed the error.
  * @param {string} message - The error message.
  */
  constructor (manager, message) {
    super(message)
    this._manager = manager
  }

  /**
  * Return the Entity-Component-System (ECS) manager that throwed the error.
  *
  * @return {Manager} The Entity-Component-System (ECS) manager that throwed the error.
  */
  get manager () {
    return this._manager
  }
}
