/** eslint-env jest */

import { Match } from '@redux/Match'

describe('Match', function () {
  describe('#compare', function () {
    it('compare an index with a range', function () {
      expect(Match.compare(1, 5, 1)).toBe(0)
      expect(Match.compare(1, 5, 2)).toBe(0)
      expect(Match.compare(1, 5, 5)).toBe(1)
      expect(Match.compare(1, 5, 0)).toBe(-1)
      expect(Match.compare(1, 5, 10)).toBe(1)
    })

    it('compare an index with an infinite range', function () {
      expect(Match.compare(null, null, 1)).toBe(0)
    })

    it('compare an index with a semi-infinite range', function () {
      expect(Match.compare(null, 5, 1)).toBe(0)
      expect(Match.compare(null, 5, 5)).toBe(1)
      expect(Match.compare(null, 5, 7)).toBe(1)

      expect(Match.compare(5, null, 1)).toBe(-1)
      expect(Match.compare(5, null, 5)).toBe(0)
      expect(Match.compare(5, null, 7)).toBe(0)
    })
  })

  describe('#constructor', function () {
    it('allows to instanciate an empty match', function () {
      const match = new Match()

      expect(match.ranges).toBe(0)
      expect(match.toArray()).toEqual([])
    })
  })

  describe('#boundary', function () {
    it('find the boundary just before the given index', function () {
      const match = new Match()

      match.addRange(5, 9)
      match.addRange(10, 22)

      expect(match.boundary(2)).toBe(-1)
      expect(match.boundary(5)).toBe(0)
      expect(match.boundary(6)).toBe(0)
      expect(match.boundary(9)).toBe(1)
      expect(match.boundary(10)).toBe(2)
      expect(match.boundary(11)).toBe(2)
      expect(match.boundary(22)).toBe(3)
      expect(match.boundary(50)).toBe(3)
    })
  })

  describe('#addRange', function () {
    it('allows to match a range of indexes', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(10, 20)

      expect(match.toArray()).toEqual([10, 20])

      match.addRange(40, 50)
      match.addRange(25, 36)
      match.addRange(3, 9)

      expect(match.toArray()).toEqual([3, 9, 10, 20, 25, 36, 40, 50])
    })

    it('it merge touching ranges', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(10, 20)
      match.addRange(20, 30)

      expect(match.toArray()).toEqual([10, 30])
    })

    it('it merge overlaping ranges', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(5, 10)
      match.addRange(15, 20)
      match.addRange(25, 30)
      match.addRange(35, 40)

      expect(match.toArray()).toEqual([5, 10, 15, 20, 25, 30, 35, 40])

      match.addRange(3, 8)

      expect(match.toArray()).toEqual([3, 10, 15, 20, 25, 30, 35, 40])

      match.addRange(37, 48)

      expect(match.toArray()).toEqual([3, 10, 15, 20, 25, 30, 35, 48])

      match.addRange(12, 32)

      expect(match.toArray()).toEqual([3, 10, 12, 32, 35, 48])

      match.addRange(8, 37)

      expect(match.toArray()).toEqual([3, 48])
    })

    it('it does nothing if the range to add is already included into another one', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(5, 10)
      match.addRange(15, 20)
      match.addRange(25, 30)
      match.addRange(35, 40)

      expect(match.toArray()).toEqual([5, 10, 15, 20, 25, 30, 35, 40])

      match.addRange(17, 19)

      expect(match.toArray()).toEqual([5, 10, 15, 20, 25, 30, 35, 40])
    })

    it('allows to add incomplete ranges', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(null, 20)

      expect(match.toArray()).toEqual([null, 20])

      match.addRange(40, 50)
      match.addRange(25, 36)

      expect(match.toArray()).toEqual([null, 20, 25, 36, 40, 50])
    })

    it('allows to add left-infinite ranges', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(null, 20)

      expect(match.toArray()).toEqual([null, 20])

      match.addRange(40, 50)
      match.addRange(25, 36)

      expect(match.toArray()).toEqual([null, 20, 25, 36, 40, 50])
    })

    it('can merge left-infinite ranges', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(10, 20)
      match.addRange(40, 50)
      match.addRange(25, 36)

      expect(match.toArray()).toEqual([10, 20, 25, 36, 40, 50])

      match.addRange(null, 15)

      expect(match.toArray()).toEqual([null, 20, 25, 36, 40, 50])

      match.addRange(null, 41)

      expect(match.toArray()).toEqual([null, 50])
    })

    it('allows to add right-infinite ranges', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(60, null)

      expect(match.toArray()).toEqual([60, null])

      match.addRange(40, 50)
      match.addRange(25, 36)

      expect(match.toArray()).toEqual([25, 36, 40, 50, 60, null])
    })

    it('can merge right-infinite ranges', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(10, 20)
      match.addRange(25, 36)
      match.addRange(40, 50)

      expect(match.toArray()).toEqual([10, 20, 25, 36, 40, 50])

      match.addRange(45, null)

      expect(match.toArray()).toEqual([10, 20, 25, 36, 40, null])

      match.addRange(13, null)

      expect(match.toArray()).toEqual([10, null])
    })

    it('allows to add an full-infinite range', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(null, null)

      expect(match.toArray()).toEqual([null, null])
    })

    it('allows to merge with full-infinite range', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(10, 20)
      match.addRange(25, 36)
      match.addRange(40, 50)

      expect(match.toArray()).toEqual([10, 20, 25, 36, 40, 50])

      match.addRange(null, null)

      expect(match.toArray()).toEqual([null, null])
    })
  })

  describe('#invert', function () {
    it('invert a match', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(null, 20)
      match.addRange(25, 36)
      match.addRange(40, 50)

      expect(match.toArray()).toEqual([null, 20, 25, 36, 40, 50])

      match.invert()

      expect(match.toArray()).toEqual([20, 25, 36, 40, 50, null])

      match.invert()

      expect(match.toArray()).toEqual([null, 20, 25, 36, 40, 50])
    })

    it('can invert all match', function () {
      const match = new Match()

      expect(match.toArray()).toEqual([])

      match.addRange(null, null)

      expect(match.toArray()).toEqual([null, null])

      match.invert()

      expect(match.toArray()).toEqual([])

      match.invert()

      expect(match.toArray()).toEqual([null, null])
    })
  })
})
