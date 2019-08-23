import { Matrix4f, Vector4f, Vector2f } from '@cedric-demongivert/gl-tool-math'
import { GLContextualisation } from '@cedric-demongivert/gl-tool-core'

import { OverseerSystem } from '../OverseerSystem'
import { UnitManagementSystem } from '../UnitManagementSystem'
import { CameraManagementSystem } from '../CameraManagementSystem'

import { SquareGrid } from '@overseer/components/SquareGrid'
import { Unit } from '@overseer/components/Unit'

import * as GridMesh from './GridMesh'
import * as GridMaterial from './GridMaterial'
import * as GridTexture from './GridTexture'

export class GLToolGridSystem extends OverseerSystem {
  /**
  * Create a new system that render meshes.
  */
  constructor () {
    super()
    this._units = null
    this._cameras = null
    this._viewToGrid = new Matrix4f()
    this._offset = new Vector2f()
    this._dimension = new Vector2f()
    this._unit = new Vector2f()
  }

  get isGLToolRenderable () {
    return true
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  initialize () {
    this._units = this.manager.requireSystem(UnitManagementSystem)
    this._cameras = this.manager.requireSystem(CameraManagementSystem)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  destroy () {
    this._units = null
    this._cameras = null
  }

  /**
  * Make a render pass for the given viewport.
  *
  * @param {WebGLRenderingContext} gl - A webgl rendering context to use.
  * @param {Viewport} viewport - The viewport to render.
  * @param {number} entity - An entity to render as a grid.
  */
  render (gl, viewport, entity) {
    if (this.manager.hasComponent(entity, SquareGrid)) {
      this.renderGrid(gl, viewport, entity)
    }
  }

  /**
  * Transform the world bottom-left and top-right boundaries into grid
  * bottom-left and top-rightgrid boundaries.
  *
  * @param {number} entity - Grid configuration to use.
  */
  computeGridBoundaries (camera, entity) {
    const grid = this.manager.getInstance(entity, SquareGrid)

    const viewUnit = this._cameras.getUnitOf(camera)
    const gridUnit = this._units.get(entity)

    this._viewToGrid.copy(camera.viewToWorld)
    gridUnit.applyToMatrix(viewUnit, this._viewToGrid)
  }

  /**
  * Make a render pass for a given grid.
  *
  * @param {WebGLRenderingContext} gl - A webgl rendering context to use.
  * @param {Viewport} viewport - The viewport to render.
  * @param {number} entity - The entity to render.
  */
  renderGrid (gl, viewport, entity) {
    this.computeGridBoundaries(viewport.camera, entity)

    const grid = this.manager.getInstance(entity, SquareGrid)

    const glProgram = GridMaterial.program.contextualisation(gl)
    const glUniforms =  glProgram.uniforms
    const glVertices = GridMesh.vertices.buffer.contextualisation(gl)
    const glFaces = GridMesh.faces.contextualisation(gl)
    const glTexture = GridTexture.texture.contextualisation(gl)

    glProgram.use()

    glUniforms.setIfExists('viewToGrid', false, this._viewToGrid.buffer)
    glUniforms.setIfExists('unit', grid.unit.buffer)
    glUniforms.setIfExists('color', grid.color.buffer)
    glUniforms.setIfExists('thickness', grid.thickness)
    glUniforms.setIfExists('resolution', viewport.width, viewport.height)

    if (!glVertices.synchronized) glVertices.synchronize()
    if (!glFaces.synchronized) glFaces.synchronize()

    glVertices.uploadTo(glProgram)
    glFaces.bind()

    gl.drawElements(
      gl.TRIANGLES, glFaces.descriptor.size * 3, gl.UNSIGNED_SHORT, 0
    )
  }
}
