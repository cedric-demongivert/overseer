import { InvalidParameterError } from '@errors'

import { ComponentHandler } from './ComponentHandler'
import { Entity } from './Entity'
import { Identifier } from './Identifier'

const _manager = Symbol('Component#_manager')
const _version = Symbol('Component#_version')
const _identifier = Symbol('Component#_identifier')
const _entity = Symbol('Component#_entity')
const _isComponent = Symbol('Component#_isComponent')
const _wrap = Symbol('Component#_wrap')
const _added = Symbol('Component#_added')
const _type = Symbol('Component#_type')
const _constructorIdentifier = Symbol('Component#_constructorIdentifier')

const CONSTRUCTORS = new Map()

function define (Class, name, value) {
  Object.defineProperty(Class, name, {
    value,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

function rename (Class, name) {
  Object.defineProperty(
    Class, 'name', { writable: true, value: name }
  )
}

function _reherit (BaseClass, SuperClass) {
  BaseClass.prototype = Object.create(
    SuperClass && SuperClass.prototype,
    Object.getOwnPropertyDescriptors(BaseClass.prototype)
  )

  Object.setPrototypeOf ? Object.setPrototypeOf(BaseClass, SuperClass)
                        : BaseClass.__proto__ = SuperClass

  return BaseClass
}

/**
* Remove wrapper class from a class inheritance chain.
*
* @param {function} Class - A class to mutate.
*
* @return {function} A class without any wrappers in its inheritance chain.
*/
function unwrap (Class) {
  // unwrapped class.
  if (Class[_wrap] == null) return Class

  // wrapping information.
  const [ WrapClass, RawClass ] = Class[_wrap]

  // the given class is the wrapper.
  if (Class === WrapClass) return RawClass

  const classes = [Object.getPrototypeOf(Class), Class]

  while (classes[0]) {
    if (classes[0] === WrapClass) {
      _reherit(classes[1], RawClass)
      classes.shift()

      while(classes.length > 1) {
        _reherit(classes[1], classes[0])
        classes.shift()
      }

      return Class
    } else {
      delete classes[0][_wrap]
    }

    classes.unshift(Object.getPrototypeOf(classes[0]))
  }

  return Class
}

/**
* Insert the component mixin into the prototype chain of a Class.
*
* @param {function} Class - A class to mutate.
*
* @return {function} A class with the component mixin into its prototype chain.
*/
function mix (Class) {
  const ParentClass = Object.getPrototypeOf(Class)

  class Mixed {
    /**
    * @return {boolean} True if the component was destroyed.
    */
    get destroyed () {
      return this[_added] && !this[_manager].hasComponent(this)
    }

    /**
    * @return {number} the current version number of this component.
    */
    get version () {
      return this[_version]
    }

    /**
    * Return the identifier of this component.
    *
    * @return {Identifier} The identifier of this component.
    */
    get identifier () {
      return this[_identifier]
    }

    /**
    * Return the type of this component.
    *
    * @return {string} The type of this component.
    */
    get type () {
      return Component.typeof(this)
    }

    /**
    * Return the parent Entity-Component-System manager of this component.
    *
    * @return {Manager} The parent Entity-Component-System manager of this component.
    */
    get manager () {
      return this[_manager]
    }

    /**
    * Return the parent entity identifier of this component.
    *
    * @return {Identifier} The identifier of the parent entity of this component.
    */
    get entity () {
      return this[_entity]
    }

    /**
    * Initialize this component.
    */
    initialize () { }

    /**
    * Notify a component update.
    *
    * @return {Component} The current component instance for chaining purpose.
    */
    touch () {
      this[_version] += 1
      return this
    }

    /**
    * Destroy this component.
    */
    destroy () {
      this[_manager].destroy(this)
    }

    /**
    * Return a serialized version of this component.
    *
    * @return {object} A serialized version of this component.
    */
    serialize () {
      return {
        type: Component.typeof(this),
        constructorIdentifier: Component.constructorIdentifier(this),
        version: this.version,
        identifier: this.identifier,
        entity: this.entity,
        state: this.state
      }
    }
  }

  rename(Mixed, `@Component`)

  if (ParentClass !== Function.prototype && ParentClass !== null) {
    _reherit(Mixed, ParentClass)
  }

  define(Mixed, _isComponent, true)
  define(Class, _isComponent, true)

  return _reherit(Class, Mixed)
}

/**
* Wrap a class into a component definition.
*
* @param {object} configuration - Component configuration.
*/
export function Component ({ type, constructorIdentifier }) {
  return function (Class) {
    // Generate a constructor ID if no ID was defined by the user.
    if (constructorIdentifier == null) constructorIdentifier = btoa(`${type}::${Class.name}`)

    // Mix or unwrap the current constructor.
    if (!Component.is(Class)) {
      Class = mix(Class)
    } else {
      Class = unwrap(Class)
    }

    // Create a register constructor.
    class Result extends Class {
      /**
      * Initialize, register and wrap the current component.
      *
      * @param {Manager} manager - The parent manager of this component.
      * @param {Entity|Identifier} entity - The parent entity of this component.
      * @param {Identifier} [identifier] - The identifier of this component.
      */
      constructor (manager, entity, identifier, ...params) {
        super(...params)
        this[_manager] = manager
        this[_entity] = Entity.identifier(entity)
        this[_identifier] = identifier || Identifier.create()
        this[_version] = 0
        this[_added] = false

        const proxy = new Proxy(this, ComponentHandler)
        this[_manager].addComponent(proxy)
        this[_added] = true

        proxy.initialize()
        return proxy
      }
    }

    define(Result, _isComponent, true)
    define(Result, _wrap, [Result, Class])
    define(Result, _type, type)
    define(Result, _constructorIdentifier, constructorIdentifier)

    rename(Result, `@Register(${Class.name})`)

    if (CONSTRUCTORS.has(constructorIdentifier)) {
      throw new InvalidParameterError(
        'configuration.constructorIdentifier', constructorIdentifier,
        [
          'The given, or generated constructorIdentifier already exists in ',
          'the current constructor database.'
        ].join('')
      )
    } else {
      CONSTRUCTORS.set(constructorIdentifier, Result)
    }

    return Result
  }
}

/**
* Check if a value is a component.
*
* @param {function|any} component - A class or any other value.
*
* @return {boolean} True if the value is a component instance, or the class a component class.
*/
Component.is = function (component) {
  if (typeof component === 'function') {
    return component[_isComponent] || false
  } else {
    return component.constructor[_isComponent] || false
  }
}

/**
* Return a component type.
*
* @param {function|Component} component - A component class or instance.
*
* @return {string} The type of the given component class or instance.
*/
Component.typeof = function (component) {
  if (typeof component === 'function') {
    return component[_type]
  } else if (component.constructor[_isComponent]) {
    return component.constructor[_type]
  } else {
    throw new InvalidParameterError(
      'component', component,
      'The given value is nor a component nor a class.'
    )
  }
}

/**
* Return a component constructor identifier.
*
* @param {function|Component} component - A component class or instance.
*
* @return {string} The constructor identifier of the given component class or instance.
*/
Component.constructorIdentifier = function (component) {
  if (typeof component === 'function') {
    return component[_constructorIdentifier]
  } else if (component.constructor[_isComponent]) {
    return component.constructor[_constructorIdentifier]
  } else {
    throw new InvalidParameterError(
      'component', component,
      'The given value is nor a component nor a class.'
    )
  }
}

/**
* Return a component constructor from a component instance, class or a constructor identifier.
*
* @param {function|Component|string} component - A component instance, class or a constructor identifier.
*
* @return {function} A constructor for the given value.
*/
Component.constructor = function (component) {
  if (typeof component === 'string') {
    return CONSTRUCTORS.get(component)
  } else if (typeof component === 'function') {
    return CONSTRUCTORS.get(component[_constructorIdentifier])
  } else if (component.constructor[_isComponent]) {
    return CONSTRUCTORS.get(
      component.constructor[_constructorIdentifier]
    )
  } else {
    throw new InvalidParameterError(
      'component', component,
      [
        'The given value is not a component, not a class and not a ',
        'constructor identifier.'
      ].join('')
    )
  }
}

/**
* Return a component identifier.
*
* @param {Component|Identifier} value - A component or a component identifier.
*
* @return {Identifier} A component identifier.
*/
Component.identifier = function (value) {
  if (value && value.constructor[_isComponent]) {
    return value.identifier
  } else if (Identifier.is(value)) {
    return value
  } else {
    throw new InvalidParameterError(
      'value', value,
      [
        `Unnable to fetch the identifier of '${value}', because `,
        `'${value}' is nor a valid identifier, nor a component.`
      ].join('')
    )
  }
}
