/* eslint-env jest */

import { Matrix3D } from '@glkit/math/matrix/Matrix3D'
import { Matrix } from '@glkit/math/matrix/Matrix'
import { Vector2D } from '@glkit/math/vector/Vector2D'
import { Vector3D } from '@glkit/math/vector/Vector3D'

import * as common3D from '@glkit/math/matrix/common3D'

import { FLOAT, INT } from '@glkit/math/NumberType'

import { InvalidParameterError } from '@errors'

describe('glkit.math.matrix.common3D', function () {
  describe('#isMatrix3D', function () {
    it('return true if the given matrix is a valid 3D matrix', function () {
      expect(common3D.isMatrix3D(new Matrix3D(FLOAT))).toBeTruthy()
      expect(common3D.isMatrix3D(new Matrix(FLOAT, 3, 3))).toBeTruthy()
    })

    it('return false if the given matrix is not valid 3D matrix', function () {
      expect(common3D.isMatrix3D(new Matrix(FLOAT, 4, 3))).toBeFalsy()
      expect(common3D.isMatrix3D(new Matrix(FLOAT, 3, 8))).toBeFalsy()
      expect(common3D.isMatrix3D(new Matrix(FLOAT, 2, 9))).toBeFalsy()
    })
  })

  describe('#toIdentityMatrix', function () {
    it('set the given 3D matrix to an identity matrix', function () {
      const matrix = Matrix3D.create(FLOAT)
      expect(matrix.content).toEqual(new Float32Array([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]))

      common3D.toIdentityMatrix(matrix)
      expect(matrix.content).toEqual(new Float32Array([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      ]))
    })

    // <development>
    it('throw an error if the given matrix is not a 3D matrix', function () {
      expect(_ => common3D.toIdentityMatrix(new Matrix(FLOAT, 4, 9))).toThrow()
    })
    // </development>
  })

  describe('#to2DScaleMatrix', function () {
    it('set the given 3D matrix to a 2D scale matrix', function () {
      const matrix = Matrix3D.create(FLOAT)
      expect(matrix.content).toEqual(new Float32Array([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]))

      expect(
        common3D.to2DScaleMatrix(matrix, 2, 5).content
      ).toEqual(new Float32Array([
        2, 0, 0,
        0, 5, 0,
        0, 0, 1
      ]))
    })

    // <development>
    it('throw an error if the given matrix is not a 3D matrix', function () {
      expect(
        _ => common3D.to2DScaleMatrix(new Matrix(FLOAT, 4, 9), 2, 5)
      ).toThrow()
    })
    // </development>
  })

  describe('#to3DScaleMatrix', function () {
    it('set the given 3D matrix to a 3D scale matrix', function () {
      const matrix = Matrix3D.create(FLOAT)
      expect(matrix.content).toEqual(new Float32Array([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]))

      expect(
        common3D.to3DScaleMatrix(matrix, 2, 5, 6).content
      ).toEqual(new Float32Array([
        2, 0, 0,
        0, 5, 0,
        0, 0, 6
      ]))
    })

    // <development>
    it('throw an error if the given matrix is not a 3D matrix', function () {
      expect(
        _ => common3D.to3DScaleMatrix(new Matrix(FLOAT, 4, 9), 2, 5, 6)
      ).toThrow()
    })
    // </development>
  })

  describe('#to2DTranslationMatrix', function () {
    it('set the given 3D matrix to a 2D translation matrix', function () {
      const matrix = Matrix3D.create(FLOAT)
      expect(matrix.content).toEqual(new Float32Array([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]))

      expect(
        common3D.to2DTranslationMatrix(matrix, 2, 5).content
      ).toEqual(new Float32Array([
        1, 0, 2,
        0, 1, 5,
        0, 0, 1
      ]))
    })

    // <development>
    it('throw an error if the given matrix is not a 3D matrix', function () {
      expect(
        _ => common3D.to2DTranslationMatrix(new Matrix(FLOAT, 4, 9), 2, 5)
      ).toThrow()
    })
    // </development>
  })

  describe('#determinant', function () {
    it('return the determinant of a matrix', function () {
      expect(
        common3D.determinant(
          common3D.toIdentityMatrix(Matrix3D.create(FLOAT))
        )
      ).toBe(1)

      expect(common3D.determinant(
        Matrix3D.of(
          FLOAT,
          0, 1, 2,
          4, 2, 4,
          7, 3, 6
        )
      )).toBe(0)
    })

    // <development>
    it('throw an error if the given matrix is not a 3D matrix', function () {
      expect(
        _ => common3D.determinant(new Matrix(FLOAT, 4, 9))
      ).toThrow()
    })
    // </development>
  })

  describe('#invert', function () {
    it('invert a matrix', function () {
      const base = Matrix3D.of(
        FLOAT,
        8, 0, 0,
        0, 2, 0,
        0, 0, 4
      )

      const revert = common3D.invert(Matrix3D.clone(base))

      const result = Matrix3D.create(FLOAT)

      Matrix3D.multiply(base, revert, result)

      expect(result.content).toEqual(new Float32Array([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      ]))
    })

    // <development>
    it('throw an error if the given matrix is not a 3D matrix', function () {
      expect(
        _ => common3D.invert(new Matrix(FLOAT, 4, 9))
      ).toThrow()
    })
    // </development>
  })

  describe('#extract2DTranslation', function () {
    it('extract a 2D translation vector from the matrix', function () {
      const matrix = Matrix3D.create(FLOAT)
      const transformation = Matrix3D.create(FLOAT)
      const temporary = Matrix3D.create(FLOAT)

      common3D.toIdentityMatrix(matrix)
      common3D.to2DTranslationMatrix(transformation, 5, 4)
      Matrix3D.multiply(transformation, matrix, temporary)
      Matrix3D.copy(temporary, matrix)

      expect(common3D.extract2DTranslation(matrix).content).toEqual(
        new Float32Array([5, 4])
      )

      common3D.to2DScaleMatrix(transformation, 5, 3)
      Matrix3D.multiply(transformation, matrix, temporary)
      Matrix3D.copy(temporary, matrix)

      expect(common3D.extract2DTranslation(matrix).content).toEqual(
        new Float32Array([5 * 5, 4 * 3])
      )
    })

    // <development>
    it('throw an error if the given matrix is not a 3D matrix', function () {
      expect(
        _ => common3D.extract2DTranslation(new Matrix(FLOAT, 4, 9))
      ).toThrow()
    })
    // </development>
  })

  describe('#extract2DScale', function () {
    it('extract a 2D scale vector from the matrix', function () {
      const matrix = Matrix3D.create(FLOAT)
      const transformation = Matrix3D.create(FLOAT)
      const temporary = Matrix3D.create(FLOAT)

      common3D.toIdentityMatrix(matrix)
      common3D.to2DScaleMatrix(transformation, 5, 4)
      Matrix3D.multiply(transformation, matrix, temporary)
      Matrix3D.copy(temporary, matrix)

      expect(common3D.extract2DScale(matrix).content).toEqual(
        new Float32Array([5, 4])
      )

      common3D.to2DTranslationMatrix(transformation, 5, 3)
      Matrix3D.multiply(transformation, matrix, temporary)
      Matrix3D.copy(temporary, matrix)

      expect(common3D.extract2DScale(matrix).content).toEqual(
        new Float32Array([5, 4])
      )

      common3D.to2DRotationMatrix(transformation, Math.PI / 2.0)
      Matrix3D.multiply(transformation, matrix, temporary)
      Matrix3D.copy(temporary, matrix)

      expect(
        Vector2D.equals(
          common3D.extract2DScale(matrix),
          Vector2D.of(FLOAT, 4, 5)
        )
      ).toBeTruthy()
    })

    // <development>
    it('throw an error if the given matrix is not a 3D matrix', function () {
      expect(
        _ => common3D.extract2DScale(new Matrix(FLOAT, 4, 9))
      ).toThrow()
    })
    // </development>
  })

  describe('#extract3DScale', function () {
    it('extract a 3D scale vector from the matrix', function () {
      const matrix = Matrix3D.create(FLOAT)
      const transformation = Matrix3D.create(FLOAT)
      const temporary = Matrix3D.create(FLOAT)

      common3D.toIdentityMatrix(matrix)
      common3D.to3DScaleMatrix(transformation, 5, 4, 2)
      Matrix3D.multiply(transformation, matrix, temporary)
      Matrix3D.copy(temporary, matrix)

      expect(common3D.extract3DScale(matrix).content).toEqual(
        new Float32Array([5, 4, 2])
      )
    })

    // <development>
    it('throw an error if the given matrix is not a 3D matrix', function () {
      expect(
        _ => common3D.extract3DScale(new Matrix(FLOAT, 4, 9))
      ).toThrow()
    })
    // </development>
  })

  describe('#extract2DRotation', function () {
    it('extract a 2D rotation angle from a 3D matrix', function () {
      const matrix = Matrix3D.create(FLOAT)
      const transformation = Matrix3D.create(FLOAT)
      const temporary = Matrix3D.create(FLOAT)

      common3D.toIdentityMatrix(matrix)
      common3D.to2DRotationMatrix(transformation, Math.PI / 4.0)
      Matrix3D.multiply(transformation, matrix, temporary)
      Matrix3D.copy(temporary, matrix)

      expect(
        common3D.extract2DRotation(matrix)
      ).toBe(Math.PI / 4.0)
    })

    // <development>
    it('throw an error if the given matrix is not a 3D matrix', function () {
      expect(
        _ => common3D.extract2DRotation(new Matrix(FLOAT, 4, 9))
      ).toThrow()
    })
    // </development>
  })
})
