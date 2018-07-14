import { GLContext } from './GLContext'

import { InvalidInvocationError } from '@errors'

/**
* A common class for all objects associated with a webgl context.
*/
export class GLObject {
  /**
  * Create a new engine object for a given context.
  *
  * @param {WebGLRenderingContext|GLContext} context - A webgl context to associate with this object.
  */
  constructor (context) {
    this._context = GLContext.context(context)
    this._context.registerObject(this)
  }

  /**
  * @return {WebGLRenderingContext} The context associated to this object.
  */
  get context () {
    return this._context.context
  }

  /**
  * @return {boolean} True if this object was destroyed and all of its resources was released.
  */
  get destroyed () {
    return this._context == null
  }

  /**
  * Destroy this object.
  *
  * @throws {InvalidInvocationError} If this object instance was already destroyed.
  */
  destroy () {
    if (this._context == null) {
      const oldContext = this._context
      this._context = null
      oldContext.unregisterObject(this)
    } else {
      throw new InvalidInvocationError(
        'Trying to destroy an already destroyed object.'
      )
    }
  }
}
