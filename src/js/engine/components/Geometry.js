import { Component } from '@overseer/engine/ecs'

/**
* Define a geometry.
*/
@Component({ type: 'overseer:geometry' })
export class Geometry {
  initialize () {
    this._vertices = null
    this._faces = null
  }

  get vertexBuffer () {
    return this._vertices
  }

  get faceBuffer () {
    return this._faces
  }

  set vertexBuffer (buffer) {
    this._vertices = buffer
  }

  set faceBuffer (buffer) {
    this._faces = buffer
  }
}
