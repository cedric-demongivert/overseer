import { GLTexture } from './GLTexture'
import { GLContext } from './GLContext'
import { GLType } from './GLType'

/**
* A wrapper over a WebGLTexture to bind to a CubeMap target.
*/
export class GLCubeMapTexture extends GLTexture {
  /**
  * Create a new GLCubeMapTexture.
  *
  * @param {GLContextualised} context - The webgl rendering context of the texture.
  */
  constructor (context) {
    super(context, GLContext.context(context).TEXTURE_CUBE_MAP)
    this[GLType.type] = GLType.SAMPLER_CUBE
    this[GLType.size] = 1
  }

  /**
  * Set texture data.
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
  *
  * @return {GLCubeMapTexture} The current instance for chaining purpose.
  */
  positiveXData (...params) {
    /** @inline */ this.bind()
    this._context.texImage2D(
      this._context.TEXTURE_CUBE_MAP_POSITIVE_X,
      ...params
    )
  }

  /**
  * Set texture data.
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
  *
  * @return {GLCubeMapTexture} The current instance for chaining purpose.
  */
  positiveYData (...params) {
    /** @inline */ this.bind()
    this._context.texImage2D(
      this._context.TEXTURE_CUBE_MAP_POSITIVE_Y,
      ...params
    )
  }

  /**
  * Set texture data.
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
  *
  * @return {GLCubeMapTexture} The current instance for chaining purpose.
  */
  positiveZData (...params) {
    /** @inline */ this.bind()
    this._context.texImage2D(
      this._context.TEXTURE_CUBE_MAP_POSITIVE_Z,
      ...params
    )
  }

  /**
  * Set texture data.
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
  *
  * @return {GLCubeMapTexture} The current instance for chaining purpose.
  */
  negativeXData (...params) {
    /** @inline */ this.bind()
    this._context.texImage2D(
      this._context.TEXTURE_CUBE_MAP_NEGATIVE_X,
      ...params
    )
  }

  /**
  * Set texture data.
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
  *
  * @return {GLCubeMapTexture} The current instance for chaining purpose.
  */
  negativeYData (...params) {
    /** @inline */ this.bind()
    this._context.texImage2D(
      this._context.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      ...params
    )
  }

  /**
  * Set texture data.
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
  *
  * @return {GLCubeMapTexture} The current instance for chaining purpose.
  */
  negativeZData (...params) {
    /** @inline */ this.bind()
    this._context.texImage2D(
      this._context.TEXTURE_CUBE_MAP_NEGATIVE_Z,
      ...params
    )
  }
}
