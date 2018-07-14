import { Texture } from './Texture'
import { GLCubeMapTexture } from './gl/GLCubeMapTexture'

export class CubeMapTexture extends Texture {
  /**
  * Create a new cube map texture 2D.
  */
  constructor () {
    super()
    this._images = [
      new Map(), new Map(),
      new Map(), new Map(),
      new Map(), new Map()
    ]
  }

  get imageCount () {
    return this._images.reduce((a, b) => a + b.size, 0)
  }

  setImage (image, location, level = 0) {
    this._images[location].set(level, image)
  }

  getImage (location, level = 0) {
    return this._images[location].get(level)
  }

  deleteImage (location, level = 0) {
    this._images[location].delete(0)
  }

  hasImage (location, level = 0) {
    return this._images[location].has(level)
  }

  * images (location) {
    yield * this._images[location].values()
  }

  * levels (location) {
    yield * this._images[location].keys()
  }

  * entries (location) {
    yield * this._images[location].entries()
  }

  contextualise (context) {
    return new GLCubeMapTexture(context, this)
  }
}

CubeMapTexture.NEGATIVE_X = 0
CubeMapTexture.POSITIVE_X = 1
CubeMapTexture.NEGATIVE_Y = 2
CubeMapTexture.POSITIVE_Y = 3
CubeMapTexture.NEGATIVE_Z = 4
CubeMapTexture.POSITIVE_Z = 5
