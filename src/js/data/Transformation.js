import { Matrix4f } from '@cedric-demongivert/gl-tool-math'

export class Transformation {
  /**
  * Create a new identity transformation.
  */
  constructor () {
    this._localToWorld = new Matrix4f().toIdentity()
    this._worldToLocal = new Matrix4f().toIdentity()
  }

  /**
  * Reset this component.
  */
  reset () {
    this._localToWorld.toIdentity()
    this._worldToLocal.toIdentity()
  }

  /**
  * Copy another component.
  *
  * @param {Transformation} other - Other component instance to copy.
  */
  copy (other) {
    this._localToWorld.copy(other.localToWorld)
    this._worldToLocal.copy(other.worldToLocal)
  }

  /**
  * @return {Matrix4f} The world to local transformation matrix.
  */
  get worldToLocal () {
    return this._worldToLocal
  }

  /**
  * Update the world to local transformation matrix.
  *
  * @param {Matrix4f} worldToLocal - The new world to local transformation matrix.
  */
  set worldToLocal (worldToLocal) {
    this._worldToLocal.copy(worldToLocal)
  }

  /**
  * @return {Matrix3f} The local to world transformation matrix.
  */
  get localToWorld () {
    return this._localToWorld
  }

  /**
  * Update the local to world transformation matrix.
  *
  * @param {Matrix4f} localToWorld - The new local to world transformation matrix.
  */
  set localToWorld (localToWorld) {
    this._localToWorld.copy(localToWorld)
  }
}
