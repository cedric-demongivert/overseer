import { GLTexture } from './GLTexture'
import { GLContext } from '../GLContext'
import { GLType } from '../GLType'

/**
* A wrapper over a WebGLTexture to bind to a Texture2D target.
*/
export class GLTexture2D extends GLTexture {
  /**
  * Create a new GLTexture2D.
  *
  * @param {GLContextualised} context - The webgl rendering context of the texture.
  */
  constructor (context) {
    super(context, GLContext.context(context).TEXTURE_2D)
    this[GLType.type] = GLType.SAMPLER_2D
    this[GLType.size] = 1
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/generateMipMaps
  */
  generateMipmap () {
    /** @inline */ this.bind()
    this._context.generateMipmap(this._target)
  }

  /**
  * @inline
  * Set texture data.
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
  *
  * @return {GLTexture2D} The current instance for chaining purpose.
  */
  data (...params) {
    /** @inline */ this.bind()
    this._context.texImage2D(this._target, ...params)
  }
}
