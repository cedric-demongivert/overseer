import { GLContextualisation } from './GLContextualisation'

/**
* A wrapper over a buffer descriptor.
*/
export class GLBuffer extends GLContextualisation {
  /**
  * Create a new webgl buffer from a given descriptor and a rendering context.
  *
  * @param {GLContext|WebGLRenderingContext} context - The webgl rendering context of this instance.
  * @param {Buffer} descriptor - The buffer descriptor to contextualise.
  */
  constructor (context, descriptor) {
    super(context, descriptor)
    this._pointer = context.createBuffer()
    this._dirty = true
  }

  get dirty () {
    return this._dirty
  }

  set dirty (value) {
    this._dirty = value
  }

  /**
  * @return {boolean} True if this buffer is bound.
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
    throw new Error(`GLBuffer#bind() : GLBuffer is not implemented.`)
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
    this.context.deleteBuffer(this._pointer)
    this._pointer = null
    super.destroy()
  }
}
