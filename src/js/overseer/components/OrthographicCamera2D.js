import { Matrix3f, Vector2f } from '@cedric-demongivert/gl-tool-math'
import { Component } from '@overseer/ecs'
import { Length } from '@overseer/overseer/Length'
import { Camera2D } from './Camera2D'

@Component({
  name: 'overseer:camera:2d:orthographic',
  sameAs: [Camera2D]
})
export class OrthographicCamera2D extends Camera2D {
  /**
  * @see Component#initialize
  */
  constructor () {
    super()
    this._viewToWorld = new Matrix3f()
    this._worldToView = new Matrix3f()
    this._synchronized = false
    this._left = 0
    this._right = 1
    this._top = 0
    this._bottom = 1
    this._unit = new Length('3cm')
  }

  /**
  * @see Camera2D#get worldToView
  */
  get worldToView () {
    if (!this._synchronized) this.synchronize()
    return this._worldToView
  }

  /**
  * @see Camera2D#getWorldToView
  */
  getWorldToView (result = new Matrix3f()) {
    result.copy(this.worldToView)
    return result
  }

  /**
  * @see Camera2D#get viewToWorld
  */
  get viewToWorld () {
    if (!this._synchronized) this.synchronize()
    return this._viewToWorld
  }

  /**
  * @see Camera2D#getViewToWorld
  */
  getViewToWorld (result = new Matrix3f()) {
    result.copy(this.viewToWorld)
    return result
  }

  /**
  * @return {boolean} True if this orthographic camera's matrices are synchronized with its description.
  */
  get synchronized () {
    return this._synchronized
  }

  /**
  * Change the synchronization state of this camera.
  *
  * @param {boolean} value - The new synchronization state of this camera.
  */
  set synchronized (value) {
    this.setSynchronized(value)
  }

  /**
  * Change the synchronization state of this camera.
  *
  * @param {boolean} value - The new synchronization state of this camera.
  *
  * @return {OrthographicCamera2D} This instance for chaining purpose.
  */
  setSynchronized (value) {
    this._synchronized = value
    return this
  }

  synchronize () {
    const left = this._left
    const right = this._right
    const top = this._top
    const bottom = this._bottom

    this._worldToView.set(
      2 / (right - left), 0, -((right + left) / (right - left)),
      0, 2 / (top - bottom), -((top + bottom) / (top - bottom)),
      0, 0, 1
    )

    this._worldToView.invert(this._viewToWorld)
    this._synchronized = true
  }

  /**
  * Return the current unit used by this camera.
  *
  * @return {Length} The current unit used by this camera.
  */
  get unit () {
    return this._unit
  }

  getUnit () {
    return this._unit
  }

  /**
  * Change the unit of this camera.
  *
  * @param {Length} value - The new unit used by this camera.
  */
  set unit (value) {
    this.setUnit(value)
  }

  setUnit (value) {
    this._unit = new Length(value)

    return this
  }

  /**
  * Return the x component of the center of this camera.
  *
  * @return {number} The x component of the center of this camera.
  */
  get centerX () {
    return (this._left + this._right) / 2
  }

  /**
  * Change the x component of the center of this camera.
  *
  * @param {number} value - The new x component of the center of this camera.
  */
  set centerX (value) {
    this.setCenterX(value)
  }

  /**
  * Change the x component of the center of this camera.
  *
  * @param {number} value - The new x component of the center of this camera.
  *
  * @return {camera} The current instance for chaining purpose.
  */
  setCenterX (value) {
    const hwidth = this.width / 2

    this._left = value - hwidth
    this._right = value + hwidth
    this._synchronized = false

    return this
  }

  /**
  * Return the y component of the center of this camera.
  *
  * @return {number} The y component of the center of this camera.
  */
  get centerY () {
    return (this._bottom + this._top) / 2
  }

  /**
  * Change the y component of the center of this camera.
  *
  * @param {number} value - The new y component of the center of this camera.
  */
  set centerY (value) {
    this.setCenterY(value)
  }

  /**
  * Change the y component of the center of this camera.
  *
  * @param {number} value - The new y component of the center of this camera.
  *
  * @return {camera} The current instance for chaining purpose.
  */
  setCenterY (value) {
    const hheight = this.height / 2

    this._bottom = value - hheight
    this._top = value + hheight
    this._synchronized = false

    return this
  }

  /**
  * Return the current center of the camera.
  *
  * @return {Vector2f} The current center of the camera.
  */
  get center () {
    return this.getCenter()
  }

  /**
  * Return the current center of the camera.
  *
  * @param {Vector2f} [result = new Vector2f()] - The vector to set to the center of this camera.
  * @return {Vector2f} The current center of the camera.
  */
  getCenter (result = new Vector2f()) {
    result.set(this.centerX, this.centerY)
    return result
  }

  /**
  * Change the center of this camera.
  *
  * @param {Vector2f} value - The new center of the camera.
  */
  set center (value) {
    this.setCenter(value.x, value.y)
  }

  /**
  * Set the new center of this camera.
  *
  * @param {number} x - The new x componen value of the center of this camera.
  * @param {number} y - The new x componen value of the center of this camera.
  *
  * @return {camera} The current instance for chaining purpose.
  */
  setCenter (x, y) {
    const hwidth = this.width / 2
    const hheight = this.height / 2

    this._bottom = y - hheight
    this._top = y + hheight

    this._left = x - hwidth
    this._right = x + hwidth
    this._synchronized = false

    return this
  }

  /**
  * Return the width of the camera.
  *
  * @return {number} The width of the camera.
  */
  get width () {
    return this._right - this._left
  }

  /**
  * Change the width of the camera.
  *
  * @param {number} value - The new width of the camera.
  */
  set width (value) {
    this.setWidth(value)
  }

  /**
  * Change the width of the camera.
  *
  * @param {number} value - The new width of the camera.
  *
  * @return {camera} The current instance for chaining purpose.
  */
  setWidth (value) {
    const centerX = this.centerX
    const hwidth = value / 2

    this._left = centerX - hwidth
    this._right = centerX + hwidth
    this._synchronized = false

    return this
  }

  /**
  * Return the height of the camera.
  *
  * @return {number} The height of the camera.
  */
  get height () {
    return this._top - this._bottom
  }

  /**
  * Change the height of the camera.
  *
  * @param {number} value - The new height of the camera.
  */
  set height (value) {
    this.setHeight(value)
  }

  /**
  * Change the height of the camera.
  *
  * @param {number} value - The new height of the camera.
  *
  * @return {camera} The current instance for chaining purpose.
  */
  setHeight (value) {
    const centerY = this.centerY
    const hheight = value / 2

    this._bottom = centerY - hheight,
    this._top = centerY + hheight
    this._synchronized = false

    return this
  }

  /**
  * Return the left location of the camera.
  *
  * @return {number} The left location of the camera.
  */
  get left () {
    return this._left
  }

  /**
  * Change the left location of the camera.
  *
  * @param {number} value - The new left location of the camera.
  */
  set left (value) {
    this.setLeft(value)
  }

  /**
  * Change the left location of the camera.
  *
  * @param {number} value - The new left location of the camera.
  *
  * @return {camera} The current instance for chaining purpose.
  */
  setLeft (value) {
    const width = this.width

    this._left = value
    this._right = value + width
    this._synchronized = false

    return this
  }

  /**
  * Return the right location of the camera.
  *
  * @return {number} The right location of the camera.
  */
  get right () {
    return this._right
  }

  /**
  * Change the right location of the camera.
  *
  * @param {number} value - The new right location of the camera.
  */
  set right (value) {
    this.setRight(value)
  }

  /**
  * Change the right location of the camera.
  *
  * @param {number} value - The new right location of the camera.
  *
  * @return {OrthographicCamera2D} The current instance for chaining purpose.
  */
  setRight (value) {
    const width = this.width

    this._right = value
    this._left = value - width
    this._synchronized = false

    return this
  }

  /**
  * Return the bottom location of the camera.
  *
  * @return {number} The bottom location of the camera.
  */
  get bottom () {
    return this._bottom
  }

  /**
  * Change the bottom location of the camera.
  *
  * @param {number} value - The new bottom location of the camera.
  */
  set bottom (value) {
    this.setBottom(value)
  }

  /**
  * Change the bottom location of the camera.
  *
  * @param {number} value - The new bottom location of the camera.
  *
  * @return {camera} The current instance for chaining purpose.
  */
  setBottom (value) {
    const height = this.height

    this._bottom = value
    this._top = value + height
    this._synchronized = false

    return this
  }

  /**
  * Return the top location of the camera.
  *
  * @return {number} The top location of the camera.
  */
  get top () {
    return this._top
  }

  /**
  * Change the top location of the camera.
  *
  * @param {number} value - The new top location of the camera.
  */
  set top (value) {
    this.setTop(value)
  }

  /**
  * Change the top location of the camera.
  *
  * @param {number} value - The new top location of the camera.
  *
  * @return {camera} The current instance for chaining purpose.
  */
  setTop (value) {
    const height = this.height

    this._top = value
    this._bottom = value - height
    this._synchronized = false

    return this
  }
}
