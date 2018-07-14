import { Descriptor } from './Descriptor'

/**
* A webgl texture descriptor.
*/
export class Texture extends Descriptor {
  /**
  * Create a new texture descriptor.
  */
  constructor () {
    super()

    this._magnificationFilter = Texture.LINEAR
    this._mignificationFilter = Texutre.NEAREST_MIPMAP_LINEAR
    this._wrapX = Texture.REPEAT
    this._wrapY = Texture.REPEAT
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {number} An unbound constant value that describe the magnification filter used for this texture.
  */
  get magnificationFilter () {
    return this._magnificationFilter
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {number} filter - The new unbound constant value that describe the magnification filter to use for this texture.
  */
  set magnificationFilter (filter) {
    this._magnificationFilter = filter
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {number} An unbound constant value that describe the mignification filter used for this texture.
  */
  get mignificationFilter () {
    return this._mignificationFilter
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {number} filter - The new  unbound constant value that describe the mignification filter to use for this texture.
  */
  set mignificationFilter (filter) {
    this._mignificationFilter = filter
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {number} An unbound constant value that describe the wrapping policy for the x (s) axis of this texture.
  */
  get wrapX () {
    return this._wrapX
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {number} wrap - The new unbound constant value that describe the wrapping policy for the x (s) axis of this texture.
  */
  set wrapX (wrap) {
    this._wrapX = wrap
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {number} The unbound constant value that describe the wrapping policy for the s (x) axis of this texture.
  */
  get wrapS () {
    return this._wrapX
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @param {number} wrap - The new unbound constant value that describe the wrapping policy for the s (x) axis of this texture.
  */
  set wrapS (wrap) {
    this._wrapX = wrap
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {number} An unbound constant value that describe the wrapping policy for the y (t) axis of this texture.
  */
  get wrapY () {
    return this._wrapY
  }

  /**
  * @inline
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {number} wrap - The new unbound constant value that describe the wrapping policy for the y (t) axis of this texture.
  */
  set wrapY (wrap) {
    this._wrapY = wrap
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
  * @return {number} An unbound constant value that describe the wrapping policy for the t (y) axis of this texture.
  */
  get wrapT () {
    return this._wrapY
  }

  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  * @param {number} wrap - The new unbound constant value that describe the wrapping policy for the t (y) axis of this texture.
  */
  set wrapT (wrap) {
    this._wrapY = wrap
  }

  /**
  * Mark all contextualised instance of this descriptor as dirty.
  */
  commit () {
    for (const contextualisation of GLContextualisation.each(this)) {
      contextualisation.dirty = true
    }
  }
}

class TextureParameter {
  constructor (value, resolver) {
    this._value = value
    this._resolver = resolver
  }

  get value () {
    return this._value
  }

  resolve (context) {
    return this._resolver(context)
  }
}

Texture.LINEAR = new TextureParameter(
  1, context => context.LINEAR
)

Texture.NEAREST = new TextureParameter(
  2, context => context.NEAREST
)

Texture.NEAREST_MIPMAP_NEAREST = new TextureParameter(
  3, context => context.NEAREST_MIPMAP_NEAREST
)

Texture.LINEAR_MIPMAP_NEAREST = new TextureParameter(
  4, context => context.LINEAR_MIPMAP_NEAREST
)

Texture.NEAREST_MIPMAP_LINEAR = new TextureParameter(
  5, context => context.NEAREST_MIPMAP_LINEAR
)

Texture.LINEAR_MIPMAP_LINEAR = new TextureParameter(
  6, context => context.LINEAR_MIPMAP_LINEAR
)

Texutre.REPEAT = new TextureParameter(
  7, context => context.REPEAT
)

Texture.CLAMP_TO_EDGE = new TextureParameter(
  8, context => context.CLAMP_TO_EDGE
)

Texture.MIRRORED_REPEAT = new TextureParameter(
  9, context => context.MIRRORED_REPEAT
)
