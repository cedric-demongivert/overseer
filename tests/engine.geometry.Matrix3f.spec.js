/* eslint-env jest */

import { Matrix3f, Vector2f, Vector3f } from '@glkit/Math'
import { GLType } from '@glkit/gl/GLType'

describe('engine.geometry.Matrix3f', function () {
  describe('#static identity', function () {
    it('return an identity matrix', function () {
      expect(Matrix3f.identity.data).toEqual([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      ])
    })
  })

  describe('#static scale2D', function () {
    it('create and return a 2D scaling matrix', function () {
      expect(Matrix3f.scale2D(2, 5).data).toEqual([
        2, 0, 0,
        0, 5, 0,
        0, 0, 1
      ])

      expect(Matrix3f.scale2D([2, 5]).data).toEqual([
        2, 0, 0,
        0, 5, 0,
        0, 0, 1
      ])

      expect(Matrix3f.scale2D(new Vector2f(2, 5)).data).toEqual([
        2, 0, 0,
        0, 5, 0,
        0, 0, 1
      ])
    })
  })

  describe('#static translate2D', function () {
    it('create and return a 2D translation matrix', function () {
      expect(Matrix3f.translate2D(2, 5).data).toEqual([
        1, 0, 2,
        0, 1, 5,
        0, 0, 1
      ])

      expect(Matrix3f.translate2D([2, 5]).data).toEqual([
        1, 0, 2,
        0, 1, 5,
        0, 0, 1
      ])

      expect(Matrix3f.translate2D(new Vector2f(2, 5)).data).toEqual([
        1, 0, 2,
        0, 1, 5,
        0, 0, 1
      ])
    })
  })

  describe('#static scale3D', function () {
    it('create and return a 3D scaling matrix', function () {
      expect(Matrix3f.scale3D(2, 5, 6).data).toEqual([
        2, 0, 0,
        0, 5, 0,
        0, 0, 6
      ])

      expect(Matrix3f.scale3D([2, 5, 6]).data).toEqual([
        2, 0, 0,
        0, 5, 0,
        0, 0, 6
      ])

      expect(Matrix3f.scale3D(new Vector3f(2, 5, 6)).data).toEqual([
        2, 0, 0,
        0, 5, 0,
        0, 0, 6
      ])
    })
  })

  describe('#constructor', function () {
    it('allow to create a matrix3f from an array', function () {
      const instance = new Matrix3f([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ])

      expect(instance.data).toEqual([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ])
    })
  })

  describe('#static reate', function () {
    it('allow to create a matrix3f from an array', function () {
      const instance = Matrix3f.create([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ])

      expect(instance.data).toEqual([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ])
    })
  })

  describe('#static fromValues', function () {
    it('allow to create a matrix3f', function () {
      const instance = Matrix3f.fromValues(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      )

      expect(instance.data).toEqual([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ])
    })
  })

  for (let col = 0; col < 3; ++col) {
    for (let row = 0; row < 3; ++row) {
      describe(`#a${col + 1}${row + 1}`, function () {
        it(`return the value of the matrix at (${col}, ${row})`, function () {
          expect(Matrix3f.create([
            0, 1, 2,
            3, 4, 5,
            6, 7, 8
          ])[`a${col + 1}${row + 1}`]).toBe(row * 3 + col)
        })
      })
    }
  }

  describe('#get width', function () {
    it('always return 3', function () {
      expect(new Matrix3f().width).toBe(3)
    })
  })

  describe('#get height', function () {
    it('always return 3', function () {
      expect(new Matrix3f().height).toBe(3)
    })
  })

  describe('#get', function () {
    it('return the value of a cell of the matrix', function () {
      const matrix = Matrix3f.create([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      for (let col = 0; col < 3; ++col) {
        for (let row = 0; row < 3; ++row) {
          expect(matrix.get(col, row)).toBe(row * 3 + col)
        }
      }
    })
  })

  describe('#set', function () {
    it('set a value of the matrix', function () {
      const matrix = Matrix3f.create([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      for (let col = 0; col < 3; ++col) {
        for (let row = 0; row < 3; ++row) {
          expect(matrix.set(col, row, 99).get(col, row)).toBe(99)
        }
      }

      expect(matrix.data).toEqual([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])
    })
  })

  describe('#add', function () {
    it('perform an addition over two matrix', function () {
      const matrix = Matrix3f.create([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      expect(matrix.add(Matrix3f.create([
        8, 7, 6,
        5, 4, 3,
        2, 1, 0
      ])).data).toEqual([
        8, 8, 8,
        8, 8, 8,
        8, 8, 8
      ])

      expect(matrix.data).toEqual([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])
    })
  })

  describe('#sub', function () {
    it('perform an subtraction over two matrix', function () {
      const matrix = Matrix3f.create([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      expect(matrix.sub(matrix).data).toEqual([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ])

      expect(matrix.data).toEqual([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])
    })
  })

  describe('#div', function () {
    it('perform an division over two matrix', function () {
      const matrix = Matrix3f.create([
        0, 2, 4,
        6, 8, 10,
        12, 14, 16
      ])

      expect(matrix.div(2).data).toEqual([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      expect(matrix.data).toEqual([
        0, 2, 4,
        6, 8, 10,
        12, 14, 16
      ])
    })
  })

  describe('#mul', function () {
    it('perform a multiplication by a matrix', function () {
      const matrix = Matrix3f.create([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      expect(matrix.mul(Matrix3f.identity).data).toEqual([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      expect(matrix.data).toEqual([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])
    })

    it('perform a multiplication by a scalar', function () {
      const matrix = Matrix3f.create([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      expect(matrix.mul(2).data).toEqual([
        0, 2, 4,
        6, 8, 10,
        12, 14, 16
      ])

      expect(matrix.data).toEqual([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])
    })

    it('perform a multiplication by a vector', function () {
      const vector = Vector3f.create(6, 8, 12)

      expect([...Matrix3f.identity.mul(vector)]).toEqual([6, 8, 12])
      expect([...Matrix3f.scale3D(1, 2, 3).mul(vector)]).toEqual([6, 16, 36])

      expect([...vector]).toEqual([6, 8, 12])
    })
  })

  describe('#row', function () {
    it('return a row of the matrix', function () {
      const matrix = Matrix3f.create([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      expect([...matrix.row(0)]).toEqual([0, 1, 2])
      expect([...matrix.row(1)]).toEqual([3, 4, 5])
      expect([...matrix.row(2)]).toEqual([6, 7, 8])
    })

    it('replace a row of the matrix', function () {
      const matrix = Matrix3f.create([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      expect(matrix.row(0, 2, 3, 4).data).toEqual([
        2, 3, 4,
        3, 4, 5,
        6, 7, 8
      ])

      expect(matrix.row(1, new Vector3f(2, 3, 4)).data).toEqual([
        0, 1, 2,
        2, 3, 4,
        6, 7, 8
      ])

      expect(matrix.row(2, [2, 3, 4]).data).toEqual([
        0, 1, 2,
        3, 4, 5,
        2, 3, 4
      ])

      expect(matrix.data).toEqual([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])
    })
  })

  describe('#column', function () {
    it('return a column of the matrix', function () {
      const matrix = Matrix3f.create([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      expect([...matrix.column(0)]).toEqual([0, 3, 6])
      expect([...matrix.column(1)]).toEqual([1, 4, 7])
      expect([...matrix.column(2)]).toEqual([2, 5, 8])
    })

    it('replace a column of the matrix', function () {
      const matrix = Matrix3f.create([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])

      expect(matrix.column(0, 2, 3, 4).data).toEqual([
        2, 1, 2,
        3, 4, 5,
        4, 7, 8
      ])

      expect(matrix.column(1, new Vector3f(2, 3, 4)).data).toEqual([
        0, 2, 2,
        3, 3, 5,
        6, 4, 8
      ])

      expect(matrix.column(2, [2, 3, 4]).data).toEqual([
        0, 1, 2,
        3, 4, 3,
        6, 7, 4
      ])

      expect(matrix.data).toEqual([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ])
    })
  })

  describe('#get determinant', function () {
    it('return the determinant of a matrix', function () {
      expect(Matrix3f.identity.determinant).toBe(1)
      expect(Matrix3f.create([
        0, 1, 2,
        4, 2, 4,
        7, 3, 6
      ]).determinant).toBe(0)
    })
  })

  describe('#transpose', function () {
    it('transpose a matrix', function () {
      const matrix = Matrix3f.create([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ])

      expect(matrix.transpose().data).toEqual([
        1, 4, 7,
        2, 5, 8,
        3, 6, 9
      ])

      expect(matrix.data).toEqual([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ])
    })
  })

  describe('#invert', function () {
    it('invert a matrix', function () {
      const matrix = Matrix3f.create([
        8, 0, 0,
        0, 7, 0,
        0, 0, 3
      ])

      expect(matrix.mul(matrix.invert()).data).toEqual([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      ])

      expect(matrix.data).toEqual([
        8, 0, 0,
        0, 7, 0,
        0, 0, 3
      ])
    })
  })

  describe('#extract2DTranslation', function () {
    it('extract a 2D translation vector from the matrix', function () {
      const matrix = Matrix3f.create([
        8, 2, 5,
        3, 7, 4,
        0, 0, 3
      ])

      expect([...matrix.extract2DTranslation()]).toEqual([5, 4])
      expect([
        ...Matrix3f.translate2D(3, 2).mul(Matrix3f.scale2D(2, 3))
                   .extract2DTranslation()
      ]).toEqual([3, 2])

      expect(matrix.data).toEqual([
        8, 2, 5,
        3, 7, 4,
        0, 0, 3
      ])
    })
  })

  describe('#extract2DScale', function () {
    it('extract a 2D scale vector from the matrix', function () {
      const matrix = Matrix3f.create([
        2, 0, 0,
        0, 4, 0,
        0, 0, 3
      ])

      expect([...matrix.extract2DScale()]).toEqual([2, 4])
      expect([
        ...Matrix3f.translate2D(3, 2).mul(Matrix3f.scale2D(2, 3))
                   .mul(Matrix3f.rotate2D(Math.PI / 4))
                   .extract2DScale()
      ]).toEqual([2, 3])
      expect([
        ...Matrix3f.translate2D(3, 2).mul(Matrix3f.scale2D(-2, 3))
                   .mul(Matrix3f.rotate2D(Math.PI / 4))
                   .extract2DScale()
      ]).toEqual([-2, 3])
      expect([
        ...Matrix3f.translate2D(3, 2).mul(Matrix3f.scale2D(2, -3))
                   .mul(Matrix3f.rotate2D(-Math.PI / 4))
                   .extract2DScale()
      ]).toEqual([2, -3])

      expect(matrix.data).toEqual([
        2, 0, 0,
        0, 4, 0,
        0, 0, 3
      ])
    })
  })

  describe('#extract2DRotation', function () {
    it('extract a 2D rotation', function () {
      expect(
        Matrix3f.translate2D(3, 2).mul(Matrix3f.scale2D(2, 3))
                .mul(Matrix3f.rotate2D(Math.PI / 4))
                .extract2DRotation()
      ).toEqual(Math.PI / 4)
    })
  })

  describe('#extract3DScale', function () {
    it('extract a 3D scale vector from the matrix', function () {
      expect(
        Matrix3f.scale3D(2, 3, 1)
                .mul(Matrix3f.rotate3D(Math.PI / 4, -Math.PI / 4, Math.PI / 4))
                .extract3DScale()
                .sub(2, 3, 1)
                .map(Math.abs)
                .reduce((a, b) => a + b) < 0.000000000000001
      ).toBeTruthy()

      expect(
        [...Matrix3f.scale3D(2, 3, 1).extract3DScale()]
      ).toEqual([2, 3, 1])

      expect(
        [...Matrix3f.scale3D(2, -3, 1).extract3DScale()]
      ).toEqual([2, -3, 1])
    })
  })

  describe('GLType', function () {
    it('is a FLOAT_MAT3 of size one', function () {
      expect(GLType.typeof(Matrix3f.scale3D(2, 3, 1))).toBe(GLType.FLOAT_MAT3)
      expect(GLType.sizeof(Matrix3f.scale3D(2, 3, 1))).toBe(1)
      expect([...GLType.valueof(Matrix3f.scale3D(2, 3, 1))]).toEqual([
        ...Matrix3f.scale3D(2, 3, 1)
      ])
      expect(
        GLType.valueof(Matrix3f.scale3D(2, 3, 1))
      ).toBeInstanceOf(Float32Array)
    })
  })
})
