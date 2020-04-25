import { Matrix4f } from '@cedric-demongivert/gl-tool-math'
import { GLContext } from '@cedric-demongivert/gl-tool-core'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'
import { Component } from '@cedric-demongivert/gl-tool-ecs'
import { GLProgram } from '@cedric-demongivert/gl-tool-shader'
import { GLUniforms } from '@cedric-demongivert/gl-tool-shader'
import { GLAttributes } from '@cedric-demongivert/gl-tool-shader'
import { GLFaceBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { GLVertexStructureBuffer } from '@cedric-demongivert/gl-tool-buffer'

import { Mesh } from '../components/Mesh'
import { Transformation } from '../components/Transformation'
import { Viewport } from '../components/Viewport'
import { Camera } from '../components/Camera'
import { Unit } from '../components/Unit'

import { MeshType } from '../types/MeshType'

import { OverseerSystem } from './OverseerSystem'
import { TransformationManagementSystem } from './TransformationManagementSystem'
import { UnitManagementSystem } from './UnitManagementSystem'

export class GLToolMeshRenderingSystem extends OverseerSystem {
  public transformation : TransformationManagementSystem
  public unit : UnitManagementSystem

  private readonly _worldToView : Matrix4f
  private readonly _viewToWorld : Matrix4f
  private readonly _worldtoLocal : Matrix4f
  private readonly _localToWorld : Matrix4f

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
  }

  public get isGLToolRenderable () {
    return true
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  public initialize () : void {
    this.transformation = this.manager.requireSystem(TransformationManagementSystem) as TransformationManagementSystem
    this.unit = this.manager.requireSystem(UnitManagementSystem) as UnitManagementSystem
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  public destroy () : void {
    this.transformation = null
    this.unit = null
  }

  /**
  * Make a render pass for the given viewport.
  *
  * @param context - A rendering context to use.
  * @param viewport - The viewport to render.
  * @param entity - An entity to render as a mesh.
  */
  public render (context : GLContext, viewport : Viewport, entity : Entity) : void {
    if (this.manager.hasComponent(entity, MeshType)) {
      this.renderMesh(context, viewport.camera, entity)
    }
  }

  /**
  * Make a render pass for a given mesh.
  *
  * @param context - A rendering context to use.
  * @param camera - The camera used in order to render the mesh.
  * @param entity - The entity to render.
  */
  public renderMesh (context : GLContext, camera : Component<Camera>, entity : number) : void {
    const gl : WebGLRenderingContext = context.context
    const mesh : Mesh = this.manager.getComponent(entity, MeshType).data
    const glProgram : GLProgram = context.contextualisation(mesh.material.program) as GLProgram
    const glVertices : GLVertexStructureBuffer = context.contextualisation(mesh.geometry.vertices) as GLVertexStructureBuffer
    const glFaces : GLFaceBuffer = context.contextualisation(mesh.geometry.faces) as GLFaceBuffer

    glProgram.use()

    this.computeTransformationMatrices(camera, entity)
    this.commitTransformationMatrices(glProgram.uniforms)
    this.commitVertices(glVertices, glProgram)

    if (!glFaces.synchronized) {
      glFaces.synchronize()
    }

    glFaces.bind()

    gl.drawElements(
      gl.TRIANGLES,
      glFaces.descriptor.size * 3,
      gl.UNSIGNED_SHORT,
      0
    )
  }


  private commitVertices (glVertices : GLVertexStructureBuffer, glProgram : GLProgram) : void {
    const glAttributes : GLAttributes = glProgram.attributes

    if (!glVertices.synchronized) {
      glVertices.synchronize()
    }

    for (const field of glVertices.descriptor.format.fields) {
      if (glAttributes.attributes.has(field.name)){
        glVertices.upload(field, glAttributes.attributes.get(field.name).location)
      }
    }
  }

  private commitTransformationMatrices (glUniforms : GLUniforms) : void {
    glUniforms.setIfExists('localToWorld', false, this._localToWorld.buffer)
    glUniforms.setIfExists('worldToLocal', false, this._worldtoLocal.buffer)
    glUniforms.setIfExists('worldToView', false, this._worldToView.buffer)
    glUniforms.setIfExists('viewToWorld', false, this._viewToWorld.buffer)
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
