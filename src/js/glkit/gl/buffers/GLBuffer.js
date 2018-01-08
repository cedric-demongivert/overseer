import { GLObject } from '../GLObject'

/**
* A wrapper over a WebGLBuffer.
*/
export class GLBuffer extends GLObject {
  /**
  * Create a new GLBuffer over a native WebGLBuffer.
  *
  * @param {GLContextualised} context - The webgl rendering context of the buffer.
  */
  constructor (context) {
    super(context)
    this._buffer = this.$createBuffer()
  }

  /**
  * @return {boolean} True if this buffer is bound to a target.
  */
  get bound () {
    throw new Error(`GLBuffer#get bound() : boolean is not implemented.`)
  }

  /**
  * Bind this buffer.
  *
  * @return {GLBuffer} The current instance for chaining purpose.
  */
  bind () {
    throw new Error(`GLBuffer#bind(...params) : GLBuffer is not implemented.`)
  }

  /**
  * Change the length, the data and the usage of this buffer.
  *
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData
  */
  data (...params) {
    throw new Error(`GLBuffer#data(...params) is not implemented.`)
  }

  /**
  * Change a part of this buffer.
  *
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferSubData
  */
  subdata (...params) {
    throw new Error(`GLBuffer#subdata(...params) is not implemented.`)
  }

  /**
  * @return {number} The size of this buffer.
  */
  get size () {
    throw new Error(`GLBuffer#get size() : number is not implemented.`)
  }

  /**
  * @return {GLEnum} The current usage of this buffer.
  */
  get usage () {
    throw new Error(`GLBuffer#get usage() : GLEnum is not implemented.`)
  }

  /**
  * Destroy this buffer from its GLContext.
  */
  destroy () {
    this.$deleteBuffer(this._buffer)
    super.destroy()
  }
}
