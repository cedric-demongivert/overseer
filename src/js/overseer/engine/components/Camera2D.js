import { Component } from '@overseer/engine/ecs'
import { NotImplementedError } from '@errors'

@Component({ type: 'overseer:engine:camera' })
export class Camera2D {
  /**
  * @return {Matrix3D} The World to view matrix.
  */
  get worldToView () {
    throw new NotImplementedError(Camera2D, 'get worldToView')
  }

  /**
  * @return {Matrix3D} The view to world matrix.
  */
  get viewToWorld () {
    throw new NotImplementedError(Camera2D, 'get viewToWorld')
  }

  /**
  * @return {Length} The current camera unit.
  */
  get unit () {
    throw new NotImplementedError(Camera2D, 'get unit')
  }
}
