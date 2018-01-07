import { Camera2D } from './Camera2D'
import { Vector2f, Matrix3f } from '../engine'

export class OrthographicCamera2D extends Camera2D {
  /**
  * Construct a new orthographic 2D overseer camera.
  *
  * @param {number} left - Left location of the camera.
  * @param {number} right - Right location of the camera.
  * @param {number} bottom - Bottom location of the camera.
  * @param {number} top - Top location of the camera.
  * @param {Length} [pixelUnit] - Initial length by pixel of the camera.
  */
  constructor (left, right, bottom, top, pixelUnit) {
    super(pixelUnit)
    this._left = left
    this._right = right
    this._bottom = bottom
    this._top = top
  }

  /**
  * Compute a new world to camera matrix by using current instance fields.
  *
  * @return {Matrix3f} The new world to camera matrix.
  */
  computeWorldToCamera () {
    const right = this._right
    const left = this._left
    const top = this._top
    const bottom = this._bottom

    return new Matrix3f([
      2 / (right - left), 0, -((right + left) / (right - left)),
      0, 2 / (top - bottom), -((top + bottom) / (top - bottom)),
      0, 0, 1
    ])
  }

  /**
  * Compute a new camera to world matrix by using current instance fields.
  *
  * @return {Matrix3f} The new camera to world matrix.
  */
  computeCameraToWorld () {
    const right = this._right
    const left = this._left
    const top = this._top
    const bottom = this._bottom

    return new Matrix3f([
      (right - left) / 2, 0, (left + right) / 2,
      0, (top - bottom) / 2, (top + bottom) / 2,
      0, 0, 1
    ])
  }

  /**
  * @return {number} The left location of the camera.
  */
  get left () {
    return this._left
  }

  /**
  * @param {number} left - The new left location of the camera.
  */
  set left (left) {
    if (left > this._right) {
      this._right = left
    }

    this._left = left
    this.updateWorldToCamera()
  }

  /**
  * @return {number} The right location of the camera.
  */
  get right () {
    return this._right
  }

  /**
  * @param {number} right - The new right location of the camera.
  */
  set right (right) {
    if (right < this._left) {
      this._left = right
    }

    this._right = right
    this.updateWorldToCamera()
  }

  /**
  * @return {number} The top location of the camera.
  */
  get top () {
    return this._top
  }

  /**
  * @param {number} top - The new top location of the camera.
  */
  set top (top) {
    if (top < this._bottom) {
      this._bottom = top
    }
    this._top = top
    this.updateWorldToCamera()
  }

  /**
  * @return {number} The bottom location of the camera.
  */
  get bottom () {
    return this._bottom
  }

  /**
  * @param {number} bottom - The new bottom location of the camera.
  */
  set bottom (bottom) {
    if (this._top < bottom) {
      this._top = bottom
    }
    this._bottom = bottom
    this.updateWorldToCamera()
  }

  /**
  * @return {number} The current width of the camera.
  */
  get width () {
    return this._right - this._left
  }

  /**
  * @param {number} width - The new width of the camera.
  */
  set width (width) {
    const cx = (this._right + this._left) / 2
    const halfWidth = width / 2

    this._left = cx - halfWidth
    this._right = cx + halfWidth

    this.updateWorldToCamera()
  }

  /**
  * @return {number} The current height of the camera.
  */
  get height () {
    return this._top - this._bottom
  }

  /**
  * @param {number} height - The new height of the camera.
  */
  set height (height) {
    const cy = (this._bottom + this._top) / 2
    const halfHeight = height / 2

    this._bottom = cy - halfHeight
    this._top = cy + halfHeight

    this.updateWorldToCamera()
  }

  /**
  * @return {number} The x axis value of the center of this camera.
  */
  get centerX () {
    return (this._left + this._right) / 2
  }

  /**
  * @param {number} centerX - The new x axis value of the center of this camera.
  */
  set centerX (centerX) {
    const cx = centerX
    const halfWidth = this.width / 2

    this._left = cx - halfWidth
    this._right = cx + halfWidth

    this.updateWorldToCamera()
  }

  /**
  * @return {number} The y axis value of the center of this camera.
  */
  get centerY () {
    return (this._bottom + this._top) / 2
  }

  /**
  * @param {number} centerY - The new y axis value of the center of this camera.
  */
  set centerY (centerY) {
    const cy = centerY
    const halfHeight = this.height / 2

    this._bottom = cy - halfHeight
    this._top = cy + halfHeight

    this.updateWorldToCamera()
  }

  /**
  * @return {Vector2f} The current center of the camera as a vector.
  */
  get center () {
    return Vector2f.create(
      (this._left + this._right) / 2,
      (this._bottom + this._top) / 2
    )
  }

  /**
  * @param {Vector2f} center - The new center of the camera as a vector.
  */
  set center (center) {
    const newCenter = Vector2f.from(center)
    this.centerX = newCenter.x
    this.centerY = newCenter.y
  }
}
