import { GLObject } from './GLObject'

/**
* A wrapper over a WebGLBuffer.
*/
export class GLBuffer extends GLObject {
  /**
  * Create a new GLBuffer over a native WebGLBuffer.
  *
  * @param {GLContextualised} context - The webgl rendering context of the buffer.
  * @param {GLEnum} target - The buffer target.
  */
  constructor (context, target) {
    super(context)
    this._buffer = this._context.createBuffer()
    this._target = target
  }

  /**
  * @inline
  * @return {GLEnum} The binding target of this buffer.
  */
  get target () {
    return this._target
  }

  /**
  * @return {boolean} True if this buffer is bound to a target.
  */
  get bound () {
    const gl = this._context
    const target = this._target

    switch (target) {
      case gl.ARRAY_BUFFER:
        return gl.getParameter(gl.ARRAY_BUFFER_BINDING) === this._buffer
      case gl.ELEMENT_ARRAY_BUFFER:
        return gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING) === this._buffer
      default:
        throw new Error(`Invalid buffer binding target : ${target}.`)
    }
  }

  /**
  * Bind this buffer.
  *
  * @return {GLBuffer} The current instance for chaining purpose.
  */
  bind () {
    if (!this.bound) {
      this._context.bindBuffer(this._target, this._buffer)
    }

    return this
  }

  /**
  * Change the length, the data and the usage of this buffer.
  *
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData
  */
  data (...params) {
    /** @inline */ this.bind()
    this._context.bufferData(this._target, ...params)
  }

  /**
  * Change a part of this buffer.
  *
  * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferSubData
  */
  subdata (...params) {
    /** @inline */ this.bind()
    this._context.bufferSubData(this._target, ...params)
  }

  /**
  * @return {number} The size of this buffer.
  */
  get size () {
    /** @inline */ this.bind()
    return this._context.getBufferParameter(
      this._target,
      this._context.BUFFER_SIZE
    )
  }

  /**
  * @return {GLEnum} The current usage of this buffer.
  */
  get usage () {
    /** @inline */ this.bind()
    return this._context.getBufferParameter(
      this._target,
      this._context.BUFFER_USAGE
    )
  }

  /**
  * Destroy this buffer from its GLContext.
  */
  destroy () {
    this._context.deleteBuffer(this._buffer)
    super.destroy()
  }
}
