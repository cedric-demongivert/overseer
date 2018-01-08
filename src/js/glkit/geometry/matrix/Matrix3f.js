import { Matrix } from './Matrix'
import { Vector3f, Vector2f } from '../'
import { GLType } from '../../gl'

const _it_ = Symbol.iterator

function fillup (str, length) {
  if (str.length >= length) {
    return str
  } else {
    let result = str
    for (let i = str.length; i < length; ++i) {
      result = ' ' + result
    }
    return result
  }
}

export class Matrix3f extends Matrix {
  /**
  * @param {...any} params - A sequence of scalars or a vector that describe the scaling operation.
  *
  * @return {Matrix3f} A 2D scale matrix.
  */
  static scale2D (...params) {
    const v2f = Vector2f.from(...params)
    return Matrix3f.create([
      v2f.x, 0, 0,
      0, v2f.y, 0,
      0, 0, 1
    ])
  }

  /**
  * @param {...any} params - A sequence of scalars or a vector that describe the scaling operation.
  *
  * @return {Matrix3f} A 3D scale matrix.
  */
  static scale3D (...params) {
    const v3f = Vector3f.from(...params)
    return Matrix3f.create([
      v3f.x, 0, 0,
      0, v3f.y, 0,
      0, 0, v3f.z
    ])
  }

  /**
  * @param {number} theta - The rotation in radians.
  *
  * @return {Matrix3f} A 2D rotation matrix.
  */
  static rotate2D (theta) {
    const cos = Math.cos(theta)
    const sin = Math.sin(theta)
    return Matrix3f.create([
      cos, -sin, 0,
      sin, cos, 0,
      0, 0, 1
    ])
  }

  /**
  * @param {...any} params - A sequence of scalars or a vector that describe the rotation operation.
  *
  * @return {Matrix3f} A 3D rotation matrix.
  */
  static rotate3D (...params) {
    const v3f = Vector3f.from(...params)
    const cosX = Math.cos(v3f.x)
    const cosY = Math.cos(v3f.y)
    const cosZ = Math.cos(v3f.z)
    const sinX = Math.sin(v3f.x)
    const sinY = Math.sin(v3f.y)
    const sinZ = Math.sin(v3f.z)

    return Matrix3f.fromValues(
      1, 0, 0,
      0, cosX, -sinX,
      0, sinX, cosX
    ).mul(Matrix3f.fromValues(
      cosY, 0, sinY,
      0, 1, 0,
      -sinY, 0, cosY
    )).mul(Matrix3f.fromValues(
      cosZ, -sinZ, 0,
      sinZ, cosZ, 0,
      0, 0, 1
    ))
  }

  /**
  * @param {...any} params - A sequence of scalars or a vector that describe the translation operation.
  *
  * @return {Matrix3f} A 2D translation matrix.
  */
  static translate2D (...params) {
    const v2f = Vector2f.from(...params)
    return Matrix3f.create([
      1, 0, v2f.x,
      0, 1, v2f.y,
      0, 0, 1
    ])
  }

  /**
  * Construct a new matrix 3f of the form :
  *
  * #-----------------#
  * # a11   a21   a31 #
  * # a12   a22   a32 #
  * # a13   a23   a33 #
  * #-----------------#
  *
  * @param {Array<number>|Matrix} [data]
  */
  constructor (data) {
    super()

    this[GLType.type] = GLType.FLOAT_MAT3
    this[GLType.size] = 1

    if (data instanceof Matrix) {
      if (data instanceof Matrix3f) {
        this._data = data._data.concat([])
      } else {
        const result = []

        for (let row = 0; row < 3; ++row) {
          for (let col = 0; col < 3; ++col) {
            if (row >= data.height || col >= data.width) {
              result.push(0)
            } else {
              result.push(data.get(row, col))
            }
          }
        }

        this._data = result
      }
    } else {
      this._data = data ? data.concat([]) : [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  /**
  * Construct a new matrix 3f of the form :
  *
  * #-----------------#
  * # a11   a21   a31 #
  * # a12   a22   a32 #
  * # a13   a23   a33 #
  * #-----------------#
  *
  * @param {Array<number>} [data]
  *
  * @return {Matrix3f}
  */
  static create (data) {
    return new Matrix3f(data)
  }

  /**
  * Create a Matrix3f from another matrix.
  *
  * @param {Matrix} other - The matrix to cast.
  * @return {Matrix3f} The result.
  */
  static fromMatrix (other) {
    if (other instanceof Matrix3f) {
      return other
    } else {
      return new Matrix3f(other)
    }
  }

  /**
  * Construct a new matrix 3f of the form :
  *
  * #-----------------#
  * # a11   a21   a31 #
  * # a12   a22   a32 #
  * # a13   a23   a33 #
  * #-----------------#
  *
  * @param {number} [a11 = 0]
  * @param {number} [a21 = 0]
  * @param {number} [a31 = 0]
  * @param {number} [a12 = 0]
  * @param {number} [a22 = 0]
  * @param {number} [a32 = 0]
  * @param {number} [a13 = 0]
  * @param {number} [a23 = 0]
  * @param {number} [a33 = 0]
  */
  static fromValues (
    a11 = 0, a21 = 0, a31 = 0,
    a12 = 0, a22 = 0, a32 = 0,
    a13 = 0, a23 = 0, a33 = 0
  ) {
    return new Matrix3f([
      a11, a21, a31,
      a12, a22, a32,
      a13, a23, a33
    ])
  }

  /**
  * @return {Array<number>}
  */
  get data () {
    return this._data.concat([])
  }

  /**
  * @return {number}
  */
  get a11 () {
    return this.get(0, 0)
  }

  /**
  * @return {number}
  */
  get a12 () {
    return this.get(0, 1)
  }

  /**
  * @return {number}
  */
  get a13 () {
    return this.get(0, 2)
  }

  /**
  * @return {number}
  */
  get a21 () {
    return this.get(1, 0)
  }

  /**
  * @return {number}
  */
  get a22 () {
    return this.get(1, 1)
  }

  /**
  * @return {number}
  */
  get a23 () {
    return this.get(1, 2)
  }

  /**
  * @return {number}
  */
  get a31 () {
    return this.get(2, 0)
  }

  /**
  * @return {number}
  */
  get a32 () {
    return this.get(2, 1)
  }

  /**
  * @return {number}
  */
  get a33 () {
    return this.get(2, 2)
  }

  /**
  * @override
  */
  get width () {
    return 3
  }

  /**
  * @override
  */
  get height () {
    return 3
  }

  /**
  * @override
  */
  get (column, row) {
    return this._data[column + row * 3]
  }

  /**
  * @override
  */
  set (column, row, value) {
    const next = this._data.concat([])
    next[column + row * 3] = value

    return new Matrix3f(next)
  }

  /**
  * @override
  */
  add (other) {
    const toAdd = Matrix3f.fromMatrix(other)

    const [
      b11, b21, b31,
      b12, b22, b32,
      b13, b23, b33
    ] = toAdd

    const [
      a11, a21, a31,
      a12, a22, a32,
      a13, a23, a33
    ] = this

    return new Matrix3f([
      a11 + b11, a21 + b21, a31 + b31,
      a12 + b12, a22 + b22, a32 + b32,
      a13 + b13, a23 + b23, a33 + b33
    ])
  }

  /**
  * @override
  */
  sub (other) {
    const toAdd = Matrix3f.fromMatrix(other)

    const [
      b11, b21, b31,
      b12, b22, b32,
      b13, b23, b33
    ] = toAdd

    const [
      a11, a21, a31,
      a12, a22, a32,
      a13, a23, a33
    ] = this

    return new Matrix3f([
      a11 - b11, a21 - b21, a31 - b31,
      a12 - b12, a22 - b22, a32 - b32,
      a13 - b13, a23 - b23, a33 - b33
    ])
  }

  /**
  * @override
  */
  div (scalar) {
    const [
      a11, a21, a31,
      a12, a22, a32,
      a13, a23, a33
    ] = this

    return new Matrix3f([
      a11 / scalar, a21 / scalar, a31 / scalar,
      a12 / scalar, a22 / scalar, a32 / scalar,
      a13 / scalar, a23 / scalar, a33 / scalar
    ])
  }

  /**
  * @override
  */
  mul (other) {
    const [
      a11, a21, a31,
      a12, a22, a32,
      a13, a23, a33
    ] = this

    if (other instanceof Matrix3f) {
      const [
        b11, b21, b31,
        b12, b22, b32,
        b13, b23, b33
      ] = other

      return new Matrix3f([
        a11 * b11 + a21 * b12 + a31 * b13,
        a11 * b21 + a21 * b22 + a31 * b23,
        a11 * b31 + a21 * b32 + a31 * b33,
        a12 * b11 + a22 * b12 + a32 * b13,
        a12 * b21 + a22 * b22 + a32 * b23,
        a12 * b31 + a22 * b32 + a32 * b33,
        a13 * b11 + a23 * b12 + a33 * b13,
        a13 * b21 + a23 * b22 + a33 * b23,
        a13 * b31 + a23 * b32 + a33 * b33
      ])
    } else if (typeof other === 'number') {
      return new Matrix3f([
        a11 * other, a21 * other, a31 * other,
        a12 * other, a22 * other, a32 * other,
        a13 * other, a23 * other, a33 * other
      ])
    } else if (other instanceof Vector3f) {
      const [b11, b12, b13] = other

      return Vector3f.create(
        a11 * b11 + a21 * b12 + a31 * b13,
        a12 * b11 + a22 * b12 + a32 * b13,
        a13 * b11 + a23 * b12 + a33 * b13
      )
    } else {
      throw new TypeError([
        `Invalid multiplication element : ${other}. Waiting for a Matrix3f, `,
        'a scalar or a Vector3f.'
      ].join(''))
    }
  }

  /**
  * @override
  */
  row (row, ...values) {
    if (values.length === 0) {
      return Vector3f.create(...this.itrow(row))
    } else {
      const iterator = values.length > 1 ? values[_it_]() : values[0][_it_]()
      const next = this._data.concat([])

      next[row * 3] = iterator.next().value || 0
      next[row * 3 + 1] = iterator.next().value || 0
      next[row * 3 + 2] = iterator.next().value || 0

      return new Matrix3f(next)
    }
  }

  /**
  * @override
  */
  column (column, ...values) {
    if (values.length === 0) {
      return Vector3f.create(...this.itcolumn(column))
    } else {
      const iterator = values.length > 1 ? values[_it_]() : values[0][_it_]()
      const next = this._data.concat([])

      next[column] = iterator.next().value || 0
      next[3 + column] = iterator.next().value || 0
      next[6 + column] = iterator.next().value || 0

      return new Matrix3f(next)
    }
  }

  /**
  * @override
  */
  get determinant () {
    const [
      a, b, c,
      d, e, f,
      g, h, i
    ] = this

    return (a * e * i) +
           (b * f * g) +
           (c * d * h) -
           (c * e * g) -
           (b * d * i) -
           (a * f * h)
  }

  /**
  * @override
  */
  transpose () {
    const [
      a11, a21, a31,
      a12, a22, a32,
      a13, a23, a33
    ] = this

    return new Matrix3f([
      a11, a12, a13,
      a21, a22, a23,
      a31, a32, a33
    ])
  }

  /**
  * @override
  */
  invert () {
    const [
      a, b, c,
      d, e, f,
      g, h, i
    ] = this

    const result = new Matrix3f([
      e * i - f * h,
      f * g - d * i,
      d * h - e * g,
      c * h - b * i,
      a * i - c * g,
      b * g - a * h,
      b * f - c * e,
      c * d - a * f,
      a * e - b * d
    ])

    return result.transpose().div(this.determinant)
  }

  /**
  * @override
  */
  * [Symbol.iterator] () {
    yield * this._data
  }

  /**
  * Extract a 2D translation from this matrix.
  *
  * @return {Vector2f} A 2D translation.
  */
  extract2DTranslation () {
    return new Vector2f(this._data[2], this._data[5])
  }

  /**
  * Extract a 2D scale from this matrix.
  *
  * @return {Vector2f} A 2D scale.
  */
  extract2DScale () {
    const [
      ax, ay, ,
      bx, by, ,
      , ,
    ] = this

    return new Vector2f(
      Math.sqrt(ax * ax + ay * ay) * ((ax < 0) ? -1 : 1),
      Math.sqrt(bx * bx + by * by) * ((by < 0) ? -1 : 1),
    )
  }

  /**
  * Extract a 3D scale from this matrix.
  *
  * @return {Vector3f} A 3D scale.
  */
  extract3DScale () {
    const [
      ax, ay, az,
      bx, by, bz,
      cx, cy, cz
    ] = this

    return new Vector3f(
      Math.sqrt(ax * ax + ay * ay + az * az) * ((ax < 0) ? -1 : 1),
      Math.sqrt(bx * bx + by * by + bz * bz) * ((by < 0) ? -1 : 1),
      Math.sqrt(cx * cx + cy * cy + cz * cz) * ((cz < 0) ? -1 : 1),
    )
  }

  /**
  * Extract a rotation from this matrix.
  *
  * @return {number} The 2d rotation applied to this object.
  */
  extract2DRotation () {
    const [
      a, b, ,
      , , ,
      , ,
    ] = this

    return Math.atan(-b / a)
  }

  /**
  * @override
  */
  toString () {
    const tokens = [...this.rows()].map(x => [...x].map(x => x.toFixed(3)))
    const max = tokens.map(
      x => x.reduce((a, b) => Math.max(b.length, a), 0)
    ).reduce((a, b) => Math.max(b, a), 0)

    return `Matrix3f [${this.width} x ${this.height}] {\n  ${
      tokens.map(x => x.map(x => fillup(x, max)).join(', ')).join('\n  ')
    }\n}`
  }

  /**
  * Return the GLValue associated to this object.
  *
  * @return {GLValue} The GLValue associated to this object.
  */
  get [GLType.value] () {
    return Float32Array.from(this)
  }
}

Matrix3f.identity = new Matrix3f([
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
])
