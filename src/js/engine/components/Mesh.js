import { Component } from '@overseer/engine/ecs'

/**
* Define a program.
*/
@Component({ type: 'overseer:mesh' })
export class Mesh {
  /**
  * @see Component#initialize
  */
  initialize () {
    this._material = null
    this._geometry = null
    this._visible = true
  }

  /**
  * @return {boolean} True if this mesh is rendered, false otherwise.
  */
  get visible () {
    return this._visible
  }

  /**
  * Change the rendering status of this mesh.
  *
  * @param {boolean} value - True to display this mesh, false otherwise.
  */
  set visible (value) {
    this.setVisible(value)
  }

  /**
  * Change the rendering status of this mesh.
  *
  * @param {boolean} value - True to display this mesh, false otherwise.
  * @return {Mesh} The current instance for chaining purposes.
  */
  setVisible (value) {
    this._visible = value
    return this
  }

  /**
  * @return {Material} The material used to render this mesh.
  */
  get material () {
    return this._material
  }

  /**
  * Change the material used to render this mesh.
  *
  * @param {Material} value - The new material to use to render this mesh.
  */
  set material (value) {
    this.setMaterial(value)
  }

  /**
  * Change the material used to render this mesh.
  *
  * @param {Material} value - The new material to use to render this mesh.
  * @return {Mesh} The current instance for chaining purposes.
  */
  setMaterial (value) {
    this._material = value
    return this
  }

  /**
  * @return {Geometry} The structure of this mesh.
  */
  get geometry () {
    return this._geometry
  }

  /**
  * Change the structure of this mesh.
  *
  * @param {Geometry} value - The new structure of this mesh.
  */
  set geometry (value) {
    this.setGeometry(value)
  }

  /**
  * Change the structure of this mesh.
  *
  * @param {Geometry} value - The new structure of this mesh.
  * @return {Mesh} The current instance for chaining purposes.
  */
  setGeometry (value) {
    this._geometry = value
    return this
  }
}
