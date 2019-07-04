export class Geometry {
  /**
  * Create a new empty geometry.
  */
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
  }

  setFaceBuffer (buffer) {
    this._faces = buffer
  }

  copy (other) {
    this._vertices = other.vertices
    this._faces = other.faces
  }

  reset () {
    this._vertices = null
    this._faces = null
  }

  commit () {
    if (this._vertices) this._vertices.commit()
    if (this._faces) this._faces.commit()

    return this
  }
}
