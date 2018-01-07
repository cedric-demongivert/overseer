/* eslint-env jest */

import { Vector3f } from '../src/js/engine/geometry'
import { GLType } from '../src/js/engine/gl'

describe('engine.geometry.Vector3f', function () {
  describe('#from', function () {
    it('create a vector from an array', function () {
      expect(Vector3f.from([1, 2, 3]).toArray()).toEqual([1, 2, 3])
      expect(Vector3f.from([1]).toArray()).toEqual([1, 0, 0])
    })

    it('create a vector from an iterable value', function () {
      expect(Vector3f.from(new Vector3f(5, 6, 7)).toArray()).toEqual([5, 6, 7])
    })
  })

  describe('#create', function () {
    it('is like a standard instanciation', function () {
      expect(Vector3f.create(1, 2, 3).toArray()).toEqual([1, 2, 3])
    })
  })

  describe('#dimension', function () {
    it('return always 3', function () {
      expect(new Vector3f().dimension).toBe(3)
    })
  })

  describe('#get', function () {
    it('return x, y or z', function () {
      expect(new Vector3f(1, 2, 3).get(0)).toBe(1)
      expect(new Vector3f(1, 2, 3).get(1)).toBe(2)
      expect(new Vector3f(1, 2, 3).get(2)).toBe(3)
    })

    it('throw otherwise', function () {
      expect(_ => new Vector3f(1, 2, 3).get(-2)).toThrow()
      expect(_ => new Vector3f(1, 2, 3).get(-1)).toThrow()
      expect(_ => new Vector3f(1, 2, 3).get(3)).toThrow()
      expect(_ => new Vector3f(1, 2, 3).get(4)).toThrow()
    })
  })

  describe('#set', function () {
    it('set x, y or z', function () {
      expect(new Vector3f(1, 2, 3).set(0, 3).toArray()).toEqual([3, 2, 3])
      expect(new Vector3f(1, 2, 3).set(1, 3).toArray()).toEqual([1, 3, 3])
      expect(new Vector3f(1, 2, 3).set(2, 6).toArray()).toEqual([1, 2, 6])
    })

    it('throw otherwise', function () {
      expect(_ => new Vector3f(1, 2, 3).set(-1, 3)).toThrow()
      expect(_ => new Vector3f(1, 2, 3).set(3, 3)).toThrow()
    })
  })

  describe('#get x', function () {
    it('return the x component of the vector', function () {
      expect(new Vector3f(1, 2, 3).x).toEqual(1)
      expect(new Vector3f(2, 5, 4).x).toEqual(2)
      expect(new Vector3f(3, 2, 5).x).toEqual(3)
    })
  })

  describe('#get y', function () {
    it('return the y component of the vector', function () {
      expect(new Vector3f(1, 2, 3).y).toEqual(2)
      expect(new Vector3f(2, 5, 4).y).toEqual(5)
      expect(new Vector3f(3, 2, 5).y).toEqual(2)
    })
  })

  describe('#get z', function () {
    it('return the z component of the vector', function () {
      expect(new Vector3f(1, 2, 3).z).toEqual(3)
      expect(new Vector3f(2, 5, 4).z).toEqual(4)
      expect(new Vector3f(3, 2, 5).z).toEqual(5)
    })
  })

  describe('#setX', function () {
    it('set the x component of a vector', function () {
      expect(new Vector3f(1, 2, 3).setX(5).x).toEqual(5)
      expect(new Vector3f(1, 2, 3).setX(5).y).toEqual(2)
      expect(new Vector3f(1, 2, 3).setX(5).z).toEqual(3)
    })
  })

  describe('#setY', function () {
    it('set the y component of a vector', function () {
      expect(new Vector3f(1, 2, 3).setY(5).x).toEqual(1)
      expect(new Vector3f(1, 2, 3).setY(5).y).toEqual(5)
      expect(new Vector3f(1, 2, 3).setY(5).z).toEqual(3)
    })
  })

  describe('#setZ', function () {
    it('set the z component of a vector', function () {
      expect(new Vector3f(1, 2, 3).setZ(5).x).toEqual(1)
      expect(new Vector3f(1, 2, 3).setZ(5).y).toEqual(2)
      expect(new Vector3f(1, 2, 3).setZ(5).z).toEqual(5)
    })
  })

  for (const x of ['x', 'y', 'z']) {
    for (const y of ['x', 'y', 'z']) {
      describe(`#get ${x}${y}`, function () {
        it(`return a Vector2f(${x}, ${y})`, function () {
          const vector = new Vector3f(1, 2, 3)
          expect(vector[x + y].toArray()).toEqual(
            [vector[x], vector[y]]
          )
        })
      })
    }
  }

  for (const x of ['x', 'y', 'z']) {
    for (const y of ['x', 'y', 'z']) {
      for (const z of ['x', 'y', 'z']) {
        describe(`#get ${x}${y}${z}`, function () {
          it(`return a Vector3f(${x}, ${y}, ${z})`, function () {
            const vector = new Vector3f(1, 2, 3)
            expect(vector[x + y + z].toArray()).toEqual(
              [vector[x], vector[y], vector[z]]
            )
          })
        })
      }
    }
  }

  describe('#add', function () {
    it('perform an addition on a vector and return a result', function () {
      const vector = new Vector3f(1, 2, 3)
      expect(vector.add([3, 5, 3]).toArray()).toEqual([4, 7, 6])
      expect(vector.add(new Vector3f(3, 5, 3)).toArray()).toEqual([4, 7, 6])
      expect(vector.add(3, ...Vector3f.create(3, 5, 3)).toArray()).toEqual([4, 5, 8])
      expect(vector.add(3, 5, 3).toArray()).toEqual([4, 7, 6])
      expect(vector.toArray()).toEqual([1, 2, 3])
    })
  })

  describe('#sub', function () {
    it('perform an subtraction on a vector and return a result', function () {
      const vector = new Vector3f(1, 2, 3)
      expect(vector.sub([3, 5, 3]).toArray()).toEqual([-2, -3, 0])
      expect(vector.sub(new Vector3f(3, 5, 3)).toArray()).toEqual([-2, -3, 0])
      expect(vector.sub(3, ...Vector3f.create(3, 5, 3)).toArray()).toEqual([-2, -1, -2])
      expect(vector.sub(3, 5, 3).toArray()).toEqual([-2, -3, 0])
      expect(vector.toArray()).toEqual([1, 2, 3])
    })
  })

  describe('#mul', function () {
    it('perform a multiplication on a vector and return a result', function () {
      const vector = new Vector3f(1, 2, 3)
      expect(vector.mul(2).toArray()).toEqual([2, 4, 6])
      expect(vector.mul(-1).toArray()).toEqual([-1, -2, -3])
      expect(vector.toArray()).toEqual([1, 2, 3])
    })
  })

  describe('#div', function () {
    it('perform a division on a vector and return a result', function () {
      const vector = new Vector3f(1, 2, 4)
      expect(vector.div(2).toArray()).toEqual([0.5, 1, 2])
      expect(vector.div(-1).toArray()).toEqual([-1, -2, -4])
      expect(vector.toArray()).toEqual([1, 2, 4])
    })
  })

  describe('#dot', function () {
    it('perform a dot product', function () {
      const vector = new Vector3f(1, 2, 3)
      expect(vector.dot(2, 5, 3)).toBe(1 * 2 + 2 * 5 + 3 * 3)
      expect(vector.dot(Vector3f.create(2, 5, 3))).toBe(1 * 2 + 2 * 5 + 3 * 3)
      expect(vector.dot([2, 5, 3])).toBe(1 * 2 + 2 * 5 + 3 * 3)
      expect(vector.toArray()).toEqual([1, 2, 3])
    })
  })

  describe('#get squaredLength', function () {
    it('return the squared length', function () {
      const vector = new Vector3f(6, 2, 3)
      expect(vector.squaredLength).toBe(6 * 6 + 2 * 2 + 3 * 3)
      expect(vector.toArray()).toEqual([6, 2, 3])
    })
  })

  describe('#equal', function () {
    it('check equality between two vectors', function () {
      const vector = new Vector3f(6, 2, 3)
      expect(vector.equal(6, 2, 3)).toBeTruthy()
      expect(vector.equal([6, 2, 3])).toBeTruthy()
      expect(vector.equal(vector)).toBeTruthy()
      expect(vector.equal(3, 2, 3)).toBeFalsy()
      expect(vector.equal([3, 2, 3])).toBeFalsy()
      expect(vector.equal(vector.setX(3))).toBeFalsy()
      expect(vector.toArray()).toEqual([6, 2, 3])
    })
  })

  describe('#map', function () {
    it('map components of a vector', function () {
      const vector = new Vector3f(6, 2, 3)
      expect(vector.map(x => x * x).toArray()).toEqual([6 * 6, 2 * 2, 3 * 3])
      expect(vector.toArray()).toEqual([6, 2, 3])
    })
  })

  describe('#reduce', function () {
    it('reduce components of a vector', function () {
      const vector = new Vector3f(6, 2, 3)
      expect(vector.reduce((a, b) => a + b * b, 0)).toBe(6 * 6 + 2 * 2 + 3 * 3)
      expect(vector.toArray()).toEqual([6, 2, 3])
    })
  })

  describe('#toString', function () {
    it('return the vector as a string', function () {
      expect(new Vector3f(6, 2, 3).toString()).toBe('Vector3f(6, 2, 3)')
      expect(new Vector3f(3, -2, 3).toString()).toBe('Vector3f(3, -2, 3)')
    })
  })

  describe('GLType', function () {
    it('is a FLOAT_VEC3 of size one', function () {
      expect(GLType.typeof(new Vector3f(6, 2, 3))).toBe(GLType.FLOAT_VEC3)
      expect(GLType.sizeof(new Vector3f(6, 2, 3))).toBe(1)
      expect([...GLType.valueof(new Vector3f(6, 2, 3))]).toEqual([6, 2, 3])
    })
  })

  it('is iterable', function () {
    expect([...(new Vector3f(6, 2, 3))]).toEqual([6, 2, 3])
  })
})
