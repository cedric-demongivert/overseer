import { Component } from '@overseer/engine/ecs'
import { Vector3f, Vector2f } from '@cedric-demongivert/gl-tool-math'

/**
* An area of the screen to render.
*/
@Component({ type: 'overseer:viewport' })
export class Viewport {
  /**
  * Create a new zero viewport.
  */
  constructor () {
    this._left = 0
    this._right = 0
    this._bottom = 0
    this._top = 0
    this._camera = null
    this._background = new Vector3f()
  }

  /**
  * Return the color used for clearing the viewport.
  *
  * @return {Vector4f} The color used for clearing the viewport.
  */
  get background () {
    return this._background
  }

  /**
  * Change the color used for clearing the viewport.
  *
  * @param {Vector3f} background - The new color to use for clearing the viewport.
  */
  set background (background) {
    this._background.copy(background)
  }

  /**
  * Change the color used for clearing the viewport.
  *
  * @param {number} red - The red channel value of the new color.
  * @param {number} green - The green channel value of the new color.
  * @param {number} blue - The blue channel value of the new color.
  */
  setBackground (red, green, blue) {
    this._background.set(red, green, blue)
  }

  /**
  * Return the current camera component used with this viewport.
  *
  * @return {Camera} The current camera component attached to this viewport.
  */
  get camera () {
    return this._camera
  }

  /**
  * Change the camera attached to this viewport.
  *
  * @param {Camera} camera - The new camera to attach to this viewport.
  */
  set camera (camera) {
    this.setCamera(camera)
  }

  /**
  * Change the camera attached to this viewport.
  *
  * @param {Camera} camera - The new camera to attach to this viewport.
  *
  * @return {Viewport} The current instance for chaining purpose.
  */
  setCamera (camera) {
    this._camera = camera
    return this
  }

  /**
  * Return the x component of the center of this viewport.
  *
  * @return {number} The x component of the center of this viewport.
  */
  get centerX () {
    return (this._left + this._right) / 2
  }

  /**
  * Change the x component of the center of this viewport.
  *
  * @param {number} value - The new x component of the center of this viewport.
  */
  set centerX (value) {
    this.setCenterX(value)
  }

  /**
  * Change the x component of the center of this viewport.
  *
  * @param {number} value - The new x component of the center of this viewport.
  *
  * @return {Viewport} The current instance for chaining purpose.
  */
  setCenterX (value) {
    const hwidth = this.width / 2

    this._left = value - hwidth
    this._right = value + hwidth

    return this
  }

  /**
  * Return the y component of the center of this viewport.
  *
  * @return {number} The y component of the center of this viewport.
  */
  get centerY () {
    return (this._bottom + this._top) / 2
  }

  /**
  * Change the y component of the center of this viewport.
  *
  * @param {number} value - The new y component of the center of this viewport.
  */
  set centerY (value) {
    this.setCenterY(value)
  }

  /**
  * Change the y component of the center of this viewport.
  *
  * @param {number} value - The new y component of the center of this viewport.
  *
  * @return {Viewport} The current instance for chaining purpose.
  */
  setCenterY (value) {
    const hheight = this.height / 2

    this._bottom = value - hheight
    this._top = value + hheight

    return this
  }

  /**
  * Return the current center of the viewport.
  *
  * @return {Vector2f} The current center of the viewport.
  */
  get center () {
    return this.getCenter()
  }

  /**
  * Return the current center of the viewport.
  *
  * @param {Vector2f} [result = new Vector2f()] - The vector to set to the center of this viewport.
  * @return {Vector2f} The current center of the viewport.
  */
  getCenter (result = new Vector2f()) {
    result.set(this.centerX, this.centerY)
    return result
  }

  /**
  * Change the center of this viewport.
  *
  * @param {Vector2f} value - The new center of the viewport.
  */
  set center (value) {
    this.setCenter(value.x, value.y)
  }

  /**
  * Set the new center of this viewport.
  *
  * @param {number} x - The new x componen value of the center of this viewport.
  * @param {number} y - The new x componen value of the center of this viewport.
  *
  * @return {Viewport} The current instance for chaining purpose.
  */
  setCenter (x, y) {
    const hwidth = this.width / 2
    const hheight = this.height / 2

    this._bottom = value.y - hheight
    this._top = value.y + hheight

    this._left = value.x - hwidth
    this._right = value.x + hwidth

    return this
  }

  /**
  * Return the width of the viewport.
  *
  * @return {number} The width of the viewport.
  */
  get width () {
    return this._right - this._left
  }

  /**
  * Change the width of the viewport.
  *
  * @param {number} value - The new width of the viewport.
  */
  set width (value) {
    this.setWidth(value)
  }

  /**
  * Change the width of the viewport.
  *
  * @param {number} value - The new width of the viewport.
  *
  * @return {Viewport} The current instance for chaining purpose.
  */
  setWidth (value) {
    const centerX = this.centerX
    const hwidth = value / 2

    this._left = centerX - hwidth
    this._right = centerX + hwidth

    return this
  }

  /**
  * Return the height of the viewport.
  *
  * @return {number} The height of the viewport.
  */
  get height () {
    return this._top - this._bottom
  }

  /**
  * Change the height of the viewport.
  *
  * @param {number} value - The new height of the viewport.
  */
  set height (value) {
    this.setHeight(value)
  }

  /**
  * Change the height of the viewport.
  *
  * @param {number} value - The new height of the viewport.
  *
  * @return {Viewport} The current instance for chaining purpose.
  */
  setHeight (value) {
    const centerY = this.centerY
    const hheight = value / 2

    this._bottom = centerY - hheight,
    this._top = centerY + hheight

    return this
  }

  /**
  * Return the left location of the viewport.
  *
  * @return {number} The left location of the viewport.
  */
  get left () {
    return this._left
  }

  /**
  * Change the left location of the viewport.
  *
  * @param {number} value - The new left location of the viewport.
  */
  set left (value) {
    this.setLeft(value)
  }

  /**
  * Change the left location of the viewport.
  *
  * @param {number} value - The new left location of the viewport.
  *
  * @return {Viewport} The current instance for chaining purpose.
  */
  setLeft (value) {
    const width = this.width
    this._left = value
    this._right = value + width

    return this
  }

  /**
  * Return the right location of the viewport.
  *
  * @return {number} The right location of the viewport.
  */
  get right () {
    return this._right
  }

  /**
  * Change the right location of the viewport.
  *
  * @param {number} value - The new right location of the viewport.
  */
  set right (value) {
    this.setRight(value)
  }

  /**
  * Change the right location of the viewport.
  *
  * @param {number} value - The new right location of the viewport.
  *
  * @return {Viewport} The current instance for chaining purpose.
  */
  setRight (value) {
    const width = this.width
    this._right = value
    this._left = value - width

    return this
  }

  /**
  * Return the bottom location of the viewport.
  *
  * @return {number} The bottom location of the viewport.
  */
  get bottom () {
    return this._bottom
  }

  /**
  * Change the bottom location of the viewport.
  *
  * @param {number} value - The new bottom location of the viewport.
  */
  set bottom (value) {
    this.setBottom(value)
  }

  /**
  * Change the bottom location of the viewport.
  *
  * @param {number} value - The new bottom location of the viewport.
  *
  * @return {Viewport} The current instance for chaining purpose.
  */
  setBottom (value) {
    const height = this.height

    this._bottom = value
    this._top = value + height

    return this
  }

  /**
  * Return the top location of the viewport.
  *
  * @return {number} The top location of the viewport.
  */
  get top () {
    return this._top
  }

  /**
  * Change the top location of the viewport.
  *
  * @param {number} value - The new top location of the viewport.
  */
  set top (value) {
    this.setTop(value)
  }

  /**
  * Change the top location of the viewport.
  *
  * @param {number} value - The new top location of the viewport.
  *
  * @return {Viewport} The current instance for chaining purpose.
  */
  setTop (value) {
    const height = this.height
    this._top = value
    this._bottom = value - height

    return this
  }
}
