import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import { Unit } from '../components/Unit'
import { UnitType } from '../types/UnitType'

import { OverseerSystem } from './OverseerSystem'

import { HierarchyManagementSystem } from './HierarchyManagementSystem'

export class UnitManagementSystem extends OverseerSystem {
  /**
  * Hierarchy system used by this system.
  */
  public hierarchyManagementSystem : HierarchyManagementSystem

  /**
  * Create a new Unit management system.
  */
  public constructor () {
    super()
    this.hierarchyManagementSystem = null
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  public initialize () {
    this.hierarchyManagementSystem = this.manager.requireSystem(HierarchyManagementSystem)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  public destroy () {
    this.hierarchyManagementSystem = null
  }

  /**
  * Return the parent unit of the given entity.
  *
  * @param entity - An entity to search.
  *
  * @return The parent unit of the given entity.
  */
  public getParentUnit (entity : Entity) : Unit {
    if (this.hierarchyManagementSystem.isRoot(entity)) {
      return null
    } else {
      return this.getUnit(this.hierarchyManagementSystem.getParent(entity))
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
        return this.manager.getComponentOfEntity(current, UnitType).data
      }

      current = this.hierarchyManagementSystem.getParent(current)
    } while (current != null)

    return null
  }

  /**
  * Return the root unit that is applied to the given entity.
  *
  * @param entity - An entity to search.
  *
  * @return The root unit applied to the given entity.
  */
  public getRootUnit (entity : Entity) : Unit {
    let current : Entity = entity
    let result : Unit = null

    do {
      if (this.manager.hasComponent(current, UnitType)) {
        result = this.manager.getComponentOfEntity(current, UnitType).data
      }

      current = this.hierarchyManagementSystem.getParent(current)
    } while (current != null)

    return result
  }
}
