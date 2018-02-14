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
      mediumCellTexture: null,
      largeCellTexture: null
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
  * Return the texture used for rendering a medium grid cell.
  *
  * @return {Texture2D} The texture used for rendering a medium grid cell.
  */
  @Relation.one(Texture2D)
  get mediumCellTexture () {
    return this.state.mediumCellTexture
  }

  /**
  * Change the texture used for rendering a medium grid cell.
  *
  * @param {Texture2D} texture - The new texture to use for rendering a medium grid cell.
  */
  @Relation.one(Texture2D)
  set mediumCellTexture (texture) {
    if (texture !== this.state.mediumCellTexture) {
      this.state.mediumCellTexture = texture
      this.touch()
    }
  }

  /**
  * Return the texture used for rendering a large grid cell.
  *
  * @return {Texture2D} The texture used for rendering a large grid cell.
  */
  @Relation.one(Texture2D)
  get largeCellTexture () {
    return this.state.largeCellTexture
  }

  /**
  * Change the texture used for rendering a large grid cell.
  *
  * @param {Texture2D} texture - The new texture to use for rendering a large grid cell.
  */
  @Relation.one(Texture2D)
  set largeCellTexture (texture) {
    if (texture !== this.state.largeCellTexture) {
      this.state.largeCellTexture = texture
      this.touch()
    }
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
