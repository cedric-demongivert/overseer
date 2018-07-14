import { Image2D } from './Image2D'
import { Image2DFormat } from './ImageFormat'

export class HTMLImage2D extends Image2D {
  constructor (element, format = Image2DFormat.RGBA8) {
    this._format = format
    this._element = element
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
    return this._element.width
  }

  /**
  * @see Image2D#get height
  */
  get height () {
    return this._element.height
  }

  get pixels () {
    return this._element
  }

  upload (context, target, level) {
    const format = this.format

    context.texImage2D(
      target,
      level,
      format.sizedFormat.resolve(context),
      format.unsizedFormat.resolve(context),
      format.type.resolve(context),
      this._buffer
    )
  }
}

export class HalfFloatHTMLImage2D extends HTMLImage2D {
  constructor (element) {
    super(element, Image2DFormat.HALF_RGBA16F)
  }
}

export class FloatHTMLImage2D extends HTMLImage2D {
  constructor (element) {
    super(element, Image2DFormat.RGBA16F)
  }
}

HTMLImage2D.HalfFloat = HalfFloatHTMLImage2D
HTMLImage2D.Float = FloatHTMLImage2D
