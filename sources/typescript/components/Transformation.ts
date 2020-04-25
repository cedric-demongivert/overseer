import { Matrix4f } from '@cedric-demongivert/gl-tool-math'

export class Transformation {
  public readonly localToWorld : Matrix4f
  public readonly worldToLocal : Matrix4f

  /**
  * Create a new identity transformation.
  */
  public constructor () {
    this.localToWorld = new Matrix4f().toIdentity()
    this.worldToLocal = new Matrix4f().toIdentity()
  }

  /**
  * Reset this component.
  */
  public clear () {
    this.localToWorld.toIdentity()
    this.worldToLocal.toIdentity()
  }

  /**
  * Copy another component.
  *
  * @param other - Other component instance to copy.
  */
  public copy (other : Transformation) {
    this.localToWorld.copy(other.localToWorld)
    this.worldToLocal.copy(other.worldToLocal)
  }
}
