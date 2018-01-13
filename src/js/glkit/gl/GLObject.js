import { GLContext } from './GLContext'
import uuid from 'uuid/v4'

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
    this._uuid = uuid()
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

const WebGLRenderingContext = window.WebGLRenderingContext
for (const key in WebGLRenderingContext.prototype) {
  if (key in WebGLRenderingContext) {
    GLObject.prototype[`$${key}`] = WebGLRenderingContext[key]
  } else {
    GLObject.prototype[`$${key}`] = function (...params) {
      return this._context[key](...params)
    }
  }
}
