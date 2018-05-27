/* eslint-env jest */

import { NotImplementedError } from '@errors/NotImplementedError'
import { Matrix } from '@glkit/math/matrix/Matrix'
import { FLOAT, INT } from '@glkit/math/NumberType'

function * range (size) { for (let i = 0; i < size; ++i) yield i }

describe('glkit.math.matrix.Matrix', function () {
  describe('static #of', function () {
    it('construct a new matrix of floats with a given content', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        1, 2, 3, 2,
        4, 5, 6, 2,
        7, 8, 9, 2
      )

      expect(matrix.type).toBe(FLOAT)
      expect(matrix.columns).toBe(4)
      expect(matrix.rows).toBe(3)
      expect(matrix.content).toEqual(new Float32Array([
        1, 2, 3, 2,
        4, 5, 6, 2,
        7, 8, 9, 2
      ]))
    })
  })

  describe('#constructor', function () {
    it('construct a new matrix of a given type, with a given number of columns and a given number of rows', function () {
      const matrix = new Matrix(FLOAT, 8, 12)

      expect(matrix.type).toBe(FLOAT)
      expect(matrix.columns).toBe(8)
      expect(matrix.rows).toBe(12)
    })

    it('construct a new matrix of a given type, with an initial content', function () {
      const matrix = new Matrix(
        FLOAT, 8, 12,
        ...range(8 * 12)
      )

      expect(matrix.type).toBe(FLOAT)
      expect(matrix.columns).toBe(8)
      expect(matrix.rows).toBe(12)
      expect(matrix.content).toEqual(new Float32Array([
        ...range(8 * 12)
      ]))
    })

    it('construct a new matrix that wrap a typed array', function () {
      const content = new Float32Array([
        ...range(8 * 12)
      ])

      const matrix = new Matrix(
        content, 8, 12,
      )

      expect(matrix.type).toBe(FLOAT)
      expect(matrix.columns).toBe(8)
      expect(matrix.rows).toBe(12)
      expect(matrix.content).toBe(content)
    })

    it('construct a clone of a matrix', function () {
      const matrix = new Matrix(
        FLOAT, 8, 12,
        ...range(8 * 12)
      )

      const clone = new Matrix(matrix)

      expect(clone.type).toBe(FLOAT)
      expect(clone.columns).toBe(8)
      expect(clone.rows).toBe(12)
      expect(clone.content).not.toBe(matrix.content)
      expect(clone.content).toEqual(matrix.content)
    })
  })

  describe('#Symbol.iterator', function () {
    it('allows you to iterate over a matrix content as a line-by-line linearized array', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      expect([...matrix]).toEqual([
         0,  1,  2,  3,
         4,  5,  6,  7,
         8,  9, 10, 11
      ])

      const cells = matrix.cells
    })
  })

  describe('#get rows', function () {
    it('return the number of rows of this matrix', function () {
      expect(Matrix.create(FLOAT, 4, 3).rows).toBe(3)
      expect(Matrix.create(FLOAT, 4, 7).rows).toBe(7)
    })
  })

  describe('#get columns', function () {
    it('return the number of columns of this matrix', function () {
      expect(Matrix.create(FLOAT, 4, 3).columns).toBe(4)
      expect(Matrix.create(FLOAT, 7, 3).columns).toBe(7)
    })
  })

  describe('#get cells', function () {
    it('return the number of cells of this matrix', function () {
      expect(Matrix.create(FLOAT, 4, 3).cells).toBe(4 * 3)
      expect(Matrix.create(FLOAT, 2, 7).cells).toBe(7 * 2)
    })
  })

  describe('#get buffer', function () {
    it('return the underlying buffer of this matrix', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      const buffer = matrix.buffer

      expect(buffer).toBeInstanceOf(ArrayBuffer)
      expect([...new Float32Array(buffer)]).toEqual([
        0,  1,  2,  3,
        4,  5,  6,  7,
        8,  9, 10, 11
      ])
    })
  })

  describe('#set content', function () {
    it('update the entire content of this matrix in accordance with an array', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      const newMatrixContent = [
         8, 10, 12, 32,
        49, 89, 42, 31,
         1,  5, 18, 96
      ]

      const oldContent = matrix.content
      matrix.content = newMatrixContent

      expect(matrix.content).toEqual(new Float32Array(newMatrixContent))
      expect(matrix.content).toBe(oldContent)
    })

    it('update the entire content of this matrix in accordance with a typed array', function () {
      const matrix = Matrix.of(
        INT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      const newMatrixContent = new Float32Array([
         8, 10, 12, 32,
        49, 89, 42, 31,
         1,  5, 18, 96
      ])

      const oldContent = matrix.content
      matrix.content = newMatrixContent

      expect(matrix.content).toEqual(new Int32Array(newMatrixContent))
      expect(matrix.content).toBe(oldContent)
    })

    it('update the entire content of this matrix in accordance with an iterable', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      const newMatrixContent = [
         8, 10, 12, 32,
        49, 89, 42, 31,
         1,  5, 18, 96
      ]

      const iterable = {
        * [Symbol.iterator] () { yield * newMatrixContent }
      }

      const oldContent = matrix.content
      matrix.content = iterable

      expect(matrix.content).toEqual(new Float32Array(newMatrixContent))
      expect(matrix.content).toBe(oldContent)
    })
  })

  describe('#get type', function () {
    it('return the type of a matrix', function () {
      expect(Matrix.create(FLOAT, 4, 3).type).toBe(FLOAT)
      expect(Matrix.create(INT, 4, 3).type).toBe(INT)
    })
  })

  describe('#get content', function () {
    it('return the entire content of this matrix as a typed array', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      expect(matrix.content).toEqual(new Float32Array([
         0,  1,  2,  3,
         4,  5,  6,  7,
         8,  9, 10, 11
      ]))
    })
  })

  describe('#getLinear', function () {
    it('throw an NotImplementedError on call', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      let cell = matrix.cells

      while (cell--) {
        expect(matrix.getLinear(cell)).toBe(cell)
      }
    })
  })

  describe('#getCell', function () {
    it('return a cell of this matrix by using a column index and a row index', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      for (let row = 0; row < 3; ++row) {
        for (let column = 0; column < 3; ++column) {
          expect(
            matrix.getCell(column, row)
          ).toBe(column + row * matrix.columns)
        }
      }
    })
  })

  describe('#get', function () {
    it('return the entire content of the matrix when it is called without any parameter', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      expect(matrix.get()).toEqual(matrix.content)
    })

    it('return a cell of the matrix like getLinear when only one index is given', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      for (let index = 0; index < 9; ++index) {
        expect(matrix.get(index)).toBe(index)
      }
    })

    it('return a cell of the matrix like getCell when two, or more index are given', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      for (let row = 0; row < 3; ++row) {
        for (let column = 0; column < 3; ++column) {
          expect(
            matrix.get(column, row, 1, 2, 3)
          ).toBe(column + row * matrix.columns)
        }
      }
    })
  })

  describe('#setLinear', function () {
    it('throw an NotImplementedError on call', function () {
      const matrix = Matrix.create(FLOAT, 4, 3)

      let cell = matrix.cells

      while (cell--) matrix.setLinear(cell, cell)

      expect(matrix.content).toEqual(new Float32Array([
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      ]))
    })
  })

  describe('#setCell', function () {
    it('update a cell of the matrix by using a column index and a row index', function () {
      const matrix = Matrix.create(FLOAT, 4, 3)

      for (let columnIndex = 0; columnIndex < matrix.columns; ++columnIndex) {
        for (let rowIndex = 0; rowIndex < matrix.rows; ++rowIndex) {
          matrix.setCell(
            columnIndex, rowIndex,
            (columnIndex + 1)+ (rowIndex + 1) * 10
          )
        }
      }

      expect(matrix.content).toEqual(new Float32Array([
        11, 12, 13, 14,
        21, 22, 23, 24,
        31, 32, 33, 34
      ]))
    })
  })

  describe('#setAll', function () {
    it('update the entire content of the given matrix by using its parameters', function () {
      const matrix = Matrix.create(FLOAT, 4, 3)

      const newMatrixContent = [
        9, 8, 7, 2,
        6, 5, 4, 3,
        3, 2, 1, 2
      ]

      matrix.setAll(...newMatrixContent)

      expect(matrix.content).toEqual(new Float32Array(newMatrixContent))
    })
  })

  describe('#set', function () {
    it('act like setLinear if only one index is given', function () {
      const matrix = Matrix.create(FLOAT, 4, 3)
      matrix.setLinear = jest.fn(matrix.setLinear)

      matrix.set(4, 85)

      expect(matrix.setLinear).toHaveBeenCalledTimes(1)
      expect(matrix.setLinear).toHaveBeenCalledWith(4, 85)
    })

    it('act like setCell if two indexes are given', function () {
      const matrix = Matrix.create(FLOAT, 4, 3)
      matrix.setCell = jest.fn(matrix.setCell)

      matrix.set(1, 3, 85)

      expect(matrix.setCell).toHaveBeenCalledTimes(1)
      expect(matrix.setCell).toHaveBeenCalledWith(1, 3, 85)
    })

    it('act like setAll if more values are given', function () {
      const matrix = Matrix.create(FLOAT, 4, 3)

      const newMatrixContent = [
        9, 8, 7, 2,
        6, 5, 4, 3,
        3, 2, 1, 2
      ]

      matrix.set(...newMatrixContent)

      expect(matrix.content).toEqual(new Float32Array(newMatrixContent))
    })
  })

  describe('#clone', function () {
    it('return a clone of the matrix', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        1, 2, 3, 2,
        4, 5, 6, 2,
        7, 8, 9, 2
      )

      const other = matrix.clone()

      expect(matrix.content).toEqual(other.content)
      expect(matrix.content).not.toBe(other.content)
      expect(other).toBeInstanceOf(Matrix)
    })
  })

  describe('#column', function () {
    it('allow to iterate over a column of the matrix', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      expect([...matrix.column(0)]).toEqual([0, 4, 8])
      expect([...matrix.column(1)]).toEqual([1, 5, 9])
      expect([...matrix.column(2)]).toEqual([2, 6, 10])
      expect([...matrix.column(3)]).toEqual([3, 7, 11])
    })
  })

  describe('#row', function () {
    it('allow to iterate over a row of the matrix', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      expect([...matrix.row(0)]).toEqual([0, 1, 2, 3])
      expect([...matrix.row(1)]).toEqual([4, 5, 6, 7])
      expect([...matrix.row(2)]).toEqual([8, 9, 10, 11])
    })
  })

  describe('#setColumn', function () {
    it('allow to update the content of a column of the matrix', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      matrix.setColumn(1, 10, 11, 12)

      expect(matrix.content).toEqual(new Float32Array([
        0, 10,  2,  3,
        4, 11,  6,  7,
        8, 12, 10, 11
      ]))
    })
  })

  describe('#setRow', function () {
    it('allow to update the content of a row of the matrix', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      matrix.setRow(1, 10, 11, 12, 13)

      expect(matrix.content).toEqual(new Float32Array([
         0,  1,  2,  3,
        10, 11, 12, 13,
         8,  9, 10, 11
      ]))
    })
  })

  describe('#toString', function () {
    it('return a string representation of a matrix', function () {
      const matrix = Matrix.of(
        FLOAT, 4, 3,
        0, 1,  2,  3,
        4, 5,  6,  7,
        8, 9, 10, 11
      )

      expect(matrix.toString()).toBe([
        'matrix 4x3 float [',
        '0.0000, 1.0000, 2.0000, 3.0000,',
        '4.0000, 5.0000, 6.0000, 7.0000,',
        '8.0000, 9.0000, 10.0000, 11.0000',
        ']'
      ].join('\n\r'))
    })
  })
})
