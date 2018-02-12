/**
* An error to throw when a method was unussualy invoked.
*/
export class InvalidInvocationError extends Error {
  /**
  * Create a new InvalidInvocationError.
  *
  * @param {function} method - The called method.
  * @param {string} message - A description message to add to the error.
  */
  constructor (method, message) {
    super(`InvalidCallError (${method.name}) : ${message}`)
    this._method = method
    Error.captureStackTrace(this, InvalidInvocationError)
  }

  /**
  * @return {function} The called method.
  */
  get method () {
    return this._method
  }
}
