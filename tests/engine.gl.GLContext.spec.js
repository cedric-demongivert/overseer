/* eslint-env jest */

import { GLContext, GLObject } from '../src/js/engine/gl'

import { createWebGLMock } from './webgl.mock.js'

const webglmock = createWebGLMock(jest)

describe('engine.gl.GLContext', function () {
  beforeAll(webglmock.mock)
  afterAll(webglmock.unmock)

  describe('#constructor', function () {
    it('create a wrapper around an existing WebGLRenderingContext', function () {
      const rawContext = webglmock.create()
      const context = new GLContext(rawContext)

      expect(context).toBeInstanceOf(GLContext)

      context.createBuffer()

      expect(rawContext.createBuffer).toHaveBeenCalled()
    })

    it('create only one wrapper by WebGLRenderingContext', function () {
      const rawContext = webglmock.create()
      const context = new GLContext(rawContext)

      expect(context).toBe(new GLContext(rawContext))
    })

    it('can be used with a GLContext', function () {
      const rawContext = webglmock.create()
      const context = new GLContext(rawContext)

      expect(context).toBe(new GLContext(context))
    })

    it('can be used with a GLObject', function () {
      const rawContext = webglmock.create()
      const context = new GLContext(rawContext)

      expect(context).toBe(new GLContext(new GLObject(context)))
    })

    it('can be used with an object that define a GLContext.get value', function () {
      const rawContext = webglmock.create()
      const context = new GLContext(rawContext)

      expect(context).toBe(new GLContext({[GLContext.get]: context}))
    })
  })

  describe('#from', function () {
    it('create a wrapper around an existing WebGLRenderingContext', function () {
      const rawContext = webglmock.create()
      const context = GLContext.from(rawContext)

      expect(context).toBeInstanceOf(GLContext)

      context.createBuffer()

      expect(rawContext.createBuffer).toHaveBeenCalled()
    })

    it('create only one wrapper by WebGLRenderingContext', function () {
      const rawContext = webglmock.create()
      const context = GLContext.from(rawContext)

      expect(context).toBe(GLContext.from(rawContext))
    })

    it('can be used with a GLContext', function () {
      const rawContext = webglmock.create()
      const context = GLContext.from(rawContext)

      expect(context).toBe(GLContext.from(context))
    })

    it('can be used with a GLObject', function () {
      const rawContext = webglmock.create()
      const context = GLContext.from(rawContext)

      expect(context).toBe(GLContext.from(new GLObject(context)))
    })

    it('can be used with an object that define a GLContext.get value', function () {
      const rawContext = webglmock.create()
      const context = GLContext.from(rawContext)

      expect(context).toBe(GLContext.from({[GLContext.get]: context}))
    })
  })

  describe('#context', function () {
    it('create a wrapper around an existing WebGLRenderingContext if necessary', function () {
      const rawContext = webglmock.create()
      const context = GLContext.context(rawContext)

      expect(context).toBeInstanceOf(GLContext)

      context.createBuffer()

      expect(rawContext.createBuffer).toHaveBeenCalled()
    })

    it('keep GLContext values as is', function () {
      const rawContext = webglmock.create()
      const context = GLContext.context(rawContext)

      expect(context).toBe(GLContext.context(rawContext))
    })

    it('return the GLContext of a GLObject', function () {
      const rawContext = webglmock.create()
      const context = GLContext.context(rawContext)

      expect(context).toBe(GLContext.context(new GLObject(context)))
    })

    it('return the GLContext of an object that define a GLContext.get value', function () {
      const rawContext = webglmock.create()
      const context = GLContext.context(rawContext)

      expect(context).toBe(GLContext.context({[GLContext.get]: context}))
    })
  })

  describe('#raw', function () {
    it('keep WebGLRenderingContext as is', function () {
      const rawContext = webglmock.create()
      expect(rawContext).toBe(GLContext.raw(rawContext))
    })

    it('extract WebGLRenderingContext of a GLContext', function () {
      const rawContext = webglmock.create()
      const context = GLContext.context(rawContext)

      expect(rawContext).toBe(GLContext.raw(context))
    })

    it('extract WebGLRenderingContext of GLObject', function () {
      const rawContext = webglmock.create()
      const context = GLContext.context(rawContext)

      expect(rawContext).toBe(GLContext.raw(new GLObject(context)))
    })

    it('extract WebGLRenderingContext of an object that define a GLContext.get value', function () {
      const rawContext = webglmock.create()
      const context = GLContext.context(rawContext)

      expect(rawContext).toBe(GLContext.raw({[GLContext.get]: context}))
    })
  })

  describe('instance#raw', function () {
    it('return the wrapped context', function () {
      const rawContext = webglmock.create()
      const context = GLContext.context(rawContext)

      expect(context.raw).toBe(rawContext)
    })
  })
})
