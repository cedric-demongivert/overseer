import '@babel/polyfill'

import * as React from 'react'
import { render } from 'react-dom'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { EntityComponentSystemBuilder } from '@cedric-demongivert/gl-tool-ecs'
import { MetaEntity } from '@cedric-demongivert/gl-tool-ecs'

import { TransformationManagementSystem } from './systems/TransformationManagementSystem'
import { CameraManagementSystem } from './systems/CameraManagementSystem'
import { HierarchyManagementSystem } from './systems/HierarchyManagementSystem'
import { UnitManagementSystem } from './systems/UnitManagementSystem'
import { LayerManagementSystem } from './systems/LayerManagementSystem'
import { MouseManagementSystem } from './systems/input/MouseManagementSystem'
import { ShapeManagementSystem } from './systems/shapes/ShapeManagementSystem'
import { CameraDraggingSystem } from './systems/CameraDraggingSystem'

import { OrthographicCamera2DType } from './types/OrthographicCamera2DType'

import { EntityComponentSystemRenderer } from './ui/EntityComponentSystemRenderer'
import { initializeSampleScene } from './initializeSampleScene'
import { createCamera } from './createCamera'

// entity component system
const builder : EntityComponentSystemBuilder = new EntityComponentSystemBuilder()
const entityComponentSystem : EntityComponentSystem = new EntityComponentSystem(builder)

// systems
const hierarchyManagementSystem : HierarchyManagementSystem = new HierarchyManagementSystem()
const unitManagementSystem : UnitManagementSystem = new UnitManagementSystem()
const transformationManagementSystem : TransformationManagementSystem = new TransformationManagementSystem()
const layerManagementSystem : LayerManagementSystem = new LayerManagementSystem()
const cameraManagementSystem : CameraManagementSystem = new CameraManagementSystem()
const shapeManagementSystem : ShapeManagementSystem = new ShapeManagementSystem()
const mouseManagementSystem : MouseManagementSystem = new MouseManagementSystem()
const cameraDraggingSystem : CameraDraggingSystem = new CameraDraggingSystem()

// initialization
initializeSampleScene(entityComponentSystem)

entityComponentSystem.addSystem(hierarchyManagementSystem)
entityComponentSystem.addSystem(unitManagementSystem)
entityComponentSystem.addSystem(layerManagementSystem)
entityComponentSystem.addSystem(transformationManagementSystem)
entityComponentSystem.addSystem(cameraManagementSystem)
entityComponentSystem.addSystem(shapeManagementSystem)
entityComponentSystem.addSystem(mouseManagementSystem)
entityComponentSystem.addSystem(cameraDraggingSystem)

const camera : MetaEntity = createCamera(entityComponentSystem)

function onSizeChange ({ width, height }) : void {
  camera.getComponent(OrthographicCamera2DType).data.width = width / 40
  camera.getComponent(OrthographicCamera2DType).data.height = height / 40
  camera.getComponent(OrthographicCamera2DType).data.setCenter(0, 0)

  transformationManagementSystem.commit(camera.identifier)
  cameraManagementSystem.commit(camera.identifier)
}

transformationManagementSystem.commitAll()
cameraManagementSystem.commitAll()

function refresh () {
  render(
    (
      <EntityComponentSystemRenderer
        entityComponentSystem={entityComponentSystem}
        camera={camera.identifier}
        onSizeChange={onSizeChange}
      />
    ), document.getElementById('application')
  )
}

refresh()

const context: any = {}

function animate (delta : number) : void {
  entityComponentSystem.update(delta)
  window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
