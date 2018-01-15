import { Component, UUIDv4Component } from '@overseer/engine/ecs'
import { GLEnum } from '@glkit/gl/GLEnum'

@Component.Type('overseer:engine:texture-2d')
export class Texture2D extends UUIDv4Component {
  /**
  * @see Component#initialize
  */
  initialize () {
    return {
      width: 0,
      height: 0,
      magnificationFilter: GLEnum.LINEAR,
      mignificationFilter: GLEnum.NEAREST_MIPMAP_LINEAR,
      wrapS: GLEnum.REPEAT,
      wrapT: GLEnum.REPEAT,
      format: GLEnum.RGBA,
      type: GLEnum.UNSIGNED_BYTE,
      content: null
    }
  }

  get width () {
    return this.state.width
  }

  set width (value) {
    this.state.width = value
    this.markUpdate()
  }

  get height () {
    return this.state.height
  }

  set height (value) {
    this.state.height = value
    this.markUpdate()
  }

  get magnificationFilter () {
    return this.state.magnificationFilter
  }

  set magnificationFilter (value) {
    this.state.magnificationFilter = value
    this.markUpdate()
  }

  get mignificationFilter () {
    return this.state.mignificationFilter
  }

  set mignificationFilter (value) {
    this.state.mignificationFilter = value
    this.markUpdate()
  }

  get wrapS () {
    return this.state.wrapS
  }

  set wrapS (value) {
    this.state.wrapS = value
    this.markUpdate()
  }

  get wrapT () {
    return this.state.wrapT
  }

  set wrapT (value) {
    this.state.wrapT = value
    this.markUpdate()
  }

  get wrapX () {
    return this.state.wrapS
  }

  set wrapX (value) {
    this.state.wrapS = value
    this.markUpdate()
  }

  get wrapY () {
    return this.state.wrapT
  }

  set wrapY (value) {
    this.state.wrapT = value
    this.markUpdate()
  }

  get content () {
    return this.state.content
  }

  set content (value) {
    this.state.content = value
    this.markUpdate()
  }

  get format () {
    return this.state.format
  }

  set format (value) {
    this.state.format = value
    this.markUpdate()
  }

  get type () {
    return this.state.type
  }

  set type (value) {
    this.state.type = value
    this.markUpdate()
  }
}

// Magnification & Mignification filter
Texture2D.LINEAR = GLEnum.LINEAR
Texture2D.NEAREST = GLEnum.NEAREST
Texture2D.NEAREST_MIPMAP_NEAREST = GLEnum.NEAREST_MIPMAP_NEAREST
Texture2D.LINEAR_MIPMAP_NEAREST = GLEnum.LINEAR_MIPMAP_NEAREST
Texture2D.NEAREST_MIPMAP_LINEAR = GLEnum.NEAREST_MIPMAP_LINEAR
Texture2D.LINEAR_MIPMAP_LINEAR = GLEnum.LINEAR_MIPMAP_LINEAR

// Wrapping
Texture2D.REPEAT = GLEnum.REPEAT
Texture2D.CLAMP_TO_EDGE = GLEnum.CLAMP_TO_EDGE
Texture2D.MIRRORED_REPEAT = GLEnum.MIRRORED_REPEAT

// Internal format
Texture2D.ALPHA = GLEnum.ALPHA
Texture2D.RGB = GLEnum.RGB
Texture2D.RGBA = GLEnum.RGBA
Texture2D.LUMINANCE = GLEnum.LUMINANCE
Texture2D.LUMINANCE_ALPHA = GLEnum.LUMINANCE_ALPHA

// Type
Texture2D.UNSIGNED_BYTE = GLEnum.UNSIGNED_BYTE
Texture2D.UNSIGNED_SHORT_5_6_5 = GLEnum.UNSIGNED_SHORT_5_6_5
Texture2D.UNSIGNED_SHORT_4_4_4_4 = GLEnum.UNSIGNED_SHORT_4_4_4_4
Texture2D.UNSIGNED_SHORT_5_5_5_1 = GLEnum.UNSIGNED_SHORT_5_5_5_1
