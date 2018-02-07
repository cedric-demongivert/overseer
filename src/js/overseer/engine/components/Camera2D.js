import { Component } from '@overseer/engine/ecs'
import { NotImplementedError } from '@errors'

@Component({ type: 'overseer:engine:camera' })
export class Camera2D {
  /**
  * @return {Matrix3f} The World to view matrix.
  */
  get worldToView () {
    throw new NotImplementedError(Camera, 'get worldToView')
  }

  /**
  * @return {Matrix3f} The view to world matrix.
  */
  get viewToWorld () {
    throw new NotImplementedError(Camera, 'get viewToWorld')
  }

  /**
  * @return {Length} The current camera unit.
  */
  get unit () {
    throw new NotImplementedError(Camera, 'get unit')
  }
}
