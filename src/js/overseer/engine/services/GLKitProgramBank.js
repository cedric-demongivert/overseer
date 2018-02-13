import { GLContext, GLProgram, GLShader, GLUniforms } from '@glkit'

const $banks = new Map()

// @TODO GLKitShaderBank
/**
* A service that expose a bank of GLProgram for a given context.
*/
export class GLKitProgramBank {
  /**
  * Return program bank class for a given context.
  *
  * @param {GLContextualised} context - The context of the bank.
  *
  * @return {Class} A program bank class for the given context.
  */
  static ['of'] (context) {
    const gl = GLContext.context(context)
    if (!$banks.has(gl)) {
      $banks.set(
        gl,
        class ContextualisedGLKitProgramBank extends GLKitProgramBank {
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
  * Forget a program bank contextualised class.
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
  * Create a new empty program bank for a given context.
  *
  * @param {GLContextualised} context - The context of this bank.
  */
  constructor (context) {
    this._gl = GLContext.context(context)
    this._programs = new Map()
  }

  /**
  * Add a program to this bank.
  *
  * @param {Program} component - A component that describe the program.
  *
  * @return {GLKitProgramBank} The given bank instance for chaining purpose.
  */
  add (component) {
    if (!this._programs.has(component.identifier)) {
      const glProgram = new GLProgram(this._gl)
      const glFragment = new GLShader.Fragment(this._gl)
      const glVertex = new GLShader.Vertex(this._gl)

      glProgram.vertex = glVertex
      glProgram.fragment = glFragment

      this._update({ glProgram, glFragment, glVertex }, component)

      this._programs.set(component.identifier, {
        glProgram,
        glFragment,
        glVertex,
        uniforms: new GLUniforms(glProgram),
        version: component.version
      })
    }

    return this
  }

  /**
  * Update a contextualised program.
  *
  * @param {Program} component - A component that describe the program to update.
  *
  * @return {GLKitProgramBank} The given bank instance for chaining purpose.
  */
  update (component) {
    if (
      this._programs.has(component.identifier) &&
      this._programs.get(component.identifier).version !== component.version
    ) {
      this._update(this._programs.get(component.identifier), component)
      this._programs.get(component.identifier).version = component.version
    }

    return this
  }

  /**
  * Update a glkit program from a program component raw data.
  *
  * @param {object} data - A set of program, vertex and fragment shader to update.
  * @param {Program} program - A component program to commit.
  */
  _update ({ glProgram, glVertex, glFragment }, program) {
    glVertex.source = program.vertexShader
    glFragment.source = program.fragmentShader
  }

  /**
  * Check if a program exists for a given component.
  *
  * @param {Program} component - A component that describe the program.
  *
  * @return {boolean} True if this bank hold a contextualised program instance for the given component.
  */
  has (component) {
    return this._programs.has(component.identifier)
  }

  /**
  * Return a contextualised program of this bank.
  *
  * @param {Program} component - A component that describe the program to fetch.
  *
  * @return {GLProgram} A contextualised program of this bank.
  */
  getProgram (component) {
    return this._programs.get(component.identifier).glProgram
  }

  /**
  * Return a contextualised vertex shader of this bank.
  *
  * @param {Program} component - A component that describe the program to fetch.
  *
  * @return {GLShader.Vertex} A contextualised vertex shader of this bank.
  */
  getVertexShader (component) {
    return this._programs.get(component.identifier).glVertex
  }

  /**
  * Return a contextualised fragment shader of this bank.
  *
  * @param {Program} component - A component that describe the program to fetch.
  *
  * @return {GLShader.Fragment} A contextualised fragment shader of this bank.
  */
  getFragmentShader (component) {
    return this._programs.get(component.identifier).glFragment
  }

  /**
  * Return a contextualised uniforms set of this bank.
  *
  * @param {Program} component - A component that describe the program to fetch.
  *
  * @return {GLShader.Fragment} A contextualised uniforms set of this bank.
  */
  getUniforms (component) {
    return this._programs.get(component.identifier).uniforms
  }

  /**
  * Delete a program of this bank.
  *
  * @param {Program} component - A component that describe the program.
  *
  * @return {GLKitProgramBank} The given bank instance for chaining purpose.
  */
  delete (component) {
    if (this._programs.has(component.identifier)) {
      const {
        glProgram, glFragment, glVertex
      } = this._programs.get(component.identifier)
      glProgram.destroy()
      glFragment.destroy()
      glVertex.destroy()
      this._programs.delete(component.identifier)
    }

    return this
  }

  /**
  * Clear this bank.
  *
  * @return {GLKitProgramBank} The given bank instance for chaining purpose.
  */
  clear () {
    for (
      const {
        glProgram, glFragment, glVertex
      } of this._programs.values()
    ) {
      glProgram.destroy()
      glFragment.destroy()
      glVertex.destroy()
    }

    this._programs.clear()
    return this
  }
}
