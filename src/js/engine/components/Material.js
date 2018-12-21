import { Component } from '@overseer/engine/ecs'

/**
* Define a material
*/
@Component({ name: 'overseer:material' })
export class Material {
  /**
  * Create a new empty material.
  */
  constructor () {
    this._program = null
    this._uniforms = new Map()
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

  getProgram () {
    return this._program
  }

  setProgram (value) {
    this._program = value
    return this
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
    return this
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
    return this
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
