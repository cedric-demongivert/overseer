import { Vector4f } from '@cedric-demongivert/gl-tool-math'

export class Draggable {
  /**
   * 
   */
  public dragged: boolean

  /**
   * 
   */
  public cameraOrigin: Vector4f

  /**
   * 
   */
  public dragOrigin: Vector4f

  /**
   * 
   */
  public constructor() {
    this.dragged = false
    this.cameraOrigin = Vector4f.create(0, 0, 0, 1)
    this.dragOrigin = Vector4f.create(0, 0, 0, 1)
  }

  /**
   * 
   */
  public copy(toCopy: Draggable): void {
    this.dragged = toCopy.dragged
    this.cameraOrigin.copy(toCopy.cameraOrigin)
    this.dragOrigin.copy(toCopy.dragOrigin)
  }

  /**
   * 
   */
  public clear(): void {
    this.dragged = false
    this.cameraOrigin.set(0, 0, 0, 1)
    this.dragOrigin.set(0, 0, 0, 1)
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Draggable) {
      return (
        other.dragged === this.dragged &&
        other.dragOrigin === this.dragOrigin &&
        other.cameraOrigin === this.cameraOrigin
      )
    }
  }
}
