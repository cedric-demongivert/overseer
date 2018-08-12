/* eslint-env jest */

import { Matrix3D } from '@glkit/math/matrix'
import * as NumberType from '@glkit/math/NumberType'

function * range (size) { for (let i = 0; i < size; ++i) yield i }

describe('glkit.math.matrix.Matrix3D', function () {
  describe('#static create', function () {
    it('create a new empty 3D matrix of a given type', function () {
      const matrix = Matrix3D.create(NumberType.FLOAT)

      expect(matrix.type).toBe(NumberType.FLOAT)
      expect(matrix.content).toEqual(new Float32Array([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]))
      expect(matrix.columns).toBe(3)
      expect(matrix.rows).toBe(3)
      expect(matrix).toBeInstanceOf(Matrix3D)
    })
  })

  describe('#static of', function () {
    it('create a new 3D matrix of a given type with an initial content', function () {
      const matrix = Matrix3D.of(
        NumberType.FLOAT,
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      )

      expect(matrix.type).toBe(NumberType.FLOAT)
      expect(matrix.content).toEqual(new Float32Array([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ]))
      expect(matrix.columns).toBe(3)
      expect(matrix.rows).toBe(3)
      expect(matrix).toBeInstanceOf(Matrix3D)
    })
  })

  describe('#static wrap', function () {
    it('create a new 3D matrix of a given type with an initial content', function () {
      const matrix = Matrix3D.wrap(
        new Float32Array([
          1, 2, 3,
          4, 5, 6,
          7, 8, 9
        ])
      )

      expect(matrix.type).toBe(NumberType.FLOAT)
      expect(matrix.content).toEqual(new Float32Array([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ]))
      expect(matrix.columns).toBe(3)
      expect(matrix.rows).toBe(3)
      expect(matrix).toBeInstanceOf(Matrix3D)
    })
  })

  describe('#static clone', function () {
    it('create a clone of another 3D matrix', function () {
      const matrix = Matrix3D.of(
        NumberType.FLOAT,
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      )

      const clone = Matrix3D.clone(matrix)

      expect(clone.type).toBe(NumberType.FLOAT)
      expect(clone.content).toEqual(new Float32Array([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ]))
      expect(clone.columns).toBe(3)
      expect(clone.rows).toBe(3)
      expect(clone.content).not.toBe(matrix.content)
      expect(clone).toBeInstanceOf(Matrix3D)
    })
  })

  describe('#constructor', function () {
    it('construct a new 3D matrix of a given type', function () {
      const matrix = new Matrix3D(NumberType.FLOAT)

      expect(matrix.type).toBe(NumberType.FLOAT)
      expect(matrix.columns).toBe(3)
      expect(matrix.rows).toBe(3)
      expect(matrix.content).toEqual(new Float32Array([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]))
    })

    it('construct a new matrix of a given type, with an initial content', function () {
      const matrix = new Matrix3D(NumberType.FLOAT, ...range(3 * 3))

      expect(matrix.type).toBe(NumberType.FLOAT)
      expect(matrix.columns).toBe(3)
      expect(matrix.rows).toBe(3)
      expect(matrix.content).toEqual(new Float32Array([
        ...range(3 * 3)
      ]))
    })

    it('construct a new matrix that wrap a typed array', function () {
      const content = new Float32Array([ ...range(3 * 3) ])

      const matrix = new Matrix3D(content)

      expect(matrix.type).toBe(NumberType.FLOAT)
      expect(matrix.columns).toBe(3)
      expect(matrix.rows).toBe(3)
      expect(matrix.content).toBe(content)
    })

    it('construct a clone of a matrix', function () {
      const matrix = new Matrix3D(
        NumberType.FLOAT, ...range(3 * 3)
      )

      const clone = new Matrix3D(matrix)

      expect(clone.type).toBe(NumberType.FLOAT)
      expect(clone.columns).toBe(3)
      expect(clone.rows).toBe(3)
      expect(clone.content).not.toBe(matrix.content)
      expect(clone.content).toEqual(matrix.content)
    })
  })
})
