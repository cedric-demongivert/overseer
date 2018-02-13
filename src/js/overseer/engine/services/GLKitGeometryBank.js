import { GLContext, GLBuffer } from '@glkit'

const $banks = new Map()

/**
* A service that expose a bank of geometry buffers for a given context.
*/
export class GLKitGeometryBank {
  /**
  * Return a geometry bank class for a given context.
  *
  * @param {GLContextualised} context - The context of the bank.
  *
  * @return {Class} A geometry bank class for the given context.
  */
  static ['of'] (context) {
    const gl = GLContext.context(context)
    if (!$banks.has(gl)) {
      $banks.set(
        gl,
        class ContextualisedGLKitGeometryBank extends GLKitGeometryBank {
          constructor () {
            super(gl)
          }
        }
      )
    }

    return $banks.get(gl)
  }

  // @TODO AUTO CALL ON CONTEXT DESTRUCTION
  /**
  * Forget a geometry bank contextualised class.
  *
  * @param {GLContextualised} context - The context to forget.
  */
  static free (context) {
    const gl = GLContext.context(context)
    if ($banks.has(gl)) {
      $banks.delete(gl)
    }
  }

  /**
  * Create a new empty geometry bank for a given context.
  *
  * @param {GLContextualised} context - The context of this bank.
  */
  constructor (context) {
    this._gl = GLContext.context(context)
    this._buffers = new Map()
  }

  /**
  * Add a geometry to this bank.
  *
  * @param {Geometry} component - A component that describe a geometry.
  *
  * @return {GLKitGeometryBank} The given bank instance for chaining purpose.
  */
  add (component) {
    if (!this._textures.has(component.identifier)) {
      const glArrayBuffer = new GLBuffer.Array(this._gl)
      const glElementBuffer = new GLBuffer.ElementArray(this._gl)
      this._update(glArrayBuffer, glElementBuffer, component)
      this._buffers.set(component.identifier, {
        arrayBuffer: glArrayBuffer,
        elementBuffer: glElementBuffer,
        version: component.version
      })
    }

    return this
  }

  /**
  * Update a contextualised geometry.
  *
  * @param {Geometry} component - A component that describe the geometry to update.
  *
  * @return {GLKitGeometryBank} The given bank instance for chaining purpose.
  */
  update (component) {
    if (!this._buffers.has(component.identifier)) return this

    const { elementBuffer, arrayBuffer, version } = this._buffers.get(component.identifier)

    if (version !== component.version) {
      this._update(
        arrayBuffer,
        elementBuffer,
        component
      )
      this._buffers.get(component.identifier).version = component.version
    }

    return this
  }

  /**
  * Update a contextualised geometry.
  *
  * @param {GLBuffer.Array} glArrayBuffer - The array buffer to update.
  * @param {GLBuffer.ElementArray} glElementBuffer - The element buffer to update.
  *
  * @return {GLKitGeometryBank} The given bank instance for chaining purpose.
  */
  _update (glArrayBuffer, glElementBuffer, component) {
    const { vertices, faces } = component.buffers

    glArrayBuffer.bind()
    glArrayBuffer.data(vertices.buffer, component.usage)
    glElementBuffer.bind()
    glElementBuffer.data(faces.buffer, component.usage)

    return this
  }

  /**
  * Check if a geometry exists for a given component.
  *
  * @param {Geometry} component - A component that describe the geometry.
  *
  * @return {boolean} True if this bank hold a contextualised texture instance for the given component.
  */
  has (component) {
    return this._buffers.has(component.identifier)
  }

  /**
  * Return an array buffer of this bank.
  *
  * @param {Geometry} component - A component that describe the geometry to fetch.
  *
  * @return {GLBuffer.Array} A contextualised array buffer of this bank.
  */
  getArrayBuffer (component) {
    return this._buffers.get(component.identifier).arrayBuffer
  }

  /**
  * Return an element array buffer of this bank.
  *
  * @param {Geometry} component - A component that describe the geometry to fetch.
  *
  * @return {GLBuffer.ElementArray} A contextualised element array buffer of this bank.
  */
  getElementArrayBuffer (component) {
    return this._buffers.get(component.identifier).elementBuffer
  }

  /**
  * Delete a geometry of this bank.
  *
  * @param {Geometry} component - A component that describe the geometry to delete.
  *
  * @return {GLKitGeometryBank} The given bank instance for chaining purpose.
  */
  delete (component) {
    if (this._buffers.has(component.identifier)) {
      const { elementBuffer, arrayBuffer } = this._buffers.get(component.identifier)
      elementBuffer.destroy()
      arrayBuffer.destroy()
      this._buffers.delete(component.identifier)
    }

    return this
  }

  /**
  * Clear this bank.
  *
  * @return {GLKitGeometryBank} The given bank instance for chaining purpose.
  */
  clear () {
    for (const { elementBuffer, arrayBuffer } of this._buffers.values()) {
      elementBuffer.destroy()
      arrayBuffer.destroy()
    }

    this._buffers.clear()
    return this
  }
}
