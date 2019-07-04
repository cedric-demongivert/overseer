import { Matrix4f, Vector3f } from '@cedric-demongivert/gl-tool-math'

export class Camera {
  /**
  * Create a new identity camera.
  */
  constructor () {
    this._viewToWorld = new Matrix4f().toIdentity()
    this._worldToView = new Matrix4f().toIdentity()
  }

  /**
  * Reset this component instance to its initial state.
  */
  reset () {
    this._viewToWorld.toIdentity()
    this._worldToView.toIdentity()
  }

  /**
  * Copy another instance of this component.
  *
  * @param {Camera} other - Other instance to copy.
  */
  copy (other) {
    this._viewToWorld.copy(other.viewToWorld)
    this._worldToView.copy(other.worldToView)
  }

  /**
  * @return {Matrix4f} The transformation matrix to apply to a world scene in order to transform it into this camera view scene.
  */
  get worldToView () {
    return this._worldToView
  }

  /**
  * Update this camera world to view matrix.
  *
  * @param {Matrix4f} worldToView - The new world to view matrix of this camera.
  */
  set worldToView (worldToView) {
    this._worldToView.copy(worldToView)
  }

  /**
  * @return {Matrix4f} The transformation matrix to apply to this camera view scene in order to transform it back to its original world scene.
  */
  get viewToWorld () {
    return this._viewToWorld
  }

  /**
  * Update this camera view to world matrix.
  *
  * @param {Matrix4f} viewToWorld - The new view to world matrix of this camera.
  */
  set viewToWorld (viewToWorld) {
    this._viewToWorld.copy(viewToWorld)
  }
}
