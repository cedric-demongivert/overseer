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
  * @return {Set<string>} All registered tags as a set.
  */
  get tags () {
    return this._entities.tags
  }

  /**
  * @return {Set<string>} All registered labels.
  */
  get labels () {
    return this._entities.labels
  }

  /**
  * Add a new entity into this manager.
  *
  * @param {number} identifier - The identifier of the entity to add.
  *
  * @return {EntityComponentSystem} The current manager instance for chaining purpose.
  */
  addEntity (identifier) {
    if (!this._entities.hasEntity(identifier)) {
      this._managerWillAddEntity(identifier)
    }
    this._entities.registerEntity(identifier)
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
    return this._entities.hasEntity(identifier)
  }

  /**
  * Delete an entity of this manager.
  *
  * @param {number} identifier - Identifier of the entity to delete.
  *
  * @return {EntityComponentSystem} The current manager instance for chaining purpose.
  */
  deleteEntity (identifier) {
    if (this._entities.hasEntity(identifier)) {
      this._managerWillDeleteEntity(identifier)
      for (const component of this.componentsOf(identifier)) {
        this.deleteComponent(component)
      }
      this._entities.deleteEntity(identifier)
      this._managerDidDeleteEntity(identifier)
    }

    return this
  }

  /**
  * Check if a given entity has a given tag.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} entity - An entity identifier.
  * @param {string} tag - A tag to search for.
  *
  * @return {boolean} True if the given entity has the given tag.
  */
  doesEntityHasTag (entity, tag) {
    return this._entities.doesEntityHasTag(entity, tag)
  }

  /**
  * Add a Tag to a given entity.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} entity - An entity to tag.
  * @param {string} tag - A tag.
  *
  * @return {EntityComponentSystem} The current instance for chaining purpose.
  */
  addTagToEntity (entity, tag) {
    this._entities.addTagToEntity(entity, tag)
    return this
  }

  /**
  * Delete a tag from a given entity.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} entity - An entity from wich we will delete a tag.
  * @param {string} tag - A tag.
  *
  * @return {EntityComponentSystem} The current instance for chaining purpose.
  */
  deleteTagOfEntity (entity, tag) {
    this._entities.deleteTagOfEntity(entity, tag)
    return this
  }

  /**
  * Return all entities with the given tag.
  *
  * @param {string} tag - A tag to search for.
  *
  * @return {Set<number>} All registered entities with the given tag.
  */
  getEntitiesWithTag (tag) {
    return this._entities.getEntitiesWithTag(tag)
  }

  /**
  * Return all tags of a given entity.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} identifier - An entity identifier to search for.
  *
  * @return {Set<string>} All tags of the given entity.
  */
  getTagsOfEntity (identifier) {
    return this._entities.getTagsOfEntity(identifier)
  }

  /**
  * Delete all tags of a given entity.
  *
  * @throws {Error} If the given entity was not registered.
  *
  * @param {number} identifier - The identifier of an entity from wich we will delete all attached tag.
  *
  * @return {EntityComponentSystem} The current instance for chaining purpose.
  */
  clearTagsOfEntity (identifier) {
    this._entities.clearTagsOfEntity(identifier)

    return this
  }

  /**
  * Clear all tags of the manager.
  *
  * @return {EntityManager} The current instance for chaining purpose.
  */
  clearTags () {
    this._entities.clearTags()

    return this
  }

  /**
  * Change the label of an entity.
  *
  *
  * @param {number} entity - An entity to rename.
  * @param {string} label - The new name of the given entity.
  *
  * @return {EntityComponentSystem} The current manager instance for chaining purposes.
  */
  setLabelOfEntity (entity, label) {
    this._entities.setLabelOfEntity(entity, label)

    return this
  }

  /**
  * Return the label of a given entity.
  *
  * @param {number} entity - An entity to find.
  *
  * @return {string} The label of the given entity.
  */
  getLabelOfEntity (entity) {
    return this._entities.getLabelOfEntity(entity)
  }

  /**
  * Return all entities with a given label.
  *
  * @param {string} label - A label to search for.
  *
  * @return {Set<number>} All registered entities with the given label.
  */
  getEntitiesWithLabel (label) {
    return this._entities.getEntitiesWithLabel(label)
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
