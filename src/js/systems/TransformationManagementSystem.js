import { Transformation } from '@overseer/components/Transformation'
import { Transformation2D } from '@overseer/components/Transformation2D'
import { Unit } from '@overseer/components/Unit'
import { Hierarchy } from '@overseer/components/Hierarchy'

import { OverseerSystem } from './OverseerSystem'
import { HierarchyManagementSystem } from './HierarchyManagementSystem'
import { UnitManagementSystem } from './UnitManagementSystem'

export class TransformationManagementSystem extends OverseerSystem {
  /**
  * Instantiate a new transformation management system.
  */
  constructor () {
    super()
    this._hierarchy = null
    this._units = null
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  initialize () {
    this._hierarchy = this.manager.requireSystem(HierarchyManagementSystem)
    this._units = this.manager.requireSystem(UnitManagementSystem)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  destroy () {
    this._hierarchy = null
    this._units = null
  }

  /**
  * Recompute the transformation tree of the given entity.
  *
  * @param {number} entity - The entity to refresh.
  */
  commit (entity) {
    if (this.manager.hasComponent(entity, Transformation)) {
      if (this.manager.hasComponent(entity, Transformation2D)) {
        this.commitTransformation2D(entity)
      } else if (this.manager.hasComponent(entity, Unit)) {
        this.commitUnit(entity)
      }
    }

    for (const child of this._hierarchy.childrenOf(entity)) {
      this.commit(child)
    }
  }

  /**
  * Recompute the transformation of the given entity by using a Transformation2D component.
  *
  * @param {number} entity - The entity to refresh.
  */
  commitTransformation2D (entity) {
    const transform2D = this.manager.getInstance(entity, Transformation2D)
    const transform = this.manager.getInstance(entity, Transformation)
    const parentTransform = this.getParentTransformation(entity)
    const unit = this._units.get(entity)
    const parentUnit = this._units.getParent(entity)

    transform.localToWorld.toIdentity()

    if (parentUnit != null) {
      parentUnit.apply(unit, transform.localToWorld)
      transform2D.transform(transform.localToWorld)
    }

    parentTransform.localToWorld.multiplyWithMatrix(
      transform.localToWorld, transform.localToWorld
    )
    transform.localToWorld.transpose()

    transform.localToWorld.invert(transform.worldToLocal)
  }

  /**
  * Recompute the transformation of the given entity by using an existing and alone Unit component.
  *
  * @param {number} entity - The entity to refresh.
  */
  commitUnit (entity) {
    const transform = this.manager.getInstance(entity, Transformation)
    const parentTransform = this.getParentTransformation(entity)
    const unit = this._units.get(entity)
    const parentUnit = this._units.getParent(entity)

    transform.localToWorld.toIdentity()
    parentTransform.localToWorld.multiplyWithMatrix(
      transform.localToWorld,
      transform.localToWorld
    )

    if (parentUnit != null) {
      parentUnit.apply(unit, transform.localToWorld)
    }

    transform.localToWorld.invert(transform.worldToLocal)
  }

  /**
  * Commit all entities with a Transformation component.
  */
  commitAll () {
    const entities = this.manager.getEntitiesWithType(Transformation)

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
  * @param {number} entity - Entity to validate.
  *
  * @return {boolean} True if the given entity does not have a parent with a transformation component.
  */
  isRootTransformation (entity) {
    if (this._hierarchy.isRoot(entity)) return true

    let current = this._hierarchy.getParentOf(entity)

    do {
      if (this.manager.hasComponent(current, Transformation)) {
        return true
      }

      current = this._hierarchy.getParentOf(entity)
    } while (current != null)

    return false
  }

  /**
  * Return the parent transformation of the given entity.
  *
  * @param {number} entity - An entity to search.
  *
  * @return {Transformation} The parent transformation of the given entity.
  */
  getParentTransformation (entity) {
    if (this._hierarchy.isRoot(entity)) return Transformation.IDENTITY

    return this.getTransformation(this._hierarchy.getParentOf(entity))
  }

  /**
  * Return the transformation that is applied to the given entity.
  *
  * @param {number} entity - An entity to search.
  *
  * @return {Transformation} The transformation applied to the given entity.
  */
  getTransformation (entity) {
    let current = entity

    do {
      if (this.manager.hasComponent(current, Transformation)) {
        return this.manager.getInstance(current, Transformation)
      }

      current = this._hierarchy.getParentOf(entity)
    } while (current != null)

    return Transformation.IDENTITY
  }
}
