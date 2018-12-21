import { Matrix3f } from '@cedric-demongivert/gl-tool-math'
import { Component } from '@overseer/engine/ecs'

@Component({ name: 'overseer:camera:2d' })
export class Camera2D {
  /**
  * @return {Matrix3f} The World to view transformation matrix.
  */
  get worldToView () {
    return this.getWorldToView()
  }

  /**
  * @param {Matrix3f} [result = new Matrix3f()] - The result matrix to set.
  *
  * @return {Matrix3f} The updated result matrix.
  */
  getWorldToView (result = new Matrix3f()) {
    throw new Error('Camera2D#getWorldToView is not implemented')
  }

  /**
  * @return {Matrix3f} The view to world matrix.
  */
  get viewToWorld () {
    return getViewToWorld()
  }

  /**
  * Set the given matrix to this camera's view to world matrix.
  *
  * @param {Matrix3f} [result = new Matrix3f()] - The result matrix to set.
  *
  * @return {Matrix3f} The updated result matrix.
  */
  getViewToWorld (result = new Matrix3f()) {
    throw new Error('Camera2D#getViewToWorld is not implemented')
  }

  /**
  * @return {Length} The current camera unit.
  */
  get unit () {
    throw new NotImplementedError(Camera2D, 'get unit')
  }
}
