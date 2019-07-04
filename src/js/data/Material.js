export class Material {
  /**
  * Create a new empty material.
  */
  constructor () {
    this._program = null
    this._uniforms = new Map()
  }

  /**
  * Reset this instance state.
  */
  reset () {
    this._program = null
    this._uniforms.clear()
  }

  /**
  * Copy another material.
  *
  * @param {Material} other - Another material to copy.
  */
  copy (other) {
    this._program = other.program
    this._uniforms.clear()

    for (const key of other.uniforms.keys()) {
      this._uniforms.set(key, other.getUniform(key))
    }
  }

  /**
  * @return {Program} The material rendering program.
  */
  get program () {
    return this._program
  }

  /**
  * @param {Program} value - The new material rendering program.
  */
  set program (value) {
    this._program = value
  }

  /**
  * @return {Program} The material rendering program.
  */
  getProgram () {
    return this._program
  }

  /**
  * @param {Program} value - The new material rendering program.
  */
  setProgram (value) {
    this._program = value
  }

  /**
  * @return {Map} The material map of uniforms.
  */
  get uniforms () {
    return this._uniforms
  }

  /**
  * Set the value of a uniform of this material.
  *
  * @param {string} name - The name of the uniform to set.
  * @param {any} value - The value of the given uniform.
  *
  * @return {Material} This instance for chaining purposes.
  */
  setUniform (name, value) {
    this._uniforms.set(name, value)
  }

  /**
  * Return the value of a uniform of this program.
  *
  * @param {string} name - The name of a uniform of this program.
  * @return {any} The value of the given uniform.
  */
  getUniform (name) {
    return this._uniforms.get(name)
  }

  /**
  * Delete an uniform of this program.
  *
  * @param {string} name - The name of a uniform of this program to delete.
  *
  * @return {Material} This instance for chaining purposes.
  */
  deleteUniform (name) {
    this._uniforms.delete(name)
  }

  /**
  * Check if a uniform of this material is defined.
  *
  * @param {string} name - The name of a uniform of this program to find.
  *
  * @return {boolean} True if the given uniform is set.
  */
  hasUniform (name) {
    return this._uniforms.has(name)
  }
}
