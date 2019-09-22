import { Vector4f } from '@cedric-demongivert/gl-tool-math'

export class Draggable {
  constructor () {
    this._dragged = false
    this._origin = Vector4f.create(0, 0, 0, 1)
    this._cameraOrigin = Vector4f.create(0, 0, 0, 1)
  }

  copy (toCopy) {
    this._dragged = toCopy.isDragged
    this._origin.copy(toCopy.origin)
    this._cameraOrigin.copy(toCopy.cameraOrigin)
  }

  reset () {
    this._dragged = false
    this._origin.set(0, 0, 0, 1)
    this._cameraOrigin.set(0, 0, 0, 1)
  }

  get origin () {
    return this._origin
  }

  get cameraOrigin () {
    return this._cameraOrigin
  }

  get isDragged () {
    return this._dragged
  }

  setDragged (value) {
    this._dragged = value

    if (value === false) {
      this._origin.set(0, 0, 0, 1)
      this._cameraOrigin.set(0, 0, 0, 1)
    }
  }

  setOrigin (value) {
    this._origin.copy(value)
  }
}
