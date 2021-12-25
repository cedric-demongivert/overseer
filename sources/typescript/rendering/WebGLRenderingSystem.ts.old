import { Sequence } from '@cedric-demongivert/gl-tool-collection'
import { WebGLShaderCollection } from '@cedric-demongivert/gl-tool-shader'
import { WebGLProgramCollection } from '@cedric-demongivert/gl-tool-shader'
import { WebGLBufferCollection } from '@cedric-demongivert/gl-tool-buffer'
import { WebGLGeometryCollection } from '@cedric-demongivert/gl-tool-buffer'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import { ShaderCollection } from '@cedric-demongivert/gl-tool-shader'
import { ProgramCollection } from '@cedric-demongivert/gl-tool-shader'
import { BufferCollection } from '@cedric-demongivert/gl-tool-buffer'
import { GeometryCollection } from '@cedric-demongivert/gl-tool-buffer'

import { Vector3f } from '@cedric-demongivert/gl-tool-math'

import { CameraType } from '../types/CameraType'

import { WebGLRenderingPass } from './WebGLRenderingPass'
import { Viewport } from './Viewport'
import { OverseerSystem } from './OverseerSystem'

export class WebGLRenderingSystem extends OverseerSystem {
  public readonly canvas     : HTMLCanvasElement
  public readonly context    : WebGLRenderingContext
  public readonly shaders    : WebGLShaderCollection
  public readonly programs   : WebGLProgramCollection
  public readonly buffers    : WebGLBufferCollection
  public readonly geometries : WebGLGeometryCollection

  private readonly _pass : WebGLRenderingPass
  private readonly _viewport : Viewport

  /**
  * Return the left border coordinate of the underlying WebGL viewport in pixels.
  */
  public get left () : number {
    return 0
  }

  /**
  * Return the right border coordinate of the underlying WebGL viewport in pixels.
  */
  public get right () : number {
    return this.canvas.width
  }

  /**
  * Return the bottom border coordinate of the underlying WebGL viewport in pixels.
  */
  public get bottom () : number {
    return 0
  }

  /**
  * Return the top border coordinate of the underlying WebGL viewport in pixels.
  */
  public get top () : number {
    return this.canvas.height
  }

  /**
  * Return the width of the underlying WebGL viewport in pixels.
  */
  public get width () : number {
    return this.canvas.width
  }

  /**
  * Return the height of the underlying WebGL viewport in pixels.
  */
  public get height () : number {
    return this.canvas.height
  }

  /**
  * Create a new WebGLRenderingSystem.
  */
  public constructor (canvas : HTMLCanvasElement, context : WebGLRenderingContext) {
    super()

    this.canvas = canvas
    this.context = context
    this.shaders = new WebGLShaderCollection(context)
    this.programs = new WebGLProgramCollection(this.shaders)
    this.buffers = new WebGLBufferCollection(context)
    this.geometries = new WebGLGeometryCollection(this.buffers)

    this._pass = new WebGLRenderingPass()
    this._viewport = new Viewport()
  }

  /**
  * @see OverseerSystem.initialize
  */
  public initialize () : void {
    this.manager.addSystem(this.shaders)
    this.manager.addSystem(this.programs)
    this.manager.addSystem(this.buffers)
    this.manager.addSystem(this.geometries)

    this.manager.requireSystem(ShaderCollection).addListener(this.shaders)
    this.manager.requireSystem(ProgramCollection).addListener(this.programs)
    this.manager.requireSystem(BufferCollection).addListener(this.buffers)
    this.manager.requireSystem(GeometryCollection).addListener(this.geometries)
  }

  /**
  * @see OverseerSystem.destroy
  */
  public destroy () : void {
    this.manager.requireSystem(ShaderCollection).deleteListener(this.shaders)
    this.manager.requireSystem(ProgramCollection).deleteListener(this.programs)
    this.manager.requireSystem(BufferCollection).deleteListener(this.buffers)
    this.manager.requireSystem(GeometryCollection).deleteListener(this.geometries)

    this.manager.deleteSystem(this.shaders)
    this.manager.deleteSystem(this.programs)
    this.manager.deleteSystem(this.buffers)
    this.manager.deleteSystem(this.geometries)
  }

  /**
  * Make a render pass for the given camera into the default viewport.
  *
  * The default viewport is the viewport that fill the entire canvas size.
  *
  * @param camera - The camera to render.
  */
  public render (camera : Entity) : void {
    this._viewport.left = 0
    this._viewport.bottom = 0
    this._viewport.right = this.canvas.width
    this._viewport.top = this.canvas.height

    this.renderAt(camera, this._viewport)
  }

  /**
  * Make a render pass for the given camera into the given viewport.
  *
  * @param camera - The camera to render.
  * @param viewport - The rendering area.
  */
  public renderAt (camera : Entity, viewport : Viewport) : void {
    const pass : WebGLRenderingPass = this._pass

    pass.context = this
    pass.camera = this.manager.getComponentOfEntity(camera, CameraType)
    pass.viewport = viewport

    const systems : Sequence<any> = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system : any = systems.get(index)

      if (system.renderWithWebGL) {
        system.renderWithWebGL(pass)
      }
    }
  }

  /**
  * Clear the color buffer.
  *
  * @param color - Clearing color.
  */
  public clear (color : Vector3f) : void {
    const webgl : WebGLRenderingContext = this.context

    webgl.clearColor(color.x, color.y, color.z, 1.0)
    webgl.clear(webgl.COLOR_BUFFER_BIT)
  }
}

export namespace WebGLRenderingSystem {
  export type WebGLContextConfiguration = {
    alpha?     : boolean,
    depth?     : boolean,
    stencil?   : boolean,
    antialias? : boolean
  }

  export function wrap (canvas : HTMLCanvasElement, options? : WebGLContextConfiguration) : WebGLRenderingSystem {
    return new WebGLRenderingSystem(canvas, createContext(canvas, options))
  }

  /**
  * Instantiate and return a new WebGLRenderingContext from the given canvas.
  *
  * @param canvas  - Parent canvas of the context to instantiate.
  * @param options - Options to use for instantiating the given webgl context.
  *
  * @return A new WebGLRenderingContext
  */
  export function createContext (canvas : HTMLCanvasElement, options : WebGLContextConfiguration) : WebGLRenderingContext {
    let context : any

    try {
      context = (
        canvas.getContext('webgl', options) ||
        canvas.getContext('experimental-webgl', options)
      )
    } catch (exception) {
      throw new Error(
        'Unnable to get a webgl context : ' + exception.message +  '. ' +
        'Please check if your browser support webgl or experimental-webgl.'
      )
    }

    if (context) { return context }

    throw new Error(
      'Unnable to get a webgl context. Please check if your browser ' +
      'support webgl or experimental-webgl.'
    )
  }
}
