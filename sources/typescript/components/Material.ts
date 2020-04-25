import { Program } from '@cedric-demongivert/gl-tool-shader'

export class Material {
  public program  : Program
  public readonly uniforms : Map<string, any>

  /**
  * Create a new empty material.
  */
  public constructor () {
    this.program  = null
    this.uniforms = new Map<string, any>()
  }

  /**
  * Reset this instance state.
  */
  public clear () {
    this.program = null
    this.uniforms.clear()
  }

  /**
  * Copy another material.
  *
  * @param other - Another material to copy.
  */
  public copy (other : Material) : void {
    this.program = other.program
    this.uniforms.clear()

    for (const key of other.uniforms.keys()) {
      this.uniforms.set(key, other.uniforms.get(key))
    }
  }
}
