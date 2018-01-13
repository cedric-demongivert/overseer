import { Component } from '@overseer/engine/ecs'
import { ColorRGBA } from '@glkit'

/**
* An rendering target on the screen.
*/
@Component.Type('overseer:engine:rendering-target')
export class RenderingTarget {
  /**
  * Create a new empty rendering target.
  */
  constructor () {
    this.state = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      camera: null,
      background: new ColorRGBA(0, 0, 0, 0)
    }
  }

  get background () {
    return this.state.background
  }

  set background (background) {
    this.state.background = background
  }

  get camera () {
    if (this.state.camera) {
      return this.manager.getComponent(this.state.camera)
    } else {
      return null
    }
  }

  set camera (camera) {
    this.state.camera = Component.identifier(camera)
  }

  get centerX () {
    return (this.state.startX + this.state.endX) / 2
  }

  set centerX (value) {
    const hwidth = this.width / 2

    this.state.startX = value - hwidth
    this.state.endX = value + hwidth
  }

  get centerY () {
    return (this.state.startY + this.state.endY) / 2
  }

  set centerY (value) {
    const hheight = this.height / 2

    this.state.startY = value - hheight
    this.state.endY = value + hheight
  }

  get width () {
    return this.state.endX - this.state.startX
  }

  set width (value) {
    const centerX = this.centerX
    const hwidth = value

    this.state.startX = centerX - hwidth
    this.state.endX = centerX + hwidth
  }

  get height () {
    return this.state.endY - this.state.startY
  }

  set height (value) {
    const centerY = this.centerY
    const hheight = value

    this.state.startY = centerY - hheight
    this.state.endY = centerY + hheight
  }

  get startX () {
    return this.state.startX
  }

  set startX (value) {
    if (value > this.state.endX) {
      this.state.endX = value
    }

    this.state.startX = value
  }

  get endX () {
    return this.state.endX
  }

  set endX (value) {
    if (value < this.state.startX) {
      this.state.startX = value
    }

    this.state.endX = value
  }

  get startY () {
    return this.state.startY
  }

  set startY (value) {
    if (value > this.state.endY) {
      this.state.endY = value
    }

    this.state.startY = value
  }

  get endY () {
    return this.state.endY
  }

  set endY (value) {
    if (value < this.state.startY) {
      this.state.startY = value
    }

    this.state.endY = value
  }
}
