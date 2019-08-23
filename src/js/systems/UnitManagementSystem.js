import { Unit } from '@overseer/components/Unit'

import { OverseerSystem } from './OverseerSystem'

import { HierarchyManagementSystem } from './HierarchyManagementSystem'

export class UnitManagementSystem extends OverseerSystem {
  /**
  * Create a new Unit management system.
  */
  constructor () {
    super()
    this._hierarchy = null
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  initialize () {
    this._hierarchy = this.manager.requireSystem(HierarchyManagementSystem)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  destroy () {
    this._hierarchy = null
  }

  /**
  * Return the parent unit of the given entity.
  *
  * @param {number} entity - An entity to search.
  *
  * @return {Transformation} The parent unit of the given entity.
  */
  getParent (entity) {
    if (this._hierarchy.isRoot(entity)) return null

    return this.getUnit(this._hierarchy.getParentOf(entity))
  }

  /**
  * Return the unit that is applied to the given entity.
  *
  * @param {number} entity - An entity to search.
  *
  * @return {Unit} The unit applied to the given entity.
  */
  get (entity) {
    let current = entity

    do {
      if (this.manager.hasComponent(current, Unit)) {
        return this.manager.getInstance(current, Unit)
      }

      current = this._hierarchy.getParentOf(current)
    } while (current != null)

    return null
  }
}
