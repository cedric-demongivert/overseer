import { GLContextualisation } from './GLContextualisation'
import { GLType } from '../GLType'
import { ProgramLinkingError } from '../errors'
import { GLUniforms } from './GLUniforms'
import { GLAttributes } from './GLAttributes'

/**
* A wrapper over a WebGLProgram
*/
export class GLProgram extends GLContextualisation {
  /**
  * Create a new contextualisation of a webgl program descriptor.
  *
  * @param {GLContext|WebGLRenderingContext} context - Context to attach.
  * @param {Program} descriptor - A webgl program descriptor.
  */
  constructor (context) {
    super(context, descriptor)

    this._createProgram()
    this._linked = false
    this._uniforms = new GLUniforms(this)
    this._attributes = new GLAttributes(this)
  }

  /**
  * Create the described webgl program into the related context.
  */
  _createProgram () {
    const context = this.context
    const descriptor = this.descriptor
    const pointer = this._pointer = context.createProgram()

    this.vertex.attach(this)
    this.fragment.attach(this)
  }

  /**
  * @return {GLUniforms} All meta information about each uniforms of this program.
  */
  get uniforms () {
    return this._uniforms
  }

  /**
  * @return {GLAttributes} All meta information about each attributes of this program.
  */
  get attributes () {
    return this._attributes
  }

  /**
  * Fill vertex attributes data.
  *
  * @param {GLBuffer} vertex - Buffer to use.
  * @param {VertexFormat} format - Format of the buffer.
  * @param {object} [alias] - Alias in order to select and rerout field names.
  *
  * @return {VertexBuffer} The current buffer for chaining purpose.
  */
  useAttributes (vertex, format, alias) {
    const context = this.context

    vertex.bind()
    this.use()

    for (const field of format.fields()) {
      const attributeName = (alias == null) ? field : alias[field]

      if (attributeName && attributeName in this.attributes) {
        const attributeLocation = this.attributes[attributeName].location
        const attributeType = this.attributes[attributeName].type

        context.vertexAttribPointer(
          attributeLocation,
          TYPE_POINTER_SIZES[attributeType],
          TYPE_POINTER_TYPES[attributeType],
          false,
          format.size,
          format.start(field)
        )

        context.enableVertexAttribArray(attributeLocation)
      }
    }
  }

  /**
  * Return the current vertex shader used by this program.
  *
  * @return {GLShader} The vertex shader used by this program.
  */
  get vertex () {
    return GLContextualisation.of(this.descriptor.vertex, this.context)
  }

  /**
  * Return the current fragment shader used by this program.
  *
  * @return {GLShader} The fragment shader used by this program.
  */
  get fragment () {
    return GLContextualisation.of(this.descriptor.fragment, this.context)
  }

  /**
  * @return {boolean} True if this program is linked.
  */
  get linked () {
    return this._linked
  }

  /**
  * @return {string} Program info log.
  */
  get logs () {
    return this.context.getProgramInfoLog(this._pointer)
  }

  /**
  * @return {boolean} True if this program is currently used.
  */
  get used () {
    const context = this.context
    return context.getParameter(context.CURRENT_PROGRAM) === this._pointer
  }

  /**
  * Link this program.
  *
  * It will compile the attached vertex and fragment shader if they are not
  * compiled yet.
  *
  * @throws {ProgramLinkingError} When the link operation fail.
  *
  * @return {GLProgram} This program instance for chaining purpose.
  */
  link () {
    if (!this._linked) {
      this.vertex.compile()
      this.fragment.compile()

      const context = this.context
      const program = this._pointer
      context.linkProgram(program)

      if (!context.getProgramParameter(program, context.LINK_STATUS)) {
        throw new ProgramLinkingError(this)
      }

      this._linked = true
      this._uniforms.update()
      this._attributes.update()
    }
  }

  /**
  * Use this program for the next rendering operation.
  */
  use () {
    if (!this._linked) this.link()
    this.context.useProgram(this._pointer)
  }

  /**
  * Destroy this program.
  */
  destroy () {
    if (this._pointer) {
      this.vertex.detach(this)
      this.fragment.detach(this)
      this.context.deleteProgram(this._pointer)
      this._pointer = null
      this._uniforms.destroy()
      this._attributes.destroy()
      super.destroy()
    }
  }
}
