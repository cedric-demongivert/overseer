export class BoundingSquare {
  /**
  * Create a new unitary bounding square.
  */
  constructor () {
    this._top = 0.5
    this._bottom = -0.5
    this._left = -0.5
    this._right = 0.5
  }

  /**
  * Reset this bounding square to its initial state.
  */
  reset () {
    this._top = 0.5
    this._bottom = -0.5
    this._left = -0.5
    this._right = 0.5
  }

  /**
  * Copy another instance of this component.
  *
  * @param {BoundingSquare} other - Other instance to copy.
  */
  copy (other) {
    this._left = other.left
    this._right = other.right
    this._bottom = other.bottom
    this._top = other.top
  }

  /**
  * Return the x component of the center of this bounding square.
  *
  * @return {number} The x component of the center of this bounding square.
  */
  get centerX () {
    return (this._left + this._right) / 2
  }

  /**
  * Change the x component of the center of this bounding square.
  *
  * @param {number} value - The new x component of the center of this bounding square.
  */
  set centerX (value) {
    this.setCenterX(value)
  }

  /**
  * Change the x component of the center of this bounding square.
  *
  * @param {number} value - The new x component of the center of this bounding square.
  */
  setCenterX (value) {
    const hwidth = this.width / 2

    this._left = value - hwidth
    this._right = value + hwidth
  }

  /**
  * Return the y component of the center of this bounding square.
  *
  * @return {number} The y component of the center of this bounding square.
  */
  get centerY () {
    return (this._bottom + this._top) / 2
  }

  /**
  * Change the y component of the center of this bounding square.
  *
  * @param {number} value - The new y component of the center of this bounding square.
  */
  set centerY (value) {
    this.setCenterY(value)
  }

  /**
  * Change the y component of the center of this bounding square.
  *
  * @param {number} value - The new y component of the center of this bounding square.
  */
  setCenterY (value) {
    const hheight = this.height / 2

    this._bottom = value - hheight
    this._top = value + hheight
  }

  /**
  * Return the current center of the bounding square.
  *
  * @return {Vector2f} The current center of the bounding square.
  */
  get center () {
    return this.getCenter()
  }

  /**
  * Return the current center of the bounding square.
  *
  * @param {Vector2f} [result = new Vector2f()] - The vector to set to the center of this bounding square.
  * @return {Vector2f} The current center of the bounding square.
  */
  getCenter (result = new Vector2f()) {
    result.set(this.centerX, this.centerY)
    return result
  }

  /**
  * Change the center of this bounding square.
  *
  * @param {Vector2f} value - The new center of the bounding square.
  */
  set center (value) {
    this.setCenter(value.x, value.y)
  }

  /**
  * Set the new center of this bounding square.
  *
  * @param {number} x - The new x componen value of the center of this bounding square.
  * @param {number} y - The new x componen value of the center of this bounding square.
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
  * Return the width of the bounding square.
  *
  * @return {number} The width of the bounding square.
  */
  get width () {
    return this._right - this._left
  }

  /**
  * Change the width of the bounding square.
  *
  * @param {number} value - The new width of the bounding square.
  */
  set width (value) {
    this.setWidth(value)
  }

  /**
  * Change the width of the bounding square.
  *
  * @param {number} value - The new width of the bounding square.
  */
  setWidth (value) {
    const centerX = this.centerX
    const hwidth = value / 2

    this._left = centerX - hwidth
    this._right = centerX + hwidth
  }

  /**
  * Return the height of the bounding square.
  *
  * @return {number} The height of the bounding square.
  */
  get height () {
    return this._top - this._bottom
  }

  /**
  * Change the height of the bounding square.
  *
  * @param {number} value - The new height of the bounding square.
  */
  set height (value) {
    this.setHeight(value)
  }

  /**
  * Change the height of the bounding square.
  *
  * @param {number} value - The new height of the bounding square.
  */
  setHeight (value) {
    const centerY = this.centerY
    const hheight = value / 2

    this._bottom = centerY - hheight,
    this._top = centerY + hheight
  }

  /**
  * Return the left location of the bounding square.
  *
  * @return {number} The left location of the bounding square.
  */
  get left () {
    return this._left
  }

  /**
  * Change the left location of the bounding square.
  *
  * @param {number} value - The new left location of the bounding square.
  */
  set left (value) {
    this.setLeft(value)
  }

  /**
  * Change the left location of the bounding square.
  *
  * @param {number} value - The new left location of the bounding square.
  */
  setLeft (value) {
    const width = this.width
    this._left = value
    this._right = value + width
  }

  /**
  * Return the right location of the bounding square.
  *
  * @return {number} The right location of the bounding square.
  */
  get right () {
    return this._right
  }

  /**
  * Change the right location of the bounding square.
  *
  * @param {number} value - The new right location of the bounding square.
  */
  set right (value) {
    this.setRight(value)
  }

  /**
  * Change the right location of the bounding square.
  *
  * @param {number} value - The new right location of the bounding square.
  */
  setRight (value) {
    const width = this.width
    this._right = value
    this._left = value - width
  }

  /**
  * Return the bottom location of the bounding square.
  *
  * @return {number} The bottom location of the bounding square.
  */
  get bottom () {
    return this._bottom
  }

  /**
  * Change the bottom location of the bounding square.
  *
  * @param {number} value - The new bottom location of the bounding square.
  */
  set bottom (value) {
    this.setBottom(value)
  }

  /**
  * Change the bottom location of the bounding square.
  *
  * @param {number} value - The new bottom location of the bounding square.
  */
  setBottom (value) {
    const height = this.height

    this._bottom = value
    this._top = value + height
  }

  /**
  * Return the top location of the bounding square.
  *
  * @return {number} The top location of the bounding square.
  */
  get top () {
    return this._top
  }

  /**
  * Change the top location of the bounding square.
  *
  * @param {number} value - The new top location of the bounding square.
  */
  set top (value) {
    this.setTop(value)
  }

  /**
  * Change the top location of the bounding square.
  *
  * @param {number} value - The new top location of the bounding square.
  */
  setTop (value) {
    const height = this.height
    this._top = value
    this._bottom = value - height
  }

  /**
  * @return {boolean} True if this bounding square contains the given location.
  */
  contains (x, y) {
    return x >= this._left &&
           x < this._right &&
           y >= this._bottom &&
           y < this._top
  }
}
