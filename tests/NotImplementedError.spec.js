/* eslint-env jest */

import { NotImplementedError } from '@errors'

describe('NotImplementedError', function () {
  it('is instanciable with a class and a method identifier', function () {
    for (const [clazz, method] of [
      [Array, 'isArray'],
      [Array, 'get length'],
      [Array, 'set length']
    ]) {
      const error = new NotImplementedError(clazz, method)

      expect(error.clazz).toBe(clazz)
      expect(error.method).toBe(method)
    }
  })

  describe('#get isGetter', function () {
    it('return true if the method that throwed the error is a getter', function () {
      expect(new NotImplementedError(Array, 'isArray').isGetter).toBeFalsy()
      expect(new NotImplementedError(Array, 'set isArray').isGetter).toBeFalsy()
      expect(new NotImplementedError(Array, 'get isArray').isGetter).toBeTruthy()
    })
  })

  describe('#get isSetter', function () {
    it('return true if the method that throwed the error is a setter', function () {
      expect(new NotImplementedError(Array, 'isArray').isSetter).toBeFalsy()
      expect(new NotImplementedError(Array, 'set isArray').isSetter).toBeTruthy()
      expect(new NotImplementedError(Array, 'get isArray').isSetter).toBeFalsy()
    })
  })

  describe('#get methodName', function () {
    it('return the name of the method that throwed the error', function () {
      expect(new NotImplementedError(Array, 'isArray').methodName).toBe('isArray')
      expect(new NotImplementedError(Array, 'set isArray').methodName).toBe('isArray')
      expect(new NotImplementedError(Array, 'get isArray').methodName).toBe('isArray')
    })
  })
})
