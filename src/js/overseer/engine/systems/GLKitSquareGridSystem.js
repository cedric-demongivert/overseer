import { System, Component, Entity } from '@overseer/engine/ecs'
import { Program, SquareGrid, Texture2D } from '@overseer/engine/components'
import {
  GLKitGeometryBank,
  GLKitProgramBank,
  CommonGeometries
} from '@overseer/engine/services'

/**
* A system that render grids for glkit contexts.
*/
export class GLKitSquareGridSystem extends System {
  /**
  * @see System#initialize
  */
  initialize () {
    this._programEntity = new Entity(this.manager)
    this._program = this._programEntity.create(Program)
    this._program.fragmentShader = require('@shaders/squareGrid.frag')
    this._program.vertexShader = require('@shaders/squareGrid.vert')
  }

  render (gl, viewport) {
    for (const squareGrid of this.manager.components(SquareGrid)) {
      if (squareGrid.camera === viewport.camera) {
        this._render(gl, squareGrid, viewport)
      }
    }
  }

  _render (gl, squareGrid, viewport) {
    const camera = viewport.camera

    const buffers = this.service(GLKitGeometryBank.of(gl))
    const programs = this.service(GLKitProgramBank.of(gl))
    const geometries = this.service(CommonGeometries)

    const glProgram = programs.getProgram(this._program)
    const glUniforms = programs.getUniforms(this._program)
    const glArrayBuffer = buffers.getArrayBuffer(geometries.quad)
    const glElementArrayBuffer = buffers.getElementArrayBuffer(geometries.quad)

    glProgram.use()

    const baseCoef = camera.unit.value / squareGrid.unit.in(camera.unit.unit)
    const gridLevel = Math.log10(baseCoef) + 1.35
    const coef = baseCoef / Math.pow(10, Math.floor(gridLevel))

    glUniforms.gridStart = [camera.left * coef, camera.bottom * coef]
    glUniforms.gridSize = [camera.width * coef, camera.height * coef]
    glUniforms.cellSize = viewport.width / (camera.width * coef)
    glUniforms.lineWidth = squareGrid.lineWidth
    glUniforms.progress = gridLevel - Math.floor(gridLevel)

    glProgram.useAttributes(glArrayBuffer, geometries.quad.format)
    glElementArrayBuffer.bind()

    gl.drawElements(
      gl.TRIANGLES,
      geometries.quad.faces * 3,
      gl.UNSIGNED_SHORT,
      0
    )
  }

  /**
  * @see System#destroy
  */
  destroy () {
    this._programEntity.destroy()
    this._programEntity = null
    this._program = null
  }
}
