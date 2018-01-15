import { Component, UUIDv4Component } from '@overseer/engine/ecs'
import { ColorRGBA, Vector2f } from '@glkit'

/**
* An area of the screen to render.
*/
@Component.Type('overseer:engine:viewport')
export class Viewport extends UUIDv4Component {
  /**
  * @see Component#initialize
  */
  initialize () {
    return {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      camera: null,
      background: new ColorRGBA(0, 0, 0, 0)
    }
  }

  /**
  * Return the color used for clearing the viewport.
  *
  * @return {Color} The color used for clearing the viewport.
  */
  get background () {
    return this.state.background
  }

  /**
  * Change the color used for clearing the viewport.
  *
  * @param {Color} background - The new color to use for clearing the viewport.
  */
  set background (background) {
    this.state.background = background
    this.markUpdate()
  }

  /**
  * Return the current camera component used with this viewport.
  *
  * @return {Component} The current camera component attached to this viewport.
  */
  get camera () {
    if (this.state.camera) {
      return this.manager.getComponent(this.state.camera)
    } else {
      return null
    }
  }

  /**
  * Change the camera attached to this viewport.
  *
  * @param {Component|Identifier} camera - The new camera to attach to this viewport.
  */
  set camera (camera) {
    this.state.camera = Component.identifier(camera)
    this.markUpdate()
  }

  /**
  * Return the x component of the center of this viewport.
  *
  * @return {number} The x component of the center of this viewport.
  */
  get centerX () {
    return (this.state.left + this.state.right) / 2
  }

  /**
  * Change the x component of the center of this viewport.
  *
  * @param {number} value - The new x component of the center of this viewport.
  */
  set centerX (value) {
    const hwidth = this.width / 2

    this.state.left = value - hwidth
    this.state.right = value + hwidth

    this.markUpdate()
  }

  /**
  * Return the y component of the center of this viewport.
  *
  * @return {number} The y component of the center of this viewport.
  */
  get centerY () {
    return (this.state.bottom + this.state.top) / 2
  }

  /**
  * Change the y component of the center of this viewport.
  *
  * @param {number} value - The new y component of the center of this viewport.
  */
  set centerY (value) {
    const hheight = this.height / 2

    this.state.bottom = value - hheight
    this.state.top = value + hheight

    this.markUpdate()
  }

  /**
  * Return the current center of the viewport.
  *
  * @return {Vector2f} The current center of the viewport.
  */
  get center () {
    return new Vector2f(this.centerX, this.centerY)
  }

  /**
  * Change the center of this viewport.
  *
  * @param {Iteratable<number>} value - The new center of the viewport.
  */
  set center (value) {
    const [x, y] = value
    const hwidth = this.width / 2
    const hheight = this.height / 2

    this.state.bottom = y - hheight
    this.state.top = y + hheight

    this.state.left = x - hwidth
    this.state.right = x + hwidth

    this.markUpdate()
  }

  /**
  * Return the width of the viewport.
  *
  * @return {number} The width of the viewport.
  */
  get width () {
    return this.state.right - this.state.left
  }

  /**
  * Change the width of the viewport.
  *
  * @param {number} value - The new width of the viewport.
  */
  set width (value) {
    const centerX = this.centerX
    const hwidth = value

    this.state.left = centerX - hwidth
    this.state.right = centerX + hwidth

    this.markUpdate()
  }

  /**
  * Return the height of the viewport.
  *
  * @return {number} The height of the viewport.
  */
  get height () {
    return this.state.top - this.state.bottom
  }

  /**
  * Change the height of the viewport.
  *
  * @param {number} value - The new height of the viewport.
  */
  set height (value) {
    const centerY = this.centerY
    const hheight = value

    this.state.bottom = centerY - hheight,
    this.state.top = centerY + hheight

    this.markUpdate()
  }

  /**
  * Return the left location of the viewport.
  *
  * @return {number} The left location of the viewport.
  */
  get left () {
    return this.state.left
  }

  /**
  * Change the left location of the viewport.
  *
  * @param {number} value - The new left location of the viewport.
  */
  set left (value) {
    if (value > this.state.right) {
      this.state.right = value
    }

    this.state.left = value
    this.markUpdate()
  }

  /**
  * Return the right location of the viewport.
  *
  * @return {number} The right location of the viewport.
  */
  get right () {
    return this.state.right
  }

  /**
  * Change the right location of the viewport.
  *
  * @param {number} value - The new right location of the viewport.
  */
  set right (value) {
    if (value < this.state.left) {
      this.state.left = value
    }

    this.state.right = value
    this.markUpdate()
  }

  /**
  * Return the bottom location of the viewport.
  *
  * @return {number} The bottom location of the viewport.
  */
  get bottom () {
    return this.state.bottom
  }

  /**
  * Change the bottom location of the viewport.
  *
  * @param {number} value - The new bottom location of the viewport.
  */
  set bottom (value) {
    if (value > this.state.top) {
      this.state.top = value
    }

    this.state.bottom = value
    this.markUpdate()
  }

  /**
  * Return the top location of the viewport.
  *
  * @return {number} The top location of the viewport.
  */
  get top () {
    return this.state.top
  }

  /**
  * Change the top location of the viewport.
  *
  * @param {number} value - The new top location of the viewport.
  */
  set top (value) {
    if (value < this.state.bottom) {
      this.state.bottom = value
    }

    this.state.top = value
    this.markUpdate()
  }
}
