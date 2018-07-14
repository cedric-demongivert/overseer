import { InvalidParameterError } from '@errors'

import { ShaderCompilationError } from './errors'
import { Shader } from '../Shader'
import { GLContextualisation } from './GLContextualisation'
import { GLContext } from './GLContext'

/**
* A webgl shader bound to a rendering context.
*/
export class GLShader extends GLContextualisation {
  /**
  * Create a new webgl shader from a shader description instance and a rendering context.
  *
  * @param {GLContext|WebGLRenderingContext} context - The webgl rendering context of this instance.
  * @param {Shader} shader - The shader descriptor to contextualise.
  */
  constructor (context, shader) {
    super(context, shader)
    this._pointer = this._createShader()
    this._programs = new Set()
    this._compiled = false
  }

  /**
  * Create the described shader into the attached rendering context.
  *
  * @return {WebGLShader} A shader pointer.
  */
  _createShader () {
    const context = this.context
    const result = context.createShader(
      (this.descriptor instanceof Shader.Fragment) ? context.FRAGMENT_SHADER
                                                   : context.VERTEX_SHADER
    )

    context.shaderSource(result, this.descriptor.source)

    return result
  }

  /**
  * Return the source code of this shader.
  *
  * @return {string} The source code of this shader.
  */
  get source () {
    return this.descriptor.source
  }

  /**
  * @return {any} The shader type constant (VERTEX_SHADER or FRAGMENT_SHADER).
  */
  get type () {
    const context = this.context
    return context.getShaderParameter(this._pointer, context.SHADER_TYPE)
  }

  /**
  * @return {boolean} True if the shader was compiled.
  */
  get compiled () {
    return this._compiled
  }

  /**
  * @return {string} Return the logs of this shader.
  */
  get logs () {
    return this.context.getShaderInfoLog(this._pointer)
  }

  /**
  * Attach this contextualised shader to a contextualised program.
  *
  * @param {GLProgram} program - A program to attach.
  *
  * @throws {InvalidParameterError} If the given program is not from the same context.
  * @throws {InvalidParameterError} If the given program does not declare this shader as its vertex or fragment shader.
  */
  attach (program) {
    if (this._programs.has(program)) return

    if (program.context == this.context) {
      if (program.vertex == this || program.fragment == this) {
        this._programs.add(program)
        context.attachShader(program._pointer, this._pointer)
      } else {
        throw new InvalidParameterError(
          'program', program, [
            'Unnable to attach this shader to the given program because the ',
            'given program does not declare this shader as its fragment or ',
            'vertex shader.'
          ].join('')
        )
      }
    } else {
      throw new InvalidParameterError(
        'program', program, [
          'Unnable to attach this shader to the given program because the ',
          'given program is not attached to the same context as this shader.'
        ].join('')
      )
    }
  }

  /**
  * Detach this contextualised shader from the given program.
  *
  * @param {GLProgram} program - A program to detach.
  */
  detach (program) {
    if (!this._programs.has(program)) return

    this._programs.delete(program)
    context.detachShader(program._pointer, this._pointer)
  }

  /**
  * Compile this shader.
  *
  * If this shader was already compiled, this method will do nothing.
  *
  * @throws {ShaderCompilationError} When the compilation of the shader fail.
  */
  compile () {
    if (!this._compiled) {
      const context = this.context
      const shader = this._pointer

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
    for (program of this._programs) {
      program.destroy()
    }

    this.context.deleteShader(this._pointer)
    this._pointer = null
    super.destroy()
  }
}
