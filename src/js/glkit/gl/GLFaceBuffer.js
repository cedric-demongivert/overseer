import { GLBuffer } from './GLBuffer'

/**
* Contextualisation of a face buffer.
*/
export class GLFaceBuffer extends GLBuffer {
  /**
  * @see GLBuffer#get bound
  */
  get bound () {
    const context = this.context
    return context.getParameter(
      context.ELEMENT_ARRAY_BUFFER_BINDING
    ) === this._pointer
  }

  /**
  * @see GLBuffer#bind
  */
  bind () {
    const context = this.context
    context.bindBuffer(
      context.ELEMENT_ARRAY_BUFFER, this._pointer
    )

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

    this.dirty = false
  }

  /**
  * @see GLBuffer#get size
  */
  get size () {
    const context = this.context
    return context.getBufferParameter(
      context.ELEMENT_ARRAY_BUFFER,
      context.BUFFER_SIZE
    )
  }

  /**
  * @see GLBuffer#get usage
  */
  get usage () {
    const context = this.context
    return context.getBufferParameter(
      context.ELEMENT_ARRAY_BUFFER,
      context.BUFFER_USAGE
    )
  }
}
