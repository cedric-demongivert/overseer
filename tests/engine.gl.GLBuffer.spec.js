/* eslint-env jest */

import { GLBuffer } from '../src/js/engine/gl'

import { createWebGLMock } from './webgl.mock.js'

const webglmock = createWebGLMock(jest)

describe('engine.gl.GLBuffer', function () {
  beforeAll(webglmock.mock)
  afterAll(webglmock.unmock)

  describe('#constructor', function () {
    it('allow to construct a buffer', function () {
      const gl = webglmock.create()
      const id = Symbol()
      gl.createBuffer.mockReturnValueOnce(id)

      const buffer = new GLBuffer(gl, gl.ARRAY_BUFFER)

      expect(gl.createBuffer).toHaveBeenCalled()
      expect(buffer).toBeInstanceOf(GLBuffer)
      expect(buffer.target).toBe(gl.ARRAY_BUFFER)
    })
  })

  describe('#get target', function () {
    it('return the binding target of the buffer', function () {
      const gl = webglmock.create()

      let buffer = new GLBuffer(gl, gl.ARRAY_BUFFER)
      expect(buffer.target).toBe(gl.ARRAY_BUFFER)

      buffer = new GLBuffer(gl, gl.ELEMENT_ARRAY_BUFFER)
      expect(buffer.target).toBe(gl.ELEMENT_ARRAY_BUFFER)
    })
  })

  describe('#get bound', function () {
    it('return true if the buffer is bound to its target', function () {
      const gl = webglmock.create()
      const id = Symbol()

      gl.createBuffer.mockReturnValueOnce(id)
      gl.getParameter.mockImplementation(x => {
        switch (x) {
          case gl.ARRAY_BUFFER_BINDING: return id
          default: return 0
        }
      })

      let buffer = new GLBuffer(gl, gl.ARRAY_BUFFER)

      expect(buffer.bound).toBeTruthy()
      expect(gl.getParameter).toHaveBeenCalled()

      gl.getParameter.mockImplementation(x => {
        switch (x) {
          default: return 0
        }
      }).mockClear()

      expect(buffer.bound).toBeFalsy()
      expect(gl.getParameter).toHaveBeenCalled()

      gl.createBuffer.mockReturnValueOnce(id)
      gl.getParameter.mockImplementation(x => {
        switch (x) {
          case gl.ELEMENT_ARRAY_BUFFER_BINDING: return id
          default: return 0
        }
      }).mockClear()

      buffer = new GLBuffer(gl, gl.ELEMENT_ARRAY_BUFFER)

      expect(buffer.bound).toBeTruthy()
      expect(gl.getParameter).toHaveBeenCalled()

      gl.getParameter.mockImplementation(x => {
        switch (x) {
          default: return 0
        }
      }).mockClear()

      expect(buffer.bound).toBeFalsy()
      expect(gl.getParameter).toHaveBeenCalled()
    })
  })

  describe('#bind', function () {
    it('bind the buffer to its target', function () {
      const gl = webglmock.create()
      const id = Symbol()
      gl.createBuffer.mockReturnValueOnce(id)

      const buffer = new GLBuffer(gl, gl.ARRAY_BUFFER)

      buffer.bind()

      expect(gl.bindBuffer).toHaveBeenCalledWith(gl.ARRAY_BUFFER, id)
    })

    it('bind the buffer to a target only once', function () {
      const gl = webglmock.create()
      const id = Symbol()
      gl.createBuffer.mockReturnValueOnce(id)
      gl.getParameter.mockImplementation(x => {
        switch (x) {
          case gl.ARRAY_BUFFER_BINDING: return id
          default: return 0
        }
      })

      const buffer = new GLBuffer(gl, gl.ARRAY_BUFFER)

      buffer.bind()

      expect(gl.bindBuffer).not.toHaveBeenCalled()
    })
  })

  describe('#data', function () {
    it('change the data of the buffer', function () {
      const gl = webglmock.create()
      const id = Symbol()
      gl.createBuffer.mockReturnValueOnce(id)
      gl.getParameter.mockImplementation(x => {
        switch (x) {
          case gl.ARRAY_BUFFER_BINDING: return id
          default: return 0
        }
      })

      const buffer = new GLBuffer(gl, gl.ARRAY_BUFFER)

      buffer.data(1, 2, 3, 4, 5, 6, 7)
      expect(gl.bufferData).toHaveBeenCalledWith(
        gl.ARRAY_BUFFER, 1, 2, 3, 4, 5, 6, 7
      )
    })
  })

  describe('#subdata', function () {
    it('change a part of buffer data', function () {
      const gl = webglmock.create()
      const id = Symbol()
      gl.createBuffer.mockReturnValueOnce(id)
      gl.getParameter.mockImplementation(x => {
        switch (x) {
          case gl.ARRAY_BUFFER_BINDING: return id
          default: return 0
        }
      })

      const buffer = new GLBuffer(gl, gl.ARRAY_BUFFER)

      buffer.subdata(1, 2, 3, 4, 5, 6, 7)
      expect(gl.bufferSubData).toHaveBeenCalledWith(
        gl.ARRAY_BUFFER, 1, 2, 3, 4, 5, 6, 7
      )
    })
  })

  describe('#get size', function () {
    it('return the size of the buffer', function () {
      const gl = webglmock.create()
      const id = Symbol()
      gl.createBuffer.mockReturnValueOnce(id)
      gl.getParameter.mockImplementation(x => {
        switch (x) {
          case gl.ARRAY_BUFFER_BINDING: return id
          default: return 0
        }
      })
      gl.getBufferParameter.mockReturnValueOnce(10)

      const buffer = new GLBuffer(gl, gl.ARRAY_BUFFER)

      expect(buffer.size).toBe(10)
      expect(gl.getBufferParameter).toHaveBeenCalledWith(
        gl.ARRAY_BUFFER, gl.BUFFER_SIZE
      )
    })
  })

  describe('#get usage', function () {
    it('return the buffer usage', function () {
      const gl = webglmock.create()
      const id = Symbol()
      gl.createBuffer.mockReturnValueOnce(id)
      gl.getParameter.mockImplementation(x => {
        switch (x) {
          case gl.ARRAY_BUFFER_BINDING: return id
          default: return 0
        }
      })
      gl.getBufferParameter.mockReturnValueOnce(gl.STATIC_DRAW)

      const buffer = new GLBuffer(gl, gl.ARRAY_BUFFER)

      expect(buffer.usage).toBe(gl.STATIC_DRAW)
      expect(gl.getBufferParameter).toHaveBeenCalledWith(
        gl.ARRAY_BUFFER, gl.BUFFER_USAGE
      )
    })
  })

  describe('#destroy', function () {
    it('destroy the buffer', function () {
      const gl = webglmock.create()
      const id = Symbol()
      gl.createBuffer.mockReturnValueOnce(id)
      gl.getParameter.mockImplementation(x => {
        switch (x) {
          case gl.ARRAY_BUFFER_BINDING: return id
          default: return 0
        }
      })

      const buffer = new GLBuffer(gl, gl.ARRAY_BUFFER)

      buffer.destroy()

      expect(gl.deleteBuffer).toHaveBeenCalledWith(id)
    })
  })
})
