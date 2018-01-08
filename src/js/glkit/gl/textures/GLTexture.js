import { GLObject } from '../GLObject'
import { GLType } from '../GLType'

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
    this._texture = this.$createTexture()
    this._target = target
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture magnification filter.
  */
  get magnificationFilter () {
    this.bind()
    return this.$getTexParameter(this._target, this.$TEXTURE_MAG_FILTER)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} filter - The new texture magnification filter.
  */
  set magnificationFilter (filter) {
    this.bind()
    return this.$texParameteri(this._target, this.$TEXTURE_MAG_FILTER, filter)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture mignification filter.
  */
  get mignificationFilter () {
    this.bind()
    return this.$getTexParameter(this._target, this.$TEXTURE_MIN_FILTER)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} filter - The new texture mignification filter.
  */
  set mignificationFilter (filter) {
    this.bind()
    return this.$texParameteri(this._target, this.$TEXTURE_MIN_FILTER, filter)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the x (s) parameter.
  */
  get wrapX () {
    this.bind()
    return this.$getTexParameter(this._target, this.$TEXTURE_WRAP_S)
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the x (s) parameter.
  */
  set wrapX (wrap) {
    this.bind()
    return this.$texParameteri(this._target, this.$TEXTURE_WRAP_S, wrap)
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the s (x) parameter.
  */
  get wrapS () {
    this.bind()
    return this.$getTexParameter(this._target, this.$TEXTURE_WRAP_S)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the s (x) parameter.
  */
  set wrapS (wrap) {
    /** @inline */ this.bind()
    return this.$texParameteri(this._target, this.$TEXTURE_WRAP_S, wrap)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the y (t) parameter.
  */
  get wrapY () {
    /** @inline */ this.bind()
    return this.$getTexParameter(this._target, this.$TEXTURE_WRAP_T)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the y (t) parameter.
  */
  set wrapY (wrap) {
    /** @inline */ this.bind()
    return this.$texParameteri(this._target, this.$TEXTURE_WRAP_T, wrap)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the t (y) parameter.
  */
  get wrapT () {
    /** @inline */ this.bind()
    return this.$getTexParameter(this._target, this.$TEXTURE_WRAP_T)
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the t (y) parameter.
  */
  set wrapT (wrap) {
    /** @inline */ this.bind()
    return this.$texParameteri(this._target, this.$TEXTURE_WRAP_T, wrap)
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
    const target = this._target

    switch (target) {
      case this.$TEXTURE_2D:
        return this.$getParameter(this.$TEXTURE_BINDING_2D) === this._texture
      case this.$TEXTURE_CUBE_MAP:
        return this.$getParameter(this.$TEXTURE_BINDING_CUBE_MAP) === this._texture
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
      this.$bindTexture(this._target, this._texture)
    }

    return this
  }

  /**
  * Destroy this texture from its related GLContext.
  */
  destroy () {
    this.$deleteTexture(this._texture)
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
