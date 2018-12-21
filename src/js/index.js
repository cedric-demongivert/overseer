import 'babel-polyfill'

import { ignite } from './ignite'

import {
  OverseerScreen,
  EntityComponentSystem,
  EntityFactory,
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
} from './engine'


const overseer = new OverseerScreen(document.getElementById('app'))

const manager = new EntityComponentSystem()
const entities = new EntityFactory(manager)

// initialisation : vue
const view = entities.create()

view.create(Viewport)
    .setWidth(overseer.width)
    .setHeight(overseer.height)
    .setLeft(0)
    .setBottom(0)
    .setBackground(0.0, 0.0, 0.0)

const viewport = view.get(Viewport)

window.addEventListener('resize', function updateTargetSize () {
  viewport.setWidth(overseer.width)
          .setHeight(overseer.height)
          .setLeft(0)
          .setBottom(0)
})

view.create(OrthographicCamera2D)
    .setWidth(overseer.width / 40)
    .setHeight(overseer.height / 40)
    .setCenter(0, 0)
    .setUnit('1cm')

viewport.camera = view.get(OrthographicCamera2D)

window.addEventListener('resize', function updateTargetSize () {
  viewport.camera.setWidth(overseer.width / 40)
                 .setHeight(overseer.height / 40)
                 .setCenter(0, 0)
                 .setUnit('1cm')
})

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

overseer.map = manager

ignite(function (delta) {
  manager.update(delta)
  mesh.get(Transform).rotate((2 * Math.PI) * delta * 0.1)
  overseer.render()
})
