import { GLTexture, GLObject, GLType } from '../engine'

export class SquareGrid extends GLObject {
  constructor (context) {
    super(context)

    this[GLType.type] = GLType.SAMPLER_2D
    this[GLType.size] = 1

    this._texture = new GLTexture.Texture2D(context)
    this._texture.wrapX = this.context.REPEAT
    this._texture.wrapY = this.context.REPEAT
    this._texture.data(
      0,
      this.context.RGBA,
      this.context.RGBA,
      this.context.UNSIGNED_BYTE,
      this.draw()
    )

    this._texture.generateMipmap()
  }

  /**
  * Render the square grid into an ImageData object.
  *
  * @return {ImageData} The grid texture as an ImageData.
  */
  draw () {
    const lineWidth = 8
    const halfLineWidth = (lineWidth / 2) >> 0
    const width = 256
    const height = 256

    const canvas = document.createElement('canvas')
    canvas.height = height
    canvas.width = width

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
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

    /*
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
    const xStep = (width / 10) >> 0
    const yStep = (height / 10) >> 0

    for (let i = 1; i <= 10; ++i) {
      if (i !== 10) {
        ctx.fillRect(
          xStep * i - halfLineWidth, halfLineWidth,
          lineWidth, height - lineWidth
        )
      }

      for (let j = 1; j < 10; ++j) {
        ctx.fillRect(
          halfLineWidth + xStep * (i - 1), yStep * j - halfLineWidth,
          xStep - lineWidth, lineWidth
        )
      }
    }
    */

    return ctx.getImageData(0, 0, 256, 256)
  }

  /**
  * Return the GLValue associated to this object.
  *
  * @return {any} The GLValue associated to this object.
  */
  get [GLType.value] () {
    return GLType.valueof(this._texture)
  }
}
