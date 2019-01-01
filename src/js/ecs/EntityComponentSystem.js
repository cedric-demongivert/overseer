import { EntityManager } from './entities/EntityManager'
import { ComponentManager } from './components/ComponentManager'
import { SystemManager } from './systems/SystemManager'

/**
* An entity component and system manager.
*/
export class EntityComponentSystem {
  /**
  * Create a new empty Entity-Component-System (ECS) manager.
  */
  constructor () {
    this._entities = new EntityManager()
    this._components = new ComponentManager()
    this._systems = new SystemManager()
  }

  get systems () {
    return this._systems.systems
  }

  /**
  * Add a system to this manager.
  *
  * @param {System} system - The system to add to this manager.
  *
  * @return {EntityComponentSystem} The current manager instance for chaining purpose.
  */
  addSystem (system) {
    if (!this._systems.has(system)) {
      this._systems.add(system)
      system.attach(this)

      for (const entity of this._entities.entities) {
        system.managerDidAddEntity(entity)
      }

      for (const component of this._components.components) {
        system.managerDidAddComponent(component)
      }
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
  * @return {EntityComponentSystem} The current manager instance for chaining purpose.
  */
  deleteSystem (system) {
    if (this._systems.has(system)) {
      this._systems.delete(system)
      system.detach()
    }

    return this
  }

  get entities () {
    return this._entities.entities
  }

  /**
  * Add a new entity into this manager.
  *
  * @param {number} identifier - The identifier of the entity to add.
  *
  * @return {EntityComponentSystem} The current manager instance for chaining purpose.
  */
  addEntity (identifier) {
    if (!this._entities.has(identifier)) {
      this._managerWillAddEntity(identifier)
    }
    this._entities.register(identifier)
    this._managerDidAddEntity(identifier)

    return this
  }

  /**
  * Called when an entity will be added to this manager.
  *
  * @param {any} identifier - The identifier of the entity that will be added to this manager.
  */
  _managerWillAddEntity (identifier) {
    for (const system of this._systems.systems) {
      system.managerWillAddEntity(identifier)
    }
  }

  /**
  * Called when an entity was added to this manager.
  *
  * @param {any} identifier - Identifier of the added entity.
  */
  _managerDidAddEntity (identifier) {
    for (const system of this._systems.systems) {
      system.managerDidAddEntity(identifier)
    }
  }

  /**
  * Return true if an entity exists.
  *
  * @param {number} identifier - The identifier of the entity to search.
  *
  * @return {boolean} True if the entity exists in this manager.
  */
  hasEntity (identifier) {
    return this._entities.has(identifier)
  }

  /**
  * Delete an entity of this manager.
  *
  * @param {number} identifier - Identifier of the entity to delete.
  *
  * @return {EntityComponentSystem} The current manager instance for chaining purpose.
  */
  deleteEntity (identifier) {
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

  tagEntity (entity, tag) {
    this._entities.tag(entity, tag)
    return this
  }

  untagEntity (entity, tag) {
    this._entities.untagEntity(entity, tag)
    return this
  }

  setEntityLabel (entity, label) {
    this._entities.setEntityLabel(entity, label)
    return this
  }

  getEntityLabel (entity) {
    return this._entities.getEntityLabel(entity)
  }

  getEntitiesWithLabel (label) {
    return this._entities.getEntitiesWithLabel(label)
  }

  getEntitiesWithTag (tag) {
    return this._entities.getEntitiesWithTag(tag)
  }

  /**
  * Called when the manager will delete an entity.
  *
  * @param {any} identifier - Identifier the entity that will be deleted.
  */
  _managerWillDeleteEntity (identifier) {
    for (const system of this._systems.systems) {
      system.managerWillDeleteEntity(identifier)
    }
  }

  /**
  * Called when the manager did delete an entity.
  *
  * @param {any} identifier - Identifier the entity that was deleted.
  */
  _managerDidDeleteEntity (identifier) {
    for (const system of this._systems.systems) {
      system.managerDidDeleteEntity(identifier)
    }
  }

  getEntityOfComponent (instance) {
    return this._components.getParentEntity(instance)
  }

  /**
  * Return true if a given entity has a component of the given type.
  *
  * @param {number} entity - Identifier of the entity that contains the requested component.
  * @param {function} Component - Type of component to find.
  *
  * @return {boolean} True if a given entity has a component of the given type.
  */
  hasComponent (entity, Component) {
    return this._components.has(entity, Component)
  }

  /**
  * Return a component of a given type that belons to a given entity.
  *
  * @param {number} entity - Identifier of the entity that contains the requested component.
  * @param {function} Component - Type of component to get.
  *
  * @return {Component} The requested component that belongs to the given entity.
  */
  getComponent (entity, Component) {
    return this._components.get(entity, Component)
  }

  /**
  * Create a new component of a given type for a given entity.
  *
  * @param {number} entity - An entity identifier.
  * @param {function} Component - Component to create.
  * @param {...any} parameters - Parameters to forward to the component constructor.
  *
  * @return {EntityComponentSystem} The current instance for chaining purpose.
  */
  createComponent (entity, Component, ...parameters) {
    const instance = new Component(...parameters)

    if (this._components.isAbleToCreate(entity, Component)) {
      this._managerWillAddComponent(instance)
    }

    this._components.add(entity, instance)
    this._managerDidAddComponent(this._components.get(entity, Component))

    return this
  }

  /**
  * Called when a component will be add to this manager.
  *
  * @param {any} component - The component to add.
  */
  _managerWillAddComponent (component) {
    for (const system of this._systems.systems) {
      system.managerWillAddComponent(component)
    }
  }

  /**
  * Called when a component was add to this manager.
  *
  * @param {any} component - The added component.
  */
  _managerDidAddComponent (component) {
    for (const system of this._systems.systems) {
      system.managerDidAddComponent(component)
    }
  }

  /**
  * Remove a component of an entity.
  *
  * @param {number} entity - Identifier of the entity to fetch.
  * @param {function} Component - Type of component to delete.
  *
  * @return {EntityComponentSystem} The current instance for chaining purpose.
  */
  deleteComponent (entity, Component) {
    const instance = this._entities.get(entity, Component)

    this._managerWillDeleteComponent(instance)
    this._entities.deleteComponent(entity, Component)
    this._managerDidDeleteComponent(instance)

    return this
  }
  /**
  * Called when a component will be remove from this manager.
  *
  * @param {Component} component - The component that will be remove.
  */
  _managerWillDeleteComponent (component) {
    for (const system of this._systems.systems) {
      system.managerWillDeleteComponent(component)
    }
  }

  /**
  * Called when a component was remove from this manager.
  *
  * @param {Component} component - The removed component.
  */
  _managerDidDeleteComponent (component) {
    for (const system of this._systems.systems) {
      system.managerDidDeleteComponent(component)
    }
  }

  /**
  * Return a Set with all components of the given type.
  *
  * @param {function} Component - A component type to search for.
  *
  * @return {Set<Component>} All stored components of the given type.
  */
  getComponentsOfType (Component) {
    return this._components.getComponentsOfType(Component)
  }

  /**
  * Return a Set with all components of the given entity.
  *
  * @param {number} entity - An entity identifier.
  *
  * @return {Set<Component>} All stored components of the given entity.
  */
  getComponentsOfEntity (entity) {
    return this._components.getComponentsOfEntity(entity)
  }

  /**
  * Update all systems of this manager.
  *
  * @param {number} delta - The number of seconds elapsed since the last call of update.
  *
  * @return {EntityComponentSystem} The current manager instance for chaining purpose.
  */
  update (delta) {
    this._managerWillUpdate(delta)
    for (const system of this._systems.systems) {
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
    for (const system of this._systems.systems) {
      system.managerWillUpdate(delta)
    }
  }

  /**
  * Called when the current manager updated all its systems.
  *
  * @param {number} delta - The number of seconds elapsed since the last call of update.
  */
  _managerDidUpdate (delta) {
    for (const system of this._systems.systems) {
      system.managerDidUpdate(delta)
    }
  }

  /**
  * Clear this manager of all of its entities, components and systems.
  *
  * @return {EntityComponentSystem} The current instance for chaining purpose.
  */
  clear () {
    for (const entity of this._entities.entities) {
      this.deleteEntity(entity)
    }

    for (const system of this._systems.systems) {
      this.deleteSystem(system)
    }

    return this
  }
}
