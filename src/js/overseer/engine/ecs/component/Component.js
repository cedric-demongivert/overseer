import { Entity } from '../entity'

const $componentType = Symbol('componentType')

/**
* An engine component.
*/
export class Component {
  /**
  * Return a component type.
  *
  * @param {Component|any} component - A component instance, class or type.
  *
  * @return {any} A component type.
  */
  static typeof (component) {
    if (component instanceof Component) {
      return component.type
    } else if (typeof component === 'function' || typeof component === 'object') {
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
  constructor (manager, entity, identifier, clazz) {
    this._manager = manager
    this._entity = Entity.identifier(entity)
    this._identifier = identifier
    this._clazz = clazz
    this._data = Reflect.construct(clazz, [manager, entity])
    this._data.manager = manager
    this._data.entity = entity
    this._data.identifier = identifier
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
    return Component.typeof(this._clazz)
  }

  /**
  * Return the internal class of this component.
  *
  * @return {function} The internal class of this component.
  */
  get clazz () {
    return this._clazz
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
  * Change component data.
  *
  * @param {[...any]} params
  *
  * @return {Component} the current component instance for chaining purpose.
  */
  set (...params) {
    if (params.length === 1) {
      const [data] = params
      for (const key in data) {
        if (key in this._data) this._data[key] = data[key]
        else this._data.state[key] = data[key]
      }
    } else {
      const [name, value] = params
      if (name in this._data) this._data[name] = value
      else this._data.state[name] = value
    }

    this._version += 1

    return this
  }

  /**
  * Return some component data.
  *
  * @param {string} name - Entry key.
  *
  * @return {any} the value of the entry with the given key.
  */
  get (name) {
    if (name in this._data) {
      return this._data[name]
    } else {
      return this._data.state[name]
    }
  }

  /**
  * Return a serialized version of this component.
  *
  * @return {object} A serialized version of this component.
  */
  get data () {
    return {
      type: Component.typeof(this._clazz),
      version: this._version,
      identifier: this._identifier,
      entity: this._entity,
      state: this._data.state
    }
  }
}

Component.Type = function (type) {
  return function (BaseClass) {
    BaseClass.prototype[$componentType] = type
    BaseClass[$componentType] = type
    return BaseClass
  }
}
