import { ShaderCompilationError } from './errors'
import { GLObject } from './GLObject'
import { GLContext } from './GLContext'

/**
* A wrapper over a WebGLShader.
*/
export class GLShader extends GLObject {
  /**
  * Create a new wrapper over a native Shader.
  *
  * @param {GLContextualised} context - The webgl rendering context of the shader.
  * @param {any} type - The shader type constant (VERTEX_SHADER or FRAGMENT_SHADER).
  */
  constructor (context, type) {
    super(context)
    this._shader = this._context.createShader(type)
    this._compiled = false
  }

  /**
  * @return {any} The shader type constant (VERTEX_SHADER or FRAGMENT_SHADER).
  */
  get type () {
    const context = this._context
    return context.getShaderParameter(this._shader, context.SHADER_TYPE)
  }

  /**
  * @return {boolean} True if the shader was compiled.
  */
  get compiled () {
    return this._compiled
  }

  /**
  * @return {string} The source of the shader.
  */
  get source () {
    return this._context.getShaderSource(this._shader)
  }

  /**
  * Replace the source code of the shader.
  *
  * This will reset the compiled flag of the shader.
  *
  * @param {string} source - The new source of the shader.
  */
  set source (source) {
    this._context.shaderSource(this._shader, source)
    this._compiled = false
  }

  /**
  * @return {string} Info log of this shader.
  */
  get logs () {
    return this._context.getShaderInfoLog(this._shader)
  }

  /**
  * Compile this shader if this shader was not already compiled.
  *
  * @throws {ShaderCompilationError} When the compilation of the shader fail.
  *
  * @return {WebGLShader} The current instance for chaining purpose.
  */
  compile () {
    if (!this._compiled) {
      const context = this._context
      const shader = this._shader

      context.compileShader(shader)

      if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        throw new ShaderCompilationError(this)
      }

      this._compiled = true
    }
  }

  /**
  * Destroy this shader.
  */
  destroy () {
    this._context.deleteShader(this._shader)
    super.destroy()
  }
}

GLShader.Fragment = class GLFragmentShader extends GLShader {
  /**
  * Create a new fragment shader.
  *
  * @param {GLContextualised} context - The webgl rendering context of the shader.
  */
  constructor (context) {
    super(context, GLContext.context(context).FRAGMENT_SHADER)
  }
}

GLShader.Vertex = class GLVertexShader extends GLShader {
  /**
  * Create a new vertex shader.
  *
  * @param {GLContextualised} context - The webgl rendering context of the shader.
  */
  constructor (context) {
    super(context, GLContext.context(context).VERTEX_SHADER)
  }
}
