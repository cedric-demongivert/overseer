import { Vector2f } from '@cedric-demongivert/gl-tool-math'

export class BoundingCircle {
  /**
  * Create a new unitary bounding circle.
  */
  constructor () {
    this._location = new Vector2f()
    this._radius = 1
    this._squaredRadius = 1
  }

  /**
  * Reset this component instance to its initial state.
  */
  reset () {
    this._location.set(0, 0)
    this._radius = 1
    this._squaredRadius = 1
  }

  /**
  * Copy another instance of this component.
  *
  * @param {BoundingCircle} other - Other instance to copy.
  */
  copy (other) {
    this._location.copy(other.location)
    this._radius = other.radius
    this._squaredRadius = other.radius * other.radius
  }

  /**
  * @return {Vector2f} The location of this bounding circle.
  */
  get location () {
    return this._location
  }

  /**
  * Update the location of this bounding circle.
  *
  * @param {Vector2f} location - The new location of this bounding circle.
  */
  set location (location) {
    this._location.copy(location)
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
  * Update the location of this bounding circle.
  *
  * @param {number} x - The location of this bounding circle in abscissa.
  * @param {number} y - The location of this bounding circle in ordinates.
  */
  setLocation (x, y) {
    this._location.set(x, y)
  }

  /**
  * @return {boolean} True if this bounding circle contains the given location.
  */
  contains (x, y) {
    const dx = x - this._location.x
    const dy = y - this._location.y

    return dx * dx + dy * dy < this._squaredRadius
  }
}
