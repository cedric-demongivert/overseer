import { Vector4f } from '@cedric-demongivert/gl-tool-math'

export class Draggable {
  public dragged      : boolean
  public origin       : Vector4f
  public cameraOrigin : Vector4f

  public constructor () {
    this.dragged = false
    this.origin = Vector4f.create(0, 0, 0, 1)
    this.cameraOrigin = Vector4f.create(0, 0, 0, 1)
  }

  public copy (toCopy : Draggable) : void {
    this.dragged = toCopy.dragged
    this.origin.copy(toCopy.origin)
    this.cameraOrigin.copy(toCopy.cameraOrigin)
  }

  public clear () : void {
    this.dragged = false
    this.origin.set(0, 0, 0, 1)
    this.cameraOrigin.set(0, 0, 0, 1)
  }
}
