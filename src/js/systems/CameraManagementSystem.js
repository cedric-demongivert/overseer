import { Camera } from '../components/Camera'
import { OrthographicCamera2D } from '../components/OrthographicCamera2D'
import { Transformation } from '../components/Transformation'

import { OverseerSystem } from './OverseerSystem'
import { TransformationManagementSystem } from './TransformationManagementSystem'
import { UnitManagementSystem } from './UnitManagementSystem'

export class CameraManagementSystem extends OverseerSystem {
  constructor () {
    super()
    this._transformations = null
    this._units = null
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  initialize () {
    this._transformations = this.manager.requireSystem(TransformationManagementSystem)
    this._units = this.manager.requireSystem(UnitManagementSystem)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  destroy () {
    this._transformations = null
    this._units = null
  }

  /**
  * Refresh all existing camera matrices.
  */
  commitAll () {
    const entities = this.manager.getEntitiesWithType(Camera)

    for (let index = 0, size = entities.size; index < size; ++index) {
      this.commit(entities.get(index))
    }
  }

  /**
  * Refresh the camera matrix of the given entity.
  *
  * @param {number} entity - The entity to recompute.
  */
  commit (entity) {
    if (this.manager.hasComponent(entity, Camera)) {
      if (this.manager.hasComponent(entity, OrthographicCamera2D)) {
        this.commitOrthographicCamera2D(entity)
      }
    }
  }

  /**
  * Refresh the camera matrix of the given entity by using an existing OrthographicCamera2D component.
  *
  * @param {number} entity - The entity to refresh.
  */
  commitOrthographicCamera2D (entity) {
    const manager = this.manager
    const orthographicCamera = manager.getInstance(entity, OrthographicCamera2D)
    const camera = manager.getInstance(entity, Camera)
    const transformation = this._transformations.getTransformation(entity)

    orthographicCamera.extractWorldToView(camera.worldToView)
    transformation.worldToLocal.multiplyWithMatrix(
      camera.worldToView,
      camera.worldToView
    )
    camera.worldToView.invert(camera.viewToWorld)
  }

  /**
  * Return the orthographic 2D data of a camera if any.
  *
  * @param {Camera} camera - An instance of camera.
  *
  * @return {OrthographicCamera2D} The orthographic 2D data of the given camera if any.
  */
  getOrthographic2D (camera) {
    const entity = this.manager.getEntityOfInstance(camera)

    if (this.manager.hasComponent(entity, OrthographicCamera2D)) {
      return this.manager.getInstance(entity, OrthographicCamera2D)
    } else {
      return null
    }
  }

  /**
  * Resolve and return the unit of a given camera.
  *
  * @param {Camera} camera - An instance of camera.
  *
  * @return {Unit} The unit of the given camera.
  */
  getUnitOf (camera) {
    return this._units.get(this.manager.getEntityOfInstance(camera))
  }
}
