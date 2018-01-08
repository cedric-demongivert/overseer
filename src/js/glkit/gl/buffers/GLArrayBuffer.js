import { GLBuffer } from './GLBuffer'

/**
* A wrapper over a WebGLBuffer to bind to an ARRAY_BUFFER target.
*/
export class GLArrayBuffer extends GLBuffer {
  /**
  * @see GLBuffer#get bound
  */
  get bound () {
    return this.$getParameter(this.$ARRAY_BUFFER_BINDING) === this._buffer
  }

  /**
  * @see GLBuffer#bind
  */
  bind () {
    if (!this.bound) {
      this.$bindBuffer(this.$ARRAY_BUFFER, this._buffer)
    }

    return this
  }

  /**
  * @see GLBuffer#data
  */
  data (...params) {
    this.bind()
    this.$bufferData(this.$ARRAY_BUFFER, ...params)
  }

  /**
  * @see GLBuffer#subdata
  */
  subdata (...params) {
    this.bind()
    this.$bufferSubData(this.$ARRAY_BUFFER, ...params)
  }

  /**
  * @see GLBuffer#get size
  */
  get size () {
    this.bind()
    return this.$getBufferParameter(this.$ARRAY_BUFFER, this.$BUFFER_SIZE)
  }

  /**
  * @see GLBuffer#get usage
  */
  get usage () {
    this.bind()
    return this.$getBufferParameter(this.$ARRAY_BUFFER, this.$BUFFER_SIZE)
  }
}
