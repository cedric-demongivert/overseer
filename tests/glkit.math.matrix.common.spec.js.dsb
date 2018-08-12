/* eslint-env jest */

import { Matrix } from '@glkit/math/matrix/Matrix'
import * as common from '@glkit/math/matrix/common'

import { FLOAT, INT } from '@glkit/math/NumberType'

import { InvalidParameterError } from '@errors'

describe('glkit.math.matrix.common', function () {
  describe('#haveSameDimensions', function () {
    it('return true if both given matrix have the same dimensions', function () {
      const firstMatrix = new Matrix(FLOAT, 15, 32)
      const secondMatrix = new Matrix(INT, 15, 32)

      expect(common.haveSameDimensions(firstMatrix, secondMatrix)).toBeTruthy()
    })

    it('return false otherwise', function () {
      const firstMatrix = new Matrix(FLOAT, 15, 32)
      const secondMatrix = new Matrix(INT, 15, 33)

      expect(common.haveSameDimensions(firstMatrix, secondMatrix)).toBeFalsy()
    })
  })

  describe('#fill', function () {
    it('set all cells of the given matrix to a given value', function () {
      const matrix = new Matrix(FLOAT, 10, 20)

      let cellIndex = matrix.cells
      while (cellIndex--) expect(matrix.getLinear(cellIndex)).toBe(0)

      common.fill(matrix, 10)

      cellIndex = matrix.cells
      while (cellIndex--) expect(matrix.getLinear(cellIndex)).toBe(10)
    })

    it('return the target matrix', function () {
      const matrix = new Matrix(FLOAT, 10, 20)
      expect(common.fill(matrix, 10)).toBe(matrix)
    })
  })

  describe('#toString', function () {
    it('transform a matrix into a string representation', function () {
      const matrix = new Matrix(FLOAT, 4, 3).setAll(
        0, 1, 2, 4,
        3, 4, 5, 2,
        6, 7, 8, 9
      )

      expect(common.toString(matrix)).toBe(
        [
          'matrix 4x3 float [',
          '0.0000, 1.0000, 2.0000, 4.0000,',
          '3.0000, 4.0000, 5.0000, 2.0000,',
          '6.0000, 7.0000, 8.0000, 9.0000',
          ']'
        ].join('\n\r')
      )
    })

    it('transform a null matrix into a string representation', function () {
      expect(common.toString(null)).toBe('matrix null')
    })

    it('transform an empty matrix into a string representation', function () {
      expect(common.toString(new Matrix(FLOAT, 0, 0))).toBe(
        'matrix 0x0 float []'
      )
    })
  })

  describe('#isSquareMatrix', function () {
    it('return true if the given matrix is a square matrix', function () {
      for (let index = 0; index < 10; ++index) {
        expect(
          common.isSquareMatrix(new Matrix(FLOAT, index, index))
        ).toBeTruthy()
      }
    })

    it('return false if the given matrix is not a square matrix', function () {
      expect(
        common.isSquareMatrix(new Matrix(FLOAT, 2, 8))
      ).toBeFalsy()

      expect(
        common.isSquareMatrix(new Matrix(FLOAT, 3, 1))
      ).toBeFalsy()

      expect(
        common.isSquareMatrix(new Matrix(FLOAT, 0, 9))
      ).toBeFalsy()
    })
  })

  describe('#fullCopy', function () {
    it('copy the content of a matrix into another', function () {
      const source = Matrix.of(
        FLOAT, 3, 5,
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 9, 9,
        9, 9, 9
      )

      const destination = new Matrix(FLOAT, 3, 5)

      expect([...destination]).not.toEqual([...source])

      common.fullCopy(source, destination)

      expect([...destination]).toEqual([...source])
    })

    // <development>
    it('throw an error if the destination matrix does not have the same dimensions as the source matrix', function () {
      const source = new Matrix(FLOAT, 3, 5)
      const destination = new Matrix(FLOAT, 3, 6)

      expect(_ => common.fullCopy(source, destination)).toThrow()
    })
    // </development>
  })

  describe('#partialCopy', function () {
    it('partially copy the content of a matrix into another', function () {
      const source = Matrix.of(
        FLOAT, 3, 5,
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 9, 9,
        9, 9, 9
      )

      const destination = new Matrix(FLOAT, 3, 2)

      expect([...destination]).not.toEqual([
        ...source.row(0),
        ...source.row(1)
      ])

      common.partialCopy({ source, destination })

      expect([...destination]).toEqual([
        ...source.row(0),
        ...source.row(1)
      ])
    })

    it('allow to fully configurate the partial copy', function () {
      const source = Matrix.of(
        FLOAT, 3, 3,
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      )

      const destination = source.clone()

      common.partialCopy({
        source,
        destination,
        sourceColumnsOffset: 1,
        sourceRowsOffset: 1,
        destinationColumnsOffset: 0,
        destinationRowsOffset: 0,
        columnsToCopy: 2,
        rowsToCopy: 1
      })

      expect([...destination]).toEqual([
        5, 6, 3,
        4, 5, 6,
        7, 8, 9
      ])
    })

    // <development>
    it('throw an error in case of an invalid configuration', function () {
      const source = Matrix.of(
        FLOAT, 3, 3,
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      )

      const destination = source.clone()

      expect(_ => {
        common.partialCopy({
          source,
          destination,
          sourceColumnsOffset: 2,
          sourceRowsOffset: 1,
          destinationColumnsOffset: 0,
          destinationRowsOffset: 0,
          columnsToCopy: 2,
          rowsToCopy: 2
        })
      }).toThrow(InvalidParameterError)

      expect(_ => {
        common.partialCopy({
          source,
          destination,
          sourceColumnsOffset: 1,
          sourceRowsOffset: 2,
          destinationColumnsOffset: 0,
          destinationRowsOffset: 0,
          columnsToCopy: 2,
          rowsToCopy: 2
        })
      }).toThrow(InvalidParameterError)

      expect(_ => {
        common.partialCopy({
          source,
          destination,
          sourceColumnsOffset: 1,
          sourceRowsOffset: 1,
          destinationColumnsOffset: 2,
          destinationRowsOffset: 0,
          columnsToCopy: 2,
          rowsToCopy: 2
        })
      }).toThrow(InvalidParameterError)

      expect(_ => {
        common.partialCopy({
          source,
          destination,
          sourceColumnsOffset: 1,
          sourceRowsOffset: 1,
          destinationColumnsOffset: 0,
          destinationRowsOffset: 2,
          columnsToCopy: 2,
          rowsToCopy: 2
        })
      }).toThrow(InvalidParameterError)
    })
    // </development>
  })
})
