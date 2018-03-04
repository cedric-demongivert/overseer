import { Component, Relation } from '@overseer/engine/ecs'
import { Length } from '@overseer/engine/Length'
import { Camera2D } from './Camera2D'
import { Texture2D } from './Texture2D'

@Component({ type: 'overseer:engine:grid:square-grid' })
export class SquareGrid {
  /**
  * @see Component#initialize
  */
  initialize () {
    this.state = {
      camera: null,
      unit: new Length('3cm'),
      lineWidth: 4.0
    }
  }

  /**
  * Return the length of a grid tile.
  *
  * @return {Length} The length of a grid tile.
  */
  get unit () {
    return this.state.unit
  }

  /**
  * Change the length of a grid tile.
  *
  * @param {Length} value - The new length of a grid tile.
  */
  set unit (value) {
    this.state.unit = new Length(value)
    this.touch()
  }

  /**
  * Return the width of a grid line in pixels.
  *
  * @return {number} The width of a grid line in pixels.
  */
  get lineWidth () {
    return this.state.lineWidth
  }

  /**
  * Change the width of all grid lines in pixels.
  *
  * @param {number} value - The new width of all grid lines in pixels.
  */
  set lineWidth (value) {
    this.state.lineWidth = value
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
