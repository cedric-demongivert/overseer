import { Component } from '@cedric-demongivert/gl-tool-ecs'

import { Camera } from '../components/Camera'

import { Viewport } from './Viewport'
import { WebGLRenderingSystem } from './WebGLRenderingSystem'

export class WebGLRenderingPass {
  /**
  * The WebGL rendering context used for the rendering pass.
  */
  public context : WebGLRenderingSystem

  /**
  * The camera used for the rendering pass.
  */
  public camera : Component<Camera>

  /**
  * The rendering area of the rendering pass.
  */
  public viewport : Viewport

  /**
  * Instantiate a new rendering pass object.
  */
  public constructor () {
    this.context = null
    this.camera = null
    this.viewport = null
  }

  public clear () : void {
    this.context = null
    this.camera = null
    this.viewport = null
  }

  public copy (toCopy : WebGLRenderingPass) : void {
    this.context = toCopy.context
    this.camera = toCopy.camera
    this.viewport = toCopy.viewport
  }
}
