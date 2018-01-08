import { GLObject } from '@glkit'

export class MapMaterial extends GLObject {
  /**
  * Create a new MapMaterial.
  *
  * @param {MapProgram} program - Program to use.
  */
  constructor (program) {
    super(program)
    this._program = program
  }

  /**
  * Prepare the material to render an object.
  *
  * @param {Camera2D} camera - Camera to use in order to render the object.
  * @param {MapObject} object - Object to render.
  *
  * @return {MapMaterial} The current instance for chaining purpose.
  */
  prepare (camera, object) {
    const uniforms = this._program.uniforms

    for (let key in uniforms) {
      switch (key) {
        case 'localeToWorld':
          uniforms[key] = object.localeToWorld
          break
        case 'worldToLocale':
          uniforms[key] = object.worldToLocale
          break
        case 'worldToCamera':
          uniforms[key] = camera.worldToCamera
          break
        case 'cameraToWorld':
          uniforms[key] = camera.cameraToWorld
          break
        case 'localeToWorldNormal':
          uniforms[key] = object.localeToWorldNormal
          break
        case 'worldToLocaleNormal':
          uniforms[key] = object.worldToLocaleNormal
          break
        case 'worldToCameraNormal':
          uniforms[key] = camera.worldToCameraNormal
          break
        case 'cameraToWorldNormal':
          uniforms[key] = camera.cameraToWorldNormal
          break
        default:
          uniforms[key] = this[key]
          break
      }
    }
  }

  /**
  * @return {MapProgram} The program attached to this material.
  */
  get program () {
    return this._program
  }

  destroy () {
    this._program.destroy()
    super.destroy()
  }
}
