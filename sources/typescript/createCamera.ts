import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { MetaEntity } from '@cedric-demongivert/gl-tool-ecs'

import { CameraType } from './types/CameraType'
import { DraggableType } from './types/DraggableType'
import { LabelType } from './types/LabelType'
import { OrthographicCamera2DType } from './types/OrthographicCamera2DType'
import { TransformationType } from './types/TransformationType'
import { UnitType } from './types/UnitType'

export function createCamera (ecs : EntityComponentSystem) : MetaEntity {
  const camera : MetaEntity = new MetaEntity(ecs, ecs.createEntity())

  camera.createComponent(LabelType)
  camera.createComponent(CameraType)
  camera.createComponent(TransformationType)
  camera.createComponent(OrthographicCamera2DType)
  camera.createComponent(UnitType)
  camera.createComponent(DraggableType)

  camera.getComponent(LabelType).data = 'camera'
  camera.getComponent(OrthographicCamera2DType).data.setCenter(0, 0)
  camera.getComponent(UnitType).data.length.set('1m')

  return camera
}
