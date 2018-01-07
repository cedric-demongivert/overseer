import { GLObject } from './GLObject'
import { GLType } from './GLType'

/**
* A wrapper over a WebGLTexture
*/
export class GLTexture extends GLObject {
  /**
  * Create a new GLTexture over a native WebGLTexture.
  *
  * @param {GLContextualised} context - The webgl rendering context of the texture.
  * @param {GLEnum} target - Texture target.
  */
  constructor (context, target) {
    super(context)
    this._texture = this._context.createTexture()
    this._target = target
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture magnification filter.
  */
  get magnificationFilter () {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.getTexParameter(this._target, gl.TEXTURE_MAG_FILTER)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} filter - The new texture magnification filter.
  */
  set magnificationFilter (filter) {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, filter)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture mignification filter.
  */
  get mignificationFilter () {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.getTexParameter(this._target, gl.TEXTURE_MIN_FILTER)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} filter - The new texture mignification filter.
  */
  set mignificationFilter (filter) {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, filter)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the x (s) parameter.
  */
  get wrapX () {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.getTexParameter(this._target, gl.TEXTURE_WRAP_S)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the x (s) parameter.
  */
  set wrapX (wrap) {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, wrap)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the s (x) parameter.
  */
  get wrapS () {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.getTexParameter(this._target, gl.TEXTURE_WRAP_S)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the s (x) parameter.
  */
  set wrapS (wrap) {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, wrap)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the y (t) parameter.
  */
  get wrapY () {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.getTexParameter(this._target, gl.TEXTURE_WRAP_T)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the y (t) parameter.
  */
  set wrapY (wrap) {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, wrap)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the t (y) parameter.
  */
  get wrapT () {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.getTexParameter(this._target, gl.TEXTURE_WRAP_T)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the t (y) parameter.
  */
  set wrapT (wrap) {
    const gl = this._context
    /** @inline */ this.bind()
    return gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, wrap)
  }

  /**
  * @inline
  * @return {GLEnum} The binding target of this texture.
  */
  get target () {
    return this._target
  }

  /**
  * @return {boolean} True if this texture is bound to its target.
  */
  get bound () {
    const gl = this._context
    const target = this._target

    switch (target) {
      case gl.TEXTURE_2D:
        return gl.getParameter(gl.TEXTURE_BINDING_2D) === this._texture
      case gl.TEXTURE_CUBE_MAP:
        return gl.getParameter(gl.TEXTURE_BINDING_CUBE_MAP) === this._texture
      default:
        throw new Error(`Unknown target ${target}.`)
    }
  }

  /**
  * Bind this texture to its target.
  *
  * @return {GLTexture} The current instance for chaining purpose.
  */
  bind () {
    if (!this.bound) {
      this._context.bindTexture(this._target, this._texture)
    }

    return this
  }

  /**
  * Destroy this texture from its related GLContext.
  */
  destroy () {
    this._context.deleteTexture(this._texture)
    super.destroy()
  }

  /**
  * Return the GLValue associated to this object.
  *
  * @return {any} The GLValue associated to this object.
  */
  get [GLType.value] () {
    return this._texture
  }
}
