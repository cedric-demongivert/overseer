import { Matrix4f, Vector2f } from '@cedric-demongivert/gl-tool-math'

function gcd (a, b) {
  while (b) {
    const tmp = b
    b = a % b
    a = tmp
  }

  return a
}

export class OrthographicCamera2D {
  /**
  * @see Component#initialize
  */
  constructor () {
    this._left = 0
    this._right = 1
    this._top = 0
    this._bottom = 1
  }

  /**
  * Reset this component instance to its initial state.
  */
  reset () {
    this._left = 0
    this._right = 1
    this._top = 0
    this._bottom = 1
  }

  /**
  * Copy another instance of this component.
  *
  * @param {OrthographicCamera2D} other - Other instance to copy.
  */
  copy (other) {
    this._left = other.left
    this._right = other.right
    this._top = other.top
    this._bottom = other.bottom
  }

  /**
  * Return the current world to view matrix of this camera.
  *
  * @param {Matrix4f} [result = new Matrix4f()] - The matrix to set to the world to view matrix of this camera.
  * @return {Vector2f} The world to view matrix of this camera.
  */
  extractWorldToView (target = new Matrix4f()) {
    const left = this._left
    const right = this._right
    const top = this._top
    const bottom = this._bottom

    const sx = 2 / (right - left)
    const px = -((right + left) / (right - left))
    const sy = 2 / (top - bottom)
    const py = -((top + bottom) / (top - bottom))

    target.set(
      sx,  0, 0, px,
       0, sy, 0, py,
       0,  0, 1,  0,
       0,  0, 0,  1
    )
  }

  /**
  * Return the current world to view matrix of this camera.
  *
  * @param {Matrix4f} [result = new Matrix4f()] - The matrix to set to the world to view matrix of this camera.
  * @return {Vector2f} The world to view matrix of this camera.
  */
  extractViewToWorld (target = new Matrix4f()) {
    this.extractWorldToView(target).invert()
  }

  /**
  * @return {number} The squared radius of this camera.
  */
  get squaredRadius () {
    const width = this.width
    const height = this.height

    return width * width + height * height
  }

  /**
  * @return {number} The radius of this camera.
  */
  get radius () {
    return Math.sqrt(this.squaredRadius)
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
  */
  setCenterX (value) {
    const hwidth = this.width / 2

    this._left = value - hwidth
    this._right = value + hwidth
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
  */
  setCenterY (value) {
    const hheight = this.height / 2

    this._bottom = value - hheight
    this._top = value + hheight
  }

  /**
  * Return the current center of the camera.
  *
  * @return {Vector2f} The current center of the camera.
  */
  get center () {
    return this.extractCenter()
  }

  /**
  * Return the current center of the camera.
  *
  * @param {Vector2f} [result = new Vector2f()] - The vector to set to the center of this camera.
  *
  * @return {Vector2f} The current center of the camera.
  */
  extractCenter (result = new Vector2f()) {
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
  */
  setWidth (value) {
    const centerX = this.centerX
    const hwidth = value / 2

    this._left = centerX - hwidth
    this._right = centerX + hwidth
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
  */
  setHeight (value) {
    const centerY = this.centerY
    const hheight = value / 2

    this._bottom = centerY - hheight,
    this._top = centerY + hheight
  }

  /**
  * @return {number} The aspect ratio of the camera as a number.
  */
  get aspectRatio () {
    return this.width / this.height
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
  */
  setLeft (value) {
    const width = this.width

    this._left = value
    this._right = value + width
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
  */
  setRight (value) {
    const width = this.width

    this._right = value
    this._left = value - width
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
  */
  setBottom (value) {
    const height = this.height

    this._bottom = value
    this._top = value + height
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
  }
}
