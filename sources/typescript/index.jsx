import '@babel/polyfill'

import React from 'react'
import { render } from 'react-dom'

import {
  EntityComponentSystem,
  EntityComponentSystemBuilder
} from '@cedric-demongivert/gl-tool-ecs'

import { ecs } from '@redux'

import {
  TransformationManagementSystem,
  CameraManagementSystem,
  HierarchyManagementSystem,
  UnitManagementSystem,
  LayerManagementSystem,
  GLToolGridSystem,
  DOMMouseSourceSystem,
  MouseManagementSystem,
  Camera2DDraggingSystem,
  ShapeManagementSystem,
  MouseButton
} from './systems'

import { Viewport, OrthographicCamera2D, Unit } from './components'
import { EntityComponentSystemRenderer, Scales } from './editor'
import { initializeSampleScene } from './initializeSampleScene'

// entity component system
const builder = new EntityComponentSystemBuilder()
const entityComponentSystem = new EntityComponentSystem(builder)

// systems
const hierarchy = new HierarchyManagementSystem()
const units = new UnitManagementSystem()
const transformations = new TransformationManagementSystem()
const layers = new LayerManagementSystem()
const cameras = new CameraManagementSystem()
const mouse = new MouseManagementSystem()
const shapes = new ShapeManagementSystem()
const grid = new GLToolGridSystem()
const cameraDragging = new Camera2DDraggingSystem()

// initialization
initializeSampleScene(entityComponentSystem)

entityComponentSystem.addSystem(mouse)
entityComponentSystem.addSystem(hierarchy)
entityComponentSystem.addSystem(units)
entityComponentSystem.addSystem(layers)
entityComponentSystem.addSystem(transformations)
entityComponentSystem.addSystem(cameras)
entityComponentSystem.addSystem(shapes)
entityComponentSystem.addSystem(grid)
entityComponentSystem.addSystem(cameraDragging)

function onSizeChange ({ width, height }) {
  const ecs = entityComponentSystem
  const entities = entityComponentSystem.getEntitiesWithType(Viewport)

  for (let index = 0, size = entities.size; index < size; ++index) {
    const entity = entities.get(index)
    const viewport = ecs.getInstance(entity, Viewport)

    viewport.setWidth(width)
    viewport.setHeight(height)
    viewport.setLeft(0)
    viewport.setBottom(0)

    const cameraEntity = ecs.getEntityOfInstance(viewport.camera)
    const camera = ecs.getInstance(cameraEntity, OrthographicCamera2D)

    camera.setWidth(width / 40)
    camera.setHeight(height / 40)
    camera.setCenter(0, 0)

    transformations.commit(cameraEntity)
    cameras.commit(cameraEntity)
  }
}

transformations.commitAll()
cameras.commitAll()
layers.commitAll()

function handleInitialization (root) {
  entityComponentSystem.addSystem(new DOMMouseSourceSystem(root))
}

// <Scales entityComponentSystem={entityComponentSystem} />
function refresh () {
  render(
    (
      <EntityComponentSystemRenderer
        entityComponentSystem={entityComponentSystem}
        onSizeChange={onSizeChange}
        onInitialization={handleInitialization}
      >

      </EntityComponentSystemRenderer>
    ), document.getElementById('application')
  )
}

refresh()

function animate (delta) {
  const rdelta = (animate.START == null) ? 0 : delta - animate.START
  if (animate.START == null) animate.START = delta

  entityComponentSystem.update(delta)

  window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
