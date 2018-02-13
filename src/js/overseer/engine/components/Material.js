import { Component, Relation } from '@overseer/engine/ecs'
import { Program } from './Material'

/**
* Define a material
*/
@Component({ type: 'overseer:engine:material' })
export class Material {
  /**
  * @see Component#initialize
  */
  initialize () {
    this.state = {
      program: null,
      uniforms: {}
    }
  }

  /**
  * @return {Program}
  */
  @Relation.one(Program)
  get program () {
    return this.state.program
  }

  /**
  * @param {Program}
  */
  @Relation.one(Program)
  set program (value) {
    this.state.program = value
    this.touch()
  }

  /**
  * @return {object}
  */
  get uniforms () {
    return this.state.uniforms
  }
}
