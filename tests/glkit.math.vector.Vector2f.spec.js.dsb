/* eslint-env jest */

import { Vector2f } from '@glkit/math'
import { GLType } from '@glkit/gl/GLType'

describe('glkit.math.vector.Vector2f', function () {
  describe('#from', function () {
    it('create a vector from an array', function () {
      expect(Vector2f.from([1, 2]).toArray()).toEqual([1, 2])
    })

    it('create a vector from an iterable value', function () {
      expect(Vector2f.from(new Vector2f(5, 6)).toArray()).toEqual([5, 6])
    })
  })

  describe('#create', function () {
    it('is like a standard instanciation', function () {
      expect(Vector2f.create(1, 2).toArray()).toEqual([1, 2])
    })
  })

  describe('#dimension', function () {
    it('return always 2', function () {
      expect(new Vector2f().dimension).toBe(2)
    })
  })

  describe('#get', function () {
    it('return x or y', function () {
      expect(new Vector2f(1, 2).get(0)).toBe(1)
      expect(new Vector2f(1, 2).get(1)).toBe(2)
    })

    it('throw otherwise', function () {
      expect(_ => new Vector2f(1, 2).get(-2)).toThrow()
      expect(_ => new Vector2f(1, 2).get(-1)).toThrow()
      expect(_ => new Vector2f(1, 2).get(2)).toThrow()
      expect(_ => new Vector2f(1, 2).get(3)).toThrow()
    })
  })

  describe('#set', function () {
    it('set x or y', function () {
      expect(new Vector2f(1, 2).set(0, 3).toArray()).toEqual([3, 2])
      expect(new Vector2f(1, 2).set(1, 3).toArray()).toEqual([1, 3])
    })

    it('throw otherwise', function () {
      expect(_ => new Vector2f(1, 2).set(-1, 3)).toThrow()
      expect(_ => new Vector2f(1, 2).set(2, 3)).toThrow()
    })
  })

  describe('#get x', function () {
    it('return the x component of a vector', function () {
      expect(new Vector2f(1, 2).x).toEqual(1)
      expect(new Vector2f(2, 5).x).toEqual(2)
      expect(new Vector2f(3, 2).x).toEqual(3)
    })
  })

  describe('#get y', function () {
    it('return the y component of a vector', function () {
      expect(new Vector2f(1, 2).y).toEqual(2)
      expect(new Vector2f(2, 5).y).toEqual(5)
      expect(new Vector2f(3, 2).y).toEqual(2)
    })
  })

  describe('#setX', function () {
    it('set the x component of a vector', function () {
      expect(new Vector2f(1, 2).setX(5).x).toEqual(5)
      expect(new Vector2f(1, 2).setX(5).y).toEqual(2)
    })
  })

  describe('#setY', function () {
    it('set the y component of a vector', function () {
      expect(new Vector2f(1, 2).setY(5).x).toEqual(1)
      expect(new Vector2f(1, 2).setY(5).y).toEqual(5)
    })
  })

  describe('#get xy', function () {
    it('return the current instance', function () {
      const vector = new Vector2f(1, 2)
      expect(vector.xy).toEqual(vector)
    })
  })

  describe('#get yx', function () {
    it('return an inversed vector', function () {
      const vector = new Vector2f(1, 2)
      expect(vector.yx.toArray()).toEqual([2, 1])
    })
  })

  describe('#add', function () {
    it('perform an addition on a vector and return a result', function () {
      const vector = new Vector2f(1, 2)
      expect(vector.add([3, 5]).toArray()).toEqual([4, 7])
      expect(vector.add(new Vector2f(3, 5)).toArray()).toEqual([4, 7])
      expect(vector.add(3, ...Vector2f.create(3, 5)).toArray()).toEqual([4, 5])
      expect(vector.add(3, 5).toArray()).toEqual([4, 7])
      expect(vector.toArray()).toEqual([1, 2])
    })
  })

  describe('#sub', function () {
    it('perform an subtraction on a vector and return a result', function () {
      const vector = new Vector2f(1, 2)
      expect(vector.sub([3, 5]).toArray()).toEqual([-2, -3])
      expect(vector.sub(new Vector2f(3, 5)).toArray()).toEqual([-2, -3])
      expect(vector.sub(3, ...Vector2f.create(3, 5)).toArray()).toEqual([-2, -1])
      expect(vector.sub(3, 5).toArray()).toEqual([-2, -3])
      expect(vector.toArray()).toEqual([1, 2])
    })
  })

  describe('#mul', function () {
    it('perform a multiplication on a vector and return a result', function () {
      const vector = new Vector2f(1, 2)
      expect(vector.mul(2).toArray()).toEqual([2, 4])
      expect(vector.mul(-1).toArray()).toEqual([-1, -2])
      expect(vector.toArray()).toEqual([1, 2])
    })
  })

  describe('#div', function () {
    it('perform a division on a vector and return a result', function () {
      const vector = new Vector2f(1, 2)
      expect(vector.div(2).toArray()).toEqual([0.5, 1])
      expect(vector.div(-1).toArray()).toEqual([-1, -2])
      expect(vector.toArray()).toEqual([1, 2])
    })
  })

  describe('#dot', function () {
    it('perform a dot product', function () {
      const vector = new Vector2f(1, 2)
      expect(vector.dot(2, 5)).toBe(1 * 2 + 2 * 5)
      expect(vector.dot(Vector2f.create(2, 5))).toBe(1 * 2 + 2 * 5)
      expect(vector.dot([2, 5])).toBe(1 * 2 + 2 * 5)
      expect(vector.toArray()).toEqual([1, 2])
    })
  })

  describe('#get squaredLength', function () {
    it('return the squared length', function () {
      const vector = new Vector2f(6, 2)
      expect(vector.squaredLength).toBe(6 * 6 + 2 * 2)
      expect(vector.toArray()).toEqual([6, 2])
    })
  })

  describe('#equal', function () {
    it('check equality between two vectors', function () {
      const vector = new Vector2f(6, 2)
      expect(vector.equal(6, 2)).toBeTruthy()
      expect(vector.equal([6, 2])).toBeTruthy()
      expect(vector.equal(vector)).toBeTruthy()
      expect(vector.equal(3, 2)).toBeFalsy()
      expect(vector.equal([3, 2])).toBeFalsy()
      expect(vector.equal(vector.setX(3))).toBeFalsy()
      expect(vector.toArray()).toEqual([6, 2])
    })
  })

  describe('#map', function () {
    it('map components of a vector', function () {
      const vector = new Vector2f(6, 2)
      expect(vector.map(x => x * x).toArray()).toEqual([6 * 6, 2 * 2])
      expect(vector.toArray()).toEqual([6, 2])
    })
  })

  describe('#reduce', function () {
    it('reduce components of a vector', function () {
      const vector = new Vector2f(6, 2)
      expect(vector.reduce((a, b) => a + b * b, 0)).toBe(6 * 6 + 2 * 2)
      expect(vector.toArray()).toEqual([6, 2])
    })
  })

  describe('#toString', function () {
    it('return the vector as a string', function () {
      expect(new Vector2f(6, 2).toString()).toBe('Vector2f(6, 2)')
      expect(new Vector2f(3, -2).toString()).toBe('Vector2f(3, -2)')
    })
  })

  describe('GLType', function () {
    it('is a FLOAT_VEC2 of size one', function () {
      expect(GLType.typeof(new Vector2f(6, 2))).toBe(GLType.FLOAT_VEC2)
      expect(GLType.sizeof(new Vector2f(6, 2))).toBe(1)
      expect([...GLType.valueof(new Vector2f(6, 2))]).toEqual([6, 2])
    })
  })

  it('is iterable', function () {
    expect([...(new Vector2f(6, 2))]).toEqual([6, 2])
  })
})
