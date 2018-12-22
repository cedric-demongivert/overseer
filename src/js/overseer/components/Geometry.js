import { Component } from '@overseer/ecs'

/**
* Define a geometry.
*/
@Component({ name: 'overseer:geometry' })
export class Geometry {
  constructor () {
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

  setVertexBuffer (buffer) {
    this._vertices = buffer
    return this
  }

  setFaceBuffer (buffer) {
    this._faces = buffer
    return this
  }

  commit () {
    if (this._vertices) this._vertices.commit()
    if (this._faces) this._faces.commit()

    return this
  }
}
