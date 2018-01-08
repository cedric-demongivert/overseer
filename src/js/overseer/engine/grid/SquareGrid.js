import { GLTexture } from '@glkit'
import { Grid } from './Grid'
import { GridProgram } from './GridProgram'
import { Length } from '@overseer'

/**
* A basic square grid.
*/
export class SquareGrid extends Grid {
  /**
  * Create a new square grid.
  *
  * @param {GLContextualised} context - Rendering context of the grid.
  * @param {Length} unit - Unit of the square grid (width and height of a square).
  */
  constructor (context, unit) {
    super(context)

    this._unit = new Length(unit)

    this._texture = new GLTexture.Texture2D(context)
    this._texture.wrapX = this.context.REPEAT
    this._texture.wrapY = this.context.REPEAT
    this.computeGridTexture()

    this._program = new GridProgram(this, {
      fragment: require('@overseer/engine/grid/shaders/squaregrid.frag'),
      vertex: require('@overseer/engine/grid/shaders/squaregrid.vert')
    })
  }

  /**
  * @return {Length} The unit of a square of this grid. (Height and width of a square of this grid.)
  */
  get unit () {
    return this._unit
  }

  /**
  * @param {Length} unit - The new unit of a square of this grid. (Height and width of a square of this grid.)
  */
  set unit (unit) {
    this._unit = unit.clone()
  }

  /**
  * Rerender the grid into it's texture.
  */
  computeGridTexture () {
    this._texture.data(
      0,
      this.context.RGBA,
      this.context.RGBA,
      this.context.UNSIGNED_BYTE,
      this.computeGridImage()
    )
    this._texture.generateMipmap()
  }

  /**
  * Render the square grid into an ImageData object.
  *
  * @return {ImageData} The grid texture as an ImageData.
  */
  computeGridImage () {
    const lineWidth = 16
    const halfLineWidth = (lineWidth / 2) >> 0
    const width = 256
    const height = 256

    const canvas = document.createElement('canvas')
    canvas.height = height
    canvas.width = width

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'

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

    return ctx.getImageData(0, 0, 256, 256)
  }

  /**
  * @override Grid#render
  */
  render (view) {
    this._program.uniforms.unit = this._unit.in(view.unit.unit)
    this._program.uniforms.grid = this._texture
    this._program.render(view)
    return this
  }
}
