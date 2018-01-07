/* eslint-env jest */

import { VertexFormat, VertexBuffer, GLType } from '../src/js/engine'

describe('engine.VertexBuffer', function () {
  describe('static empty', function () {
    it('create a new empty vertex buffer with an initial capacity', function () {
      const format = new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      )
      const capacity = 25
      const buffer = VertexBuffer.empty(format, capacity)

      expect(buffer).toBeInstanceOf(VertexBuffer)
      expect(buffer.capacity).toBe(capacity)
      expect(buffer.size).toBe(0)
      expect(buffer.format).toBe(format)
    })

    it('create a vertex buffer with a capacity of 16 vertex by default', function () {
      const format = new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      )
      const buffer = VertexBuffer.empty(format)

      expect(buffer).toBeInstanceOf(VertexBuffer)
      expect(buffer.capacity).toBe(16)
      expect(buffer.size).toBe(0)
      expect(buffer.format).toBe(format)
    })
  })

  describe('static clone', function () {
    it('create a clone of an existing vertex buffer', function () {
      const format = new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      )
      const base = VertexBuffer.empty(format, 46)

      for (let i = 0; i < 30; ++i) {
        base.push({
          position: [i, i + 1],
          uv: [i + 2, i + 3],
          color: [i + 4, i + 5, i + 6]
        })
      }

      const clone = VertexBuffer.clone(base)

      expect(clone).not.toBe(base)
      expect(clone.capacity).toBe(base.capacity)
      expect(clone.size).toBe(base.size)
      expect(clone.equals(base)).toBeTruthy()
    })

    it('throw an error if null is passed as a vertex buffer to clone', function () {
      expect(_ => VertexBuffer.clone(null)).toThrow()
    })
  })

  describe('#constructor', function () {
    it('allow to create a new empty vertex buffer with an initial capacity', function () {
      const format = new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      )
      const capacity = 25
      const buffer = new VertexBuffer(format, capacity)

      expect(buffer).toBeInstanceOf(VertexBuffer)
      expect(buffer.capacity).toBe(capacity)
      expect(buffer.size).toBe(0)
      expect(buffer.format).toBe(format)
    })

    it('create a vertex buffer with a capacity of 16 vertex by default', function () {
      const format = new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      )
      const buffer = new VertexBuffer(format)

      expect(buffer).toBeInstanceOf(VertexBuffer)
      expect(buffer.capacity).toBe(16)
      expect(buffer.size).toBe(0)
      expect(buffer.format).toBe(format)
    })
  })

  describe('#push', function () {
    it('append vertex data to the buffer', function () {
      const buffer = new VertexBuffer(new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      ))

      expect(buffer.size).toBe(0)

      for (let i = 0; i < 20; ++i) {
        buffer.push({
          'position': [0, i],
          'color': [i % 2, i % 3, i % 4, 1]
        })
      }

      expect(buffer.size).toBe(20)

      for (let i = 0; i < 20; ++i) {
        expect(buffer.get(i)).toEqual({
          'position': [0, i],
          'color': [i % 2, i % 3, i % 4, 1],
          'uv': [0, 0]
        })
      }
    })
  })

  describe('#set', function () {
    it('set vertex data in the buffer', function () {
      const buffer = new VertexBuffer(new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      ))

      expect(buffer.size).toBe(0)

      buffer.set(40, {
        'position': [0, 5],
        'color': [2, 3, 4, 1]
      })

      expect(buffer.size).toBe(41)

      for (let i = 0; i < 40; ++i) {
        expect(buffer.get(i)).toEqual({
          'position': [0, 0],
          'color': [0, 0, 0, 0],
          'uv': [0, 0]
        })
      }

      expect(buffer.get(40)).toEqual({
        'position': [0, 5],
        'color': [2, 3, 4, 1],
        'uv': [0, 0]
      })
    })
  })

  describe('#delete', function () {
    it('delete vertex data of a buffer', function () {
      const buffer = new VertexBuffer(new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      ))

      expect(buffer.size).toBe(0)

      for (let i = 0; i < 20; ++i) {
        buffer.push({
          'position': [0, i],
          'color': [i % 2, i % 3, i % 4, 1]
        })
      }

      buffer.delete(5, 10)

      expect(buffer.size).toBe(10)

      for (let i = 0; i < 10; ++i) {
        if (i < 5) {
          expect(buffer.get(i)).toEqual({
            'position': [0, i],
            'color': [i % 2, i % 3, i % 4, 1],
            'uv': [0, 0]
          })
        } else {
          expect(buffer.get(i)).toEqual({
            'position': [0, i + 10],
            'color': [(i + 10) % 2, (i + 10) % 3, (i + 10) % 4, 1],
            'uv': [0, 0]
          })
        }
      }
    })
  })

  describe('#clone', function () {
    it('create a clone of the current vertex buffer', function () {
      const format = new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      )
      const base = VertexBuffer.empty(format, 46)

      for (let i = 0; i < 30; ++i) {
        base.push({
          position: [i, i + 1],
          uv: [i + 2, i + 3],
          color: [i + 4, i + 5, i + 6]
        })
      }

      const clone = base.clone()

      expect(clone).not.toBe(base)
      expect(clone.capacity).toBe(base.capacity)
      expect(clone.size).toBe(base.size)
      expect(clone.equals(base)).toBeTruthy()
    })
  })

  describe('#concat', function () {
    it('concat buffers into a new buffer', function () {
      const format = new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC3]
      )
      const buffers = [
        new VertexBuffer(format, 10), new VertexBuffer(format, 10),
        new VertexBuffer(format, 10), new VertexBuffer(format, 10),
        new VertexBuffer(format, 10)
      ]

      for (let i = 0; i < 50; ++i) {
        buffers[Math.floor(i / 10)].push({
          position: [i, i + 1],
          uv: [i + 2, i + 3],
          color: [i + 4, i + 5, i + 6]
        })
      }

      const [ base, ...others ] = buffers
      const concat = base.concat(...others)

      expect(base.size).toBe(10)
      expect(base.capacity).toBe(10)
      expect(concat).not.toBe(base)
      expect(concat.size).toBe(50)
      expect(concat.capacity).toBe(50)

      for (let i = 0; i < 50; ++i) {
        expect(concat.get(i)).toEqual({
          position: [i, i + 1],
          uv: [i + 2, i + 3],
          color: [i + 4, i + 5, i + 6]
        })
      }
    })
  })

  describe('#concatIn', function () {
    it('concat all passed buffers into the current buffer', function () {
      const format = new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC3]
      )
      const buffers = [
        new VertexBuffer(format, 10), new VertexBuffer(format, 10),
        new VertexBuffer(format, 10), new VertexBuffer(format, 10),
        new VertexBuffer(format, 10)
      ]

      for (let i = 0; i < 50; ++i) {
        buffers[Math.floor(i / 10)].push({
          position: [i, i + 1],
          uv: [i + 2, i + 3],
          color: [i + 4, i + 5, i + 6]
        })
      }

      const [ base, ...others ] = buffers

      expect(base.size).toBe(10)
      expect(base.capacity).toBe(10)
      expect(base.concatIn(...others)).toBe(base)
      expect(base.size).toBe(50)
      expect(base.capacity).toBe(50)

      for (let i = 0; i < 50; ++i) {
        expect(base.get(i)).toEqual({
          position: [i, i + 1],
          uv: [i + 2, i + 3],
          color: [i + 4, i + 5, i + 6]
        })
      }
    })
  })

  describe('#equals', function () {
    it('check if two buffers are similars', function () {
      const a = VertexBuffer.empty(new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      ), 46)
      const b = VertexBuffer.empty(new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      ), 29)

      for (let i = 0; i < 20; ++i) {
        a.push({
          position: [i, i + 1],
          uv: [i + 2, i + 3],
          color: [i + 4, i + 5, i + 6]
        })

        b.push({
          position: [i, i + 1],
          uv: [i + 2, i + 3],
          color: [i + 4, i + 5, i + 6]
        })
      }

      expect(a.equals(b)).toBeTruthy()

      b.push({
        position: [0, 1],
        uv: [2, 3],
        color: [4, 5, 6]
      })

      expect(a.equals(b)).toBeFalsy()
    })
  })

  describe('#copyWithin', function () {
    it('check if two buffers are similars', function () {
      const buffer = VertexBuffer.empty(new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC3]
      ), 46)

      for (let i = 0; i < 20; ++i) {
        buffer.push({
          position: [i, i + 1],
          uv: [i + 2, i + 3],
          color: [i + 4, i + 5, i + 6]
        })
      }

      const a = buffer.clone().copyWithin(10, 0, 20)
      const b = buffer.clone().copyWithin(-10, 0)
      const c = buffer.clone().copyWithin(-10, -20)

      expect(a.equals(b) && b.equals(c)).toBeTruthy()
      expect(a.size).toBe(20)

      for (let i = 0; i < 10; ++i) {
        expect(a.get(i)).toEqual({
          position: [i, i + 1],
          uv: [i + 2, i + 3],
          color: [i + 4, i + 5, i + 6]
        })
        expect(a.get(i + 10)).toEqual({
          position: [i, i + 1],
          uv: [i + 2, i + 3],
          color: [i + 4, i + 5, i + 6]
        })
      }
    })
  })

  describe('#fill', function () {
    it('fill a buffer with some datas', function () {
      const buffer = VertexBuffer.empty(new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC3]
      ), 1488)

      buffer.size = 1488
      buffer.fill({ position: [1, 2], uv: [3, 4], color: [5, 6, 7] })

      for (let i = 0; i < 1488; ++i) {
        expect(buffer.get(i)).toEqual(
          { position: [1, 2], uv: [3, 4], color: [5, 6, 7] }
        )
      }

      buffer.fill({ position: [5, 6], uv: [2, 1], color: [5, 6, 7] }, 20, 60)

      for (let i = 20; i < 60; ++i) {
        expect(buffer.get(i)).toEqual(
          { position: [5, 6], uv: [2, 1], color: [5, 6, 7] }
        )
      }

      buffer.fill({ position: [9, 6], uv: [2, 1], color: [5, 6, 7] }, -40, -10)

      for (let i = 0; i < 30; ++i) {
        expect(buffer.get(buffer.size - i - 11)).toEqual(
          { position: [9, 6], uv: [2, 1], color: [5, 6, 7] }
        )
      }
    })
  })

  describe('#map', function () {
    it('apply a map operation on the buffer', function () {
      const buffer = new VertexBuffer(new VertexFormat(
        ['position', 'uv', 'color'],
        [GLType.FLOAT_VEC2, GLType.FLOAT_VEC2, GLType.FLOAT_VEC4]
      ))

      expect(buffer.size).toBe(0)

      for (let i = 0; i < 20; ++i) {
        buffer.push({
          'position': [0, i],
          'color': [i % 2, i % 3, i % 4, 1]
        })
      }

      buffer.map((x, i) => Object.assign({}, x, { uv: [0, i] }))

      expect(buffer.size).toBe(20)

      for (let i = 0; i < 20; ++i) {
        expect(buffer.get(i)).toEqual({
          'position': [0, i],
          'color': [i % 2, i % 3, i % 4, 1],
          'uv': [0, i]
        })
      }
    })
  })
})
