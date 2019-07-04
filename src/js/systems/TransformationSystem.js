import { Transformation } from '../components/Transformation'
import { Transformation2D } from '../components/Transformation2D'
import { Unit } from '../components/Unit'
import { Hierarchy } from '../components/Hierarchy'
import { OverseerSystem } from './OverseerSystem'

export class TransformationSystem extends OverseerSystem {
  /**
  * Refresh each transformation matrices of the given entity.
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
  }

  /**
  * Refresh each transformation matrices of the each child entity of the given entity.
  *
  * @param {number} entity - The entity to process.
  */
  commitChildrenOf (entity) {
    if (this.manager.hasComponent(entity, Hierarchy)) {
      const hierarchy = this.manager.getInstance(entity, Hierarchy)

      for (const child of hierarchy.children()) {
        this.commit(this.manager.getEntityOfInstance(child))
      }
    }
  }

  /**
  * Refresh each transformation matrices of the given entity by using an existing Transformation2D component.
  *
  * @param {number} entity - The entity to refresh.
  */
  commitTransformation2D (entity) {
    const transform2D = this.manager.getInstance(entity, Transformation2D)
    const transform = this.manager.getInstance(entity, Transformation)
    const parentTransform = this.getParentTransformation(entity)
    const unit = this.getUnit(entity)
    const parentUnit = this.getParentUnit(entity)

    transform.localToWorld.toIdentity()
    parentUnit.apply(unit, transform.localToWorld)
    transform2D.transform(transform.localToWorld)
    parentTransform.localToWorld.multiplyWithMatrix(
      transform.localToWorld,
      transform.localToWorld
    )

    transform.localToWorld.invert(transform.worldToLocal)

    this.commitChildrenOf(entity)
  }

  /**
  * Refresh each transformation matrices of the given entity by using an existing and alone Unit component.
  *
  * @param {number} entity - The entity to refresh.
  */
  commitUnit (entity) {
    const transform = this.manager.getInstance(entity, Transformation)
    const parentTransform = this.getParentTransformation(entity)
    const unit = this.getUnit(entity)
    const parentUnit = this.getParentUnit(entity)

    transform.localToWorld.toIdentity()
    parentTransform.localToWorld.multiplyWithMatrix(
      transform.localToWorld,
      transform.localToWorld
    )
    parentUnit.apply(unit, transform.localToWorld)
    transform.localToWorld.invert(transform.worldToLocal)

    this.commitChildrenOf(entity)
  }

  /**
  * Commit all entities with a Transformation component.
  */
  commitAll () {
    const entities = this.manager.getEntitiesWithType(Transformation)

    for (let index = 0, size = entities.size; index < size; ++index) {
      const entity = entities.get(index)

      if (!this.hasParentWithTransformation(entity)) {
        this.commit(entity)
      }
    }
  }

  /**
  * Return true if the given entity has a parent with a transformation component.
  *
  * @param {number} entity - Entity to validate.
  *
  * @return {boolean} True if the given entity has a parent with a transformation component.
  */
  hasParentWithTransformation (entity) {
    if (!this.manager.hasComponent(entity, Hierarchy)) {
      return false
    }

    let hierarchy = this.manager.getInstance(entity, Hierarchy)

    while (hierarchy.parent) {
      const parent = this.manager.getEntityOfInstance(hierarchy.parent)

      if (this.manager.hasComponent(parent, Transformation)) {
        return true
      }

      hierarchy = hierarchy.parent
    }

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
    if (!this.manager.hasComponent(entity, Hierarchy)) {
      return Transformation.IDENTITY
    }

    let hierarchy = this.manager.getInstance(entity, Hierarchy)

    while (hierarchy.parent) {
      const parent = this.manager.getEntityOfInstance(hierarchy.parent)

      if (this.manager.hasComponent(parent, Transformation)) {
        return this.manager.getInstance(parent, Transformation)
      }

      hierarchy = hierarchy.parent
    }

    return Transformation.IDENTITY
  }

  /**
  * Return the transformation that is applied to the given entity.
  *
  * @param {number} entity - An entity to search.
  *
  * @return {Transformation} The transformation applied to the given entity.
  */
  getTransformation (entity) {
    if (this.manager.hasComponent(entity, Transformation)) {
      return this.manager.getInstance(entity, Transformation)
    }

    return this.getParentTransformation(entity)
  }

  /**
  * Return the parent unit of the given entity.
  *
  * @param {number} entity - An entity to search.
  *
  * @return {Transformation} The parent unit of the given entity.
  */
  getParentUnit (entity) {
    if (!this.manager.hasComponent(entity, Hierarchy)) {
      return Unit.DEFAULT
    }

    let hierarchy = this.manager.getInstance(entity, Hierarchy)

    while (hierarchy.parent) {
      const parent = this.manager.getEntityOfInstance(hierarchy.parent)

      if (this.manager.hasComponent(parent, Unit)) {
        return this.manager.getInstance(parent, Unit)
      }

      hierarchy = hierarchy.parent
    }

    return Unit.DEFAULT
  }

  /**
  * Return the unit that is applied to the given entity.
  *
  * @param {number} entity - An entity to search.
  *
  * @return {Unit} The unit applied to the given entity.
  */
  getUnit (entity) {
    if (this.manager.hasComponent(entity, Unit)) {
      return this.manager.getInstance(entity, Unit)
    }

    return this.getParentUnit(entity)
  }
}
