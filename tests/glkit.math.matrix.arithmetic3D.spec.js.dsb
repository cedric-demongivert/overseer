/* eslint-env jest */

import { Matrix3D } from '@glkit/math/matrix/Matrix3D'
import { Matrix } from '@glkit/math/matrix/Matrix'

import * as arithmetic3D from '@glkit/math/matrix/arithmetic3D'

import { FLOAT, INT } from '@glkit/math/NumberType'

import { InvalidParameterError } from '@errors'

describe('glkit.math.matrix.arithmetic3D', function () {
  describe('#multiplyWith3DMatrix', function () {
    it('allow to multiply in place two 3D matrix', function () {
      const left = Matrix3D.of(
        FLOAT,
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      )
      const right = Matrix3D.of(
        FLOAT,
        2, 0, 0,
        0, 2, 0,
        0, 0, 2
      )

      arithmetic3D.multiplyWith3DMatrix(left, right)

      expect([...left]).toEqual([
         2,  4,  6,
         8, 10, 12,
        14, 16, 18
      ])

      expect([...right]).toEqual([
        2, 0, 0,
        0, 2, 0,
        0, 0, 2
      ])
    })
  })
})
