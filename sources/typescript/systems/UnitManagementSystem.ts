import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import { Unit } from '../components/Unit'
import { UnitType } from '../types/UnitType'

import { OverseerSystem } from './OverseerSystem'

import { HierarchyManagementSystem } from './HierarchyManagementSystem'

export class UnitManagementSystem extends OverseerSystem {
  /**
  * Hierarchy system used by this system.
  */
  public hierarchy : HierarchyManagementSystem

  /**
  * Create a new Unit management system.
  */
  public constructor () {
    super()
    this.hierarchy = null
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  public initialize () {
    this.hierarchy = this.manager.requireSystem(HierarchyManagementSystem) as HierarchyManagementSystem
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  public destroy () {
    this.hierarchy = null
  }

  /**
  * Return the parent unit of the given entity.
  *
  * @param entity - An entity to search.
  *
  * @return The parent unit of the given entity.
  */
  public getParentUnit (entity : Entity) : Unit {
    if (this.hierarchy.isRoot(entity)) {
      return null
    } else {
      return this.getUnit(this.hierarchy.getParent(entity))
    }
  }

  /**
  * Return the unit that is applied to the given entity.
  *
  * @param entity - An entity to search.
  *
  * @return The unit applied to the given entity.
  */
  public getUnit (entity : Entity) : Unit {
    let current : Entity = entity

    do {
      if (this.manager.hasComponent(current, UnitType)) {
        return this.manager.getComponent(current, UnitType).data
      }

      current = this.hierarchy.getParent(current)
    } while (current != null)

    return null
  }
}
