import { Vector3f } from '@cedric-demongivert/gl-tool-math'
import { GLContext } from '@cedric-demongivert/gl-tool-core'
import { Sequence } from '@cedric-demongivert/gl-tool-collection'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'
import { System } from '@cedric-demongivert/gl-tool-ecs'

import { Viewport } from '../components/Viewport'
import { ViewportType } from '../types/ViewportType'

import { OverseerSystem } from './OverseerSystem'
import { LayerManagementSystem } from './LayerManagementSystem'

export class GLToolRenderingSystem extends OverseerSystem {
  public left : number
  public bottom : number
  public width : number
  public height : number

  public readonly color : Vector3f

  public layer : LayerManagementSystem

  public context : GLContext
  public gl : WebGLRenderingContext

  /**
  * Create a new GLKitRenderingSystem.
  */
  constructor () {
    super()

    this.left = 0
    this.bottom = 0
    this.width = 0
    this.height = 0

    this.context = null
    this.gl = null
    this.color = new Vector3f()

    this.layer = null
  }

  /**
  * @see OverseerSystem.initialize
  */
  public initialize () : void {
    this.layer = this.manager.requireSystem(LayerManagementSystem) as LayerManagementSystem
  }

  /**
  * @see OverseerSystem.destroy
  */
  public destroy () : void {
    this.layer = null
  }

  public setColor (red : number, green : number, blue : number) : void {
    this.color.set(red, green, blue)
  }

  /**
  * Make a rendering pass of the parent entity-component-system.
  */
  public render () : void {
    if (this.context == null) return

    this.initializeRendering()

    if (this.width > 0 && this.height > 0) {
      const entitiesWithViewport : Sequence<Entity> = this.manager.getEntitiesWithType(ViewportType)
      const size : number = entitiesWithViewport.size

      for (let index = 0; index < size; ++index) {
        this.renderViewport(entitiesWithViewport.get(index))
      }
    }

    this.terminateRendering()
  }

  /**
  * Prepare the underlying webgl rendering context for a new rendering pass.
  */
  public initializeRendering () : void {
    this.gl.viewport(this.left, this.bottom, this.width, this.height)

    this.gl.enable(this.gl.SCISSOR_TEST)
    this.gl.enable(this.gl.BLEND)

    this.gl.blendEquationSeparate(this.gl.FUNC_ADD, this.gl.FUNC_ADD)
    this.gl.blendFuncSeparate(
      this.gl.SRC_ALPHA,
      this.gl.ONE_MINUS_SRC_ALPHA,
      this.gl.ONE,
      this.gl.ONE_MINUS_SRC_ALPHA,
    )

    this.gl.scissor(this.left, this.bottom, this.width, this.height)
    this.clear(this.color)
  }

  /**
  * Clear all the webgl buffers.
  *
  * @param color - Clearing color.
  */
  public clear (color : Vector3f) : void {
    this.gl.clearColor(color.x, color.y, color.z, 1.0)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
  }

  /**
  * Restrict the rendering area to the given viewport.
  *
  * @param viewport - A viewport to use.
  */
  public restrict (viewport : Viewport) : void {
    this.gl.scissor(
      viewport.left,
      viewport.bottom,
      viewport.width,
      viewport.height
    )
  }

  /**
  * Does render the given viewport.
  *
  * @param  entity - The entity that have the given viewport.
  */
  public renderViewport (entity : Entity) : void {
    const viewport : Viewport = this.manager.getComponent(entity, ViewportType).data

    this.restrict(viewport)
    this.clear(viewport.background)

    if (viewport.camera) {
      const entities : number = this.manager.entities.size

      for (let index = 0; index < entities; ++index) {
        this.renderEntity(viewport, this.layer.entities.get(index))
      }
    }
  }

  /**
  * Render an entity.
  *
  * @param viewport - A viewport instance to render.
  * @param entity - An entity to render.
  */
  public renderEntity (viewport : Viewport, entity : Entity) : void {
    const systems : Sequence<System> = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system : any = systems.get(index)

      if (system.isGLToolRenderable) {
        system.render(this.context, viewport, entity)
      }
    }
  }

  /**
  * Rollback some rendering context configuration after a rendering pass.
  */
  public terminateRendering () : void {
    this.gl.disable(this.gl.SCISSOR_TEST)
    this.gl.disable(this.gl.BLEND)
  }
}
