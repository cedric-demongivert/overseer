import { Entity } from '../entity'

const $componentType = Symbol('componentType')

function Type (type) {
  return function (BaseClass) {
    BaseClass.prototype[$componentType] = type
    BaseClass[$componentType] = type
    return BaseClass
  }
}

/**
* An engine component.
*/
@Type('component')
export class Component {
  /**
  * Return a component type.
  *
  * @param {Component|any} component - A component instance, class or type.
  *
  * @return {any} A component type.
  */
  static typeof (component) {
    if (component && component[$componentType]) {
      return component[$componentType]
    } else {
      return component
    }
  }

  /**
  * Return a component identifier.
  *
  * @param {Component|any} component - A component instance or a component identifier.
  *
  * @return {any} A component identifier.
  */
  static identifier (component) {
    return (component.identifier) ? component.identifier : component
  }

  /**
  * Create a new empty component.
  *
  * @param {Manager} manager - The manager that will hold the new created component.
  * @param {Entity|any} entity - The parent entity identifier for this component.
  * @param {any} identifier - The current component identifier.
  * @param {function} clazz - The current component implementation.
  */
  constructor (manager, entity, identifier) {
    this._manager = manager
    this._entity = Entity.identifier(entity)
    this._identifier = identifier
    this._state = this.initialize()
    this._version = 0

    this._manager.addComponent(this)
  }

  /**
  * @return {number} the current version number of this component.
  */
  get version () {
    return this._version
  }

  /**
  * Return the identifier of this component.
  *
  * @return {string} The identifier of this component.
  */
  get identifier () {
    return this._identifier
  }

  /**
  * Return the type of this component.
  *
  * @return {any} The type of this component.
  */
  get type () {
    return Component.typeof(this)
  }

  /**
  * Return the internal class of this component.
  *
  * @return {function} The internal class of this component.
  */
  get clazz () {
    return Reflect.getPrototypeOf(this).constructor
  }

  /**
  * Return the manager of this component.
  *
  * @return {Manager} The manager of this component.
  */
  get manager () {
    return this._manager
  }

  /**
  * Return the parent entity identifier of this component.
  *
  * @return {any} The identifier of the parent entity of this component.
  */
  get entity () {
    return this._entity
  }

  /**
  * Return the current state of this component.
  *
  * @return {object} The current state of this component.
  */
  get state () {
    return this._state
  }

  /**
  * Replace the current state of this component.
  *
  * @param {object} newState - The new state of this component.
  */
  set state (newState) {
    this._state = Object.assign({}, newState)
    this._version += 1
  }

  /**
  * Initialize the state of this component.
  *
  * @return {object} Base state of this component.
  */
  initialize () {
    return {}
  }

  /**
  * Notify a component update.
  *
  * @return {Component} The current component instance for chaining purpose.
  */
  markUpdate () {
    this._version += 1
    return this
  }

  /**
  * Return a serialized version of this component.
  *
  * @return {object} A serialized version of this component.
  */
  serialize () {
    return {
      type: Component.typeof(this),
      version: this._version,
      identifier: this._identifier,
      entity: this._entity,
      state: this._state
    }
  }
}

Component.Type = Type
