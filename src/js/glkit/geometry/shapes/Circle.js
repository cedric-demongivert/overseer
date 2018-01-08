import { Shape } from './Shape'
import { Vector2f } from './Vector2f'
import { Rectangle } from './Rectangle'

export class Circle extends Shape {
  /**
  * Create a new circle.
  *
  * @param {number} [x=0] -
  * @param {number} [y=0] -
  * @param {number} [radius=0] -
  */
  constructor (x = 0, y = 0, radius = 0) {
    super()
    this._center = new Vector2f(x, y)
    this._radius = radius
  }

  /**
  * @override
  */
  get boundingBox () {
    return new Rectangle(
      this._center.x - this._radius,
      this._center.y - this._radius,
      this._radius * 2,
      this._radius * 2
    )
  }

  /**
  * Return the center of the circle.
  *
  * @return {Vector2f} The center of the circle.
  */
  get center () {
    return this._center.clone()
  }

  /**
  * Change the center of the circle.
  *
  * @param {Vector2f} value - The new center of the circle.
  */
  set center (value) {
    return this._center.setAll(value)
  }

  /**
  * Return the radius of the circle.
  *
  * @return {number} The radius of the circle.
  */
  get radius () {
    return this._radius
  }

  /**
  * Change the radius of the circle.
  *
  * @param {number} value - The new radius of the circle.
  */
  set radius (value) {
    this._radius = value
  }

  /**
  * @override
  */
  clone () {
    return new Circle(...this.center, this.radius)
  }
}
