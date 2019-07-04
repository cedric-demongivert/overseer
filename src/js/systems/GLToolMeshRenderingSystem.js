import { Matrix3f } from '@cedric-demongivert/gl-tool-math'
import { GLContextualisation } from '@cedric-demongivert/gl-tool-core'

import { Mesh } from '../components/Mesh'

import { OverseerSystem } from './OverseerSystem'
import { TransformationSystem } from './TransformationSystem'

export class GLToolMeshRenderingSystem extends OverseerSystem {
  /**
  * Create a new system that render meshes.
  */
  constructor () {
    super()
    this._entitiesWithMesh = null
    this._transformations = null
  }

  get isGLToolRenderable () {
    return true
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  initialize () {
    this._entitiesWithMesh = this.manager.getEntitiesWithType(Mesh)
    this._transformations = this.require(TransformationSystem)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  destroy () {
    this._entitiesWithMesh = null
    this._transformations = null
  }

  /**
  * Make a render pass for the given viewport.
  *
  * @param {WebGLRenderingContext} gl - A webgl rendering context to use.
  * @param {Viewport} viewport - The viewport to render.
  */
  render (gl, viewport) {
    const size = this._entitiesWithMesh.size

    for (let index = 0; index < size; ++index) {
      this.renderMesh(gl, viewport.camera, this._entitiesWithMesh.get(index))
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

    const glProgram = mesh.material.program.contextualisation(gl)
    const glUniforms =  glProgram.uniforms
    const glVertices = mesh.geometry.vertexBuffer.buffer.contextualisation(gl)
    const glFaces = mesh.geometry.faceBuffer.contextualisation(gl)

    glProgram.use()

    glUniforms.setIfExists('localToWorld', false, transform.localToWorld.buffer)
    glUniforms.setIfExists('worldToLocal', false, transform.worldToLocal.buffer)
    glUniforms.setIfExists('worldToView', false, camera.worldToView.buffer)
    glUniforms.setIfExists('viewToWorld', false, camera.viewToWorld.buffer)

    if (!glVertices.synchronized) glVertices.synchronize()
    if (!glFaces.synchronized) glFaces.synchronize()

    glVertices.uploadTo(glProgram)
    glFaces.bind()

    gl.drawElements(
      gl.TRIANGLES, glFaces.descriptor.size * 3, gl.UNSIGNED_SHORT, 0
    )
  }
}
