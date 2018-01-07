import { Shape } from './Shape'
import { Vector2f } from './Vector2f'

/**
* A rectangle.
*/
export class Rectangle extends Shape {
  /**
  * Create a new rectangle.
  *
  * @param {number} [x=0]
  * @param {number} [y=0]
  * @param {number} [width=0]
  * @param {number} [height=0]
  */
  constructor (x = 0, y = 0, width = 0, height = 0) {
    super()
    this._min = new Vector2f(x, y)
    this._max = new Vector2f(x + width, y + height)
  }

  /**
  * @override
  */
  get boundingBox () {
    return this.clone()
  }

  /**
  * Return the minimum of the rectangle.
  *
  * @return {Vector2f} The minimum of the rectangle.
  */
  get min () {
    return this._min.clone()
  }

  /**
  * Change the minimum of the rectangle.
  *
  * @param {Vector2f|Vector} value - The new minimum of the rectangle.
  */
  set min (value) {
    this._min.setAll(value)
    this._max.x = Math.max(this._min.x, this._max.x)
    this._max.y = Math.max(this._min.y, this._max.y)
  }

  /**
  * Return the center of the rectangle.
  *
  * @return {Vector2f} The center of the rectangle.
  */
  get center () {
    return this._min.clone().add(this._max).divide(2)
  }

  /**
  * Change the center of the rectangle.
  *
  * @param {Vector2f|Vector} value - The new center of the rectangle.
  */
  set center (value) {
    const delta = new Vector2f(value).subtract(this.center)

    this._min.add(delta)
    this._max.add(delta)
  }

  /**
  * Return the maximum of the rectangle.
  *
  * @return {Vector2f} The maximum of the rectangle.
  */
  get max () {
    return this._max.clone()
  }

  /**
  * Change the maximum of the rectangle.
  *
  * @param {Vector2f|Vector} value - The new maximum of the rectangle.
  */
  set max (value) {
    this._max.setAll(value)
    this._min.x = Math.min(this._min.x, this._max.x)
    this._min.y = Math.min(this._min.y, this._max.y)
  }

  /**
  * Return the left side location of the rectangle.
  *
  * @return {number} The left side location of the rectangle.
  */
  get left () {
    return this._min.x
  }

  /**
  * Change the left side location of the rectangle.
  *
  * @param {number} value - The new left side location of the rectangle.
  */
  set left (value) {
    this._min.set(0, value)
    this._max.x = Math.max(this._min.x, this._max.x)
  }

  /**
  * Return the right side location of the rectangle.
  *
  * @return {number} The right side location of the rectangle.
  */
  get right () {
    return this._max.x
  }

  /**
  * Change the right side location of the rectangle.
  *
  * @param {number} value - The new right side location of the rectangle.
  */
  set right (value) {
    this._max.set(0, value)
    this._min.x = Math.min(this._min.x, this._max.x)
  }

  /**
  * Return the top side location of the rectangle.
  *
  * @return {number} The top side location of the rectangle.
  */
  get top () {
    return this._min.y
  }

  /**
  * Change the top side location of the rectangle.
  *
  * @param {number} value - The new top side location of the rectangle.
  */
  set top (value) {
    this._min.set(1, value)
    this._max.y = Math.max(this._min.y, this._max.y)
  }

  /**
  * Return the bottom side location of the rectangle.
  *
  * @return {number} The bottom side location of the rectangle.
  */
  get bottom () {
    return this._max.y
  }

  /**
  * Change the bottom side location of the rectangle.
  *
  * @param {number} value - The new bottom side location of the rectangle.
  */
  set bottom (value) {
    this._max.set(1, value)
    this._min.y = Math.min(this._min.y, this._max.y)
  }

  /**
  * Return the height of the rectangle.
  *
  * @return {number} The height of the rectangle.
  */
  get height () {
    return Math.max(this._max.y - this._min.y, 0)
  }

  /**
  * Change the height of the rectangle.
  *
  * @param {number} value - The new height of the rectangle.
  */
  set height (value) {
    this._max.set(1, this._min.y + Math.max(value, 0))
  }

  /**
  * Return the width of the rectangle.
  *
  * @return {number} The width of the rectangle.
  */
  get width () {
    return Math.max(this._max.x - this._min.x, 0)
  }

  /**
  * Change the width of the rectangle.
  *
  * @param {number} value - The new width of the rectangle.
  */
  set width (value) {
    this._max.set(0, this._min.x + Math.max(value, 0))
  }

  /**
  * Return the dimensions of the rectangle.
  *
  * @return {Vector2f} The dimensions of the rectangle.
  */
  get dimensions () {
    return this._max.clone().subtract(this._min).min(0)
  }

  /**
  * Change the dimensions of the rectangle.
  *
  * @param {Vector2f|Vector} value - The new dimensions of the rectangle.
  */
  set dimensions (value) {
    this._max.setAll(this._min.clone().add(new Vector2f(value).min(0)))
  }

  /**
  * @override
  */
  clone () {
    return new Rectangle(this.left, this.top, this.width, this.height)
  }
}
