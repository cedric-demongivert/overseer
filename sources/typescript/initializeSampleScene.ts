import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { MetaEntity } from '@cedric-demongivert/gl-tool-ecs'

import { ShaderComponentType } from '@cedric-demongivert/gl-tool-shader'
import { ProgramComponentType } from '@cedric-demongivert/gl-tool-shader'
import { BufferComponentType } from '@cedric-demongivert/gl-tool-buffer'
import { GeometryComponentType } from '@cedric-demongivert/gl-tool-buffer'
import { VertexStructureBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { FaceBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { ShaderType } from '@cedric-demongivert/gl-tool-shader'

import { CameraType } from './types/CameraType'
import { DraggableType } from './types/DraggableType'
import { SquareGridType } from './types/SquareGridType'
import { HierarchyType } from './types/HierarchyType'
import { LabelType } from './types/LabelType'
import { LayerType } from './types/LayerType'
import { MaterialType } from './types/MaterialType'
import { MeshType } from './types/MeshType'
import { OrthographicCamera2DType } from './types/OrthographicCamera2DType'
import { TransformationType } from './types/TransformationType'
import { Transformation2DType } from './types/Transformation2DType'
import { UnitType } from './types/UnitType'
import { BoundingCircleType } from './types/BoundingCircleType'

import { OverseerMeshStructure } from './OverseerMeshStructure'

function createTypes (ecs : EntityComponentSystem) : void {
  ecs.addType(ShaderComponentType)
  ecs.addType(ProgramComponentType)
  ecs.addType(BufferComponentType)
  ecs.addType(GeometryComponentType)

  ecs.addType(CameraType)
  ecs.addType(HierarchyType)
  ecs.addType(LabelType)
  ecs.addType(LayerType)
  ecs.addType(MaterialType)
  ecs.addType(MeshType)
  ecs.addType(OrthographicCamera2DType)
  ecs.addType(TransformationType)
  ecs.addType(Transformation2DType)
  ecs.addType(UnitType)
  ecs.addType(SquareGridType)
  ecs.addType(BoundingCircleType)
  ecs.addType(DraggableType)
}

function createGrid (ecs : EntityComponentSystem) : MetaEntity {
  const grid : MetaEntity = new MetaEntity(ecs, ecs.createEntity())

  grid.createComponent(LayerType)
  grid.createComponent(LabelType)
  grid.createComponent(UnitType)
  grid.createComponent(SquareGridType)

  grid.getComponent(LabelType).data = 'grid'
  grid.getComponent(UnitType).data.length.set('3m')

  grid.getComponent(SquareGridType).data.setUnit(1, 1)
  grid.getComponent(SquareGridType).data.setColor(0, 0, 0, 0.25)
  grid.getComponent(SquareGridType).data.thickness = 1
  grid.getComponent(SquareGridType).data.base = 10
  grid.getComponent(LayerType).data = 1

  return grid
}

function createSubGrid (ecs : EntityComponentSystem) : MetaEntity {
  const grid : MetaEntity = new MetaEntity(ecs, ecs.createEntity())

  grid.createComponent(LayerType)
  grid.createComponent(LabelType)
  grid.createComponent(UnitType)
  grid.createComponent(SquareGridType)

  grid.getComponent(LabelType).data = 'grid'
  grid.getComponent(UnitType).data.length.set('3dm')

  grid.getComponent(SquareGridType).data.setUnit(1, 1)
  grid.getComponent(SquareGridType).data.setColor(0.98, 0.98, 0.98, 1)
  grid.getComponent(SquareGridType).data.thickness = 1
  grid.getComponent(LayerType).data = 0

  return grid
}

function createGeometry (ecs : EntityComponentSystem) : MetaEntity {
  const geometry : MetaEntity = new MetaEntity(ecs, ecs.createEntity())

  geometry.createComponent(LabelType)
  geometry.createComponent(GeometryComponentType)

  const vertexBuffer : VertexStructureBuffer = VertexStructureBuffer.grouped(OverseerMeshStructure, 3)
  const faceBuffer : FaceBuffer = FaceBuffer.empty(2)
  const triangleHeight : number = Math.sqrt(0.75)

  vertexBuffer.push()
  vertexBuffer.push()
  vertexBuffer.push()
  vertexBuffer.setPosition(0, -0.5, -1/3 * triangleHeight)
  vertexBuffer.setPosition(1, 0, 2/3 * triangleHeight)
  vertexBuffer.setPosition(2, 0.5, -1/3 * triangleHeight)
  vertexBuffer.setUv(0, 0, 0)
  vertexBuffer.setUv(1, 0.5, 1)
  vertexBuffer.setUv(2, 1, 0)
  vertexBuffer.setColor(0, 1, 0, 0, 1)
  vertexBuffer.setColor(1, 0, 1, 0, 1)
  vertexBuffer.setColor(2, 0, 0, 1, 1)

  faceBuffer.push(0, 1, 2)
  faceBuffer.push(2, 1, 0)

  geometry.getComponent(LabelType).data = 'geometry'
  geometry.getComponent(GeometryComponentType).data.vertices = vertexBuffer
  geometry.getComponent(GeometryComponentType).data.faces = faceBuffer

  return geometry
}

function createMaterial (ecs : EntityComponentSystem) : MetaEntity {
  const fragment : MetaEntity = new MetaEntity(ecs, ecs.createEntity())
  const vertex : MetaEntity = new MetaEntity(ecs, ecs.createEntity())
  const program : MetaEntity = new MetaEntity(ecs, ecs.createEntity())

  const material : MetaEntity = new MetaEntity(ecs, ecs.createEntity())

  fragment.createComponent(ShaderComponentType, ShaderType.FRAGMENT)
  vertex.createComponent(ShaderComponentType, ShaderType.VERTEX)
  program.createComponent(ProgramComponentType)
  material.createComponent(MaterialType)

  fragment.getComponent(ShaderComponentType).data.source.set(require('../shaders/basic.frag').default)
  vertex.getComponent(ShaderComponentType).data.source.set(require('../shaders/basic.vert').default)

  program.getComponent(ProgramComponentType).data.vertex = vertex.getComponent(ShaderComponentType)
  program.getComponent(ProgramComponentType).data.fragment = fragment.getComponent(ShaderComponentType)

  material.getComponent(MaterialType).data.program = program.getComponent(ProgramComponentType)

  return material
}

function createMesh (ecs : EntityComponentSystem) : MetaEntity {
  const geometry : MetaEntity = createGeometry(ecs)
  const material : MetaEntity = createMaterial(ecs)

  const mesh : MetaEntity = new MetaEntity(ecs, ecs.createEntity())

  mesh.createComponent(LayerType)
  mesh.createComponent(LabelType)
  mesh.createComponent(MeshType)
  mesh.createComponent(BoundingCircleType)
  mesh.createComponent(TransformationType)
  mesh.createComponent(Transformation2DType)
  mesh.createComponent(UnitType)

  mesh.getComponent(LabelType).data = 'mesh'
  mesh.getComponent(MeshType).data.geometry = geometry.getComponent(GeometryComponentType)
  mesh.getComponent(MeshType).data.material = material.getComponent(MaterialType)
  mesh.getComponent(Transformation2DType).data.location.set(0, 0)
  mesh.getComponent(Transformation2DType).data.size.set(1, 1)
  mesh.getComponent(BoundingCircleType).data.center.set(0, 0)
  mesh.getComponent(BoundingCircleType).data.radius = 1
  mesh.getComponent(UnitType).data.length.set('3m')
  mesh.getComponent(LayerType).data = 2

  console.log('mesh ' + mesh.identifier)

  return mesh
}

export function initializeSampleScene (ecs : EntityComponentSystem) : void {
  createTypes(ecs)
  createMesh(ecs)
  createGrid(ecs)
  //createSubGrid(ecs)
}
