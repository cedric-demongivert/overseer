/* eslint-env jest */

import { VertexFormat, GLType } from '../src/js/engine'

describe('engine.VertexFormat', function () {
  describe('#constructor', function () {
    it('allow to create a format', function () {
      const format = new VertexFormat(
        ['position', 'uv', 'color', 'weight'],
        [GLType.FLOAT_VEC3, GLType.FLOAT_VEC2, GLType.FLOAT_VEC3, GLType.FLOAT]
      )

      expect([...format.fields()]).toEqual([
        'position', 'uv', 'color', 'weight'
      ])

      expect(format.size).toBe([
        GLType.FLOAT_VEC3, GLType.FLOAT_VEC2, GLType.FLOAT_VEC3, GLType.FLOAT
      ].reduce(
        (a, b) => a + VertexFormat.SIZES[b], 0
      ))
    })

    it('throw an error if both fields and types array are not of the same size', function () {
      expect(_ => new VertexFormat(
        ['position', 'uv', 'color', 'weight'],
        [GLType.FLOAT_VEC3, GLType.FLOAT_VEC2, GLType.FLOAT_VEC3]
      )).toThrow()

      expect(_ => new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC3, GLType.FLOAT_VEC2, GLType.FLOAT_VEC3, GLType.FLOAT]
      )).toThrow()
    })

    it('throw an error if a field name is repeated', function () {
      expect(_ => new VertexFormat(
        ['position', 'uv', 'color', 'uv'],
        [GLType.FLOAT_VEC3, GLType.FLOAT_VEC2, GLType.FLOAT_VEC3]
      )).toThrow()
    })

    it('throw an error if an unknown type is passed', function () {
      expect(_ => new VertexFormat(
        ['position', 'uv', 'color', 'weight'],
        [GLType.FLOAT_VEC3, GLType.FLOAT_VEC2, Symbol(), GLType.FLOAT]
      )).toThrow()
    })
  })

  describe('#start', function () {
    it('return the starting byte of a field', function () {
      const format = new VertexFormat(
        ['position', 'uv', 'color', 'weight'],
        [GLType.FLOAT_VEC3, GLType.FLOAT_VEC2, GLType.FLOAT_VEC3, GLType.FLOAT]
      )

      expect(format.start('position')).toBe(0)
      expect(format.start('uv')).toBe(4 * 3)
      expect(format.start('color')).toBe(4 * 5)
      expect(format.start('weight')).toBe(4 * 8)
    })
  })

  describe('#end', function () {
    it('return the ending byte of a field', function () {
      const format = new VertexFormat(
        ['position', 'uv', 'color', 'weight'],
        [GLType.FLOAT_VEC3, GLType.FLOAT_VEC2, GLType.FLOAT_VEC3, GLType.FLOAT]
      )

      expect(format.end('position')).toBe(4 * 3)
      expect(format.end('uv')).toBe(4 * 5)
      expect(format.end('color')).toBe(4 * 8)
      expect(format.end('weight')).toBe(4 * 9)
    })
  })
})
