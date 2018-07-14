import { Texture } from './Texture'
import { GLTexture2D } from './gl/GLTexture2D'

export class Texture2D extends Texture {
  /**
  * Create a new empty texture 2D.
  */
  constructor () {
    super()
    this._images = new Map()
  }

  get imageCount () {
    return this._images.size
  }

  setImage (image, level = 0) {
    this._images.set(level, image)
  }

  getImage (level = 0) {
    return this._images.get(level)
  }

  deleteImage (level = 0) {
    this._images.delete(0)
  }

  hasImage (level = 0) {
    return this._images.has(level)
  }

  * images () {
    yield * this._images.values()
  }

  * levels () {
    yield * this._images.keys()
  }

  * entries () {
    yield * this._images.entries()
  }

  contextualise (context) {
    return new GLTexture2D(context, this)
  }
}
