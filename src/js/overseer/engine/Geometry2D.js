import {
  VertexBuffer, VertexFormat, FaceBuffer, GLType, GLBuffer, GLObject,
  VertexFieldBuffer
} from '@glkit'

export class Geometry2D extends GLObject {
  constructor (context) {
    super(context)
    this._vertices = new VertexBuffer(Geometry2D.format)
    this._positions = new VertexFieldBuffer(this._vertices, 'position')
    this._colors = new VertexFieldBuffer(this._vertices, 'color')
    this._uvs = new VertexFieldBuffer(this._vertices, 'uv')
    this._faces = new FaceBuffer()
    this._glArrayBuffer = new GLBuffer.Array(context)
    this._glElementBuffer = new GLBuffer.ElementArray(context)
  }

  static Quad (context) {
    const geometry = new Geometry2D(context)

    geometry.positions.set(
      0,
      [-0.5, -0.5],
      [-0.5, +0.5],
      [+0.5, +0.5],
      [+0.5, -0.5]
    )

    geometry.colors.set(
      0,
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1]
    )

    geometry.uvs.set(
      0,
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0]
    )

    geometry.faces.push(0, 1, 2, 3, 2, 0)
    geometry.commit(context.$STATIC_DRAW)

    return geometry
  }

  get vertices () {
    return this._vertices
  }

  get positions () {
    return this._positions
  }

  get uvs () {
    return this._uvs
  }

  get colors () {
    return this._colors
  }

  get faces () {
    return this._faces
  }

  /**
  * Render this geometry by using a program.
  *
  * @param {GLProgram} program - Program to use in order to render this geometry.
  *
  * @return {Geometry2D} The current instance for chaining purpose.
  */
  render (program) {
    const gl = this.context

    program.use()

    program.useAttributes(this._glArrayBuffer, Geometry2D.format)
    this._glElementBuffer.bind()

    gl.drawElements(gl.TRIANGLES, this._faces.size * 3, gl.UNSIGNED_SHORT, 0)
  }

  commit (usage) {
    this._glArrayBuffer.bind()
    this._glArrayBuffer.data(this._vertices.buffer, usage)
    this._glElementBuffer.bind()
    this._glElementBuffer.data(this._faces.buffer, usage)
  }

  /**
  * @see GLObject.destroy
  */
  destroy () {
    this._glArrayBuffer.destroy()
    this._glElementBuffer.destroy()
    super.destroy()
  }
}

Geometry2D.format = new VertexFormat(
  ['position', 'color', 'uv'],
  [GLType.FLOAT_VEC2, GLType.FLOAT_VEC4, GLType.FLOAT_VEC2]
)
