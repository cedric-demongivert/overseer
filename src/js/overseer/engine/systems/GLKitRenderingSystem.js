import { System } from '@overseer/engine/ecs'
import { Viewport } from '@overseer/engine/components'
import { GLContext } from '@glkit'

/**
* A system that render the current scene on a GLKit context.
*/
export class GLKitRenderingSystem extends System {
  /**
  * Create a new GLKitRenderingSystem for a particular glkit context.
  *
  * @param {GLContextualised} context - Any GLContextualised object.
  * @param {object} viewport - Viewport configuration.
  */
  constructor (context, viewport = {}) {
    super()
    this._left = viewport.left || 0
    this._bottom = viewport.bottom || 0
    this._width = viewport.width || 0
    this._height = viewport.height || 0
    this._gl = GLContext.context(context)
  }

  /**
  * @return {object} Viewport information.
  */
  get viewport () {
    return {
      left: this._left,
      bottom: this._bottom,
      width: this._width,
      height: this._height
    }
  }

  /**
  * @param {object} value - New viewport information.
  */
  set viewport ({
    left = this._left,
    bottom = this._bottom,
    width = this._width,
    height = this._height
  }) {
    this._left = left
    this._bottom = bottom
    this._width = width
    this._height = height
  }

  /**
  * Render an ecs by using glkit.
  */
  render () {
    const gl = this._gl
    gl.viewport(this._left, this._bottom, this._width, this._height)
    gl.enable(gl.SCISSOR_TEST)

    for (const target of this.manager.components(Viewport)) {
      gl.scissor(target.left, target.bottom, target.width, target.height)
      gl.clearColor(...target.background)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      if (target.camera) {
        for (const system of this.manager.systems()) {
          if (system !== this && system.render) {
            system.render(gl, target)
          }
        }
      }
    }

    gl.disable(gl.SCISSOR_TEST)
  }
}
