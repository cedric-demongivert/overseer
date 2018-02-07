import { Component } from '@overseer/engine/ecs'
import { Length } from '@overseer/engine/Length'
import { Matrix3f, Vector2f } from '@glkit'
import { Camera2D } from './Camera2D'

@Component({ type: Component.typeof(Camera2D) })
export class OrthographicCamera2D extends Camera2D {
  /**
  * @see Component#initialize
  */
  initialize () {
    this._computeViewToWorld = this._computeViewToWorld.bind(this)
    this._computeWorldToView = this._computeWorldToView.bind(this)
    this._updateWorldToView()

    this.state = {
      left: 0,
      right: 1,
      top: 0,
      bottom: 1,
      unit: new Length('3cm')
    }
  }

  /**
  * Enqueue a computation of the world to view matrix.
  */
  _updateWorldToView () {
    const descriptor = Object.getOwnPropertyDescriptor(this, 'worldToView')

    if (descriptor && !descriptor.get) {
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
  }

  /**
  * @return {Matrix3f} The world to view transformation matrix.
  */
  _computeWorldToView () {
    const { left, right, top, bottom } = this.state

    let result = new Matrix3f([
      2 / (right - left), 0, -((right + left) / (right - left)),
      0, 2 / (top - bottom), -((top + bottom) / (top - bottom)),
      0, 0, 1
    ])

    Object.defineProperty(
      this, 'worldToView', { value: result, configurable: true }
    )

    return result
  }

  /**
  * @return {Matrix3f} The view to world transformation matrix.
  */
  _computeViewToWorld () {
    const result = this.worldToView.invert()

    Object.defineProperty(
      this, 'viewToWorld', { value: result, configurable: true }
    )

    return result
  }

  /**
  * Return the current unit used by this camera.
  *
  * @return {Length} The current unit used by this camera.
  */
  get unit () {
    return this.state.unit
  }

  /**
  * Change the unit of this camera.
  *
  * @param {Length} value - The new unit used by this camera.
  */
  set unit (value) {
    this.state.unit = new Length(value)
    this.touch()
  }

  /**
  * Return the camera's left border location.
  *
  * @return {number} The camera's left border location.
  */
  get left () {
    return this.state.left
  }

  /**
  * Return the camera's right border location.
  *
  * @return {number} The camera's right border location.
  */
  get right () {
    return this.state.right
  }

  /**
  * Return the camera's bottom border location.
  *
  * @return {number} The camera's bottom border location.
  */
  get bottom () {
    return this.state.bottom
  }

  /**
  * Return the camera's top border location.
  *
  * @return {number} The camera's top border location.
  */
  get top () {
    return this.state.top
  }

  /**
  * Change the camera's left border location.
  *
  * @param {number} value - The new camera's left border location.
  */
  set left (value) {
    this.state.left = value
    if (value > this.state.right) this.state.right = value + 1

    this.touch()
    this._updateWorldToView()
  }

  /**
  * Change the camera's right border location.
  *
  * @param {number} value - The new camera's right border.
  */
  set right (value) {
    this.state.right = value
    if (value < this.state.left) this.state.left = value - 1

    this.touch()
    this._updateWorldToView()
  }

  /**
  * Change the camera's bottom border location.
  *
  * @param {number} value - The new camera's bottom border.
  */
  set bottom (value) {
    this.state.bottom = value
    if (value > this.state.top) this.state.top = value + 1

    this.touch()
    this._updateWorldToView()
  }

  /**
  * Change the camera's top border location.
  *
  * @param {number} value - The new camera's top border.
  */
  set top (value) {
    this.state.top = value
    if (value < this.state.bottom) this.state.bottom = value - 1

    this.touch()
    this._updateWorldToView()
  }

  /**
  * Return the camera's width.
  *
  * @return {number} The camera's width.
  */
  get width () {
    return this.state.right - this.state.left
  }

  /**
  * Change the camera's width.
  *
  * @param {number} value - The new camera's width.
  */
  set width (value) {
    const diff = (value - this.width) / 2

    this.state.left += diff
    this.state.right += diff

    this.touch()
    this._updateWorldToView()
  }

  /**
  * Return the camera's height.
  *
  * @return {number} The camera's height.
  */
  get height () {
    return this.state.top - this.state.bottom
  }

  /**
  * Change the camera's height.
  *
  * @param {number} value - The new camera's height.
  */
  set height (value) {
    const diff = (value - this.height) / 2

    this.state.top += diff
    this.state.bottom += diff

    this.touch()
    this._updateWorldToView()
  }

  /**
  * Return the camera's center x component.
  *
  * @return {number} The camera's center x component.
  */
  get centerX () {
    return (this.state.left + this.state.right) / 2
  }

  /**
  * Change the camera's center x component.
  *
  * @param {number} value - The new camera's center x component.
  */
  set centerX (value) {
    const delta = value - this.centerX
    this.state.left += delta
    this.state.right += delta
    this.touch()
    this._updateWorldToView()
  }

  /**
  * Return the camera's center y component.
  *
  * @return {number} The camera's center y component.
  */
  get centerY () {
    return (this.state.bottom + this.state.top) / 2
  }

  /**
  * Change the camera's center y component.
  *
  * @param {number} value - The new camera's center y component.
  */
  set centerY (value) {
    const delta = value - this.centerY

    this.state.top += delta
    this.state.bottom += delta
    this.touch()
    this._updateWorldToView()
  }

  /**
  * Return the camera's center location.
  *
  * @return {Vector2f} The camera's center location.
  */
  get center () {
    return new Vector2f(
      (this.state.left + this.state.right) / 2,
      (this.state.bottom + this.state.top) / 2
    )
  }

  /**
  * Change the camera's center location.
  *
  * @param {Vector2f} value - The new camera's center location.
  */
  set center (value) {
    const deltaX = value.x - this.centerX
    const deltaY = value.y - this.centerY

    this.state.left += deltaX
    this.state.right += deltaX
    this.state.top += deltaY
    this.state.bottom += deltaY

    this.touch()
    this._updateWorldToView()
  }

  /**
  * @see Camera2D#get worldToView
  */
  get worldToView () {
    throw new NotImplementedError(Camera, 'get worldToView')
  }

  /**
  * @see Camera2D#get viewToWorld
  */
  get viewToWorld () {
    throw new NotImplementedError(Camera, 'get viewToWorld')
  }
}
