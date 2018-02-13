import { Component } from '@overseer/engine/ecs'

/**
* Define a program.
*/
@Component({ type: 'overseer:engine:program' })
export class Program {
  /**
  * @see Component#initialize
  */
  initialize () {
    this.state = {
      vertexShader: null,
      fragmentShader: null
    }
  }

  /**
  * @return {string}
  */
  get vertexShader () {
    return this.state.vertexShader
  }

  /**
  * @return {string}
  */
  get fragmentShader () {
    return this.state.fragmentShader
  }

  /**
  * @param {string} value
  */
  set vertexShader (value) {
    this.state.vertexShader = value
    this.touch()
  }

  /**
  * @param {string} value
  */
  set fragmentShader (value) {
    this.state.fragmentShader = value
    this.touch()
  }
}
