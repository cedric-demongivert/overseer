import { Matrix4f } from '@cedric-demongivert/gl-tool-math'

/**
 * 
 */
export class Transformation {
  /**
   * 
   */
  public readonly localToWorld: Matrix4f

  /**
   * 
   */
  public readonly worldToLocal: Matrix4f

  /**
  * Create a new identity transformation.
  */
  public constructor() {
    this.localToWorld = new Matrix4f().toIdentity()
    this.worldToLocal = new Matrix4f().toIdentity()
  }

  /**
   * 
   */
  public setLocalToWorld(value: Matrix4f): void {
    this.localToWorld.copy(value)
  }

  /**
   * 
   */
  public setWorldToLocal(value: Matrix4f): void {
    this.worldToLocal.copy(value)
  }

  /**
  * Reset this component.
  */
  public clear() {
    this.localToWorld.toIdentity()
    this.worldToLocal.toIdentity()
  }

  /**
  * Copy another component.
  *
  * @param other - Other component instance to copy.
  */
  public copy(other: Transformation) {
    this.localToWorld.copy(other.localToWorld)
    this.worldToLocal.copy(other.worldToLocal)
  }

  /**
   * 
   */
  public equals(other: any, tolerance: number = 0): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Transformation) {
      return (
        other.localToWorld.equals(this.localToWorld, tolerance) &&
        other.worldToLocal.equals(this.worldToLocal, tolerance)
      )
    }

    return false
  }
}
