import { Matrix4f, Vector3f, Vector2f } from '@cedric-demongivert/gl-tool-math'

export class Transformation2D {
  /**
  * Create a new identity transformation.
  */
  constructor () {
    this._scale = new Vector2f().set(1, 1)
    this._rotation = 0
    this._location = new Vector2f()
  }

  /**
  * Reset this component to its initial state.
  */
  reset () {
    this._scale.set(1, 1)
    this._rotation = 0
    this._location.set(0, 0)
  }

  /**
  * Copy another 2d transformation.
  *
  * @param {Transformation2D} other - Another 2D transformation.
  */
  copy (other) {
    this._scale.copy(other.scale)
    this._rotation = other.rotation
    this._location.copy(other.location)
  }

  /**
  * Apply this transformation to the given matrix.
  *
  * @param {Matrix4f} target - Target matrix to transform.
  */
  transform (target) {
    const sx = this._scale.x
    const sy = this._scale.y
    const tx = this._location.x
    const ty = this._location.y
    const cos = Math.cos(this._rotation)
    const sin= Math.sin(this._rotation)

    target.multiplyWithStaticMatrixAsLeftOperand(
      cos, -sin, 0, 0,
      sin,  cos, 0, 0,
        0,    0, 1, 0,
        0,    0, 0, 1,
    ).multiplyWithStaticMatrixAsLeftOperand(
      sx,  0, 0, 0,
       0, sy, 0, 0,
       0,  0, 1, 0,
       0,  0, 0, 1,
    ).multiplyWithStaticMatrixAsLeftOperand(
       1, 0, 0, 0,
       0, 1, 0, 0,
       0, 0, 1, 0,
       tx, ty, 0, 1,
    )
  }

  /**
  * Apply the inverse transformation to the given matrix.
  *
  * @param {Matrix4f} target - Target matrix to transform.
  */
  invert (target) {
    const sx = 1 / this._scale.x
    const sy = 1 / this._scale.y
    const tx = -this._location.x
    const ty = -this._location.y
    const cos = Math.cos(-this._rotation)
    const sin= Math.sin(-this._rotation)

    target.multiplyWithStaticMatrixAsRightOperand(
      sx,  0, 0, 0,
       0, sy, 0, 0,
       0,  0, 1, 0,
       0,  0, 0, 1,
    ).multiplyWithStaticMatrixAsRightOperand(
      cos, -sin, 0, 0,
      sin,  cos, 0, 0,
        0,    0, 1, 0,
        0,    0, 0, 1,
    ).multiplyWithStaticMatrixAsRightOperand(
       1, 0, 0, 0,
       0, 1, 0, 0,
       0, 0, 1, 0,
       tx, ty, 0, 1,
    )
  }

  /**
  * Return the scale transformation of this object.
  *
  * @return {Vector2f} The scale of this object.
  */
  get scale () {
    return this._scale
  }

  /**
  * Set the scale transformation of this object.
  *
  * @param {Vector2f} newScale - The new scale transformation of this object.
  */
  set scale (newScale) {
    this._scale.copy(newScale)
    this.synchronized = false
  }

  /**
  * Change the scale of this object.
  *
  * @param {number} width - The new width of this object.
  * @param {number} height - The new height of this object.
  */
  setScale (width, height) {
    this._scale.set(width, height)

    this.synchronized = false
  }

  /**
  * Scale this object.
  *
  * @param {number} width - The width scale factor.
  * @param {number} height - The height scale factor.
  */
  scale (width, height) {
    this._scale.set(
      this._scale.x * width,
      this._scale.y * height
    )

    this.synchronized = false
  }

  /**
  * Return the location of this object.
  *
  * @return {Vector2f} The location of this object.
  */
  get location () {
    return this._location
  }

  /**
  * Set the location of this object.
  *
  * @param {Vector2f} newLocation - The new location of this object.
  */
  set location (newLocation) {
    this._location.copy(newLocation)
    this.synchronized = false
  }

  /**
  * Set the location of this object.
  *
  * @param {number} x - The x component of the new location of this object.
  * @param {number} y - The y component of the new location of this object.
  */
  setLocation (x, y) {
    this._location.set(x, y)
    this.synchronized = false
  }

  /**
  * Translate this object.
  *
  * @param {number} x - The x component value of the translation.
  * @param {number} y - The y component value of the translation.
  */
  translate (x, y) {
    this._location.set(
      this._location.x + x,
      this._location.y + y
    )

    this.synchronized = false
  }

  /**
  * Return the rotation of this object.
  *
  * @return {number} The rotation of this object.
  */
  get rotation () {
    return this._rotation
  }

  /**
  * Set the rotation of this object.
  *
  * @param {number} newRotation - The new rotation of this object.
  */
  set rotation (newRotation) {
    this._rotation = newRotation
    this.synchronized = false
  }

  /**
  * Set the rotation of this object.
  *
  * @param {number} newRotation - The new rotation of this object.
  *
  * @return {Transform} The current instance for chaining purposes.
  */
  setRotation (newRotation) {
    this._rotation = newRotation
    this.synchronized = false
  }

  /**
  * Rotate this object.
  *
  * @param {number} theta - The rotation angle to use in radians.
  */
  rotate (theta) {
    this._rotation += theta
    this.synchronized = false
  }
}
