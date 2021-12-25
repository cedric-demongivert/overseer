import { Matrix4f } from '@cedric-demongivert/gl-tool-math'
import { Sequence } from '@cedric-demongivert/gl-tool-collection'
import { Pack } from '@cedric-demongivert/gl-tool-collection'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'
import { Component } from '@cedric-demongivert/gl-tool-ecs'

import { BoundingCircle } from '../../components/BoundingCircle'
import { BoundingSquare } from '../../components/BoundingSquare'

import { BoundingCircleType } from '../../types/BoundingCircleType'
import { BoundingSquareType } from '../../types/BoundingSquareType'

import { OverseerSystem } from '../OverseerSystem'
import { TransformationManagementSystem } from '../TransformationManagementSystem'

export class ShapeManagementSystem extends OverseerSystem {
  private _circles: Sequence<Entity>
  private _squares: Sequence<Entity>
  private _transformation: TransformationManagementSystem

  /**
  * Create a new system that handle shapes.
  */
  public constructor() {
    super()
    this._circles = null
    this._squares = null
    this._transformation = null
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  public initialize() {
    this._transformation = this.manager.requireSystem(TransformationManagementSystem)
    this._circles = this.manager.getEntitiesWithType(BoundingCircleType)
    this._squares = this.manager.getEntitiesWithType(BoundingSquareType)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  public destroy() {
    this._transformation = null
    this._circles = null
    this._squares = null
  }

  /**
  * Return all boundings shapes that are at the given location.
  *
  * @param location - A location in world coordinates.
  * @param [buffer = Packs.uint32(5)] - Buffer to fill.
  *
  * @return A pack with all bounding shapes at the given location.
  */
  public getBoundingShapesAt(x: number, y: number, z: number, w: number, buffer: Pack<number> = Pack.uint32(8)): Pack<number> {
    this.getBoundingCirclesAt(x, y, z, w, buffer)
    //this.getBoundingSquaresAt(x, y, z, w, buffer)

    return buffer
  }

  /**
  * Return all bounding circles that are at the given location.
  *
  * @param location - A location in world coordinates.
  * @param [buffer = Packs.uint32(5)] - Buffer to fill.
  *
  * @return A pack with all bounding circles at the given location.
  */
  public getBoundingCirclesAt(x: number, y: number, z: number, w: number, buffer: Pack<number> = Pack.uint32(8)): Pack<number> {
    for (let index = 0, size = this._circles.size; index < size; ++index) {
      const entity: Entity = this._circles.get(index)
      const boundingCircle: Component<BoundingCircle> = this.manager.getComponentOfEntity(entity, BoundingCircleType)
      const worldToLocal: Matrix4f = this._transformation.getTransformation(entity).worldToLocal

      const localeX: number = worldToLocal.computeXComponentOfMultiplicationWithVector(x, y, z, w)
      const localeY: number = worldToLocal.computeYComponentOfMultiplicationWithVector(x, y, z, w)

      if (boundingCircle.data.contains(localeX, localeY)) {
        buffer.push(boundingCircle.identifier)
      }
    }

    return buffer
  }

  /**
  * Return all bounding squares that are at the given location.
  *
  * @param location - A location in world coordinates.
  * @param [buffer = Packs.uint32(5)] - Buffer to fill.
  *
  * @return A pack with all bounding squares at the given location.
  */
  public getBoundingSquaresAt(x: number, y: number, z: number, w: number, buffer: Pack<number> = Pack.uint32(8)): Pack<number> {
    for (let index = 0, size = this._squares.size; index < size; ++index) {
      const entity: Entity = this._squares.get(index)
      const boundigSquare: Component<BoundingSquare> = this.manager.getComponentOfEntity(entity, BoundingSquareType)
      const worldToLocal: Matrix4f = this._transformation.getTransformation(entity).worldToLocal
      const localeX: number = worldToLocal.computeXComponentOfMultiplicationWithVector(x, y, z, w)
      const localeY: number = worldToLocal.computeYComponentOfMultiplicationWithVector(x, y, z, w)

      if (boundigSquare.data.contains(localeX, localeY)) {
        buffer.push(boundigSquare.identifier)
      }
    }

    return buffer
  }
}
