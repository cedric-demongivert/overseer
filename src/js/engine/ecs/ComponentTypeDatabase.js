const EMPTY_SET = new Set()

/**
* A component type database.
*/
export class ComponentTypeDatabase {
  /**
  * Create a new empty component type database.
  */
  constructor () {
    this._typesByNames = new Map()
    this._typesByConstructor = new Map()
    this._types = new Set()
    this._linksByStart = new Map()
    this._linksByEnd = new Map()
  }

  /**
  * Register a new component type into this database.
  *
  * @param {ComponentType} type - A component type to register.
  *
  * @return {ComponentTypeDatabase} This database instance for chaining purpose.
  */
  register (type) {
    if (!this._types.has(type)) {
      if (this._typesByNames.has(type.name)) {
        throw new Error([
          'Unable to save the component type ', type.toString(), ' into this ',
          'component type database because another type was already registered',
          ' with the same name : ',
          this.getTypeFromName(type.name).toString(), '.'
        ].join(''))
      }

      if (this._typesByConstructor.has(type.Class)) {
        throw new Error([
          'Unable to save the component type ', type.toString(), ' into this ',
          'component type database because the given type constructor was ',
          'already registered as : ',
          this.getTypeFromConstructor(type.Class).toString, '.'
        ].join(''))
      }

      this._typesByNames.set(type.name, type)
      this._typesByConstructor.set(type.Class, type)
      this._types.add(type)
    }

    return this
  }

  /**
  * Link a type to another.
  *
  * @param {ComponentType} start - The type at the link start.
  * @param {ComponentType} end - The type at the link end.
  *
  * @return {ComponentTypeDatabase} This database instance for chaining purpose.
  */
  link (start, end) {
    if (!this.has(start)) this.register(start)
    if (!this.has(end)) this.register(end)

    if (
      !this._linksByStart.has(start) ||
      !this._linksByStart.get(start).has(end)
    ) {
      this._link(start, end)

      for (const other of this.getTypesWithLinkTo(start)) {
        this._link(other, end)
      }

      for (const other of this.getTypesWithLinkFrom(end)) {
        this._link(start, other)
      }
    }

    return this
  }

  _link (start, end) {
    if (!this._linksByStart.has(start)) {
      this._linksByStart.set(start, new Set())
    }

    if (!this._linksByEnd.has(end)) {
      this._linksByEnd.set(end, new Set())
    }

    this._linksByStart.get(start).add(end)
    this._linksByEnd.get(end).add(start)
  }

  /**
  * Return true if the given type was registered into this database.
  *
  * @param {ComponentType} type - A type to search.
  * @return {boolean} True if the given type was registered into this database.
  */
  has (type) {
    return this._types.has(type)
  }

  /**
  * Return true if the given name was associated to a type.
  *
  * @param {string} name - A type name to search.
  * @return {boolean} True if the given name was associated to a type.
  */
  hasTypeWithName (name) {
    return this._typesByNames.has(name)
  }

  /**
  * Return true if the given constructor was associated to a type.
  *
  * @param {function} constructor - A constructor to search.
  * @return {boolean} True if the given constructor was associated to a type.
  */
  hasTypeWithConstructor (constructor) {
    return this._typesByConstructor.has(constructor)
  }

  /**
  * Return true if the given instance was associated to a type.
  *
  * @param {any} instance - An object instance.
  * @return {boolean} True if the given instance has a type associated with it.
  */
  isInstanceTyped (instance) {
    return this._typesByConstructor.has(instance.constructor)
  }

  /**
  * Return all types with a link to the given type.
  *
  * @param {ComponentType} end - End type to search.
  *
  * @return {Set<ComponentType>} A set with all types with a link to the given type.
  */
  getTypesWithLinkTo (end) {
    return this._linksByEnd.get(end) || EMPTY_SET
  }

  /**
  * Return all types with a link from the given type.
  */
  getTypesWithLinkFrom (start) {
    return this._linksByStart.get(start) || EMPTY_SET
  }

  /**
  * Return the type associated to the given object instance.
  *
  * @param {object} instance - An object instance.
  * @return {ComponentType} type - The type associated with the given instance if any.
  */
  getTypeFromInstance (instance) {
    return this.getTypeFromConstructor(instance.constructor)
  }

  /**
  * Return the type associated to the given name.
  *
  * @param {string} name - The name of the type to find.
  * @return {ComponentType} type - The type associated with the given name if any.
  */
  getTypeFromName (name) {
    return this._typesByNames.get(name)
  }

  /**
  * Return the type associated to the given constructor.
  *
  * @param {function} constructor - The constructor associated with the type to find.
  * @return {ComponentType} type - The type associated with the given constructor if any.
  */
  getTypeFromConstructor (constructor) {
    return this._typesByConstructor.get(constructor)
  }

  /**
  * Return all registered types as a set.
  *
  * @return {Set<ComponentType>} All registered types as a set.
  */
  get types () {
    return this._types
  }
}
