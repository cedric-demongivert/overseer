import { Entity } from '@cedric-demongivert/gl-tool-ecs'
import { Sequence } from '@cedric-demongivert/gl-tool-collection'

import { Transformation } from '../components/Transformation'
import { Transformation2D } from '../components/Transformation2D'
import { Unit } from '../components/Unit'

import { TransformationType } from '../types/TransformationType'
import { Transformation2DType } from '../types/Transformation2DType'
import { UnitType } from '../types/UnitType'

import { OverseerSystem } from './OverseerSystem'
import { HierarchyManagementSystem } from './HierarchyManagementSystem'
import { UnitManagementSystem } from './UnitManagementSystem'

const IDENTITY : Transformation = new Transformation()

export class TransformationManagementSystem extends OverseerSystem {
  public hierarchy : HierarchyManagementSystem
  public unit : UnitManagementSystem

  /**
  * Instantiate a new transformation management system.
  */
  public constructor () {
    super()
    this.hierarchy = null
    this.unit = null
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  public initialize () {
    this.hierarchy = this.manager.requireSystem(HierarchyManagementSystem)
    this.unit = this.manager.requireSystem(UnitManagementSystem)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  public destroy () {
    this.hierarchy = null
    this.unit = null
  }

  /**
  * Recompute the transformation tree of the given entity.
  *
  * @param entity - The entity to refresh.
  */
  public commit (entity : Entity) : void {
    if (this.manager.hasComponent(entity, TransformationType)) {
      if (this.manager.hasComponent(entity, Transformation2DType)) {
        this.commitTransformation2D(entity)
      } else if (this.manager.hasComponent(entity, UnitType)) {
        this.commitUnit(entity)
      }
    }

    for (const child of this.hierarchy.children(entity)) {
      this.commit(child)
    }
  }

  /**
  * Recompute the transformation of the given entity by using a Transformation2D component.
  *
  * @param entity - The entity to refresh.
  */
  public commitTransformation2D (entity : Entity) : void {
    const transform2D : Transformation2D = this.manager.getComponentOfEntity(entity, Transformation2DType).data
    const transform : Transformation = this.manager.getComponentOfEntity(entity, TransformationType).data
    const parentTransform : Transformation = this.getParentTransformation(entity)
    const unit : Unit = this.unit.getUnit(entity)
    const parentUnit : Unit = this.unit.getParentUnit(entity)

    transform.localToWorld.toIdentity()

    if (parentUnit != null) {
      parentUnit.apply(unit, transform.localToWorld)
      transform2D.transform(transform.localToWorld)
    }

    parentTransform.localToWorld.multiplyWithMatrix(transform.localToWorld, transform.localToWorld)
    transform.localToWorld.transpose()
    transform.localToWorld.invert(transform.worldToLocal)
  }

  /**
  * Recompute the transformation of the given entity by using an existing and alone Unit component.
  *
  * @param entity - The entity to refresh.
  */
  public commitUnit (entity : Entity) : void {
    const transform : Transformation = this.manager.getComponentOfEntity(entity, TransformationType).data
    const parentTransform : Transformation = this.getParentTransformation(entity)
    const unit : Unit = this.unit.getUnit(entity)
    const parentUnit : Unit = this.unit.getParentUnit(entity)

    transform.localToWorld.toIdentity()
    parentTransform.localToWorld.multiplyWithMatrix(transform.localToWorld, transform.localToWorld)

    if (parentUnit != null) {
      parentUnit.apply(unit, transform.localToWorld)
    }

    transform.localToWorld.invert(transform.worldToLocal)
  }

  /**
  * Commit all entities with a Transformation component.
  */
  public commitAll () : void {
    const entities : Sequence<Entity> = this.manager.getEntitiesWithType(TransformationType)

    for (let index = 0, size = entities.size; index < size; ++index) {
      const entity = entities.get(index)

      if (!this.isRootTransformation(entity)) {
        this.commit(entity)
      }
    }
  }

  /**
  * Return true if the given entity does not have a parent with a transformation component.
  *
  * @param entity - Entity to validate.
  *
  * @return True if the given entity does not have a parent with a transformation component.
  */
  public isRootTransformation (entity : Entity) : boolean {
    let parent : Entity = this.hierarchy.getParent(entity)

    while (parent != null) {
      if (this.manager.hasComponent(parent, TransformationType)) {
        return false
      }

      parent = this.hierarchy.getParent(entity)
    }

    return true
  }

  /**
  * Return the parent transformation of the given entity.
  *
  * @param entity - An entity to search.
  *
  * @return The parent transformation of the given entity.
  */
  public getParentTransformation (entity : Entity) : Transformation {
    let parent : Entity = this.hierarchy.getParent(entity)

    while (parent != null) {
      if (this.manager.hasComponent(parent, TransformationType)) {
        return this.manager.getComponentOfEntity(parent, TransformationType).data
      }

      parent = this.hierarchy.getParent(entity)
    }

    return IDENTITY
  }

  /**
  * Return the transformation that is applied to the given entity.
  *
  * @param entity - An entity to search.
  *
  * @return The transformation applied to the given entity.
  */
  public getTransformation (entity : Entity) : Transformation {
    let current : Entity = entity

    while (current != null) {
      if (this.manager.hasComponent(current, TransformationType)) {
        return this.manager.getComponentOfEntity(current, TransformationType).data
      }

      current = this.hierarchy.getParent(current)
    }

    return IDENTITY
  }
}
