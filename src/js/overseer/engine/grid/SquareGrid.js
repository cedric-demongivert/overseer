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

    this._textureCurrent = this.computeGridTexture(2, 64)
    this._textureUp = this.computeGridTexture(2, 256)
    this._textureDown = this.computeGridTexture(2, 32)

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
  computeGridTexture (lineWidth, dimension = 128) {
    const texture = new GLTexture.Texture2D(this)

    texture.wrapX = this.$REPEAT
    texture.wrapY = this.$REPEAT
    texture.data(
      0, this.$RGBA, this.$RGBA, this.$UNSIGNED_BYTE,
      this.computeGridImage(lineWidth, dimension)
    )
    texture.generateMipmap()

    return texture
  }

  /**
  * Render the square grid into an ImageData object.
  *
  * @return {ImageData} The grid texture as an ImageData.
  */
  computeGridImage (lineWidth, dimension = 128) {
    const halfLineWidth = (lineWidth / 2) >> 0
    const width = dimension
    const height = dimension

    const canvas = document.createElement('canvas')
    canvas.height = height
    canvas.width = width

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = 'rgba(1, 1, 1, 1)'

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

    return ctx.getImageData(0, 0, dimension, dimension)
  }

  /**
  * @override Grid#render
  */
  render (view) {
    const unit = this._unit.in(view.unit.unit)
    const maxLength = Math.max(view.width * view.unit.value, view.height * view.unit.value)
    const units = maxLength / unit
    const degree = Math.log10(units) - 1
    const edegree = Math.floor(degree)
    const progress = Math.abs(degree - Math.floor(degree))

    this._program.uniforms.color = [0, 0, 0]

    if (progress <= 0.25) {
      const downProgress = ((progress + 1.25) / 1.5) * 2 - 1
      this._program.uniforms.grid = this._textureDown
      this._program.uniforms.unit = this._unit.in(view.unit.unit) * Math.pow(10, edegree - 1)
      this._program.uniforms.strength = 1 - Math.abs(downProgress * downProgress)
      this._program.render(view)
    }

    const midProgress = ((progress + 0.25) / 1.5) * 2 - 1
    this._program.uniforms.grid = this._textureCurrent
    this._program.uniforms.unit = this._unit.in(view.unit.unit) * Math.pow(10, edegree)
    this._program.uniforms.strength = 1 - Math.abs(midProgress * midProgress)
    this._program.render(view)

    if (progress >= 0.75) {
      const upProgress = ((progress - 0.75) / 1.5) * 2 - 1
      this._program.uniforms.grid = this._textureUp
      this._program.uniforms.unit = this._unit.in(view.unit.unit) * Math.pow(10, edegree + 1)
      this._program.uniforms.strength = 1 - Math.abs(upProgress * upProgress)
      this._program.render(view)
    }

    return this
  }
}
