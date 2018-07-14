import { GLTexture } from './GLTexture'

/**
* A wrapper over a WebGLTexture to bind to a Texture2D target.
*/
export class GLTexture2D extends GLTexture {
  /**
  * Create a new webgl texture 2D from a texture descriptor and a rendering context.
  *
  * @param {GLContext|WebGLRenderingContext} context - The webgl rendering context of this instance.
  * @param {Texture2D} descriptor - The texture descriptor to contextualise.
  */
  constructor (context, descriptor) {
    super(context, descriptor)
  }

  /**
  * @see GLTexture#get target
  */
  get target () {
    return this.context.TEXTURE_2D
  }

  /**
  * @see GLTexture#get bound
  */
  get bound () {
    const context = this.context
    return context.getParameter(context.TEXTURE_BINDING_2D) === this._pointer
  }

  /**
  * @see GLTexture#bind
  */
  bind () {
    const context = this.context
    context.bindTexture(context.TEXTURE_2D, this._pointer)

    if (this._dirty) this.update()
  }

  /**
  * @see GLTexture#update
  */
  update () {
    super.update()

    const descriptor = this.descriptor
    const context = this.context

    for (const level of descriptor.levels()) {
      descriptor.getImage(level).upload(context, context.TEXTURE_2D, level)
    }
  }
}
