import { GLTexture } from './GLTexture'

/**
* A wrapper over a WebGLTexture to bind to a CubeMap target.
*/
export class GLCubeMapTexture extends GLTexture {
  /**
  * Create a new webgl cube map texture from a descriptor and a rendering context.
  *
  * @param {GLContext|WebGLRenderingContext} context - The webgl rendering context of this instance.
  * @param {CubeMapTexture} descriptor - The texture descriptor to contextualise.
  */
  constructor (context, descriptor) {
    super(context, descriptor)
  }

  /**
  * @see GLTexture#get target
  */
  get target () {
    return this.context.TEXTURE_BINDING_CUBE_MAP
  }

  /**
  * @see GLTexture#get bound
  */
  get bound () {
    const context = this.context
    return context.getParameter(
      context.TEXTURE_BINDING_CUBE_MAP
    ) === this._pointer
  }

  /**
  * @see GLTexture#bind
  */
  bind () {
    const context = this.context
    context.bindTexture(context.TEXTURE_BINDING_CUBE_MAP, this._pointer)

    if (this._dirty) this.update()
  }

  /**
  * @see GLTexture#update
  */
  update () {
    super.update()

    const descriptor = this.descriptor
    const context = this.context

    for (const level of descriptor.levels(CubeMapTexture.NEGATIVE_X)) {
      descriptor.getImage(CubeMapTexture.NEGATIVE_X, level)
                .upload(context, context.TEXTURE_CUBE_MAP_NEGATIVE_X, level)
    }

    for (const level of descriptor.levels(CubeMapTexture.POSITIVE_X)) {
      descriptor.getImage(CubeMapTexture.POSITIVE_X, level)
                .upload(context, context.TEXTURE_CUBE_MAP_POSITIVE_X, level)
    }

    for (const level of descriptor.levels(CubeMapTexture.NEGATIVE_Y)) {
      descriptor.getImage(CubeMapTexture.NEGATIVE_Y, level)
                .upload(context, context.TEXTURE_CUBE_MAP_NEGATIVE_Y, level)
    }

    for (const level of descriptor.levels(CubeMapTexture.POSITIVE_Y)) {
      descriptor.getImage(CubeMapTexture.POSITIVE_Y, level)
                .upload(context, context.TEXTURE_CUBE_MAP_POSITIVE_Y, level)
    }

    for (const level of descriptor.levels(CubeMapTexture.NEGATIVE_Z)) {
      descriptor.getImage(CubeMapTexture.NEGATIVE_Z, level)
                .upload(context, context.TEXTURE_CUBE_MAP_NEGATIVE_Z, level)
    }

    for (const level of descriptor.levels(CubeMapTexture.POSITIVE_Z)) {
      descriptor.getImage(CubeMapTexture.POSITIVE_Z, level)
                .upload(context, context.TEXTURE_CUBE_MAP_POSITIVE_Z, level)
    }
  }
}
