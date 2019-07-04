import { Camera } from '../components/Camera'
import { OrthographicCamera2D } from '../components/OrthographicCamera2D'
import { Transformation } from '../components/Transformation'

import { OverseerSystem } from './OverseerSystem'
import { TransformationSystem } from './TransformationSystem'

export class CameraSystem extends OverseerSystem {
  constructor () {
    super()
    this._transformations = null
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  initialize () {
    this._transformations = this.require(TransformationSystem)
  }

  /**
  * Refresh all existing camera matrices.
  */
  commitAll () {
    const entities = this._manager.getEntitiesWithType(Camera)

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
}
