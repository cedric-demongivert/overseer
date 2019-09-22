import { Matrix4f, Vector4f, Vector2f } from '@cedric-demongivert/gl-tool-math'
import { Packs } from '@cedric-demongivert/gl-tool-collection'

import { BoundingCircle } from '../../components/BoundingCircle'
import { BoundingSquare } from '../../components/BoundingSquare'

import { OverseerSystem } from '../OverseerSystem'
import { TransformationManagementSystem } from '../TransformationManagementSystem'
import { CameraManagementSystem } from '../CameraManagementSystem'

export class ShapeManagementSystem extends OverseerSystem {
  /**
  * Create a new system that handle shapes.
  */
  constructor () {
    super()
    this._circles = null
    this._squares = null
    this._transformations = null
    this._cameras = null
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  initialize () {
    this._transformations = (
      this.manager.requireSystem(TransformationManagementSystem)
    )
    this._cameras = this.manager.requireSystem(CameraManagementSystem)
    this._circles = this.manager.getEntitiesWithType(BoundingCircle)
    this._squares = this.manager.getEntitiesWithType(BoundingSquare)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  destroy () {
    this._transformations = null
    this._cameras = null
    this._circles = null
    this._squares = null
  }



  /**
  * Return all boundings shapes that are at the given location.
  *
  * @param {Vector4f} location - A location in world coordinates.
  * @param {Pack<number>} [buffer = Packs.uint32(5)] - Buffer to fill.
  *
  * @return {Pack<number>} A pack with all bounding shapes at the given location.
  */
  getBoundingShapesAt (x, y, z, w, buffer = Packs.uint32(5)) {
    this.getBoundingCirclesAt(x, y, z, w, buffer)
    //this.getBoundingSquaresAt(x, y, z, w, buffer)

    return buffer
  }

  /**
  * Return all bounding circles that are at the given location.
  *
  * @param {Vector4f} location - A location in world coordinates.
  * @param {Pack<number>} [buffer = Packs.uint32(5)] - Buffer to fill.
  *
  * @return {Pack<number>} A pack with all bounding circles at the given location.
  */
  getBoundingCirclesAt (x, y, z, w, buffer = Packs.uint32(5)) {
    for (let index = 0, size = this._circles.size; index < size; ++index) {
      const entity = this._circles.get(index)
      const boundingCircle = this.manager.getInstance(entity, BoundingCircle)
      const worldToLocal = (
        this._transformations.getTransformation(entity).worldToLocal
      )
      const localeX = worldToLocal.computeXComponentOfMultiplicationWithVector(
        x, y, z, w
      )
      const localeY = worldToLocal.computeYComponentOfMultiplicationWithVector(
        x, y, z, w
      )

      if (boundingCircle.contains(localeX, localeY)) {
        buffer.push(this.manager.getComponentOfInstance(boundingCircle))
      }
    }

    return buffer
  }

  /**
  * Return all bounding squares that are at the given location.
  *
  * @param {Vector4f} location - A location in world coordinates.
  * @param {Pack<number>} [buffer = Packs.uint32(5)] - Buffer to fill.
  *
  * @return {Pack<number>} A pack with all bounding squares at the given location.
  */
  getBoundingSquaresAt (x, y, z, w, buffer = Packs.uint32(5)) {
    for (let index = 0, size = this._squares.size; index < size; ++index) {
      const entity = this._squares.get(index)
      const boundigSquare = this.manager.getInstance(entity, BoundingSquare)
      const transformation = this._transformations.getTransformation(entity)
      const worldToLocal = (
        this._transformations.getTransformation(entity).worldToLocal
      )
      const localeX = worldToLocal.computeXComponentOfMultiplicationWithVector(
        x, y, z, w
      )
      const localeY = worldToLocal.computeYComponentOfMultiplicationWithVector(
        x, y, z, w
      )

      if (boundigSquare.contains(localeX, localeY)) {
        buffer.push(this.manager.getComponentOfInstance(boundigSquare))
      }
    }

    return buffer
  }
}
