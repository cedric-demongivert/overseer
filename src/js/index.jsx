import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import { EntityComponentSystemEditor } from './editor/EntityComponentSystemEditor'

import {
  EntityComponentSystem,
  EntityFactory
} from './ecs'

import {
  Viewport,
  OrthographicCamera2D,
  overseerMeshStructure,
  Program,
  Geometry,
  Transform,
  Material,
  Buffer,
  Shader,
  Mesh
} from './overseer'

import { RenderingLoop } from './RenderingLoop'

const entityComponentSystem = new EntityComponentSystem()
const entities = new EntityFactory(entityComponentSystem)

// initialisation : vue
const view = entities.create()

view.create(Viewport)
    .setBackground(0.075, 0.1, 0.15)

const viewport = view.get(Viewport)

view.create(OrthographicCamera2D)
    .setCenter(0, 0)
    .setUnit('1cm')

viewport.camera = view.get(OrthographicCamera2D)

// initialisation : geometry
const geometry = entities.create()

const triangleHeight = Math.sqrt(0.75)
geometry.create(Buffer.Structure.Grouped, overseerMeshStructure, 3)
        .push(3)
        .setPosition(0, -0.5, -1/3 * triangleHeight)
        .setPosition(1, 0, 2/3 * triangleHeight)
        .setPosition(2, 0.5, -1/3 * triangleHeight)
        .setUv(0, 0, 0)
        .setUv(1, 0.5, 1)
        .setUv(2, 1, 0)
        .setColor(0, 1, 0, 0, 1)
        .setColor(1, 0, 1, 0, 1)
        .setColor(2, 0, 0, 1, 1)

geometry.create(Buffer.Face)
        .push(0, 1, 2)

geometry.create(Geometry)
        .setVertexBuffer(geometry.get(Buffer.Structure.Grouped))
        .setFaceBuffer(geometry.get(Buffer.Face))

// initialisation : material
const material = entities.create()

material.create(Shader.Fragment, require('@shaders/basic.frag'))
material.create(Shader.Vertex, require('@shaders/basic.vert'))
material.create(
  Program,
  material.get(Shader.Vertex),
  material.get(Shader.Fragment)
)
material.create(Material)
        .setProgram(material.get(Program))

const mesh = entities.create()

mesh.create(Mesh)
    .setGeometry(geometry.get(Geometry))
    .setMaterial(material.get(Material))

mesh.create(Transform)
    .setPosition(0, 0)
    .setSize(10, 10)
    .setUnit('1cm')

new RenderingLoop(function (delta) {
  entityComponentSystem.update(delta)
  mesh.get(Transform).rotate((2 * Math.PI) * delta * 0.1)
}).start()

function onSizeChange (width, height) {
  viewport.setWidth(width)
          .setHeight(height)
          .setLeft(0)
          .setBottom(0)

  viewport.camera.setWidth(width / 40)
                 .setHeight(height / 40)
                 .setCenter(0, 0)
                 .setUnit('1cm')
}

const state = {
  isEntitiesPanelOpen: false,
  isComponentsPanelOpen: false
}

function handleEntitiesPanelToggle () {
  state.isEntitiesPanelOpen = !state.isEntitiesPanelOpen
  doRender()
}

function handleComponentsPanelToggle () {
  state.isComponentsPanelOpen = !state.isComponentsPanelOpen
  doRender()
}

function doRender () {
  render(
    (
      <EntityComponentSystemEditor
        entityComponentSystem={entityComponentSystem}
        onSizeChange={onSizeChange}
        onEntitiesPanelToggle={handleEntitiesPanelToggle}
        onComponentsPanelToggle={handleComponentsPanelToggle}
        {...state}
      />
    ), document.getElementById('application')
  )
}

doRender()
