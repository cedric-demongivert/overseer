/* eslint-env jest */

import { GLShader } from '../src/js/engine/gl'

import { createWebGLMock } from './webgl.mock.js'

const webglmock = createWebGLMock(jest)

describe('engine.gl.GLShader', function () {
  beforeAll(webglmock.mock)
  afterAll(webglmock.unmock)

  describe('#constructor', function () {
    it('allow to construct a shader of any type', function () {
      const gl = webglmock.create()
      const id = Symbol()
      gl.createShader.mockReturnValueOnce(id)

      const shader = new GLShader(gl, gl.FRAGMENT_SHADER)

      expect(gl.createShader).toHaveBeenCalledWith(gl.FRAGMENT_SHADER)
      expect(shader).toBeInstanceOf(GLShader)
    })
  })

  describe('#get type', function () {
    it('return the type of the shader', function () {
      const gl = webglmock.create()
      const id = Symbol()

      gl.createShader.mockReturnValueOnce(id)
      gl.getShaderParameter.mockImplementation((shader, parameter) => {
        if (shader === id && parameter === gl.SHADER_TYPE) {
          return gl.FRAGMENT_SHADER
        }
      })

      const shader = new GLShader(gl, gl.FRAGMENT_SHADER)

      expect(shader.type).toBe(gl.FRAGMENT_SHADER)
      expect(gl.getShaderParameter).toHaveBeenCalledWith(id, gl.SHADER_TYPE)
    })
  })

  describe('#compiled', function () {
    it('return true when the shader is compiled', function () {
      const gl = webglmock.create()
      const id = Symbol()

      gl.createShader.mockReturnValueOnce(id)
      gl.getShaderParameter.mockReturnValueOnce(true)

      const shader = new GLShader(gl, gl.FRAGMENT_SHADER)

      expect(shader.compiled).toBeFalsy()

      shader.compile()

      expect(shader.compiled).toBeTruthy()

      shader.source = 'new content'

      expect(shader.compiled).toBeFalsy()
    })
  })

  describe('#get source', function () {
    it('return the source of the shader', function () {
      const gl = webglmock.create()
      const id = Symbol()
      const source = `source`

      gl.createShader.mockReturnValueOnce(id)
      gl.getShaderSource.mockReturnValueOnce(source)

      const shader = new GLShader(gl, gl.FRAGMENT_SHADER)

      expect(shader.source).toBe(source)
      expect(gl.getShaderSource).toHaveBeenCalledWith(id)
    })
  })

  describe('#set source', function () {
    it('replace the shader source', function () {
      const gl = webglmock.create()
      const id = Symbol()
      const source = `source`

      gl.createShader.mockReturnValueOnce(id)

      const shader = new GLShader(gl, gl.FRAGMENT_SHADER)
      shader.source = source

      expect(gl.shaderSource).toHaveBeenCalledWith(id, source)
    })

    it('reset the compilation status', function () {
      const gl = webglmock.create()
      const id = Symbol()

      gl.createShader.mockReturnValueOnce(id)
      gl.getShaderParameter.mockReturnValueOnce(true)

      const shader = new GLShader(gl, gl.FRAGMENT_SHADER)

      shader.compile()

      expect(shader.compiled).toBeTruthy()

      shader.source = 'new content'

      expect(shader.compiled).toBeFalsy()
    })
  })

  describe('#get logs', function () {
    it('return info logs', function () {
      const gl = webglmock.create()
      const id = Symbol()

      gl.createShader.mockReturnValueOnce(id)
      gl.getShaderInfoLog.mockReturnValueOnce('logs')

      const shader = new GLShader(gl, gl.FRAGMENT_SHADER)

      expect(shader.logs).toBe('logs')
      expect(gl.getShaderInfoLog).toHaveBeenCalledWith(id)
    })
  })

  describe('#compile', function () {
    it('compile the source of the shader', function () {
      const gl = webglmock.create()
      const id = Symbol()

      gl.createShader.mockReturnValueOnce(id)
      gl.getShaderParameter.mockReturnValueOnce(true)

      const shader = new GLShader(gl, gl.FRAGMENT_SHADER)

      shader.compile()

      expect(shader.compiled).toBeTruthy()
      expect(gl.compileShader).toHaveBeenCalledWith(id)
    })

    it('only compile once the source of the shader', function () {
      const gl = webglmock.create()
      const id = Symbol()

      gl.createShader.mockReturnValueOnce(id)
      gl.getShaderParameter.mockReturnValueOnce(true)

      const shader = new GLShader(gl, gl.FRAGMENT_SHADER)

      shader.compile()

      gl.compileShader.mockClear()

      shader.compile()

      expect(gl.compileShader).not.toHaveBeenCalled()
    })

    it('throw an error if the compilation fail', function () {
      const gl = webglmock.create()
      const id = Symbol()

      gl.createShader.mockReturnValueOnce(id)
      gl.getShaderParameter.mockReturnValueOnce(false)
      gl.getShaderInfoLog.mockReturnValueOnce('logs')
      gl.getShaderSource.mockReturnValueOnce('source')

      const shader = new GLShader(gl, gl.FRAGMENT_SHADER)

      expect(_ => shader.compile()).toThrow()
    })
  })

  describe('#destroy', function () {
    it('destroy the shader', function () {
      const gl = webglmock.create()
      const id = Symbol()

      gl.createShader.mockReturnValueOnce(id)

      const shader = new GLShader(gl, gl.FRAGMENT_SHADER)

      shader.destroy()

      expect(gl.deleteShader).toHaveBeenCalledWith(id)
    })
  })
})
