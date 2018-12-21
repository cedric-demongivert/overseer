import { Vector3f } from '@cedric-demongivert/gl-tool-math'

import { System } from '@overseer/engine/ecs'
import { Viewport } from '@overseer/engine/components'

/**
* A system that render the current scene with a given a GLKit context.
*/
export class GLToolRenderingSystem extends System {
  /**
  * Create a new GLKitRenderingSystem for a particular glkit context.
  *
  * @param {WebGLRenderingContext} context - A webgl context.
  * @param {object} viewport - Viewport configuration.
  */
  constructor (context, viewport = {}) {
    super()
    this._left = viewport.left || 0
    this._bottom = viewport.bottom || 0
    this._width = viewport.width || 0
    this._height = viewport.height || 0
    this._context = context
    this._color = new Vector3f()
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
    const gl = this._context.context

    this.initializeContext(gl)

    for (const target of this.manager.getComponentsOfType(Viewport)) {
      this.renderViewport(gl, target)
    }

    this.resetContext(gl)
  }

  initializeContext (gl) {
    gl.viewport(this._left, this._bottom, this._width, this._height)
    gl.enable(gl.SCISSOR_TEST)
    gl.enable(gl.BLEND)
    gl.enable(gl.DEPTH_TEST)
    gl.blendEquation(gl.FUNC_ADD)
    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA
    )
  }

  renderViewport (gl, viewport) {
    gl.scissor(
      viewport.left,
      viewport.bottom,
      viewport.width,
      viewport.height
    )

    gl.clearColor(
      viewport.background.r,
      viewport.background.g,
      viewport.background.b,
      1.0
    )

    gl.clearDepth(1.0)

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    if (viewport.camera) {
      for (const system of this.manager.systems) {
        if (system !== this && system.render) {
          system.render(gl, viewport)
        }
      }
    }
  }

  resetContext (gl) {
    gl.disable(gl.SCISSOR_TEST)
    gl.disable(gl.BLEND)
    gl.disable(gl.DEPTH_TEST)
  }
}
