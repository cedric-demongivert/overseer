import { GLBuffer } from './GLBuffer'
import { GLContext } from './GLContext'

/**
* A wrapper over a WebGLBuffer to bind to an ELEMENT_ARRAY_BUFFER target.
*/
export class GLElementArrayBuffer extends GLBuffer {
  /**
  * Create a new GLElementArrayBuffer.
  *
  * @param {GLContextualised} context - The webgl rendering context of the buffer.
  */
  constructor (context, target) {
    super(context, GLContext.context(context).ELEMENT_ARRAY_BUFFER)
  }
}
