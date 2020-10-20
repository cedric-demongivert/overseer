import { Matrix4f } from '@cedric-demongivert/gl-tool-math'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'
import { Component } from '@cedric-demongivert/gl-tool-ecs'
import { Program } from '@cedric-demongivert/gl-tool-shader'
import { WebGLUniforms } from '@cedric-demongivert/gl-tool-shader'
import { WebGLAttributes } from '@cedric-demongivert/gl-tool-shader'
import { Geometry } from '@cedric-demongivert/gl-tool-buffer'
import { WebGLBufferUsage } from '@cedric-demongivert/gl-tool-buffer'

import { Mesh } from '../components/Mesh'
import { Transformation } from '../components/Transformation'
import { Camera } from '../components/Camera'
import { Unit } from '../components/Unit'

import { MeshType } from '../types/MeshType'

import { WebGLRenderingPass } from './WebGLRenderingPass'
import { OverseerSystem } from './OverseerSystem'
import { TransformationManagementSystem } from './TransformationManagementSystem'
import { UnitManagementSystem } from './UnitManagementSystem'
import { WebGLRenderingSystem } from './WebGLRenderingSystem'

export class WebGLMeshRenderingSystem extends OverseerSystem {
  public transformation : TransformationManagementSystem
  public unit : UnitManagementSystem

  private readonly _worldToView : Matrix4f
  private readonly _viewToWorld : Matrix4f
  private readonly _worldtoLocal : Matrix4f
  private readonly _localToWorld : Matrix4f

  private readonly _uniforms : WebGLUniforms
  private readonly _attributes : WebGLAttributes

  /**
  * Create a new system that render meshes.
  */
  public constructor () {
    super()
    this.transformation = null
    this.unit = null

    this._worldToView = new Matrix4f()
    this._viewToWorld = new Matrix4f()
    this._worldtoLocal = new Matrix4f()
    this._localToWorld = new Matrix4f()

    this._uniforms = new WebGLUniforms()
    this._attributes = new WebGLAttributes()
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
  * Render the given entity.
  *
  * @param pass - The rendering pass information.
  * @param entity - An entity to render as a mesh.
  */
  public renderEntityWithWebGL (pass : WebGLRenderingPass, entity : Entity) : void {
    if (this.manager.hasComponent(entity, MeshType)) {
      this.renderMeshWithWebGL(pass, entity)
    }
  }

  /**
  * Render the given mesh.
  *
  * @param pass - The rendering pass information.
  * @param entity - The entity to render.
  */
  public renderMeshWithWebGL (pass : WebGLRenderingPass, entity : Entity) : void {
    const gl : WebGLRenderingContext = pass.context.context
    const mesh : Mesh = this.manager.getComponentOfEntity(entity, MeshType).data

    const program : Program = mesh.material.data.program.data
    const geometry : Geometry = mesh.geometry.data

    pass.context.programs.bootstrap(program.identifier)
    pass.context.programs.use(program.identifier)

    this._attributes.handle(gl, pass.context.programs.getProgram(program.identifier))
    this._uniforms.handle(gl, pass.context.programs.getProgram(program.identifier))

    this.computeTransformationMatrices(pass.camera, entity)
    this.commitTransformationMatrices()

    pass.context.geometries.bootstrap(geometry.identifier, WebGLBufferUsage.STATIC_DRAW)
    pass.context.geometries.bind(geometry.identifier)

    this.commitVertices(pass.context, geometry)

    gl.drawElements(
      gl.TRIANGLES,
      geometry.faces.size * 3,
      gl.UNSIGNED_SHORT,
      0
    )
  }

  private commitVertices (context : WebGLRenderingSystem, geometry : Geometry) : void {
    const attributes : WebGLAttributes = this._attributes

    for (const field of geometry.vertices.format.fields) {
      if (attributes.attributes.has(field.name)){
        context.geometries.upload(field, attributes.attributes.get(field.name).location)
      }
    }
  }

  private commitTransformationMatrices () : void {
    const uniforms : WebGLUniforms = this._uniforms

    uniforms.setIfExists('localToWorld', false, this._localToWorld.buffer)
    uniforms.setIfExists('worldToLocal', false, this._worldtoLocal.buffer)
    uniforms.setIfExists('worldToView', false, this._worldToView.buffer)
    uniforms.setIfExists('viewToWorld', false, this._viewToWorld.buffer)
  }

  private computeTransformationMatrices (camera : Component<Camera>, entity : Entity) : void {
    const transform : Transformation = this.transformation.getTransformation(entity)

    const meshUnit : Unit = this.unit.getUnit(entity)
    const viewUnit : Unit = this.unit.getUnit(camera.entity)

    this._worldToView.copy(camera.data.worldToView)
    viewUnit.applyToMatrix(meshUnit, this._worldToView)
    this._viewToWorld.copy(camera.data.viewToWorld)
    meshUnit.applyToMatrix(viewUnit, this._viewToWorld)

    this._worldtoLocal.copy(transform.worldToLocal)
    this._localToWorld.copy(transform.localToWorld)
  }
}
