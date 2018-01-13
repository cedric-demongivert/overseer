import { Vector2f, Matrix3f } from '@glkit'
import { Length } from '@overseer/engine'

export class View {
  /**
  * Construct a new overseer view.
  *
  * @param {number} left - Left limit of the view.
  * @param {number} right - Right limit of the view.
  * @param {number} bottom - Bottom limit of the view.
  * @param {number} top - Top limit of the view.
  * @param {Length} [unit = new Length('3m').divide(60)] - Initial unit of the view.
  */
  constructor (left, right, bottom, top, unit = new Length('3m').divide(30)) {
    this._unit = unit.clone()
    this._left = left
    this._right = right
    this._bottom = bottom
    this._top = top
    this._computeWorldToView = this._computeWorldToView.bind(this)
    this._computeViewToWorld = this._computeViewToWorld.bind(this)
  }

  /**
  * Call computeWorldToView and memoize the result.
  *
  * @return {Matrix3f} The result of computeWorldToView.
  */
  _computeWorldToView () {
    const right = this._right * this._unit.value
    const left = this._left * this._unit.value
    const top = this._top * this._unit.value
    const bottom = this._bottom * this._unit.value

    const result = new Matrix3f([
      2 / (right - left), 0, -((right + left) / (right - left)),
      0, 2 / (top - bottom), -((top + bottom) / (top - bottom)),
      0, 0, 1
    ])

    Object.defineProperty(
      this, 'worldToView', {
        value: result,
        configurable: true
      }
    )

    return result
  }

  /**
  * Call computeViewToWorld and memoize the result.
  *
  * @return {Matrix3f} The result of computeViewToWorld
  */
  _computeViewToWorld () {
    const right = this._right
    const left = this._left
    const top = this._top
    const bottom = this._bottom

    const result = new Matrix3f([
      (right - left) / 2, 0, (left + right) / 2,
      0, (top - bottom) / 2, (top + bottom) / 2,
      0, 0, 1
    ])

    Object.defineProperty(this, 'viewToWorld', {
      value: result,
      configurable: true
    })

    return result
  }

  /**
  * Enqueue a computation of the world to view matrix.
  *
  * @return {View2D} The current instance for chaining purpose.
  */
  enqueueUpdate () {
    const descriptor = Object.getOwnPropertyDescriptor(this, 'worldToView')
    if (descriptor == null || !descriptor.get) {
      Object.defineProperty(
        this, 'worldToView', {
          get: this._computeWorldToView,
          configurable: true
        }
      )
      Object.defineProperty(
        this, 'viewToWorld', {
          get: this._computeViewToWorld,
          configurable: true
        }
      )
    }

    return this
  }

  /**
  * @return {Matrix3f} The world to view matrix.
  */
  get worldToView () {
    return this._computeWorldToView()
  }

  /**
  * Return the view to world matrix.
  *
  * @return {Matrix3f} The view to world matrix.
  */
  get viewToWorld () {
    return this._computeViewToWorld()
  }

  /**
  * Return the current unit of the view.
  *
  * @return {Length} The current unit by pixel of the view.
  */
  get unit () {
    return this._unit
  }

  /**
  * Change the current unit of the view.
  *
  * @param {Length} unit - The new unit by pixel of the view.
  */
  set unit (unit) {
    this._unit = unit.clone()
    this.enqueueUpdate()
  }

  /**
  * @return {number} The left location of the view.
  */
  get left () {
    return this._left
  }

  /**
  * @param {number} left - The new left location of the view.
  */
  set left (left) {
    if (left > this._right) {
      this._right = left
    }

    this._left = left
    this.enqueueUpdate()
  }

  /**
  * @return {number} The right location of the view.
  */
  get right () {
    return this._right
  }

  /**
  * @param {number} right - The new right location of the view.
  */
  set right (right) {
    if (right < this._left) {
      this._left = right
    }

    this._right = right
    this.enqueueUpdate()
  }

  /**
  * @return {number} The top location of the view.
  */
  get top () {
    return this._top
  }

  /**
  * @param {number} top - The new top location of the view.
  */
  set top (top) {
    if (top < this._bottom) {
      this._bottom = top
    }
    this._top = top
    this.enqueueUpdate()
  }

  /**
  * @return {number} The bottom location of the view.
  */
  get bottom () {
    return this._bottom
  }

  /**
  * @param {number} bottom - The new bottom location of the view.
  */
  set bottom (bottom) {
    if (this._top < bottom) {
      this._top = bottom
    }
    this._bottom = bottom
    this.enqueueUpdate()
  }

  /**
  * @return {number} The current width of the view.
  */
  get width () {
    return this._right - this._left
  }

  /**
  * @param {number} width - The new width of the view.
  */
  set width (width) {
    const cx = (this._right + this._left) / 2
    const halfWidth = width / 2

    this._left = cx - halfWidth
    this._right = cx + halfWidth

    this.enqueueUpdate()
  }

  /**
  * @return {number} The current height of the view.
  */
  get height () {
    return this._top - this._bottom
  }

  /**
  * @param {number} height - The new height of the view.
  */
  set height (height) {
    const cy = (this._bottom + this._top) / 2
    const halfHeight = height / 2

    this._bottom = cy - halfHeight
    this._top = cy + halfHeight

    this.enqueueUpdate()
  }

  /**
  * @return {number} The x axis value of the center of this view.
  */
  get centerX () {
    return (this._left + this._right) / 2
  }

  /**
  * @param {number} centerX - The new x axis value of the center of this view.
  */
  set centerX (centerX) {
    const cx = centerX
    const halfWidth = this.width / 2

    this._left = cx - halfWidth
    this._right = cx + halfWidth

    this.enqueueUpdate()
  }

  /**
  * @return {number} The y axis value of the center of this view.
  */
  get centerY () {
    return (this._bottom + this._top) / 2
  }

  /**
  * @param {number} centerY - The new y axis value of the center of this view.
  */
  set centerY (centerY) {
    const cy = centerY
    const halfHeight = this.height / 2

    this._bottom = cy - halfHeight
    this._top = cy + halfHeight

    this.enqueueUpdate()
  }

  /**
  * @return {Vector2f} The current center of the view as a vector.
  */
  get center () {
    return Vector2f.create(
      (this._left + this._right) / 2,
      (this._bottom + this._top) / 2
    )
  }

  /**
  * @param {Vector2f} center - The new center of the view as a vector.
  */
  set center (center) {
    const newCenter = Vector2f.from(center)
    this.centerX = newCenter.x
    this.centerY = newCenter.y
  }
}
