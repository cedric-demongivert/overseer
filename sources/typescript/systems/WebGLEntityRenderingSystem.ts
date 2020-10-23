import { Sequence } from '@cedric-demongivert/gl-tool-collection'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import { WebGLRenderingPass } from './WebGLRenderingPass'
import { OverseerSystem } from './OverseerSystem'
import { LayerManagementSystem } from './LayerManagementSystem'

import { WebGLRenderingSystem } from './WebGLRenderingSystem'
import { Viewport } from './Viewport'

export class WebGLEntityRenderingSystem extends OverseerSystem {
  public layerManagementSystem : LayerManagementSystem

  /**
  * Create a new GLKitRenderingSystem.
  */
  public constructor () {
    super()

    this.layerManagementSystem = null
  }

  /**
  * @see OverseerSystem.initialize
  */
  public initialize () : void {

  }

  /**
  * @see OverseerSystem.destroy
  */
  public destroy () : void {
    this.layerManagementSystem = null
  }

  /**
  * Make a rendering pass of each entity of the parent entity-component-system.
  *
  * @param pass - The rendering pass information.
  */
  public renderWithWebGL (pass : WebGLRenderingPass) : void {
    this.initializeWebGLRenderingPass(pass)

    if (pass.viewport.width > 0 && pass.viewport.height > 0) {
      const entities : number = this.manager.entities.size
      let entity : Entity = 0

      for (let index = 0; index < entities; ++index) {
        if (this.layerManagementSystem) {
          entity = this.layerManagementSystem.entities.get(index)
        } else {
          entity = this.manager.entities.get(index)
        }

        this.renderEntityWithWebGL(pass, entity)
      }
    }

    this.terminateWebGLRenderingPass(pass)
  }

  /**
  * Initialize a given rendering pass in order to render entities.
  *
  * @param pass - The rendering pass to initialize.
  */
  public initializeWebGLRenderingPass (pass : WebGLRenderingPass) : void {
    const viewport : Viewport = pass.viewport
    const context : WebGLRenderingSystem = pass.context
    const webgl : WebGLRenderingContext = context.context

    webgl.viewport(
      0,
      0,
      context.width,
      context.height
    )

    webgl.enable(webgl.SCISSOR_TEST)
    webgl.enable(webgl.BLEND)

    webgl.scissor(
      viewport.left,
      viewport.bottom,
      viewport.width,
      viewport.height
    )

    webgl.blendEquationSeparate(webgl.FUNC_ADD, webgl.FUNC_ADD)
    webgl.blendFuncSeparate(
      webgl.SRC_ALPHA,
      webgl.ONE_MINUS_SRC_ALPHA,
      webgl.ONE,
      webgl.ONE_MINUS_SRC_ALPHA,
    )
  }


  /**
  * Render an entity of the parent entity-component-system.
  *
  * @param pass - The rendering pass information.
  * @param entity - The entity to render.
  */
  public renderEntityWithWebGL (pass : WebGLRenderingPass, entity : Entity) : void {
    const systems : Sequence<any> = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system : any = systems.get(index)

      if (system !== this && system.renderEntityWithWebGL) {
        system.renderEntityWithWebGL(pass, entity)
      }
    }
  }

  /**
  * Rollback some rendering context configuration after a rendering pass.
  *
  * @param pass - The rendering pass to rollback.
  */
  public terminateWebGLRenderingPass (pass : WebGLRenderingPass) : void {
    const webgl : WebGLRenderingContext = pass.context.context

    webgl.disable(webgl.SCISSOR_TEST)
    webgl.disable(webgl.BLEND)
  }
}
