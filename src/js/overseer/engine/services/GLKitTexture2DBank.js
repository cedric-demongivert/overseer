import { GLContext, GLTexture2D } from '@glkit'

const $banks = new Map()

/**
* A service that expose a bank of GLTexture2D for a given context.
*/
export class GLKitTexture2DBank {
  /**
  * Return texture bank class for a given context.
  *
  * @param {GLContextualised} context - The context of the bank.
  *
  * @return {Class} A texture bank class for the given context.
  */
  static ['of'] (context) {
    const gl = GLContext.context(context)
    if (!$banks.has(gl)) {
      $banks.set(
        gl,
        class ContextualisedGLKitTexture2DBank extends GLKitTexture2DBank {
          constructor () {
            super(gl)
          }
        }
      )
    }

    return $banks.get(gl)
  }

  // @TODO AUTO CALL ON CONTEXT DESTRUCTION
  /**
  * Forget a texture bank contextualised class.
  *
  * @param {GLContextualised} context - The context to forget.
  */
  static free (context) {
    const gl = GLContext.context(context)
    if ($banks.has(gl)) {
      $banks.delete(gl)
    }
  }

  /**
  * Create a new empty texture bank for a given context.
  *
  * @param {GLContextualised} context - The context of this bank.
  */
  constructor (context) {
    this._gl = GLContext.context(context)
    this._textures = new Map()
  }

  /**
  * Add a texture 2d to this bank.
  *
  * @param {Texture2D} component - A component that describe the texture 2D.
  *
  * @return {GLKitTexture2DBank} The given bank instance for chaining purpose.
  */
  add (component) {
    if (!this._textures.has(component.identifier)) {
      const glTexture = new GLTexture2D(this._gl)
      this._update(glTexture, component)
      this._textures.set(component.identifier, {
        value: glTexture,
        version: component.version
      })
    }

    return this
  }

  /**
  * Update a contextualised texture.
  *
  * @param {Texture2D} component - A component that describe the texture 2D to update.
  *
  * @return {GLKitTexture2DBank} The given bank instance for chaining purpose.
  */
  update (component) {
    if (
      this._textures.has(component.identifier) &&
      this._textures.get(component.identifier).version !== component.version
    ) {
      this._update(
        this._textures.get(component.identifier).value,
        component
      )
      this._textures.get(component.identifier).version = component.version
    }

    return this
  }

  /**
  * Update a glkit texture from a texture component raw data.
  *
  * @param {GLTexture2D} glTexture - A glkit texture to update.
  * @param {Texture2D} texture - A component texture to commit.
  */
  _update (glTexture, texture) {
    glTexture.magnificationFilter = texture.magnificationFilter
    glTexture.mignificationFilter = texture.mignificationFilter
    glTexture.wrapS = texture.wrapS
    glTexture.wrapT = texture.wrapT

    if (texture.content == null || texture.content instanceof ArrayBuffer) {
      glTexture.data(
        0, texture.format, texture.width, texture.height, 0,
        texture.format, texture.type, texture.content
      )
    } else {
      glTexture.data(
        0, texture.format, texture.format, texture.type, texture.content
      )
    }
  }

  /**
  * Check if a texture exists for a given component.
  *
  * @param {Texture2D} component - A component that describe the texture 2D.
  *
  * @return {boolean} True if this bank hold a contextualised texture instance for the given component.
  */
  has (component) {
    return this._textures.has(component.identifier)
  }

  /**
  * Return a contextualised texture of this bank.
  *
  * @param {Texture2D} component - A component that describe the texture 2D to fetch.
  *
  * @return {GLTexture2D} A contextualised texture of this bank.
  */
  get (component) {
    return this._textures.get(component.identifier)
  }

  /**
  * Delete a texture 2d to this bank.
  *
  * @param {Texture2D} component - A component that describe the texture 2D.
  *
  * @return {GLKitTexture2DBank} The given bank instance for chaining purpose.
  */
  delete (component) {
    if (this._textures.has(component.identifier)) {
      this._textures.get(component.identifier).destroy()
      this._textures.delete(component.identifier)
    }

    return this
  }

  /**
  * Clear this bank.
  *
  * @return {GLKitTexture2DBank} The given bank instance for chaining purpose.
  */
  clear () {
    for (const { value } of this._textures.values()) {
      value.destroy()
    }

    this._textures.clear()
    return this
  }
}
