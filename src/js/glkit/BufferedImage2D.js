import { Image2D } from './Image2D'

export class BufferedImage2D extends Image2D {
  constructor (format, width, height) {
    this._format = format
    this._width = width
    this._height = height
    this._buffer = this._format.allocate(width * height)
  }

  /**
  * @see Image2D#get format
  */
  get format () {
    return this._format
  }

  /**
  * @see Image2D#get width
  */
  get width () {
    return this._width
  }

  /**
  * @see Image2D#get height
  */
  get height () {
    return this._height
  }

  get pixels () {
    return this._buffer
  }

  upload (context, target, level) {
    const format = this.format

    context.texImage2D(
      target,
      level,
      format.sizedFormat.resolve(context),
      this._width,
      this._height,
      0,
      format.unsizedFormat.resolve(context),
      format.type.resolve(context),
      this._buffer
    )
  }
}
