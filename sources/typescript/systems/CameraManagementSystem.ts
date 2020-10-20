import { Sequence } from '@cedric-demongivert/gl-tool-collection'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import { Camera } from '../components/Camera'
import { OrthographicCamera2D } from '../components/OrthographicCamera2D'
import { Transformation } from '../components/Transformation'

import { CameraType } from '../types/CameraType'
import { OrthographicCamera2DType } from '../types/OrthographicCamera2DType'

import { OverseerSystem } from './OverseerSystem'
import { TransformationManagementSystem } from './TransformationManagementSystem'
import { UnitManagementSystem } from './UnitManagementSystem'

export class CameraManagementSystem extends OverseerSystem {
  public transformation : TransformationManagementSystem
  public unit : UnitManagementSystem

  public constructor () {
    super()
    this.transformation = null
    this.unit = null
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  public initialize () : void {
    this.transformation = this.manager.requireSystem(TransformationManagementSystem)
    this.unit = this.manager.requireSystem(UnitManagementSystem)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  public destroy () : void {
    this.transformation = null
    this.unit = null
  }

  /**
  * Refresh all existing camera matrices.
  */
  public commitAll () : void {
    const entities : Sequence<Entity> = this.manager.getEntitiesWithType(CameraType)

    for (let index = 0, size = entities.size; index < size; ++index) {
      this.commit(entities.get(index))
    }
  }

  /**
  * Refresh the camera matrix of the given entity.
  *
  * @param entity - The entity to recompute.
  */
  public commit (entity : Entity) {
    if (this.manager.hasComponent(entity, OrthographicCamera2DType)) {
      this.commitOrthographicCamera2D(entity)
    }
  }

  /**
  * Refresh the camera matrix of the given entity by using an existing OrthographicCamera2D component.
  *
  * @param entity - The entity to refresh.
  */
  public commitOrthographicCamera2D (entity : Entity) : void {
    const orthographicCamera : OrthographicCamera2D = this.manager.getComponentOfEntity(entity, OrthographicCamera2DType).data
    const camera : Camera = this.manager.getComponentOfEntity(entity, CameraType).data
    const transformation : Transformation = this.transformation.getTransformation(entity)

    orthographicCamera.extractWorldToView(camera.worldToView)
    transformation.worldToLocal.multiplyWithMatrix(
      camera.worldToView,
      camera.worldToView
    )
    camera.worldToView.invert(camera.viewToWorld)
  }
}
