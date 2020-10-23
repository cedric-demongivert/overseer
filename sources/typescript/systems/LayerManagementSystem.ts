import { Pack } from '@cedric-demongivert/gl-tool-collection'
import { Sequence } from '@cedric-demongivert/gl-tool-collection'
import { bissect } from '@cedric-demongivert/gl-tool-collection'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import { LayerType } from '../types/LayerType'

import { OverseerSystem } from './OverseerSystem'
import { HierarchyManagementSystem } from './HierarchyManagementSystem'

export class LayerManagementSystem extends OverseerSystem {
  public hierarchyManagementSystem : HierarchyManagementSystem
  public entities : Pack<Entity>
  public priorities : Pack<number>

  /**
  * Create a new layering management system.
  */
  public constructor () {
    super()
    this.entities = null
    this.priorities = null
    this.hierarchyManagementSystem = null

    this.comparePriority = this.comparePriority.bind(this)
  }

  /**
  * @see OverseerSystem.initialize
  */
  public initialize () : void {
    this.entities = Pack.unsignedUpTo(this.manager.capacity.entities, this.manager.capacity.entities)
    this.priorities = Pack.unsignedUpTo(this.manager.capacity.entities, this.manager.capacity.entities)
    this.hierarchyManagementSystem = this.manager.requireSystem(HierarchyManagementSystem)

    const entities : Sequence<number> = this.manager.entities

    for (let index = 0, size = entities.size; index < size; ++index) {
      this.entities.push(entities.get(index))
    }

    this.refresh()
  }

  /**
  * @see OverseerSystem.destroy
  */
  public destroy () : void {
    this.entities = null
    this.priorities = null
    this.hierarchyManagementSystem = null
  }

  public managerDidAddEntity (entity : Entity) : void {
    this.entities.push(entity)
    this.refresh()
  }

  public managerWillDeleteEntity (entity : Entity) : void {
    this.entities.delete(bissect(this.entities, entity, this.comparePriority))
  }

  /**
  * Refresh the entire rendering queue.
  */
  public refresh () : void {
    this.entities.sort(this.comparePriority)

    for (let index = 0, size = this.entities.size; index < size; ++index) {
      this.priorities.set(this.entities.get(index), index)
    }
  }

  /**
  * Compare the rendering priority of two entities.
  *
  * @param left - The entity to use as a left operand.
  * @param right - The entity to use as a right operand.
  *
  * @return 1 if left is greather than right, -1 if left is less than right or 0 if left is equal to right.
  */
  public comparePriority (left : Entity, right : Entity) : number {
    let result : number = this.compareLayer(left, right)

    if (result === 0) {
      result = this.compareDepth(left, right)
      if (result === 0) {
        result = this.compareIdentifier(left, right)
      }
    }

    return result
  }

  /**
  * Compare the identifiers of two entities.
  *
  * @param left - The entity to use as a left operand.
  * @param right - The entity to use as a right operand.
  *
  * @return 1 if left is greather than right, -1 if left is less than right or 0 if left is equal to right.
  */
  public compareIdentifier (left : Entity, right : Entity) : number {
    return left - right
  }

  /**
  * Compare the depth of two entities.
  *
  * @param left - The entity to use as a left operand.
  * @param right - The entity to use as a right operand.
  *
  * @return 1 if left is greather than right, -1 if left is less than right or 0 if left is equal to right.
  */
  public compareDepth (left : Entity, right : Entity) : number {
    return this.hierarchyManagementSystem.getDepth(left) - this.hierarchyManagementSystem.getDepth(right)
  }

  /**
  * Compare the storing layers of two entities.
  *
  * @param left - The entity to use as a left operand.
  * @param right - The entity to use as a right operand.
  *
  * @return 1 if left is greather than right, -1 if left is less than right or 0 if left is equal to right.
  */
  public compareLayer (left : Entity, right : Entity) : number {
    return this.getLayer(left) - this.getLayer(right)
  }

  /**
  * Return the layer that contains the given entity if exists.
  *
  * @param entity - Entity to check.
  *
  * @return The layer that contains the given entity if exists, null otherwise.
  */
  public getLayer (entity : Entity) : number {
    let current : Entity = entity

    while (current != null) {
      if (this.manager.hasComponent(current, LayerType)) {
        return this.manager.getComponentOfEntity(current, LayerType).data
      }

      current = this.hierarchyManagementSystem.getParent(current)
    }

    return 0
  }
}
