import { GLBuffer } from './GLBuffer'
import { GLContext } from './GLContext'

/**
* A wrapper over a WebGLBuffer to bind to an ARRAY_BUFFER target.
*/
export class GLArrayBuffer extends GLBuffer {
  /**
  * Create a new GLArrayBuffer.
  *
  * @param {GLContextualised} context - The webgl rendering context of the buffer.
  */
  constructor (context, target) {
    super(context, GLContext.context(context).ARRAY_BUFFER)
  }
}
