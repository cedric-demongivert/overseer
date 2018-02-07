/**
* An error to throw when a method was invoked with an invalid parameter.
*/
export class InvalidParameterError extends Error {
  /**
  * Create a new InvalidParameterError.
  *
  * @param {string} name - The name of the invalid parameter.
  * @param {any} value - The value of the invalid parameter.
  * @param {string} message - A description message to add to the error.
  */
  constructor (name, value, message) {
    super(`InvalidParameterError (${name} = ${value}) : ${message}`)
    this._name = name
    this._value = value
    Error.captureStackTrace(this, InvalidParameterError)
  }

  /**
  * @return {string} The name of the invalid parameter.
  */
  get name () {
    return this._name
  }

  /**
  * @return {any} The value of the invalid parameter.
  */
  get value () {
    return this._value
  }
}
