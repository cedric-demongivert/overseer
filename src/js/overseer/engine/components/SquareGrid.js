import { Component } from '@overseer/engine/ecs'
import { Camera2D } from './Camera2D'

@Component({ type: 'overseer:engine:grid:square' })
export class SquareGrid {
  /**
  * @see Component#initialize
  */
  initialize () {
    this.state = {
      camera: null,
      length: new Length('3cm')
    }
  }

  /**
  * Return the length of a grid tile.
  *
  * @return {Length} The length of a grid tile.
  */
  get length () {
    return this.state.length
  }

  /**
  * Change the length of a grid tile.
  *
  * @param {Length} value - The new length of a grid tile.
  */
  set length (value) {
    this.state.length = new Length(value)
    this.touch()
  }

  /**
  * Return the camera that render this grid.
  *
  * @return {Camera2D} A camera.
  */
  @Relation.one(Camera2D)
  get camera () {
    return this.state.camera
  }

  /**
  * Change the camera that render this grid.
  *
  * @param {Camera2D} camera - The new camera to assign.
  */
  @Relation.one(Camera2D)
  set camera (camera) {
    if (camera !== this.state.camera) {
      this.state.camera = camera
      this.touch()
    }
  }
}
