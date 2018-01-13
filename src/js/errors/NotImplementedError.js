const MATCH_SETTER = /^\s*set\s+(.*)$/i
const MATCH_GETTER = /^\s*get\s+(.*)$/i
const MATCH_METHOD = /^\s*(get\s+|set\s+)?(.*?)\s*$/i

/**
* An error to thrown when a mother-class (abstract) method is not implemented
* one of its child-class.
*/
export class NotImplementedError extends Error {
  /**
  * Create a NotImplementedError.
  *
  * @param {function} clazz - The class that thrown the error.
  * @param {string} method - The unimplemented method.
  */
  constructor (clazz, method) {
    super(NotImplementedError.createMessageFor(clazz, method))
    this._clazz = clazz
    this._method = method
    Error.captureStackTrace(this, NotImplementedError)
  }

  /**
  * Return the class at the origin of this error.
  *
  * @return {function} The class at the origin of this error.
  */
  get clazz () {
    return this._clazz
  }

  /**
  * Return the full identifier of the method at the origin of this error.
  *
  * @return {string} The  full identifier of the method at the origin of this error.
  */
  get method () {
    return this._method
  }

  /**
  * Return the name of the method at the origin of this error.
  *
  * @return {string} The name of the method at the origin of this error.
  */
  get methodName () {
    return NotImplementedError.getName(this._method)
  }

  /**
  * Return true if the method at the origin of this error is a getter.
  *
  * @return {boolean} True if the method at the origin of this error is a getter.
  */
  get isGetter () {
    return NotImplementedError.isGetter(this._method)
  }

  /**
  * Return true if the method at the origin of this error is a setter.
  *
  * @return {boolean} True if the method at the origin of this error is a setter.
  */
  get isSetter () {
    return NotImplementedError.isSetter(this._method)
  }

  /**
  * Return the NotImplementedError message for a couple of class / method.
  *
  * @param {function} clazz - The class that thrown the error.
  * @param {string} method - The unimplemented method.
  */
  static createMessageFor (clazz, method) {
    const name = NotImplementedError.getName(method)

    if (NotImplementedError.isGetter(method)) {
      return [
        `Unnable to execute the method ${clazz.name}#get ${name} because the `,
        `method ${clazz.name}#get ${name} is abstract and must be implemented `,
        'by a child class. Please refer yourself to the API documentation.'
      ].join('')
    } else if (NotImplementedError.isSetter(method)) {
      return [
        `Unnable to execute the method ${clazz.name}#set ${name} because the `,
        `method ${clazz.name}#set ${name} is abstract and must be implemented `,
        'by a child class. Please refer yourself to the API documentation.'
      ].join('')
    } else {
      return [
        `Unnable to execute the method ${clazz.name}#${name} because the `,
        `method ${clazz.name}#${name} is abstract and must be implemented `,
        'by a child class. Please refer yourself to the API documentation.'
      ].join('')
    }
  }

  /**
  * Return true if the method is a setter.
  *
  * @param {string} method - Method to check.
  *
  * @return {boolean} True if the method is a setter.
  */
  static isSetter (method) {
    return MATCH_SETTER.test(method)
  }

  /**
  * Return true if the method is a getter.
  *
  * @param {string} method - Method to check.
  *
  * @return {boolean} True if the method is a getter.
  */
  static isGetter (method) {
    return MATCH_GETTER.test(method)
  }

  /**
  * Return a method name.
  *
  * @param {string} method - Full method identifier.
  *
  * @return {string} The method name.
  */
  static getName (method) {
    return MATCH_METHOD.exec(method)[2]
  }
}
