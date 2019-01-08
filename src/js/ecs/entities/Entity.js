/**
* An entity.
*
* Contains useful helpers in order to retrieve, query, mutate and delete entities.
*/
export class Entity {
  /**
  * Create an entity and register it into a manager.
  *
  * @param {EntityComponentSystem} manager - The entity related manager.
  * @param {number} identifier - The entity identifier.
  */
  constructor (manager, identifier) {
    this._identifier = identifier
    this._manager = manager

    if (!this._manager.hasEntity(identifier)) {
      this._manager.addEntity(identifier)
    }
  }

  /**
  * Return the entity identifier.
  *
  * @return {number} The entity identifier.
  */
  get identifier () {
    return this._identifier
  }

  /**
  * Return the related entity manager.
  *
  * @return {EntityComponentSystem} The related entity manager.
  */
  get manager () {
    return this._manager
  }

  /**
  * Return all tags attached to this entity.
  *
  * @return {Set<string>} All tags attached to this entity.
  */
  get tags () {
    return this._manager.getTagsOfEntity(this._identifier)
  }

  /**
  * Replace all attached tags of this entity.
  *
  * @param {Iterable<string>} tags - New tags of this entity.
  */
  set tags (tags) {
    this.setTags(tags)
  }

  /**
  * Replace all attached tags of this entity.
  *
  * @param {Iterable<string>} tags - New tags of this entity.
  *
  * @return {Entity} This entity instance for chaining purposes.
  */
  setTags (tags) {
    this.clearTags()
    for (const tag of tags) this.addTag(tag)

    return this
  }

  /**
  * Return the label of this entity.
  *
  * @return {string} The label of this entity.
  */
  get label () {
    return this._manager.getLabelOfEntity(this._identifier)
  }

  /**
  * Change the label of this entity.
  *
  * @param {string} label - The new label of this entity.
  */
  set label (label) {
    this.setLabel(label)
  }

  /**
  * Change the label of this entity.
  *
  * @param {string} label - The new label of this entity.
  *
  * @return {Entity} This entity instance for chaining purposes.
  */
  setLabel (label) {
    this._manager.setLabelOfEntity(this._identifier, label)
    return this
  }

  /**
  * Return all components of this entity.
  *
  * @return {Set<Component>} All components of this entity.
  */
  get components () {
    return this._manager.componentsOf(this._identifier)
  }

  /**
  * Check if this entity has a given tag.
  *
  * @param {string} tag - A tag to search for.
  *
  * @return {boolean} True if this entity has the given tag attached to it.
  */
  hasTag (tag) {
    return this._manager.doesEntityHasTag(this._identifier, tag)
  }

  /**
  * Add a tag to this entity.
  *
  * @param {string} tag - A tag to add to this entity.
  *
  * @return {Entity} This entity instance for chaining purposes.
  */
  addTag (tag) {
    this._manager.addTagToEntity(this._identifier, tag)
    return this
  }

  /**
  * Delete a tag from this entity.
  *
  * @param {string} tag - A tag to delete from this entity.
  *
  * @return {Entity} This entity instance for chaining purposes.
  */
  deleteTag (tag) {
    this._manager.deleteTagOfEntity(this._identifier, tag)
    return this
  }

  /**
  * Delete all tags from this entity.
  *
  * @return {Entity} This entity instance for chaining purposes.
  */
  clearTags () {
    this._manager.clearTagsOfEntity(this._identifier)
    return this
  }

  /**
  * Check if this entity has a component of a particular type.
  *
  * @param {function} type - A component type.
  *
  * @return {boolean} True if this entity has any component of the given type.
  */
  hasComponent (type) {
    return this._manager.hasComponent(this._identifier, type)
  }

  /**
  * Return a component of a particular type.
  *
  * @param {function} type - A component type.
  *
  * @return {Component} The component of the given type, if exists.
  */
  getComponent (type) {
    return this._manager.getComponent(this._identifier, type)
  }

  /**
  * Create a component of a particular type for this entity.
  *
  * @param {function} type - Type of the component to create.
  *
  * @return {Component} The created component.
  */
  createComponent (type, ...parameters) {
    this._manager.createComponent(this._identifier, type, ...parameters)
    return this._manager.getComponent(this._identifier, type)
  }

  /**
  * Delete a component of a particular type attached to this entity.
  *
  * @param {function} type - Type of the component to delete.
  *
  * @return {Entity} The current entity instance for chaining purpose.
  */
  deleteComponent (type) {
    this._manager.deleteComponent(this._identifier, type)
    return this
  }

  /**
  * Check if this object instance is equal to another one.
  *
  * @param {any} other - Other value to use as a comparison.
  *
  * @return {boolean} True if this entity is equal to the given value.
  */
  equals (other) {
    if (other == null) return false
    if (other == this) return true

    if (other instanceof Entity) {
      return other.identifier === this._identifier &&
             other.manager === this._manager
    }

    return false
  }

  /**
  * @see Object#toString
  */
  toString () {
    return `Entity ${this._identifier}`
  }
}
