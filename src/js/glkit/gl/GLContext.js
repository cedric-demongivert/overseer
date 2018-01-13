import { GLObject } from './GLObject'

const $isGLContextInstance = Symbol('$isGLContextInstance')
const $contexts = new WeakMap()

/**
* @typedef {WebGLRenderingContext|GLClass|{[GLContext.get]: WebGLRenderingContext}} GLContextualised
*/

/**
* A webgl context wrapper.
*/
export class GLContext {
  /**
  * Create a new GLContext.
  *
  * @param {GLContextualised} context - The context to wrap.
  */
  constructor (context) {
    return GLContext.context(context)
  }

  /**
  * Extract the raw WebGLRenderingContext of any contextualised object.
  *
  * @param {GLContextualised} context - Object to use for extraction.
  *
  * @throws {Error} When the object is not a contextualised object.
  *
  * @return {WebGLRenderingContext} The raw webgl context of an object.
  */
  static raw (context) {
    if (context instanceof GLObject) {
      return context.context.raw
    } else if (context instanceof GLContext) {
      return context.raw
    } else if (context[GLContext.get]) {
      return context[GLContext.get].raw
    } else if (context instanceof window.WebGLRenderingContext) {
      return context
    } else {
      throw new Error([
        'Unnable to extract a WebGLRenderingContext from a uncontextualised ',
        'object.'
      ].join(''))
    }
  }

  /**
  * Extract the GLContext of any contextualised object.
  *
  * @param {GLContextualised} context - Object to use for extraction.
  *
  * @throws {Error} When the object is not a contextualised object.
  *
  * @return {GLContext} The GLContext of an object.
  */
  static context (context) {
    if (context instanceof GLObject) {
      return context.context
    } else if (context instanceof GLContext) {
      return context
    } else if (context[GLContext.get]) {
      return context[GLContext.get]
    } else if (context instanceof window.WebGLRenderingContext) {
      if ($contexts.has(context)) {
        return $contexts.get(context)
      } else {
        return wrapContext(context)
      }
    } else {
      throw new Error(
        'Unnable to extract a GLContext from a uncontextualised object.'
      )
    }
  }

  /**
  * Create a new GLContext.
  *
  * @param {GLContextualised} context - The context to wrap.
  *
  * @return {GLContext} The new wrapper.
  */
  static from (context) {
    return GLContext.context(context)
  }

  /**
  * @return {boolean} Always true.
  */
  get [$isGLContextInstance] () {
    return true
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Symbol/hasInstance
  */
  static [Symbol.hasInstance] (instance) {
    return instance && instance[$isGLContextInstance] === true
  }
}

GLContext.get = Symbol('GLContext#get')

/**
* Wrap a WebGLRenderingContext.
*
* @param {WebGLRenderingContext} toWrap - WebGLRenderingContext to wrap.
*
* @return {GLContext} The wrapped context.
*/
function wrapContext (toWrap) {
  class GLContext {
    /**
    * @return {boolean} Always true.
    */
    get [$isGLContextInstance] () {
      return true
    }

    /**
    * @return {WebGLRenderingContext} The wrapped context.
    */
    get raw () {
      return toWrap
    }
  }

  const WebGLRenderingContext = window.WebGLRenderingContext

  for (const key in WebGLRenderingContext.prototype) {
    if (key in WebGLRenderingContext) {
      GLContext.prototype[key] = WebGLRenderingContext[key]
    } else {
      GLContext.prototype[key] = (...x) => toWrap[key](...x)
    }
  }

  const wrapper = new GLContext()
  $contexts.set(toWrap, wrapper)

  return wrapper
}
