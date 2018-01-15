import { System } from '@overseer/engine/ecs'
import { Viewport } from '@overseer/engine/components'
import { GLContext } from '@glkit'

/**
* A system that manage entity parent - children dependencies via the
* ChildEntity component.
*/
export class GLKitRenderingSystem extends System {
  /**
  * Create a new GLKitRenderingSystem for a particular glkit context.
  *
  * @param {GLContextualised} context - Any GLContextualised object.
  */
  constructor (context) {
    super()
    this._gl = GLContext.context(context)
  }

  render () {
    const gl = this._gl

    for (const target of this.manager.components(Viewport)) {
      gl.viewport(0, 0, target.width, target.height)

      gl.clearColor(...target.background)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      if (target.camera) {

      }
    }
  }
}
