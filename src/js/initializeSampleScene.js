import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import {
  Camera,
  FaceBuffer,
  FragmentShader,
  Geometry,
  SquareGrid,
  Hierarchy,
  Label,
  Layer,
  Material,
  Mesh,
  OrthographicCamera2D,
  Program,
  Transformation,
  Transformation2D,
  Unit,
  VertexBuffer,
  VertexShader,
  Viewport
} from './components'

import {
  OverseerMeshStructure
} from './OverseerMeshStructure'

function createTypes (ecs) {
  ecs.createType(Camera)
  ecs.createType(FaceBuffer)
  ecs.createType(FragmentShader)
  ecs.createType(Geometry)
  ecs.createType(Hierarchy)
  ecs.createType(Label)
  ecs.createType(Layer)
  ecs.createType(Material)
  ecs.createType(Mesh)
  ecs.createType(OrthographicCamera2D)
  ecs.createType(Program)
  ecs.createType(Transformation)
  ecs.createType(Transformation2D)
  ecs.createType(Unit)
  ecs.createType(VertexBuffer)
  ecs.createType(VertexShader)
  ecs.createType(SquareGrid)
  ecs.createType(Viewport)
}

function createGrid (ecs) {
  const grid = new Entity(ecs, ecs.createEntity())

  grid.createComponent(Layer)
  grid.createComponent(Label)
  grid.createComponent(Unit)
  grid.createComponent(SquareGrid)

  grid.getInstance(Label).set('grid')
  grid.getInstance(Unit).set('3m')

  grid.getInstance(SquareGrid).setUnit(1, 1)
  grid.getInstance(SquareGrid).setColor(0.80, 0.80, 0.80, 1)
  grid.getInstance(SquareGrid).thickness = 1
  grid.getInstance(Layer).set(1)

  return grid
}

function createSubGrid (ecs) {
  const grid = new Entity(ecs, ecs.createEntity())

  grid.createComponent(Layer)
  grid.createComponent(Label)
  grid.createComponent(Unit)
  grid.createComponent(SquareGrid)

  grid.getInstance(Label).set('grid')
  grid.getInstance(Unit).set('3dm')

  grid.getInstance(SquareGrid).setUnit(1, 1)
  grid.getInstance(SquareGrid).setColor(0.98, 0.98, 0.98, 1)
  grid.getInstance(SquareGrid).thickness = 1
  grid.getInstance(Layer).set(0)

  return grid
}

function createCamera (ecs) {
  const camera = new Entity(ecs, ecs.createEntity())

  camera.createComponent(Label)
  camera.createComponent(Camera)
  camera.createComponent(Transformation)
  camera.createComponent(OrthographicCamera2D)
  camera.createComponent(Unit)

  camera.getInstance(Label).set('camera')
  camera.getInstance(OrthographicCamera2D).setCenter(0, 0)
  camera.getInstance(Unit).set('1m')

  return camera
}

function createView (ecs) {
  const camera = createCamera(ecs)
  const view = new Entity(ecs, ecs.createEntity())

  view.createComponent(Label)
  view.createComponent(Viewport)

  view.getInstance(Label).set('view')
  view.getInstance(Viewport).setBackground(0.99, 0.99, 0.99)
  view.getInstance(Viewport).setCamera(camera.getInstance(Camera))

  return view
}

function createGeometry (ecs) {
  const geometry = new Entity(ecs, ecs.createEntity())

  geometry.createComponent(Label)
  geometry.createComponent(FaceBuffer)
  geometry.createComponent(VertexBuffer)
  geometry.createComponent(Geometry)

  geometry.getInstance(Label).set('geometry')

  const vertexBuffer = geometry.getInstance(VertexBuffer)
  const triangleHeight = Math.sqrt(0.75)

  vertexBuffer.instanciateGroupedBufferOf(OverseerMeshStructure)
  vertexBuffer.buffer.capacity = 3
  vertexBuffer.buffer
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

  geometry.getInstance(FaceBuffer).push(0, 1, 2)

  geometry.getInstance(Geometry)
          .setVertexBuffer(geometry.getInstance(VertexBuffer))

  geometry.getInstance(Geometry)
          .setFaceBuffer(geometry.getInstance(FaceBuffer))

  return geometry
}

function createMaterial (ecs) {
  const material = new Entity(ecs, ecs.createEntity())

  material.createComponent(Label)
  material.createComponent(FragmentShader)
  material.createComponent(VertexShader)
  material.createComponent(Program)
  material.createComponent(Material)

  material.getInstance(Label).set('material')
  material.getInstance(FragmentShader).source = require('@shaders/basic.frag').default
  material.getInstance(VertexShader).source = require('@shaders/basic.vert').default

  material.getInstance(Program).vertex = material.getInstance(VertexShader)
  material.getInstance(Program).fragment = material.getInstance(FragmentShader)
  material.getInstance(Material).setProgram(material.getInstance(Program))

  return material
}

function createMesh (ecs) {
  const geometry = createGeometry(ecs)
  const material = createMaterial(ecs)

  const mesh = new Entity(ecs, ecs.createEntity())

  mesh.createComponent(Layer)
  mesh.createComponent(Label)
  mesh.createComponent(Mesh)
  mesh.createComponent(Transformation)
  mesh.createComponent(Transformation2D)
  mesh.createComponent(Unit)

  mesh.getInstance(Label).set('mesh')
  mesh.getInstance(Mesh).setGeometry(geometry.getInstance(Geometry))
  mesh.getInstance(Mesh).setMaterial(material.getInstance(Material))
  mesh.getInstance(Transformation2D).setLocation(0, 0)
  mesh.getInstance(Transformation2D).setScale(1, 1)
  mesh.getInstance(Unit).set('3m')
  mesh.getInstance(Layer).set(2)
}

export function initializeSampleScene (ecs) {
  createTypes(ecs)
  createView(ecs)
  createMesh(ecs)
  createGrid(ecs)
  createSubGrid(ecs)
}
