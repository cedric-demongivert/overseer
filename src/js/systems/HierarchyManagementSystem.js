import { OverseerSystem } from './OverseerSystem'

import { Hierarchy } from '@overseer/components/Hierarchy'

const EMPTY_CHILDREN = new Set()

export class HierarchyManagementSystem extends OverseerSystem {
  /**
  * Return the hierarchy data of the given entity if exists.
  *
  * @param {number} entity - An entity to check.
  *
  * @return {Hierarchy} The given entity hierarchy data if exists, null otherwise.
  */
  get (entity) {
    if (this.manager.hasComponent(entity, Hierarchy)) {
      return this.manager.getInstance(entity, Hierarchy)
    } else {
      return null
    }
  }

  /**
  * Return true if the given entity is a root entity.
  *
  * @param {number} entity - An entity to check.
  *
  * @return {boolean} True if the given entity is a root entity.
  */
  isRoot (entity) {
    return !this.manager.hasComponent(entity, Hierarchy) ||
           this.manager.getInstance(entity, Hierarchy).parent == null
  }

  /**
  * Return the depth of the given entity into the component hierarchy.
  *
  * @param {number} entity - An entity to check.
  *
  * @return {number} The depth of the entity into the entity hierarchy.
  */
  getDepthOf (entity) {
    if (this.manager.hasComponent(entity, Hierarchy)) {
      let hierarchy = this.manager.getInstance(entity, Hierarchy)
      let depth = 0

      while (hierarchy.parent) {
        hierarchy = hierarchy.parent
        depth += 1
      }

      return depth
    } else {
      return 0
    }
  }

  /**
  * Return the parent entity of the given entity if exists.
  *
  * @param {number} entity - An entity to check.
  *
  * @return {number} The parent of the given entity if exists.
  */
  getParentOf (entity) {
    if (this.manager.hasComponent(entity, Hierarchy)) {
      let hierarchy = this.manager.getInstance(entity, Hierarchy)

      if (hierarchy.parent) {
        return this.manager.getEntityOfInstance(hierarchy.parent)
      }
    }

    return null
  }

  /**
  * Return an iterator over each children of the given entity.
  *
  * @param {number} entity - An entity to check.
  *
  * @return {Iterator<number>} An iterator over each children of the given entity.
  */
  * childrenOf (entity) {
    if (this.manager.hasComponent(entity, Hierarchy)) {
      let hierarchy = this.manager.getInstance(entity, Hierarchy)

      for (const child of hierarchy.children()) {
        yield this.manager.getEntityOfInstance(child)
      }
    }

    yield * EMPTY_CHILDREN
  }
}
