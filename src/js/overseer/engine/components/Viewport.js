import { Component, UUIDv4Component } from '@overseer/engine/ecs'
import { ColorRGBA } from '@glkit'

/**
* An rendering target on the screen.
*/
@Component.Type('overseer:engine:viewport')
export class Viewport extends UUIDv4Component {
  /**
  * @see Component#initialize
  */
  initialize () {
    return {
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
    this.update({ background })
  }

  get camera () {
    if (this.state.camera) {
      return this.manager.getComponent(this.state.camera)
    } else {
      return null
    }
  }

  set camera (camera) {
    this.update({ camera: Component.identifier(camera) })
  }

  get centerX () {
    return (this.state.startX + this.state.endX) / 2
  }

  set centerX (value) {
    const hwidth = this.width / 2

    this.update({
      startX: value - hwidth,
      endX: value + hwidth
    })
  }

  get centerY () {
    return (this.state.startY + this.state.endY) / 2
  }

  set centerY (value) {
    const hheight = this.height / 2

    this.update({
      startY: value - hheight,
      endY: value + hheight
    })
  }

  get width () {
    return this.state.endX - this.state.startX
  }

  set width (value) {
    const centerX = this.centerX
    const hwidth = value

    this.update({
      startX: centerX - hwidth,
      endX: centerX + hwidth
    })
  }

  get height () {
    return this.state.endY - this.state.startY
  }

  set height (value) {
    const centerY = this.centerY
    const hheight = value


    this.update({
      startY: centerY - hheight,
      endY: centerY + hheight
    })
  }

  get startX () {
    return this.state.startX
  }

  set startX (value) {
    const changes = {}
    if (value > this.state.endX) {
      changes.endX = value
    }

    changes.startX = value
    this.update(changes)
  }

  get endX () {
    return this.state.endX
  }

  set endX (value) {
    const changes = {}
    if (value < this.state.startX) {
      changes.startX = value
    }

    changes.endX = value
    this.update(changes)
  }

  get startY () {
    return this.state.startY
  }

  set startY (value) {
    const changes = {}
    if (value > this.state.endY) {
      changes.endY = value
    }

    changes.startY = value
    this.update(changes)
  }

  get endY () {
    return this.state.endY
  }

  set endY (value) {
    const changes = {}
    if (value < this.state.startY) {
      changes.startY = value
    }

    changes.endY = value
    this.update(changes)
  }
}
