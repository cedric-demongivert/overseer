import { Component, Relation } from '@overseer/engine/ecs'
import { Material } from './Material'
import { Geometry } from './geometry'

/**
* Define a program.
*/
@Component({ type: 'overseer:engine:mesh' })
export class Mesh {
  /**
  * @see Component#initialize
  */
  initialize () {
    this.state = {
      material: null,
      geometry: null,
      render: true
    }
  }

  /**
  * @param {boolean} value
  */
  set render (value) {
    this.state.render = value
  }

  /**
  * @return {boolean}
  */
  get render () {
    return this.state.render
  }

  /**
  * @return {Material}
  */
  @Relation.one(Material)
  get material () {
    return this.state.material
  }

  /**
  * @param {Material} value
  */
  @Relation.one(Material)
  set material (value) {
    this.state.material = value
    this.touch()
  }

  /**
  * @return {Geometry}
  */
  @Relation.one(Geometry)
  get geometry () {
    return this.state.geometry
  }

  /**
  * @param {Geometry} value
  */
  @Relation.one(Geometry)
  set geometry (value) {
    this.state.geometry = value
    this.touch()
  }
}
