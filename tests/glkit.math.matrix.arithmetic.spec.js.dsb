/* eslint-env jest */

import { Matrix } from '@glkit/math/matrix/Matrix'
import * as arithmetic from '@glkit/math/matrix/arithmetic'
import { FLOAT } from '@glkit/math/NumberType'
import { InvalidParameterError } from '@errors'

describe('glkit.math.matrix.arithmetic', function () {
  describe('#add', function () {
    const leftContent = [
      1,  2,  4,  4,
      3, 10,  7,  8,
      9,  2,  2,  5
    ]

    const rightContent = [
      2, 8, 9, 3,
      4, 2, 6, 1,
      5, 3, 4, 2
    ]

    const additionResult = [
      3, 10, 13, 7,
      7, 12, 13, 9,
     14,  5,  6, 7
    ]

    it('perform an addition of two matrix into a third matrix', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...leftContent)
      const right = Matrix.of(FLOAT, 4, 3, ...rightContent)

      const result = new Matrix(FLOAT, 4, 3)

      arithmetic.add(left, right, result)

      expect([...result]).toEqual(additionResult)
      expect([...left]).toEqual(leftContent)
      expect([...right]).toEqual(rightContent)
    })

    it('can perform an addition of two matrix on the fly on the left operand', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...leftContent)
      const right = Matrix.of(FLOAT, 4, 3, ...rightContent)

      arithmetic.add(left, right, left)

      expect([...left]).toEqual(additionResult)
      expect([...right]).toEqual(rightContent)
    })

    it('can perform an addition of two matrix on the fly on the right operand', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...leftContent)
      const right = Matrix.of(FLOAT, 4, 3, ...rightContent)

      arithmetic.add(left, right, right)

      expect([...left]).toEqual(leftContent)
      expect([...right]).toEqual(additionResult)
    })

    // <development>
    it('throw an InvalidParameterError if the right operand does not have the same dimensions as the left operand', function () {
      const left = new Matrix(FLOAT, 4, 3)
      const right = new Matrix(FLOAT, 4, 8)

      expect(
        _ => arithmetic.add(left, right, left)
      ).toThrow(InvalidParameterError)
    })
    // </development>

    // <development>
    it('throw an InvalidParameterError if the result matrix does not have the same dimensions as the left operand', function () {
      const left = new Matrix(FLOAT, 4, 3)
      const right = new Matrix(FLOAT, 4, 3)
      const result = new Matrix(FLOAT, 4, 8)

      expect(
        _ => arithmetic.add(left, right, result)
      ).toThrow(InvalidParameterError)
    })
    // </development>

    it('return the result matrix', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...leftContent)
      const right = Matrix.of(FLOAT, 4, 3, ...rightContent)

      const result = new Matrix(FLOAT, 4, 3)

      expect(arithmetic.add(left, right, result)).toBe(result)
    })
  })

  describe('#subtract', function () {
    const leftContent = [
      1,  2,  4,  4,
      3, 10,  7,  8,
      9,  2,  2,  5
    ]

    const rightContent = [
      2, 8, 9, 3,
      4, 2, 6, 1,
      5, 3, 4, 2
    ]

    const subtractionResult = [
      -1, -6, -5, 1,
      -1,  8,  1, 7,
       4, -1, -2, 3
    ]

    it('perform a subtraction of two matrix into a third matrix', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...leftContent)
      const right = Matrix.of(FLOAT, 4, 3, ...rightContent)

      const result = new Matrix(FLOAT, 4, 3)

      arithmetic.subtract(left, right, result)

      expect([...result]).toEqual(subtractionResult)
      expect([...left]).toEqual(leftContent)
      expect([...right]).toEqual(rightContent)
    })

    it('can perform a subtraction of two matrix on the fly on the left operand', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...leftContent)
      const right = Matrix.of(FLOAT, 4, 3, ...rightContent)

      arithmetic.subtract(left, right, left)

      expect([...left]).toEqual(subtractionResult)
      expect([...right]).toEqual(rightContent)
    })

    it('can perform a subtraction of two matrix on the fly on the right operand', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...leftContent)
      const right = Matrix.of(FLOAT, 4, 3, ...rightContent)

      arithmetic.subtract(left, right, right)

      expect([...left]).toEqual(leftContent)
      expect([...right]).toEqual(subtractionResult)
    })

    // <development>
    it('throw an InvalidParameterError if the right operand does not have the same dimensions as the left operand', function () {
      const left = new Matrix(FLOAT, 4, 3)
      const right = new Matrix(FLOAT, 4, 8)

      expect(
        _ => arithmetic.subtract(left, right, left)
      ).toThrow(InvalidParameterError)
    })
    // </development>

    // <development>
    it('throw an InvalidParameterError if the result matrix does not have the same dimensions as the left operand', function () {
      const left = new Matrix(FLOAT, 4, 3)
      const right = new Matrix(FLOAT, 4, 3)
      const result = new Matrix(FLOAT, 4, 8)

      expect(
        _ => arithmetic.subtract(left, right, result)
      ).toThrow(InvalidParameterError)
    })
    // </development>

    it('return the result matrix', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...leftContent)
      const right = Matrix.of(FLOAT, 4, 3, ...rightContent)

      const result = new Matrix(FLOAT, 4, 3)

      expect(arithmetic.subtract(left, right, result)).toBe(result)
    })
  })

  describe('#multiplyWithScalar', function () {
    const content = [
      1,  2,  4,  4,
      3, 10,  7,  8,
      9,  2,  2,  5
    ]

    const scalar = 12

    const multiplicationResult = content.map(x => x * scalar)

    it('perform a multiplication of a matrix by a scalar', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...content)
      const result = new Matrix(FLOAT, 4, 3)

      arithmetic.multiplyWithScalar(left, scalar, result)

      expect([...result]).toEqual(multiplicationResult)
      expect([...left]).toEqual(content)
    })

    it('can perform the multiplication on the fly on the left operand', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...content)

      arithmetic.multiplyWithScalar(left, scalar, left)

      expect([...left]).toEqual(multiplicationResult)
    })

    // <development>
    it('throw an InvalidParameterError if the result matrix does not have the same dimensions as the left operand', function () {
      const left = new Matrix(FLOAT, 4, 3)
      const result = new Matrix(FLOAT, 4, 8)

      expect(
        _ => arithmetic.multiplyWithScalar(left, scalar, result)
      ).toThrow(InvalidParameterError)
    })
    // </development>

    it('return the result matrix', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...content)
      const result = new Matrix(FLOAT, 4, 3)

      expect(arithmetic.multiplyWithScalar(left, scalar, result)).toBe(result)
    })
  })

  describe('#multiplyWithMatrix', function () {
    const leftContent = [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]

    const rightContent = [
      2, 0, 0,
      0, 2, 0,
      0, 0, 2
    ]

    const resultContent = [
       0,  2,  4,
       6,  8, 10,
      12, 14, 16
    ]

    it('perform a subtraction of two matrix into a third matrix', function () {
      const left = Matrix.of(FLOAT, 3, 3, ...leftContent)
      const right = Matrix.of(FLOAT, 3, 3, ...rightContent)

      const result = new Matrix(FLOAT, 3, 3)

      arithmetic.multiplyWithMatrix(left, right, result)

      expect([...result]).toEqual(resultContent)
      expect([...left]).toEqual(leftContent)
      expect([...right]).toEqual(rightContent)
    })

    // <development>
    it('throw an InvalidParameterError if the left operand is also the result matrix', function () {
      const left = new Matrix(FLOAT, 3, 3)
      const right = new Matrix(FLOAT, 3, 3)

      expect(
        _ => arithmetic.multiplyWithMatrix(left, right, left)
      ).toThrow(InvalidParameterError)
    })
    // </development>

    // <development>
    it('throw an InvalidParameterError if the right operand is also the result matrix', function () {
      const left = new Matrix(FLOAT, 3, 3)
      const right = new Matrix(FLOAT, 3, 3)

      expect(
        _ => arithmetic.multiplyWithMatrix(left, right, right)
      ).toThrow(InvalidParameterError)
    })
    // </development>

    // <development>
    it('throw an InvalidParameterError if the right operand is not compatible with the left operand', function () {
      const left = new Matrix(FLOAT, 4, 3)
      const right = new Matrix(FLOAT, 3, 6)
      const result = new Matrix(FLOAT, 3, 3)

      expect(
        _ => arithmetic.multiplyWithMatrix(left, right, result)
      ).toThrow(InvalidParameterError)
    })
    // </development>

    // <development>
    it('throw an InvalidParameterError if the result matrix is not compatible with the operation', function () {
      const left = new Matrix(FLOAT, 4, 3)
      const right = new Matrix(FLOAT, 3, 4)
      const result = new Matrix(FLOAT, 4, 4)

      expect(
        _ => arithmetic.multiplyWithMatrix(left, right, result)
      ).toThrow(InvalidParameterError)
    })
    // </development>

    it('return the result matrix', function () {
      const left = new Matrix(FLOAT, 4, 3)
      const right = new Matrix(FLOAT, 3, 4)
      const result = new Matrix(FLOAT, 3, 3)

      expect(arithmetic.multiplyWithMatrix(left, right, result)).toBe(result)
    })
  })

  describe('#multiply', function () {
    it('act like multiplyWithScalar if a scalar was given as a left operand', function () {
      const left = new Matrix(FLOAT, 4, 4).setAll(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      )

      const right = 5
      const result = new Matrix(FLOAT, 4, 4)

      expect(arithmetic.multiply(left, right, result)).toBe(result)
      expect([...result]).toEqual([
        5, 0, 0, 0,
        0, 5, 0, 0,
        0, 0, 5, 0,
        0, 0, 0, 5
      ])
    })

    it('act like multiplyWithMatrix if a matrix was given as a left operand', function () {
      const left = new Matrix(FLOAT, 4, 4).setAll(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      )

      const right = new Matrix(FLOAT, 4, 4).setAll(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 1, 2, 3,
        4, 5, 6, 7
      )
      const result = new Matrix(FLOAT, 4, 4)

      expect(arithmetic.multiply(left, right, result)).toBe(result)
      expect([...result]).toEqual([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 1, 2, 3,
        4, 5, 6, 7
      ])
    })
  })

  describe('#divide', function () {
    const scalar = 12

    const content = [
      1,  2,  4,  4,
      3, 10,  7,  8,
      9,  2,  2,  5
    ].map(x => x * scalar)

    const multiplicationResult = content.map(x => x / scalar)

    it('perform a division of a matrix by a scalar', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...content)
      const result = new Matrix(FLOAT, 4, 3)

      arithmetic.divide(left, scalar, result)

      expect([...result]).toEqual(multiplicationResult)
      expect([...left]).toEqual(content)
    })

    it('can perform the division on the fly on the left operand', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...content)

      arithmetic.divide(left, scalar, left)

      expect([...left]).toEqual(multiplicationResult)
    })

    // <development>
    it('throw an InvalidParameterError if the result matrix does not have the same dimensions as the left operand', function () {
      const left = new Matrix(FLOAT, 4, 3)
      const result = new Matrix(FLOAT, 4, 8)

      expect(
        _ => arithmetic.divide(left, scalar, result)
      ).toThrow(InvalidParameterError)
    })
    // </development>

    it('return the result matrix', function () {
      const left = Matrix.of(FLOAT, 4, 3, ...content)
      const result = new Matrix(FLOAT, 4, 3)

      expect(arithmetic.divide(left, scalar, result)).toBe(result)
    })
  })

  describe('#transpose', function () {
    const content = [
      0,  1,  2,
      3,  4,  5,
      6,  7,  8,
      9, 10, 11,
     12, 13, 14
    ]

    const resultContent = [
      0, 3, 6,  9, 12,
      1, 4, 7, 10, 13,
      2, 5, 8, 11, 14
    ]

    it('transpose a given matrix into a result matrix', function () {
      const matrix = Matrix.of(FLOAT, 3, 5, ...content)
      const result = new Matrix(FLOAT, 5, 3)

      arithmetic.transpose(matrix, result)

      expect([...result]).toEqual([...resultContent])
      expect([...matrix]).toEqual([...content])
    })

    it('can perform the transposition on the fly on the transposed matrix', function () {
      const matrix = Matrix.of(
        FLOAT, 3, 3,
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      )

      arithmetic.transpose(matrix)

      expect([...matrix]).toEqual([
        0, 3, 6,
        1, 4, 7,
        2, 5, 8
      ])
    })

    // <development>
    it('throw an InvalidParameterError if the result matrix is not compatible with the transposition operation', function () {
      const matrix = new Matrix(FLOAT, 4, 3)
      const result = new Matrix(FLOAT, 4, 3)

      expect(
        _ => arithmetic.transpose(matrix, result)
      ).toThrow(InvalidParameterError)
    })
    // </development>

    it('return the result matrix', function () {
      const matrix = Matrix.of(FLOAT, 5, 3, ...content)
      const result = new Matrix(FLOAT, 3, 5)

      expect(arithmetic.transpose(matrix, result)).toBe(result)
    })
  })
})
