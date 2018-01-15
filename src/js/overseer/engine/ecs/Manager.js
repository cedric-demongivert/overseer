import uuid from 'uuid/v4'
import { Entity } from './entity'
import { Component, UUIDv4Component } from './component'

import {
  DuplicatedEntityError,
  DuplicatedComponentError,
  InvalidComponentManagerError,
  InvalidComponentEntityError
} from './errors'

const EMPTY_MAP = new Map()

/**
* An Entity-Component-System (ECS) manager.
*/
export class Manager {
  /**
  * Create a new Entity-Component-System (ECS) manager.
  */
  constructor () {
    this._identifier = uuid()
    this._entities = new Set()
    this._systems = new Set()
    this._components = new Map()
    this._componentIndex = new Map()
  }

  /**
  * Return the identifier of this manager.
  *
  * @return {string} The identifier of this manager.
  */
  get identifier () {
    return this._identifier
  }

  /**
  * Add a system to this manager.
  *
  * @param {System} system - The system to add to this manager.
  *
  * @return {Manager} The current manager instance for chaining purpose.
  */
  addSystem (system) {
    if (!this._systems.has(system)) {
      this._systems.add(system)
      system.attach(this)

      system.initialize()
    }

    return this
  }

  /**
  * Check if this manager has a system.
  *
  * @param {System} system - The system to fetch in this manager.
  *
  * @return {boolean} True if this manager has the given system.
  */
  hasSystem (system) {
    return this._systems.has(system)
  }

  /**
  * Delete a system of this manager.
  *
  * @param {System} system - The system to delete of this manager.
  *
  * @return {Manager} The current manager instance for chaining purpose.
  */
  deleteSystem (system) {
    if (this._systems.has(system)) {
      system.destroy()

      this._systems.delete(system)
      system.detach()
    }

    return this
  }

  /**
  * Add a new entity into this manager.
  *
  * @param {Entity|any} entity - The entity, or the identifier of the entity to add.
  *
  * @throws {DuplicatedEntityError} If the entity to add already exists in this manager.
  *
  * @return {Manager} The current manager instance for chaining purpose.
  */
  addEntity (entity) {
    const identifier = Entity.identifier(entity)

    if (this._entities.has(identifier)) {
      throw new DuplicatedEntityError(this, identifier)
    } else {
      this._managerWillAddEntity(identifier)
      this._entities.add(identifier)
      this._managerDidAddEntity(identifier)
    }

    return this
  }

  /**
  * Called when an entity will be added to this manager.
  *
  * @param {any} identifier - The identifier of the entity that will be added to this manager.
  */
  _managerWillAddEntity (identifier) {
    for (const system of this._systems) {
      system.managerWillAddEntity(identifier)
    }
  }

  /**
  * Called when an entity was added to this manager.
  *
  * @param {any} identifier - Identifier of the added entity.
  */
  _managerDidAddEntity (identifier) {
    for (const system of this._systems) {
      system.managerDidAddEntity(identifier)
    }
  }

  /**
  * Return true if an entity exists.
  *
  * @param {Entity|any} entity - An entity, or the identifier of the entity to fetch.
  *
  * @return {boolean} True if the entity exists in this manager.
  */
  hasEntity (entity) {
    return this._entities.has(Entity.identifier(entity))
  }

  /**
  * Delete an entity of this manager.
  *
  * @param {Entity|any} entity - An entity, or the identifier of the entity to delete.
  *
  * @return {EntityManager} The current manager instance for chaining purpose.
  */
  deleteEntity (entity) {
    const identifier = Entity.identifier(entity)

    if (this._entities.has(identifier)) {
      this._managerWillDeleteEntity(identifier)
      for (const component of this.componentsOf(identifier)) {
        this.deleteComponent(component)
      }
      this._entities.delete(identifier)
      this._managerDidDeleteEntity(identifier)
    }

    return this
  }

  /**
  * Called when the manager will delete an entity.
  *
  * @param {any} identifier - Identifier the entity that will be deleted.
  */
  _managerWillDeleteEntity (identifier) {
    for (const system of this._systems) {
      system.managerWillDeleteEntity(identifier)
    }
  }

  /**
  * Called when the manager did delete an entity.
  *
  * @param {any} identifier - Identifier the entity that was deleted.
  */
  _managerDidDeleteEntity (identifier) {
    for (const system of this._systems) {
      system.managerDidDeleteEntity(identifier)
    }
  }

  /**
  * Check if a component exists in this manager.
  *
  * @param {...any} params - A component instance, a component identifier or a couple of entity / component type.
  *
  * @return {boolean} True if the component exists in this entity manager.
  */
  hasComponent (...params) {
    if (params.length === 1) {
      return this._components.has(Component.identifier(params[0]))
    } else {
      const [entity, type] = params
      const rtype = Component.typeof(type)
      const entityIdentifier = Entity.identifier(entity)
      return this._componentIndex.has(rtype) &&
             this._componentIndex.get(rtype).has(entityIdentifier)
    }
  }

  /**
  * Return a component by using its identifier, or a couple of entity / component type.
  *
  * @param {...any} params - A component identifier, or a couple of entity / component type.
  *
  * @return {Component} The component with the related identifier if exists.
  */
  getComponent (...params) {
    if (params.length === 1) {
      return this._components.get(params[0])
    } else {
      const [entity, type] = params

      const rtype = Component.typeof(type)
      const entityIdentifier = Entity.identifier(entity)

      return (this._componentIndex.get(rtype) || EMPTY_MAP).get(entityIdentifier)
    }
  }

  /**
  * Add a component into this manager.
  *
  * @param {Component} component - Component to add.
  *
  * @throws {DuplicatedComponentError} When the component as an id that is already taken by another manager component.
  * @throws {InvalidComponentManagerError} When the component was instanciated for another manager.
  *
  * @return {Manager} The current manager instance for chaining purpose.
  *
  * @todo add entity test
  */
  addComponent (component) {
    if (component.manager !== this) {
      throw new InvalidComponentManagerError(this, component)
    }

    if (this._components.get(component.identifier) !== component) {
      if (this._components.has(component.identifier)) {
        throw new DuplicatedComponentError(this, component)
      }

      if (!this._entities.has(component.entity)) {
        throw new InvalidComponentEntityError(this, component)
      }

      if (!this._componentIndex.has(component.type)) {
        this._componentIndex.set(component.type, new Map())
      }

      if (this._componentIndex.get(component.type).has(component.entity)) {
        this.deleteComponent(
          this._componentIndex.get(component.type)
                              .get(component.entity).identifier
        )
      }

      this._managerWillAddComponent(component)
      this._components.set(component.identifier, component)
      this._componentIndex.get(component.type).set(component.entity, component)
      this._managerDidAddComponent(component)
    }

    return this
  }

  /**
  * Called when a component will be add to this manager.
  *
  * @param {Component} component - The component to add.
  */
  _managerWillAddComponent (component) {
    for (const system of this._systems) {
      system.managerWillAddComponent(component)
    }
  }

  /**
  * Called when a component was add to this manager.
  *
  * @param {Component} component - The added component.
  */
  _managerDidAddComponent (component) {
    for (const system of this._systems) {
      system.managerDidAddComponent(component)
    }
  }

  /**
  * Delete a component by using its identifier or a couple of entity / component type.
  *
  * @param {...any} params
  *
  * @return {Manager} The current manager instance for chaining purpose.
  */
  deleteComponent (...params) {
    if (params.length === 1) {
      this._deleteComponent(params[0])
    } else {
      const [entity, type] = params
      const component = this.getComponentOf(entity, type)
      if (component) this._deleteComponent(component)
    }

    return this
  }

  /**
  * Delete a component from this manager.
  *
  * @param {Component|any} component - A component instance or a component identifier.
  *
  * @return {Manager} The current manager instance for chaining purpose.
  */
  _deleteComponent (component) {
    if (this._components.has(Component.identifier(component))) {
      const removed = this._components.get(Component.identifier(component))
      this._managerWillDeleteComponent(removed)
      this._components.delete(removed.identifier)
      this._componentIndex.get(removed.type).delete(removed.entity)

      if (this._componentIndex.get(removed.type).size <= 0) {
        this._componentIndex.delete(removed.type)
      }

      this._managerDidDeleteComponent(removed)
    }

    return this
  }

  /**
  * Called when a component will be remove from this manager.
  *
  * @param {Component} component - The component that will be remove.
  */
  _managerWillDeleteComponent (component) {
    for (const system of this._systems) {
      system.managerWillDeleteComponent(component)
    }
  }

  /**
  * Called when a component was remove from this manager.
  *
  * @param {Component} component - The removed component.
  */
  _managerDidDeleteComponent (component) {
    for (const system of this._systems) {
      system.managerDidDeleteComponent(component)
    }
  }

  /**
  * Iterate over all entities identifier of this manager.
  *
  * @return {Iterator<any>} An iterator over all entities identifier of this manager.
  */
  * entities () {
    yield * this._entities.values()
  }

  /**
  * Iterate over components of this manager.
  *
  * @param {any} [type] - Component type to iterate.
  *
  * @return {Iterator<Component>} An iterator over all components of this manager.
  */
  * components (type) {
    if (type == null) {
      yield * this._components.values()
    } else {
      yield * (
        this._componentIndex.get(Component.typeof(type)) || EMPTY_MAP
      ).values()
    }
  }

  /**
  * Iterate over all components of an entity.
  *
  * @param {Entity|any} entity - Entity or entity identifier to fetch.
  *
  * @return {Iterator<Component>} An iterator over all components of the given entity.
  */
  * componentsOf (entity) {
    const identifier = Entity.identifier(entity)
    for (const components of this._componentIndex.values()) {
      if (components.has(identifier)) {
        yield components.get(identifier)
      }
    }
  }

  /**
  * Iterate over all systems of this manager.
  *
  * @return {Iterator<System>} An iterator over all systems of this manager.
  */
  * systems () {
    yield * this._systems
  }

  /**
  * Update all systems of this manager.
  *
  * @param {number} delta - The number of seconds elapsed since the last call of update.
  *
  * @return {Manager} The current manager instance for chaining purpose.
  */
  update (delta) {
    this._managerWillUpdate(delta)

    for (const system of this._systems) {
      system.update(delta)
    }

    this._managerDidUpdate(delta)

    return this
  }

  /**
  * Called when the current manager will update all its systems.
  *
  * @param {number} delta - The number of seconds elapsed since the last call of update.
  */
  _managerWillUpdate (delta) {
    for (const system of this._systems) {
      system.managerWillUpdate(delta)
    }
  }

  /**
  * Called when the current manager updated all its systems.
  *
  * @param {number} delta - The number of seconds elapsed since the last call of update.
  */
  _managerDidUpdate (delta) {
    for (const system of this._systems) {
      system.managerDidUpdate(delta)
    }
  }

  /**
  * Create a new component for an entity.
  *
  * @param {Entity|any} entity - An entity or an entity identifier.
  * @param {function} type - The type of component to create.
  *
  * @return {Component} The created component.
  */
  createComponent (entity, type) {
    return Reflect.construct(type, [this, entity])
  }

  /**
  * Clear this manager of all of its entities, components and systems.
  *
  * @return {EntityManager} The current instance for chaining purpose.
  */
  clear () {
    for (const entity of this._entities) {
      this.deleteEntity(entity)
    }

    for (const system of this._systems) {
      this.deleteSystem(system)
    }

    return this
  }
}
