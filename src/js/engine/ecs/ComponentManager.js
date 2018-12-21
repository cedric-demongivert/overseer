import { componentTypes } from './componentTypes'

/**
* A collection of components.
*/
export class ComponentManager {
  /**
  * Create a new empty collection of components.
  *
  * @param {ComponentTypeDatabase} [types = componentTypes] - Component type database.
  */
  constructor (types = componentTypes) {
    this._types = types
    this._components = new Set()
    this._componentsRegistry = new Map()
    this._componentsByEntity = new Map()
    this._componentsByType = new Map()
    this._entitiesByComponents = new Map()
  }

  /**
  * @return {ComponentTypeDatabase} A database of component types.
  */
  get types () {
    return this._types
  }

  /**
  * @return {Set<any>} All registered components.
  */
  get components () {
    return this._components
  }

  /**
  * @return {number} The number of registered components.
  */
  get size () {
    return this._components.size
  }

  /**
  * Return the parent entity of a given component instance.
  *
  * @param {any} instance - A component instance.
  *
  * @return {number} The parent entity of the given instance.
  */
  getParentEntity (instance) {
    if (!this._types.isInstanceTyped(instance)) {
      throw new Error([
        'Unable to retrieve the entity of instance ', instance.toString(),
        ' because the given instance is not a component.'
      ].join(''))
    }

    return this._entitiesByComponents.get(instance)
  }

  /**
  * Return a Set with all components of the given type.
  *
  * @param {function} Component - A component type to search for.
  *
  * @return {Set<Component>} All stored components of the given type.
  */
  getComponentsOfType (Component) {
    if (!this._types.hasTypeWithConstructor(Component)) {
      throw new Error([
        'Unable to get all components of type ', Component.name,
        ' because the given type is not a component type.'
      ].join(''))
    }

    const componentType = this._types.getTypeFromConstructor(Component)

    return this._componentsByType.get(componentType)
  }

  /**
  * Return a Set with all components of the given entity.
  *
  * @param {number} entity - An entity identifier.
  *
  * @return {Set<Component>} All stored components of the given entity.
  */
  getComponentsOfEntity (entity) {
    return this._componentsByEntity.get(entity)
  }

  /**
  * Return a component of a given type that belons to a given entity.
  *
  * @param {number} entity - Identifier of the entity that contains the requested component.
  * @param {function} Component - Type of component to get.
  *
  * @return {Component} The requested component that belongs to the given entity.
  */
  get (entity, Component) {
    if (!this._types.hasTypeWithConstructor(Component)) {
      throw new Error([
        'Unable to get a component of type ', Component.name, ' from ',
        'entity ', entity.toString(), ' because the given type is not ',
        'a component type.'
      ].join(''))
    }

    const componentType = this._types.getTypeFromConstructor(Component)

    return this._componentsRegistry.get(componentType).get(entity)
  }

  /**
  * Return true if a given entity has a component of the given type.
  *
  * @param {number} entity - Identifier of the entity that contains the requested component.
  * @param {function} Component - Type of component to find.
  *
  * @return {boolean} True if a given entity has a component of the given type.
  */
  has (entity, Component) {
    if (!this._types.hasTypeWithConstructor(Component)) {
      throw new Error([
        'Unable to check if the entity ', entity.toString(), ' has a component',
        ' of type ', Component.name, ' because the given type is not ',
        'a component type.'
      ].join(''))
    }

    const componentType = this._types.getTypeFromConstructor(Component)

    return this._componentsRegistry.has(componentType) &&
           this._componentsRegistry.get(componentType).has(entity)
  }

  /**
  * Create a new component of a given type for a given entity.
  *
  * @param {number} entity - An entity identifier.
  * @param {function} Component - Component to create.
  * @param {...any} parameters - Parameters to forward to the component constructor.
  *
  * @return {ComponentManager} The current instance for chaining purpose.
  */
  create (entity, Component, ...parameters) {
    this._assertThatWeCanCreate(entity, Component)
    const instance = new Component(...parameters)

    return this.add(entity, instance)
  }

  /**
  * Assert that we can create a component of a given type for a given entity.
  *
  * @param {number} entity - An entity identifier.
  * @param {function} Component - Component to create.
  *
  * @return {ComponentManager} The current instance for chaining purpose.
  */
  _assertThatWeCanCreate (entity, Component) {
    if (!this._types.hasTypeWithConstructor(Component)) {
      throw new Error([
        'Unable to create a new component of type ', Component.name, ' for ',
        'entity ', entity.toString(), ' because the given type is not ',
        'a component type.'
      ].join(''))
    }

    const componentType = this._types.getTypeFromConstructor(Component)

    if (
      this._componentsRegistry.has(componentType) &&
      this._componentsRegistry.get(componentType).has(entity)
    ) {
      throw new Error([
        'Unable to create a new component of type ', componentType.toString(),
        ' for entity ', entity.toString(), ' because the given entity already ',
        ' contains a component of type or similar type to ',
        componentType.toString(), '.'
      ].join(''))
    }

    for (const similarType of this._types.getTypesWithLinkFrom(componentType)) {
      if (
        this._componentsRegistry.has(similarType) &&
        this._componentsRegistry.get(similarType).has(entity)
      ) {
        throw new Error([
          'Unable to create a new component of type ', componentType.toString(),
          ' for entity ', entity.toString(), ' because the given entity ',
          'already contains a component of similar type ',
          similarType.toString(), '.'
        ].join(''))
      }
    }

    return this
  }

  /**
  * Create a new component of a given type for a given entity.
  *
  * @param {number} entity - An entity identifier.
  * @param {function} Component - Component to create.
  * @param {...any} parameters - Parameters to forward to the component constructor.
  *
  * @return {ComponentManager} The current instance for chaining purpose.
  */
  add (entity, instance) {
    this._assertThatWeCanAdd(entity, instance)

    const componentType = this._types.getTypeFromInstance(instance)

    if (!this._componentsByEntity.has(entity)) {
      this._componentsByEntity.set(entity, new Set())
    }

    this._componentsByEntity.get(entity).add(instance)
    this._entitiesByComponents.set(instance, entity)
    this._components.add(instance)

    this._register(entity, componentType, instance)

    for (const similarType of this._types.getTypesWithLinkFrom(componentType)) {
      this._register(entity, similarType, instance)
    }

    return this
  }

  /**
  * Assert that we can add a component of a given type for a given entity.
  *
  * @param {number} entity - An entity identifier.
  * @param {any} instance - Component to register.
  *
  * @return {ComponentManager} The current instance for chaining purpose.
  */
  _assertThatWeCanAdd (entity, instance) {
    if (!this._types.isInstanceTyped(instance)) {
      throw new Error([
        'Unable to add the new component ', instance.toString(), ' of type ',
        instance.constructor.name, ' to entity ', entity.toString(),
        ' because the given instance is not a component.'
      ].join(''))
    }

    const componentType = this._types.getTypeFromInstance(instance)

    if (
      this._componentsRegistry.has(componentType) &&
      this._componentsRegistry.get(componentType).has(entity)
    ) {
      throw new Error([
        'Unable to add a new component of type ', componentType.toString(),
        ' to entity ', entity.toString(), ' because the given entity already ',
        ' contains a component of type or similar type to ',
        componentType.toString(), '.'
      ].join(''))
    }

    for (const similarType of this._types.getTypesWithLinkFrom(componentType)) {
      if (
        this._componentsRegistry.has(similarType) &&
        this._componentsRegistry.get(similarType).has(entity)
      ) {
        throw new Error([
          'Unable to add a new component of type ', componentType.toString(),
          ' to entity ', entity.toString(), ' because the given entity ',
          'already contains a component of similar type ',
          similarType.toString(), '.'
        ].join(''))
      }
    }

    return this
  }

  isAbleToCreate (entity, Component) {
    if (!this._types.hasTypeWithConstructor(Component)) return false
    if (this.has(entity, Component)) return false

    const componentType = this._types.getTypeFromConstructor(Component)

    for (const similarType of this._types.getTypesWithLinkFrom(componentType)) {
      if (
        this._componentsRegistry.has(similarType) &&
        this._componentsRegistry.get(similarType).has(entity)
      ) {
        return false
      }
    }

    return true
  }

  /**
  * Register a component into the manager.
  *
  * @param {number} entity - An entity identifier.
  * @param {ComponentType} type - Component type to register.
  * @param {any} instance - Component instance.
  *
  * @return {ComponentManager} The current instance for chaining purpose.
  */
  _register (entity, type, instance) {
    if (!this._componentsRegistry.has(type)) this._componentsRegistry.set(type, new Map())

    if (!this._componentsByType.has(type)) {
      this._componentsByType.set(type, new Set())
    }

    this._componentsByType.get(type).add(instance)
    this._componentsRegistry.get(type).set(entity, instance)

    return this
  }

  /**
  * Remove a component of an entity.
  *
  * @param {number} entity - Identifier of the entity to fetch.
  * @param {function} Component - Type of component to delete.
  *
  * @return {ComponentManager} The current instance for chaining purpose.
  */
  delete (entity, Component) {
    this._assertThatWeCanDelete(entity, Component)

    const instance = this.get(entity, Component)
    const componentType = this._types.getTypeFromInstance(instance)

    this._componentsByEntity.get(entity).delete(instance)

    if (this._componentsByEntity.get(entity).size <= 0) {
      this._componentsByEntity.delete(entity)
    }

    this._entitiesByComponents.delete(instance)
    this._components.delete(instance)

    this._unregister(entity, componentType, instance)

    for (const similarType of this._types.getTypesWithLinkFrom(componentType)) {
      this._unregister(entity, similarType, instance)
    }

    return this
  }

  /**
  * Unregister a component into the manager.
  *
  * @param {number} entity - An entity identifier.
  * @param {ComponentType} type - Component type to unregister.
  * @param {any} instance - Component instance.
  *
  * @return {ComponentManager} The current instance for chaining purpose.
  */
  _unregister (entity, type, instance) {
    this._componentsByType.get(type).delete(instance)
    this._componentsRegistry.get(type).delete(entity)

    if (this._componentsRegistry.get(type).size <= 0) {
      this._componentsRegistry.delete(type)
    }

    if (this._componentsByType.get(type).size <= 0) {
      this._componentsByType.delete(type)
    }

    return this
  }

  /**
  * Assert that a component of the given type can be removed from the given entity.
  *
  * @param {number} entity - Identifier of the entity to fetch.
  * @param {function} Component - Type of component to delete.
  *
  * @return {ComponentManager} The current instance for chaining purpose.
  */
  _assertThatWeCanDelete (entity, Component) {
    if (!this._types.hasTypeWithConstructor(Component)) {
      throw new Error([
        'Unable to delete a component of type ', Component.name, ' from ',
        'entity ', entity.toString(), ' because the given type is not ',
        'a component type.'
      ].join(''))
    }

    if (!this.has(entity, Component)) {
      throw new Error([
        'Unable to delete a component of type ',
        this._types.getTypeFromConstructor(Component).toString(), ' from ',
        'entity ', entity.toString(), ' because this entity does not have any ',
        'component of type ',
        this._types.getTypeFromConstructor(Component).toString(), '.'
      ].join(''))
    }

    return this
  }
}
