import { GLContext } from './gl/GLContext'
import { GLContextualisation } from './gl/GLContextualisation'

/**
* An object that describe some engine data.
*/
export class Descriptor {
  /**
  * Contextualise this descriptor.
  *
  * @param {WebGLRenderingContext|GLContext} context - A context to bind.
  *
  * @return {GLContextualisation} A contextualisation of this descriptor.
  */
  contextualise (context) {
    return new GLContextualisation(context, this)
  }
}
