import { GLContext } from './GLContext'

/**
* A common class for all engine objects assigned to a GLContext.
*/
export class GLObject {
  /**
  * Create a new engine object.
  *
  * @param {GLContextualised} context - The context associated to the object.
  */
  constructor (context) {
    this._context = GLContext.context(context)
  }

  /**
  * @return {WebGLRenderingContext} The context associated to this object.
  */
  get context () {
    return this._context
  }

  /**
  * Destroy this object.
  */
  destroy () {

  }
}
