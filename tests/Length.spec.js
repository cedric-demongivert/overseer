/* eslint-env jest */

import { Length } from '../src/js/Length'

describe('Length', function () {
  it('is instanciable with a value and a unit', function () {
    const length = new Length(10, Length.cm)

    expect(length.value).toBe(10)
    expect(length.unit).toBe(Length.cm)
  })

  it('is instanciable with a string', function () {
    const length = new Length('10cm')

    expect(length.value).toBe(10)
    expect(length.unit).toBe(Length.cm)
  })

  it('is instanciable with another Length', function () {
    const length = new Length(new Length(10, Length.cm))

    expect(length.value).toBe(10)
    expect(length.unit).toBe(Length.cm)
  })

  it(
    'is instanciable with any object that define a Length.lengthValue method',
    function () {
      const length = new Length({
        [Length.lengthValue] () { return '10cm' }
      })

      expect(length.value).toBe(10)
      expect(length.unit).toBe(Length.cm)
    }
  )

  describe('static fromString', function () {
    it('allow to create a new Length from a string', function () {
      function data (l) { return [l.value, l.unit] }
      expect(data(Length.fromString('10cm'))).toEqual([10, Length.cm])
      expect(data(Length.fromString('-10cm'))).toEqual([-10, Length.cm])
      expect(data(Length.fromString('-  10cm'))).toEqual([-10, Length.cm])
      expect(data(Length.fromString('32m'))).toEqual([32, Length.m])
      expect(data(Length.fromString('32 m'))).toEqual([32, Length.m])
      expect(data(Length.fromString('32   m'))).toEqual([32, Length.m])
      expect(data(Length.fromString('8   km'))).toEqual([8, Length.km])
      expect(data(Length.fromString('a road of 8 km'))).toEqual([8, Length.km])
    })

    it('allow to set a length data from a string', function () {
      const length = new Length()
      function data (l) { return [l.value, l.unit] }

      Length.fromString('10cm', length)
      expect(data(length)).toEqual([10, Length.cm])

      Length.fromString('-10cm', length)
      expect(data(length)).toEqual([-10, Length.cm])

      Length.fromString('-  10cm', length)
      expect(data(length)).toEqual([-10, Length.cm])

      Length.fromString('32m', length)
      expect(data(length)).toEqual([32, Length.m])

      Length.fromString('32 m', length)
      expect(data(length)).toEqual([32, Length.m])

      Length.fromString('32   m', length)
      expect(data(length)).toEqual([32, Length.m])

      Length.fromString('8   km', length)
      expect(data(length)).toEqual([8, Length.km])

      Length.fromString('a road of 8 km', length)
      expect(data(length)).toEqual([8, Length.km])
    })
  })

  describe('static fromInstance', function () {
    it(
      'allow to create a new Length from any object that define a Length.lengthValue method',
      function () {
        function data (l) { return [l.value, l.unit] }

        expect(
          data(Length.fromInstance(new Length('10cm')))
        ).toEqual([10, Length.cm])

        expect(data(Length.fromInstance({
          [Length.lengthValue] () { return '32m' }
        }))).toEqual([32, Length.m])
      }
    )

    it(
      'allow to set a Length data from any object that define a Length.lengthValue method',
      function () {
        function data (l) { return [l.value, l.unit] }

        const length = new Length()

        Length.fromInstance(new Length('10cm'), length)
        expect(data(length)).toEqual([10, Length.cm])

        Length.fromInstance({
          [Length.lengthValue] () { return '32m' }
        }, length)
        expect(data(length)).toEqual([32, Length.m])
      }
    )
  })

  describe('static from', function () {
    it('allow to create a new Length with a value and a unit', function () {
      function data (l) { return [l.value, l.unit] }

      expect(data(Length.from(10, Length.cm))).toEqual([10, Length.cm])
      expect(data(Length.from(32, Length.m))).toEqual([32, Length.m])
    })

    it('allow to set a Length data with a value and a unit', function () {
      function data (l) { return [l.value, l.unit] }

      const length = new Length()

      Length.from(10, Length.cm, length)
      expect(data(length)).toEqual([10, Length.cm])

      Length.from(32, Length.m, length)
      expect(data(length)).toEqual([32, Length.m])
    })
  })

  describe('#set', function () {
    it('set the value of an instance to a new value and unit', function () {
      const length = new Length()

      length.set(10, Length.cm)

      expect(length.value).toBe(10)
      expect(length.unit).toBe(Length.cm)
    })

    it('set the value of an instance with a string', function () {
      const length = new Length()

      length.set('10cm')

      expect(length.value).toBe(10)
      expect(length.unit).toBe(Length.cm)
    })

    it(
      'set the value of an instance to the value of another Length',
      function () {
        const length = new Length()

        length.set(new Length(10, Length.cm))

        expect(length.value).toBe(10)
        expect(length.unit).toBe(Length.cm)
      }
    )

    it(
      'set the value of an instance to the result of any Length.lengthValue method of an object',
      function () {
        const length = new Length()

        length.set({
          [Length.lengthValue] () { return '10cm' }
        })

        expect(length.value).toBe(10)
        expect(length.unit).toBe(Length.cm)
      }
    )
  })

  describe('#in', function () {
    it('return the value of a length in another unit', function () {
      const length = new Length('1.56km')

      expect(length.value).toBe(1.56)
      expect(length.in(Length.m)).toBe(1560)

      length.set('100m')
      expect(length.value).toBe(100)
      expect(length.in(Length.km)).toBe(0.1)
    })
  })

  describe('#get value', function () {
    it('return the value of the length', function () {
      expect(new Length('10cm').value).toBe(10)
      expect(new Length('1.32m').value).toBe(1.32)
      expect(new Length(50, Length.km).value).toBe(50)
    })
  })

  describe('#set value', function () {
    it('change the value of a length', function () {
      const length = new Length('21cm')

      expect(length.value).toBe(21)
      expect(length.unit).toBe(Length.cm)

      length.value = 32

      expect(length.value).toBe(32)
      expect(length.unit).toBe(Length.cm)
    })
  })

  describe('#get unit', function () {
    it('return the unit of the length', function () {
      expect(new Length('10cm').unit).toBe(Length.cm)
      expect(new Length('1.32m').unit).toBe(Length.m)
      expect(new Length(50, Length.km).unit).toBe(Length.km)
    })
  })

  describe('#set unit', function () {
    it('change the unit of a length', function () {
      const length = new Length('21cm')

      expect(length.value).toBe(21)
      expect(length.unit).toBe(Length.cm)

      length.unit = Length.m

      expect(length.value).toBe(0.21)
      expect(length.unit).toBe(Length.m)
    })
  })

  describe('#gt', function () {
    it('return true if the length is greater than another', function () {
      const length = new Length('21cm')

      expect(length.gt(length)).toBeFalsy()
      expect(length.gt('21cm')).toBeFalsy()
      expect(length.gt('10cm')).toBeTruthy()
      expect(length.gt('31mm')).toBeTruthy()
      expect(length.gt({
        [Length.lengthValue]: () => [10, Length.km]
      })).toBeFalsy()
      expect(length.gt(new Length('20.99cm'))).toBeTruthy()
    })
  })

  describe('#gte', function () {
    it('return true if the length is greater or equal to another', function () {
      const length = new Length('21cm')

      expect(length.gte(length)).toBeTruthy()
      expect(length.gte('10cm')).toBeTruthy()
      expect(length.gte('21cm')).toBeTruthy()
      expect(length.gte('31mm')).toBeTruthy()
      expect(length.gte({
        [Length.lengthValue]: () => [10, Length.km]
      })).toBeFalsy()
      expect(length.gte(new Length('20.99cm'))).toBeTruthy()
    })
  })

  describe('#lt', function () {
    it('return true if the length is less than another', function () {
      const length = new Length('21cm')

      expect(length.lt(length)).toBeFalsy()
      expect(length.lt('10cm')).toBeFalsy()
      expect(length.lt('21cm')).toBeFalsy()
      expect(length.lt('31mm')).toBeFalsy()
      expect(length.lt({
        [Length.lengthValue]: () => [10, Length.km]
      })).toBeTruthy()
      expect(length.lt(new Length('20.99cm'))).toBeFalsy()
    })
  })

  describe('#lte', function () {
    it('return true if the length is less or equal to another', function () {
      const length = new Length('21cm')

      expect(length.lte(length)).toBeTruthy()
      expect(length.lte('10cm')).toBeFalsy()
      expect(length.lte('21cm')).toBeTruthy()
      expect(length.lte('31mm')).toBeFalsy()
      expect(length.lte({
        [Length.lengthValue]: () => [10, Length.km]
      })).toBeTruthy()
      expect(length.lte(new Length('20.99cm'))).toBeFalsy()
    })
  })

  describe('#equal', function () {
    it('return true if the length is equal to another', function () {
      const length = new Length('21cm')

      expect(length.equal(length)).toBeTruthy()
      expect(length.equal('10cm')).toBeFalsy()
      expect(length.equal('21cm')).toBeTruthy()
      expect(length.equal('31mm')).toBeFalsy()
      expect(length.equal({
        [Length.lengthValue]: () => [10, Length.km]
      })).toBeFalsy()
      expect(length.equal(new Length('20.99cm'))).toBeFalsy()
    })
  })

  describe('#add', function () {
    it('add a length to the current length', function () {
      const length = new Length('21cm')

      function data (l) { return [l.value, l.unit] }

      expect(data(length.add('12cm'))).toEqual([33, Length.cm])
      expect(data(length.add('1m'))).toEqual([133, Length.cm])
      expect(data(length.add('1dm').add('5cm'))).toEqual([148, Length.cm])
    })
  })

  describe('#subtract', function () {
    it('subtract a length to the current length', function () {
      const length = new Length('148cm')

      function data (l) { return [l.value, l.unit] }

      expect(
        data(length.subtract('1dm').subtract('5cm'))
      ).toEqual([133, Length.cm])
      expect(data(length.subtract('1m'))).toEqual([33, Length.cm])
      expect(data(length.subtract('12cm'))).toEqual([21, Length.cm])
    })
  })

  describe('#multiply', function () {
    it('multiplytiply the length', function () {
      const length = new Length('11cm')

      function data (l) { return [l.value, l.unit] }

      expect(data(length.multiply(2).multiply(2))).toEqual([44, Length.cm])
    })
  })

  describe('#divide', function () {
    it('divide the length', function () {
      const length = new Length('44cm')

      function data (l) { return [l.value, l.unit] }

      expect(data(length.divide(2).divide(2))).toEqual([11, Length.cm])
    })
  })

  describe('#clone', function () {
    it('clone the current length instance', function () {
      const length = new Length('2.5km')
      const clone = length.clone()

      expect(length).not.toBe(clone)
      expect(length.value).toBe(clone.value)
      expect(length.unit).toBe(clone.unit)
    })
  })

  describe('#valueOf', function () {
    it('return the length as a string', function () {
      const length = new Length('2.5km')

      expect(length.valueOf()).toBe('2.5km')
    })
  })

  describe('#toString', function () {
    it('return the length as a string', function () {
      const length = new Length('2.5km')

      expect(length.toString()).toBe('2.5km')
    })
  })
})
