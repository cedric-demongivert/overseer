import { Matrix4f, Vector3f } from '@cedric-demongivert/gl-tool-math'

export class Camera {
  public readonly viewToWorld : Matrix4f
  public readonly worldToView : Matrix4f

  /**
  * Create a new identity camera.
  */
  public constructor () {
    this.viewToWorld = new Matrix4f().toIdentity()
    this.worldToView = new Matrix4f().toIdentity()
  }

  /**
  * Reset this component instance to its initial state.
  */
  public clear () {
    this.viewToWorld.toIdentity()
    this.worldToView.toIdentity()
  }

  /**
  * Copy another instance of this component.
  *
  * @param other - Other instance to copy.
  */
  public copy (other : Camera) : void {
    this.viewToWorld.copy(other.viewToWorld)
    this.worldToView.copy(other.worldToView)
  }
}
