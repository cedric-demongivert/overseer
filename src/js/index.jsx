import '@babel/polyfill'

import React from 'react'
import { render } from 'react-dom'

import {
  EntityComponentSystem,
  EntityComponentSystemBuilder
} from '@cedric-demongivert/gl-tool-ecs'

import { ecs } from '@redux'

import {
  TransformationSystem,
  CameraSystem
} from './systems'

import { Viewport, OrthographicCamera2D, Unit } from './components'
import { EntityComponentSystemEditor } from './editor'
import { initializeSampleScene } from './initializeSampleScene'

const builder = new EntityComponentSystemBuilder()
const entityComponentSystem = new EntityComponentSystem(builder)
const transformations = new TransformationSystem()
const cameras = new CameraSystem()

initializeSampleScene(entityComponentSystem)

entityComponentSystem.addSystem(transformations)
entityComponentSystem.addSystem(cameras)

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
    const unit = ecs.getInstance(cameraEntity, Unit)

    camera.setWidth(width / 40)
    camera.setHeight(height / 40)
    camera.setCenter(0, 0)

    unit.set('0.1cm')

    transformations.commit(cameraEntity)
    cameras.commit(cameraEntity)
  }
}

transformations.commitAll()
cameras.commitAll()

function onChange (event) {
  ecs.reduce(entityComponentSystem, event)
  refresh()
}

function refresh () {
  render(
    (
      <EntityComponentSystemEditor
        entityComponentSystem={entityComponentSystem}
        onSizeChange={onSizeChange}
        onChange={onChange}
      />
    ), document.getElementById('application')
  )
}

refresh()
