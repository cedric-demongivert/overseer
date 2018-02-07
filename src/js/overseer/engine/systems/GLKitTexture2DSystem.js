import { System, Component } from '@overseer/engine/ecs'
import { Texture2D } from '@overseer/engine/components'
import { GLContext, GLTexture2D } from '@glkit'

/**
* A system that manage 2d textures for a context.
*/
export class GLKitTexture2DSystem extends System {
  /**
  * Create a new GLKitTexture2DSystem for a particular glkit context.
  *
  * @param {GLContextualised} context - Any GLContextualised object.
  */
  constructor (context) {
    super()
    this._gl = GLContext.context(context)
    this._textures = new Map()

    this._gl.getTexture = (component) => {
      return this._textures.get(Component.identifier(component))
    }
  }

  /**
  * @see System#initialize
  */
  initialize () {
    for (const texture of this.manager.components(Texture2D)) {
      const glTexture = new GLTexture2D(this._gl)
      this._updateTexture(glTexture, texture)
      this._textures.set(texture.identifier, glTexture)
    }
  }

  /**
  * @see System#managerDidAddComponent
  */
  managerDidAddComponent (component) {
    if (component.type === Component.typeof(Texture2D)) {
      const glTexture = new GLTexture2D(this._gl)
      this._updateTexture(glTexture, component)
      this._textures.set(component.identifier, glTexture)
    }
  }

  /**
  * @see System#managerDidDeleteComponent
  */
  managerDidDeleteComponent (component) {
    if (component.type === Component.typeof(Texture2D)) {
      this._textures.get(component.identifier).destroy()
      this._textures.delete(component.identifier)
    }
  }

  /**
  * @see System#update
  */
  update () {
    for (const [identifier, glTexture] of this._textures.entries()) {
      const component = this.manager.getComponent(identifier)

      if (component.version !== glTexture.$version) {
        this._updateTexture(glTexture, component)
      }
    }
  }

  /**
  * Update a glkit texture from a texture component raw data.
  *
  * @param {GLTexture2D} glTexture - A glkit texture to update.
  * @param {Texture2D} texture - A component texture to commit.
  */
  _updateTexture (glTexture, texture) {
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

    glTexture.$version = texture.version
  }

  /**
  * @see System#destroy
  */
  destroy () {
    for (const texture of this._textures.values()) {
      texture.destroy()
    }

    this._textures.clear()
    delete this._gl.getTexture
  }
}
