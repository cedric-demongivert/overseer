import { Vector2f } from '@cedric-demongivert/gl-tool-math'

export class BoundingCircle {
  /**
  * Create a new unitary bounding circle.
  */
  constructor () {
    this._center = new Vector2f()
    this._radius = 1
    this._squaredRadius = 1
  }

  /**
  * Reset this component instance to its initial state.
  */
  reset () {
    this._center.set(0, 0)
    this._radius = 1
    this._squaredRadius = 1
  }

  /**
  * Copy another instance of this component.
  *
  * @param {BoundingCircle} other - Other instance to copy.
  */
  copy (other) {
    this._center.copy(other.center)
    this._radius = other.radius
    this._squaredRadius = other.radius * other.radius
  }

  ofSquare (boundingSquare) {
    const width = boundingSquare.width
    const height = boundingSquare.height

    this._center.set(boundingSquare.centerX, boundingSquare.centerY)
    this._squaredRadius = (width * width + height * height) / 4.0
    this._radius = Math.sqrt(this._squaredRadius)
  }

  /**
  * @return {Vector2f} The center of this bounding circle.
  */
  get center () {
    return this._center
  }

  /**
  * Update the center of this bounding circle.
  *
  * @param {Vector2f} center - The new center of this bounding circle.
  */
  set center (center) {
    this._center.copy(center)
  }

  /**
  * @return {number} The radius of this bounding circle.
  */
  get radius () {
    return this._radius
  }

  /**
  * Update the radius of this bounding circle.
  *
  * @param {number} radius - The new radius of this bounding circle.
  */
  set radius (radius) {
    this._radius = radius
    this._squaredRadius = radius * radius
  }

  /**
  * @return {number} The squared radius of this bounding circle.
  */
  get squaredRadius () {
    return this._squaredRadius
  }

  /**
  * Update the center of this bounding circle.
  *
  * @param {number} x - The center of this bounding circle in abscissa.
  * @param {number} y - The center of this bounding circle in ordinates.
  */
  setCenter (x, y) {
    this._center.set(x, y)
  }

  /**
  * Update the radius of this bounding circle.
  *
  * @param {number} radius - The new radius of this bounding circle.
  */
  setRadius (radius) {
    this.radius = radius
  }

  /**
  * @return {boolean} True if this bounding circle contains the given center.
  */
  contains (x, y) {
    const dx = x - this._center.x
    const dy = y - this._center.y

    return dx * dx + dy * dy < this._squaredRadius
  }
}
