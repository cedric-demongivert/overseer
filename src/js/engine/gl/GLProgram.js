import { GLObject } from './GLObject'
import { GLType } from './GLType'
import { ProgramLinkingError } from './errors'

const TYPE_POINTER_SIZES = {
  [GLType.FLOAT]: 1,
  [GLType.FLOAT_VEC2]: 2,
  [GLType.FLOAT_VEC3]: 3,
  [GLType.FLOAT_VEC4]: 4,
  [GLType.INT]: 1,
  [GLType.INT_VEC2]: 2,
  [GLType.INT_VEC3]: 3,
  [GLType.INT_VEC4]: 4
}

const TYPE_POINTER_TYPES = {
  [GLType.FLOAT]: GLType.FLOAT,
  [GLType.FLOAT_VEC2]: GLType.FLOAT,
  [GLType.FLOAT_VEC3]: GLType.FLOAT,
  [GLType.FLOAT_VEC4]: GLType.FLOAT,
  [GLType.INT]: GLType.INT,
  [GLType.INT_VEC2]: GLType.INT,
  [GLType.INT_VEC3]: GLType.INT,
  [GLType.INT_VEC4]: GLType.INT
}

/**
* A wrapper over a WebGLProgram
*/
export class GLProgram extends GLObject {
  /**
  * Create a new GLProgram into a GLContext.
  *
  * @param {GLContextualised} context - Context to use.
  */
  constructor (context) {
    super(context)

    this._program = this._context.createProgram()
    this._vertex = null
    this._fragment = null
    this._linked = false
    this._uniforms = {}
    this._attributes = {}
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
  * Assert that two shaders have the same rendering context.
  *
  * @param {GLShader} a - The first shader to check.
  * @param {GLShader} b - The second shader to check.
  *
  * @throws {Error} When the two shaders have different rendering context.
  */
  static _assertAreOfSameContext (a, b) {
    if (a.context !== b.context) {
      throw new Error([
        'Invalid shaders : trying to use two shaders from two different ',
        'rendering context in a WebGLProgram.'
      ].join(''))
    }
  }

  /**
  * Assert that a shader is a vertex shader.
  *
  * @param {GLShader} shader - The shader to check.
  *
  * @throws {Error} When the the shader is not a vertex shader.
  */
  static _assertIsValidVertexShader (shader) {
    if (shader == null || shader.type !== shader.context.VERTEX_SHADER) {
      throw new Error('Invalid shader : this shader is not a vertex shader.')
    }
  }

  /**
  * Assert that a shader is a fragment shader.
  *
  * @param {GLShader} shader - The shader to check.
  *
  * @throws {Error} When the the shader is not a fragment shader.
  */
  static _assertIsValidFragmentShader (shader) {
    if (shader.type !== shader.context.FRAGMENT_SHADER) {
      throw new Error('Invalid shader : this shader is not a fragment shader.')
    }
  }

  /**
  * Return the current vertex shader used by this program.
  *
  * @return {GLShader} The vertex shader used by this program.
  */
  get vertex () {
    return this._vertex
  }

  /**
  * Change the vertex shader used by this program.
  *
  * @param {GLShader} newShader - The new vertex shader to use.
  */
  set vertex (newShader) {
    if (newShader) {
      GLProgram._assertIsValidVertexShader(newShader)
      GLProgram._assertAreOfSameContext(newShader, this)
    }

    if (this._vertex) {
      this._context.detachShader(this._program, this._vertex._shader)
    }

    this._vertex = newShader

    if (this._vertex) {
      this._context.attachShader(this._program, newShader._shader)
    }

    this._linked = false
    this._uniforms = {}
    this._attributes = {}
  }

  /**
  * Return the current fragment shader used by this program.
  *
  * @return {GLShader} The fragment shader used by this program.
  */
  get fragment () {
    return this._fragment
  }

  /**
  * Change the fragment shader used by this program.
  *
  * @param {GLShader} newShader - The new fragment shader to use.
  */
  set fragment (newShader) {
    if (newShader) {
      GLProgram._assertIsValidFragmentShader(newShader)
      GLProgram._assertAreOfSameContext(newShader, this)
    }

    if (this._fragment) {
      this._context.detachShader(this._program, this._fragment._shader)
    }

    this._fragment = newShader

    if (this._fragment) {
      this._context.attachShader(this._program, newShader._shader)
    }

    this._linked = false
    this._uniforms = {}
    this._attributes = {}
  }

  /**
  * @return {boolean} True if this program is linked.
  */
  get linked () {
    return this._linked
  }

  /**
  * @return {object} All uniforms information for this program.
  */
  get uniforms () {
    return this._uniforms
  }

  /**
  * @return {Proxy} All attributes information for this program.
  */
  get attributes () {
    return this._attributes
  }

  /**
  * @return {string} Program info log.
  */
  get logs () {
    return this._context.getProgramInfoLog(this._program)
  }

  /**
  * @return {boolean} True if this program is currently used.
  */
  get used () {
    return this._context.getParameter(
      this._context.CURRENT_PROGRAM
    ) === this._program
  }

  /**
  * Return a uniform value.
  *
  * @param {string} name - Name of the uniform to get.
  *
  * @return {any} Value of the uniform.
  */
  getUniform (name) {
    return this.context.getUniform(
      this._program, this.uniforms[name].location
    )
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
      if (this._vertex == null) {
        throw new Error('Unnable to link a program : missing vertex shader')
      }

      if (this._fragment == null) {
        throw new Error('Unnable to link a program : missing fragment shader')
      }

      if (!this._vertex.compiled) this._vertex.compile()
      if (!this._fragment.compiled) this._fragment.compile()

      const context = this._context
      const program = this._program
      context.linkProgram(program)

      if (!context.getProgramParameter(program, context.LINK_STATUS)) {
        throw new ProgramLinkingError(this)
      }

      this._linked = true
      this._captureUniforms()
      this._captureAttributes()
    }
  }

  /**
  * Capture all uniform data from this program.
  */
  _captureUniforms () {
    const context = this.context
    const program = this._program
    const size = context.getProgramParameter(program, context.ACTIVE_UNIFORMS)
    let nextTextureUnit = 0

    for (let index = 0; index < size; ++index) {
      const info = context.getActiveUniform(program, index)

      this._uniforms[info.name] = {
        type: info.type,
        size: info.size,
        location: context.getUniformLocation(program, info.name)
      }

      if (
        info.type === context.SAMPLER_2D ||
        info.type === context.SAMPLER_CUBE
      ) {
        this._uniforms[info.name].textureUnit = nextTextureUnit
        nextTextureUnit += 1
      }
    }

    return this
  }

  /**
  * Capture all attributes data from this program.
  */
  _captureAttributes () {
    const context = this.context
    const program = this._program
    const size = context.getProgramParameter(program, context.ACTIVE_ATTRIBUTES)

    for (let index = 0; index < size; ++index) {
      const info = context.getActiveAttrib(program, index)

      this._attributes[info.name] = {
        type: info.type,
        size: info.size,
        location: context.getAttribLocation(program, info.name)
      }
    }

    return this
  }

  /**
  * Use this program for the next rendering operation.
  *
  * @return {GLProgram} This instance for chaining purpose.
  */
  use () {
    if (this.used) return this

    if (!this._linked) this.link()
    this._context.useProgram(this._program)
    return this
  }

  /**
  * Destroy this program.
  */
  destroy () {
    this.vertex = null
    this.fragment = null
    this._context.deleteProgram(this._program)
    super.destroy()
  }
}
