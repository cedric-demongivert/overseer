import { Matrix4f } from '@cedric-demongivert/gl-tool-math'
import { GLContextualisation } from '@cedric-demongivert/gl-tool-core'

import { Mesh } from '../components/Mesh'

import { OverseerSystem } from './OverseerSystem'
import { TransformationManagementSystem } from './TransformationManagementSystem'
import { UnitManagementSystem } from './UnitManagementSystem'

export class GLToolMeshRenderingSystem extends OverseerSystem {
  /**
  * Create a new system that render meshes.
  */
  constructor () {
    super()
    this._transformations = null
    this._units = null
    this._transpose = new Matrix4f()
    this._worldToView = new Matrix4f()
    this._viewToWorld = new Matrix4f()
    this._worldtoLocal = new Matrix4f()
    this._localToWorld = new Matrix4f()
  }

  get isGLToolRenderable () {
    return true
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  initialize () {
    this._transformations = this.manager.requireSystem(TransformationManagementSystem)
    this._units = this.manager.requireSystem(UnitManagementSystem)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  destroy () {
    this._entitiesWithMesh = null
    this._transformations = null
    this._units = null
  }

  /**
  * Make a render pass for the given viewport.
  *
  * @param {WebGLRenderingContext} gl - A webgl rendering context to use.
  * @param {Viewport} viewport - The viewport to render.
  * @param {number} entity - An entity to render as a mesh.
  */
  render (gl, viewport, entity) {
    if (this.manager.hasComponent(entity, Mesh)) {
      this.renderMesh(gl, viewport.camera, entity)
    }
  }

  /**
  * Make a render pass for a given mesh.
  *
  * @param {WebGLRenderingContext} gl - A webgl rendering context to use.
  * @param {Camera} camera - The camera used in order to render the mesh.
  * @param {number} entity - The entity to render.
  */
  renderMesh (gl, camera, entity) {
    const mesh = this.manager.getInstance(entity, Mesh)
    const transform = this._transformations.getTransformation(entity)

    const meshUnit = this._units.get(entity)
    const viewUnit = this._units.get(this.manager.getEntityOfInstance(camera))

    this._worldToView.copy(camera.worldToView)
    viewUnit.applyToMatrix(meshUnit, this._worldToView)
    this._viewToWorld.copy(camera.viewToWorld)
    meshUnit.applyToMatrix(viewUnit, this._viewToWorld)

    this._worldtoLocal.copy(transform.worldToLocal)
    this._localToWorld.copy(transform.localToWorld)

    const glProgram = mesh.material.program.contextualisation(gl)
    const glUniforms =  glProgram.uniforms
    const glVertices = mesh.geometry.vertexBuffer.buffer.contextualisation(gl)
    const glFaces = mesh.geometry.faceBuffer.contextualisation(gl)

    glProgram.use()

    glUniforms.setIfExists('localToWorld', false, this._localToWorld.buffer)
    glUniforms.setIfExists('worldToLocal', false, this._worldtoLocal.buffer)
    glUniforms.setIfExists('worldToView', false, this._worldToView.buffer)
    glUniforms.setIfExists('viewToWorld', false, this._viewToWorld.buffer)

    if (!glVertices.synchronized) glVertices.synchronize()
    if (!glFaces.synchronized) glFaces.synchronize()

    glVertices.uploadTo(glProgram)
    glFaces.bind()

    gl.drawElements(
      gl.TRIANGLES,
      glFaces.descriptor.size * 3,
      gl.UNSIGNED_SHORT,
      0
    )
  }
}
