/**
* A component type.
*/
export class ComponentType {
  /**
  * Create a new component type.
  *
  * @param {string} name - The name of the new component type.
  * @param {function} Class - The associated constructor of the new component type.
  */
  constructor (name, Class) {
    this._name = name
    this._Class = Class
  }

  /**
  * @return {string} The name of this component type.
  */
  get name () {
    return this._name
  }

  /**
  * @return {function} The constructor associated to this type.
  */
  get Class () {
    return this._Class
  }

  /**
  * @see Object#toString
  */
  toString () {
    return `${this._Class.name}@${this._name}`
  }
}
