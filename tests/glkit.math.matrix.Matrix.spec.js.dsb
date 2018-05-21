/* eslint-env jest */

import { Matrix } from '@glkit/math'

describe('glkit.math.matrix.Matrix', function () {
  it('is an interface', function () {
    const instance = new Matrix()

    for (const abstractMethod of [
      'get', 'set', 'add', 'sub', 'div', 'mul', 'transpose',
      'invert', 'row', 'column'
    ]) {
      expect(_ => instance[abstractMethod]()).toThrow()
    }

    expect(_ => instance.height).toThrow()
    expect(_ => instance.width).toThrow()
    expect(_ => instance.determinant).toThrow()
  })

  describe('#itrow', function () {
    it('iterate over a row by using #get', function () {
      const instance = new Matrix()
      const width = _ => 5

      Object.defineProperty(instance, 'width', { get: width })
      instance.get = jest.fn((col, row) => col)

      const result = [...instance.itrow(2)]

      expect(result).toEqual([0, 1, 2, 3, 4])
      expect(instance.get).toHaveBeenCalledTimes(5)
      expect(instance.get.mock.calls).toEqual([
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [4, 2]
      ])
    })
  })

  describe('#itcolumn', function () {
    it('iterate over a column by using #get', function () {
      const instance = new Matrix()
      const height = _ => 5

      Object.defineProperty(instance, 'height', { get: height })
      instance.get = jest.fn((col, row) => row)

      const result = [...instance.itcolumn(2)]

      expect(result).toEqual([0, 1, 2, 3, 4])
      expect(instance.get).toHaveBeenCalledTimes(5)
      expect(instance.get.mock.calls).toEqual([
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4]
      ])
    })
  })

  describe('#rows', function () {
    it('iterate over each row of the matrix by using #row', function () {
      const instance = new Matrix()
      const height = _ => 5

      Object.defineProperty(instance, 'height', { get: height })
      instance.row = jest.fn((i) => i)

      const result = [...instance.rows()]

      expect(result).toEqual([0, 1, 2, 3, 4])
      expect(instance.row).toHaveBeenCalledTimes(5)
      expect(instance.row.mock.calls).toEqual([
        [0], [1], [2], [3], [4]
      ])
    })
  })

  describe('#columns', function () {
    it('iterate over each column of the matrix by using #column', function () {
      const instance = new Matrix()
      const width = _ => 5

      Object.defineProperty(instance, 'width', { get: width })
      instance.column = jest.fn((i) => i)

      const result = [...instance.columns()]

      expect(result).toEqual([0, 1, 2, 3, 4])
      expect(instance.column).toHaveBeenCalledTimes(5)
      expect(instance.column.mock.calls).toEqual([
        [0], [1], [2], [3], [4]
      ])
    })
  })
})
