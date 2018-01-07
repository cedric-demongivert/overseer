/* eslint-env jest */

import { Vector } from '../src/js/engine/geometry'

describe('engine.geometry.Vector', function () {
  it('is an interface', function () {
    const instance = new Vector()

    for (const abstractMethod of [
      'get', 'set', 'add', 'sub', 'mul', 'div', 'dot', 'equal', 'map', 'reduce'
    ]) {
      expect(_ => instance[abstractMethod]()).toThrow()
    }

    expect(_ => instance.dimension).toThrow()
    expect(_ => instance.squaredLength).toThrow()
  })

  describe('length', function () {
    it('use squared length in order to return a result', function () {
      const instance = new Vector()
      const get = jest.fn(_ => 8 * 8)

      Object.defineProperty(instance, 'squaredLength', { get })

      expect(instance.length).toBe(8)
      expect(get).toHaveBeenCalled()
    })
  })

  describe('toArray', function () {
    it('use the Symbol.iterator function of the instance in order to return an array', function () {
      const instance = new Vector()
      const iterator = jest.fn(function * () {
        yield * [1, 2, 3]
      })

      instance[Symbol.iterator] = iterator

      expect(instance.toArray()).toEqual([1, 2, 3])
      expect(iterator).toHaveBeenCalled()
    })
  })

  describe('negate', function () {
    it('call multiply', function () {
      const instance = new Vector()

      instance.multiply = jest.fn()
      instance.negate()

      expect(instance.multiply).toHaveBeenCalledWith(-1)
    })
  })

  describe('normalize', function () {
    it('call divide with the result of length', function () {
      const instance = new Vector()
      const get = jest.fn(_ => 5)

      Object.defineProperty(instance, 'length', { get })
      instance.divide = jest.fn()
      instance.normalize()

      expect(get).toHaveBeenCalled()
      expect(instance.divide).toHaveBeenCalledWith(5)
    })
  })

  describe('ceil', function () {
    it('call map method with a ceil method', function () {
      const instance = new Vector()
      instance.map = jest.fn()
      instance.ceil()

      expect(instance.map).toHaveBeenCalledWith(Math.ceil)
    })
  })

  describe('floor', function () {
    it('call map method with a floor method', function () {
      const instance = new Vector()
      instance.map = jest.fn()
      instance.floor()

      expect(instance.map).toHaveBeenCalledWith(Math.floor)
    })
  })

  describe('round', function () {
    it('call map method with a round method', function () {
      const instance = new Vector()
      instance.map = jest.fn()
      instance.round()

      expect(instance.map).toHaveBeenCalledWith(Math.round)
    })
  })

  describe('max', function () {
    it('call map method with a max method', function () {
      const instance = new Vector()
      instance.map = jest.fn()
      instance.max(5)

      expect(instance.map).toHaveBeenCalled()

      expect(instance.map.mock.calls[0][0](6)).toBe(5)
      expect(instance.map.mock.calls[0][0](5)).toBe(5)
      expect(instance.map.mock.calls[0][0](4)).toBe(4)
    })
  })

  describe('min', function () {
    it('call map method with a min method', function () {
      const instance = new Vector()
      instance.map = jest.fn()
      instance.min(5)

      expect(instance.map).toHaveBeenCalled()

      expect(instance.map.mock.calls[0][0](6)).toBe(6)
      expect(instance.map.mock.calls[0][0](5)).toBe(5)
      expect(instance.map.mock.calls[0][0](4)).toBe(5)
    })
  })

  describe('clamp', function () {
    it('call map method with a clamp method', function () {
      const instance = new Vector()
      instance.map = jest.fn()
      instance.clamp(5, 5)

      expect(instance.map).toHaveBeenCalled()

      expect(instance.map.mock.calls[0][0](6)).toBe(5)
      expect(instance.map.mock.calls[0][0](5)).toBe(5)
      expect(instance.map.mock.calls[0][0](4)).toBe(5)
    })
  })
})
