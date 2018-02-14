import { System, Component, Entity } from '@overseer/engine/ecs'
import { Program, SquareGrid, Texture2D } from '@overseer/engine/components'
import {
  GLKitGeometryBank,
  GLKitTexture2DBank,
  GLKitProgramBank,
  CommonGeometries
} from '@overseer/engine/services'


/**
* Render the square grid into a canva and return the result.
*
* @return {HTMLCanvasElement} The grid texture.
*/
function computeGridImage (lineWidth, dimension = 100) {
  const halfLineWidth = (lineWidth / 2) >> 0
  const width = dimension
  const height = dimension

  const canvas = document.createElement('canvas')
  canvas.height = height
  canvas.width = width

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(0, 0, 0, 0)'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = 'rgba(0, 0, 0, 1)'

  ctx.fillRect(
    0, height - halfLineWidth,
    width, halfLineWidth
  ) // top

  ctx.fillRect(
    width - halfLineWidth, 0,
    halfLineWidth, height - halfLineWidth
  ) // right

  ctx.fillRect(
    0, 0,
    width - halfLineWidth, halfLineWidth
  ) // bottom

  ctx.fillRect(
    0, halfLineWidth,
    halfLineWidth, height - lineWidth
  ) // left

  return canvas
}

const DEFAULT_MEDIUM_CELL_IMAGE = computeGridImage(10, 100)
const DEFAULT_LARGE_CELL_IMAGE = computeGridImage(10, 100)

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

    this._defaultMediumTextureEntity = new Entity(this.manager)
    this._defaultMediumTexture = this._defaultMediumTextureEntity.create(Texture2D)
    Object.assign(this._defaultMediumTexture, {
      wrapS: Texture2D.CLAMP_TO_EDGE,
      wrapT: Texture2D.CLAMP_TO_EDGE,
      mignificationFilter: Texture2D.LINEAR,
      magnificationFilter: Texture2D.LINEAR,
      content: DEFAULT_MEDIUM_CELL_IMAGE
    })

    this._defaultLargeTextureEntity = new Entity(this.manager)
    this._defaultLargeTexture = this._defaultLargeTextureEntity.create(Texture2D)
    Object.assign(this._defaultLargeTexture, {
      wrapS: Texture2D.CLAMP_TO_EDGE,
      wrapT: Texture2D.CLAMP_TO_EDGE,
      mignificationFilter: Texture2D.LINEAR,
      magnificationFilter: Texture2D.LINEAR,
      content: DEFAULT_LARGE_CELL_IMAGE
    })
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

    const textures = this.service(GLKitTexture2DBank.of(gl))
    const buffers = this.service(GLKitGeometryBank.of(gl))
    const programs = this.service(GLKitProgramBank.of(gl))
    const geometries = this.service(CommonGeometries)

    const glProgram = programs.getProgram(this._program)
    const glUniforms = programs.getUniforms(this._program)
    const glArrayBuffer = buffers.getArrayBuffer(geometries.quad)
    const glElementArrayBuffer = buffers.getElementArrayBuffer(geometries.quad)

    glProgram.use()

    const mediumCellTexture = textures.get(squareGrid.mediumCellTexture || this._defaultMediumTexture)
    const largeCellTexture = textures.get(squareGrid.largeCellTexture || this._defaultLargeTexture)
    const coef = camera.unit.value / squareGrid.unit.in(camera.unit.unit)

    glUniforms.start = [camera.left * coef, camera.bottom * coef]
    glUniforms.size = [camera.width *  coef, camera.height * coef]
    glUniforms.mediumCellTexture = mediumCellTexture
    glUniforms.largeCellTexture = largeCellTexture

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

    this._defaultLargeTextureEntity.destroy()
    this._defaultLargeTexture = null

    this._defaultMediumTextureEntity.destroy()
    this._defaultMediumTexture = null
  }
}
