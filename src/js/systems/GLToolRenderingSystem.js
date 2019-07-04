import { Vector3f } from '@cedric-demongivert/gl-tool-math'
import { GLContext } from '@cedric-demongivert/gl-tool-core'

import { Viewport } from '../components/Viewport'

import { OverseerSystem } from './OverseerSystem'

export class GLToolRenderingSystem extends OverseerSystem {
  /**
  * Create a new GLKitRenderingSystem.
  */
  constructor () {
    super()
    this._left = 0
    this._bottom = 0
    this._width = 0
    this._height = 0

    this._context = null
    this._gl = null
    this._color = new Vector3f()
  }

  get left () {
    return this._left
  }

  set left (left) {
    this._left = left
  }

  get bottom () {
    return this._bottom
  }

  set bottom (bottom) {
    this._bottom = bottom
  }

  get width () {
    return this._width
  }

  set width (width) {
    this._width = width
  }

  get height () {
    return this._height
  }

  set height (height) {
    this._height = height
  }

  get color () {
    return this._color
  }

  set color (color) {
    this._color.copy(color)
  }

  setColor (red, green, blue) {
    this._color.set(red, green, blue)
  }

  get context () {
    return this._context
  }

  set context (context) {
    this._context = GLContext.of(context)
    this._gl = this._context ? this._context.context : null
  }

  get gl () {
    return this._gl
  }

  /**
  * Make a rendering pass of the parent entity-component-system.
  */
  render () {
    if (this._context == null) return

    this.initializeRendering()

    if (this._width > 0 && this._height > 0) {
      const entitiesWithViewport = this.manager.getEntitiesWithType(Viewport)
      const size = entitiesWithViewport.size

      for (let index = 0; index < size; ++index) {
        this.renderViewport(entitiesWithViewport.get(index))
      }
    }

    this.terminateRendering()
  }

  /**
  * Prepare the underlying webgl rendering context for a new rendering pass.
  */
  initializeRendering () {
    this._gl.viewport(this._left, this._bottom, this._width, this._height)

    this._gl.enable(this._gl.SCISSOR_TEST)
    this._gl.enable(this._gl.BLEND)
    this._gl.enable(this._gl.DEPTH_TEST)

    this._gl.blendEquation(this._gl.FUNC_ADD)
    this._gl.blendFuncSeparate(
      this._gl.SRC_ALPHA,
      this._gl.ONE_MINUS_SRC_ALPHA,
      this._gl.ONE,
      this._gl.ONE_MINUS_SRC_ALPHA
    )

    this._gl.scissor(this._left, this._bottom, this._width, this._height)
    this.clear(this._color)
  }

  /**
  * Clear all the webgl buffers.
  *
  * @param {Vector3f} color - Clearing color.
  */
  clear (color) {
    this._gl.clearColor(color.x, color.y, color.z, 1.0)
    this._gl.clearDepth(1.0)
    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT)
  }

  /**
  * Restrict the rendering area to the given viewport.
  *
  * @param {Viewport} viewport - A viewport to use.
  */
  restrict (viewport) {
    this._gl.scissor(
      viewport.left,
      viewport.bottom,
      viewport.width,
      viewport.height
    )
  }

  /**
  * Does render the given viewport.
  *
  * @param {number} entity - The entity that have the given viewport.
  */
  renderViewport (entity) {
    const viewport = this.manager.getInstance(entity, Viewport)

    this.restrict(viewport)
    this.clear(this._color)

    if (viewport.camera) {
      const systems = this.manager.systems

      for (let index = 0, size = systems.size; index < size; ++index) {
        const system = systems.get(index)
        if (system.isGLToolRenderable) {
          system.render(this._gl, viewport)
        }
      }
    }
  }

  /**
  * Rollback some rendering context configuration after a rendering pass.
  */
  terminateRendering () {
    this._gl.disable(this._gl.SCISSOR_TEST)
    this._gl.disable(this._gl.BLEND)
    this._gl.disable(this._gl.DEPTH_TEST)
  }
}
