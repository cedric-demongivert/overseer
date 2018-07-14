import { NotImplementedError } from '@errors'

import { Texture } from '../Texture'
import { GLContextualisation } from '../GLContextualisation'

/**
* A wrapper over a WebGLTexture
*/
export class GLTexture extends GLObject {
  /**
  * Create a new webgl texture from a texture descriptor and a rendering context.
  *
  * @param {GLContext|WebGLRenderingContext} context - The webgl rendering context of this instance.
  * @param {Texture} descriptor - The texture descriptor to contextualise.
  */
  constructor (context, descriptor) {
    super(context, descriptor)
    this._pointer = context.createTexture()
    this._dirty = true
  }

  /**
  * @return {boolean} True if this texture is bound.
  */
  get bound () {
    throw new NotImplementedError(GLTexture, "get bound")
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture magnification filter.
  */
  get magnificationFilter () {
    const context = this.context
    return context.getTexParameter(
      this.target,
      context.TEXTURE_MAG_FILTER
    )
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} filter - The new texture magnification filter.
  */
  set magnificationFilter (filter) {
    const context = this.context
    return context.texParameteri(
      this.target,
      context.TEXTURE_MAG_FILTER,
      filter
    )
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture mignification filter.
  */
  get mignificationFilter () {
    const context = this.context
    return context.getTexParameter(
      this.target,
      context.TEXTURE_MIN_FILTER
    )
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} filter - The new texture mignification filter.
  */
  set mignificationFilter (filter) {
    const context = this.context
    return context.texParameteri(
      this.target,
      context.TEXTURE_MIN_FILTER,
      filter
    )
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the x (s) parameter.
  */
  get wrapX () {
    const context = this.context
    return context.getTexParameter(
      this.target,
      context.TEXTURE_WRAP_S
    )
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the x (s) parameter.
  */
  set wrapX (wrap) {
    const context = this.context
    return context.texParameteri(
      this.target,
      context.TEXTURE_WRAP_S,
      wrap
    )
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the s (x) parameter.
  */
  get wrapS () {
    const context = this.context
    return context.getTexParameter(
      this.target,
      context.TEXTURE_WRAP_S
    )
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the s (x) parameter.
  */
  set wrapS (wrap) {
    const context = this.context
    return context.texParameteri(
      this.target,
      context.TEXTURE_WRAP_S,
      wrap
    )
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the y (t) parameter.
  */
  get wrapY () {
    const context = this.context
    return context.getTexParameter(
      this.target,
      context.TEXTURE_WRAP_T
    )
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the y (t) parameter.
  */
  set wrapY (wrap) {
    const context = this.context
    return context.texParameteri(
      this.target,
      context.TEXTURE_WRAP_T,
      wrap
    )
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {GLEnum} The current texture wrapping policy for the t (y) parameter.
  */
  get wrapT () {
    const context = this.context
    return context.getTexParameter(
      this.target,
      context.TEXTURE_WRAP_T
    )
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {GLEnum} wrap - The new texture wrapping policy for the t (y) parameter.
  */
  set wrapT (wrap) {
    const context = this.context
    return context.texParameteri(
      this.target,
      context.TEXTURE_WRAP_T,
      wrap
    )
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/generateMipMaps
  */
  generateMipmap () {
    const context = this.context
    context.generateMipmap(this.target)
  }

  /**
  * Return this texture's binding target.
  *
  * @return {GLEnum} This texture's binding target.
  */
  get target () {
    throw new NotImplementedError(GLTexture, 'get target')
  }

  /**
  * Return true if this texture contextualisation must be updated after the
  * next binding operation.
  *
  * @return {boolean} True if this texture contextualisation must be updated after the next binding operation.
  */
  get dirty () {
    return this._dirty
  }

  /**
  * Mark or unmark this texture as dirty.
  *
  * A dirty texture will be updated after its next binding.
  *
  * @param {boolean} value - New dirty state of this texture.
  */
  set dirty (value) {
    this._dirty = value
  }

  /**
  * Update this texture from its descriptor.
  */
  update () {
    const descriptor = this.descriptor
    const context = this.context
    this.magnificationFilter = descriptor.magnificationFilter.resolve(context)
    this.mignificationFilter = descriptor.mignificationFilter.resolve(context)
    this.wrapX = descriptor.wrapX.resolve(context)
    this.wrapY = descriptor.wrapY.resolve(context)
    this._dirty = false
  }

  /**
  * Bind this texture to its target.
  *
  * @return {GLTexture} The current instance for chaining purpose.
  */
  bind () {
    throw new NotImplementedError(GLTexture, 'bind')
  }

  /**
  * Destroy this texture from its related GLContext.
  */
  destroy () {
    this.context.deleteTexture(this._pointer)
    this._pointer = null
    super.destroy()
  }
}
