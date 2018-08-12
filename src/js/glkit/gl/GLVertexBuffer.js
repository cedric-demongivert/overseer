import { GLBuffer } from './GLBuffer'

/**
* A wrapper over a WebGLBuffer to bind to an ARRAY_BUFFER target.
*/
export class GLVertexBuffer extends GLBuffer {
  /**
  * @see GLBuffer#get bound
  */
  get bound () {
    const context = this.context
    return context.getParameter(
      context.ARRAY_BUFFER_BINDING
    ) === this._pointer
  }

  /**
  * @see GLBuffer#bind
  */
  bind () {
    const context = this.context
    context.bindBuffer(context.ARRAY_BUFFER, this._buffer)

    if (this.dirty) {
      this.update()
    }

    return this
  }

  update () {
    const context = this.context
    const descriptor = this.descriptor

    context.bufferData(
      this._pointer,
      descriptor.buffer,
      descriptor.usage.resolve(context)
    )

    this._size = descriptor.size
    this.dirty = false
  }

  /**
  * @see GLBuffer#data
  */
  data (...params) {
    const context = this.context
    context.bufferData(context.ARRAY_BUFFER, ...params)
  }

  /**
  * @see GLBuffer#subdata
  */
  subdata (...params) {
    const context = this.context
    context.bufferSubData(context.ARRAY_BUFFER, ...params)
  }

  /**
  * @see GLBuffer#get size
  */
  get size () {
    const context = this.context
    return context.getBufferParameter(
      context.ARRAY_BUFFER,
      context.BUFFER_SIZE
    )
  }

  /**
  * @see GLBuffer#get usage
  */
  get usage () {
    const context = this.context
    return context.getBufferParameter(
      context.ARRAY_BUFFER,
      context.BUFFER_USAGE
    )
  }
}
