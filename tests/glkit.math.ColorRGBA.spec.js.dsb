/* eslint-env jest */

import { ColorRGBA } from '@glkit/math'
import { GLType } from '@glkit/gl/GLType'

describe('glkit.math.ColorRGBA', function () {
  describe('GLType', function () {
    it('is a FLOAT_VEC4 of size one', function () {
      expect(GLType.typeof(new ColorRGBA(6, 2, 3))).toBe(GLType.FLOAT_VEC4)
      expect(GLType.sizeof(new ColorRGBA(6, 2, 3))).toBe(1)
      expect([...GLType.valueof(new ColorRGBA(6, 2, 3))]).toEqual([6, 2, 3, 1])
    })
  })

  it('is iterable', function () {
    expect([...(new ColorRGBA())]).toEqual([1, 1, 1, 1])
  })
})
